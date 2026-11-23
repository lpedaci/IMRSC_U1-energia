// Servidor de desarrollo sin dependencias, con recarga automática.
// Uso: npm run dev   (o: node scripts/dev-server.mjs)
// Variables opcionales: PORT=5173  HOST=127.0.0.1
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const HOST = process.env.HOST || '127.0.0.1';
let port = Number(process.env.PORT) || 5173;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8', '.md': 'text/markdown; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.mp4': 'video/mp4'
};
const IGNORED = /(^|[\\/])(\.git|node_modules|\.claude)([\\/]|$)/;

// Script que se inyecta en cada HTML: escucha cambios y recarga
const RELOAD_SNIPPET = `<script>(()=>{const es=new EventSource('/__reload');es.onmessage=e=>{if(e.data==='css'){document.querySelectorAll('link[rel=stylesheet]').forEach(l=>{if(l.href.startsWith(location.origin)){const u=new URL(l.href);u.searchParams.set('t',Date.now());l.href=u}})}else location.reload()};})();</script>`;

const clients = new Set();

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('retry: 1000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let rel = decodeURIComponent(url.pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  const file = path.normalize(path.join(ROOT, rel));
  if (!file.startsWith(ROOT) || IGNORED.test(path.relative(ROOT, file))) {
    res.writeHead(403); return res.end('Prohibido');
  }

  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 · No encontrado: ' + rel);
    }
    const ext = path.extname(file).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    const headers = { 'Content-Type': type, 'Cache-Control': 'no-store' };
    if (ext === '.html') {
      fs.readFile(file, 'utf8', (e, html) => {
        if (e) { res.writeHead(500); return res.end('Error leyendo el archivo'); }
        const out = html.includes('</body>') ? html.replace('</body>', RELOAD_SNIPPET + '</body>') : html + RELOAD_SNIPPET;
        res.writeHead(200, headers); res.end(out);
      });
    } else {
      res.writeHead(200, headers);
      fs.createReadStream(file).pipe(res);
    }
  });
});

// Vigila cambios (con un pequeño debounce para guardados múltiples)
// Si en la ventana solo cambiaron .css, se refrescan los estilos sin recargar la página
let timer = null, onlyCss = true;
fs.watch(ROOT, { recursive: true }, (_evt, name) => {
  if (!name || IGNORED.test(name)) return;
  if (!name.endsWith('.css')) onlyCss = false;
  clearTimeout(timer);
  timer = setTimeout(() => {
    const msg = onlyCss ? 'css' : 'reload';
    for (const c of clients) c.write(`data: ${msg}\n\n`);
    console.log(`  ↻ ${new Date().toLocaleTimeString('es-AR')}  ${name}`);
    timer = null; onlyCss = true;
  }, 120);
});

// Si el puerto está ocupado, prueba el siguiente
server.on('error', (e) => {
  if (e.code === 'EADDRINUSE' && port < 5200) { port++; server.listen(port, HOST); }
  else { console.error(e); process.exit(1); }
});
server.on('listening', () => {
  console.log('\n  Sistema Eléctrico Argentino · servidor de desarrollo');
  console.log(`  ➜  http://${HOST}:${port}/`);
  console.log('  Recarga automática activa. Ctrl+C para detener.\n');
});
server.listen(port, HOST);
