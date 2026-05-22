param(
  [string]$TaskName = "Adgai IntelHub Public Daily Report",
  [string]$At = "07:15"
)

$ErrorActionPreference = "Stop"

if ($At -notmatch "^\d{2}:\d{2}$") {
  throw "Use HH:mm time format, for example 07:15."
}

$RepoRoot = Resolve-Path -LiteralPath (Join-Path $PSScriptRoot "..")
$PublishScript = Join-Path $RepoRoot "scripts\publish-intelhub-daily-report.ps1"
$PowerShellExe = (Get-Process -Id $PID).Path

if (-not (Test-Path -LiteralPath $PublishScript)) {
  throw "Publish script not found: $PublishScript"
}

$taskCommand = '"{0}" -NoProfile -ExecutionPolicy Bypass -File "{1}"' -f $PowerShellExe, $PublishScript

& schtasks.exe /Create /TN $TaskName /SC DAILY /ST $At /TR $taskCommand /F | Write-Host
if ($LASTEXITCODE -ne 0) {
  throw "Failed to create scheduled task: $TaskName"
}

& schtasks.exe /Query /TN $TaskName /FO LIST | Write-Host
if ($LASTEXITCODE -ne 0) {
  throw "Scheduled task was created, but verification query failed: $TaskName"
}
