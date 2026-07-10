#!/usr/bin/env node
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)));
const HOST = process.env.HOST || '127.0.0.1';
const PORT = Number(process.env.PORT || 8080);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

function safePath(urlPath) {
  let decoded;
  try { decoded = decodeURIComponent(urlPath.split('?')[0]); } catch { return null; }
  const projectBase = '/adgai-site-public';
  const normalized = decoded === projectBase || decoded === `${projectBase}/`
    ? '/'
    : decoded.startsWith(`${projectBase}/`)
      ? decoded.slice(projectBase.length)
      : decoded;
  const requested = normalized === '/' ? '/index.html' : normalized;
  const filePath = path.resolve(ROOT, `.${requested}`);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) return null;
  let st;
  try { st = fs.lstatSync(filePath); } catch { return null; }
  if (!st.isFile()) return null;
  return filePath;
}

function responseHeaders(filePath) {
  const extension = path.extname(filePath);
  const revalidate = ['.html', '.json', '.xml', '.txt'].includes(extension);
  return {
    'Content-Type': TYPES[extension] || 'application/octet-stream',
    'Content-Length': fs.statSync(filePath).size,
    'Cache-Control': revalidate ? 'no-cache' : 'public, max-age=3600, stale-while-revalidate=86400',
    'Content-Security-Policy':
      "default-src 'self'; img-src 'self' data:; media-src 'self'; font-src 'self'; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; frame-src 'none'; form-action 'none'; worker-src 'none'",
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };
}

const server = http.createServer({ maxHeaderSize:16 * 1024 }, (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', Allow: 'GET, HEAD' });
    response.end('Method Not Allowed');
    return;
  }

  const filePath = safePath(request.url || '/');
  if (!filePath) {
    const notFoundPath = path.join(ROOT, '404.html');
    response.writeHead(404, responseHeaders(notFoundPath));
    if (request.method === 'HEAD') response.end();
    else fs.createReadStream(notFoundPath).pipe(response);
    return;
  }

  response.writeHead(200, responseHeaders(filePath));

  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  fs.createReadStream(filePath).pipe(response);
});

server.requestTimeout = 30000;
server.headersTimeout = 10000;
server.keepAliveTimeout = 5000;

server.listen(PORT, HOST, () => {
  console.log(`Public preview: http://${HOST}:${PORT}`);
});
