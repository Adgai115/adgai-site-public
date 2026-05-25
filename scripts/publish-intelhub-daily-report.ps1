param(
  [string]$Branch = "main",
  [switch]$NoPush
)

$ErrorActionPreference = "Stop"

$RepoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$LogDir = Join-Path $RepoRoot "logs"
$LogFile = Join-Path $LogDir "intelhub-daily-publish.log"

New-Item -ItemType Directory -Force -Path $LogDir | Out-Null

function Write-Log {
  param([string]$Message)
  $line = "[{0}] {1}" -f (Get-Date -Format "yyyy-MM-dd HH:mm:ss"), $Message
  Add-Content -LiteralPath $LogFile -Value $line -Encoding UTF8
  Write-Host $line
}

function Invoke-Logged {
  param(
    [string]$File,
    [string[]]$Arguments
  )

  Write-Log ("> {0} {1}" -f $File, ($Arguments -join " "))
  $output = & $File @Arguments 2>&1
  $exitCode = $LASTEXITCODE
  foreach ($line in $output) {
    Write-Log ([string]$line)
  }
  if ($exitCode -ne 0) {
    throw "$File exited with code $exitCode"
  }
}

function Test-GitQuiet {
  param([string[]]$Arguments)
  & git @Arguments | Out-Null
  return $LASTEXITCODE
}

Set-Location -LiteralPath $RepoRoot
Write-Log "Starting IntelHub daily report publish in $RepoRoot"

$indexStatus = Test-GitQuiet @("diff", "--cached", "--quiet")
if ($indexStatus -eq 1) {
  throw "Git index already has staged changes. Aborting to avoid committing unrelated work."
}
if ($indexStatus -ne 0) {
  throw "Unable to inspect git index. Exit code: $indexStatus"
}

Invoke-Logged "git" @("fetch", "origin", $Branch)

$aheadBehind = (& git rev-list --left-right --count "origin/$Branch...HEAD").Trim() -split "\s+"
if ($LASTEXITCODE -ne 0 -or $aheadBehind.Count -ne 2) {
  throw "Unable to compare local branch with origin/$Branch"
}
if ([int]$aheadBehind[0] -gt 0) {
  Invoke-Logged "git" @("pull", "--ff-only", "origin", $Branch)
}

Invoke-Logged "npm" @("run", "update:intelhub-report")
Invoke-Logged "npm" @("run", "check")

$reportPaths = @("data/intelhub_daily_report.json", "data/intelhub_daily_index.json", "data/intelhub_daily_reports")
$reportChanges = & git status --porcelain -- @reportPaths
if ($LASTEXITCODE -ne 0) {
  throw "Unable to inspect IntelHub report changes."
}
if (-not $reportChanges) {
  Write-Log "IntelHub daily report is already up to date. No commit needed."
  exit 0
}

$report = Get-Content -LiteralPath (Join-Path $RepoRoot "data/intelhub_daily_report.json") -Raw | ConvertFrom-Json
$reportDate = if ($report.report_date) { [string]$report.report_date } else { Get-Date -Format "yyyy-MM-dd" }
$message = "Refresh IntelHub daily report $reportDate"

Invoke-Logged "git" @("add", "--", "data/intelhub_daily_report.json", "data/intelhub_daily_index.json", "data/intelhub_daily_reports")
Invoke-Logged "git" @("commit", "-m", $message)

if ($NoPush) {
  Write-Log "NoPush was set. Commit created but not pushed."
  exit 0
}

Invoke-Logged "git" @("push", "origin", "HEAD:$Branch")
Write-Log "IntelHub daily report publish completed."
