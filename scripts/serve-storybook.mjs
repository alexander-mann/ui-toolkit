import { createReadStream, existsSync, statSync } from 'node:fs'
import { createServer } from 'node:http'
import { extname, join, normalize, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Minimal, dependency-free static file server for the built Storybook.
 * Used as the Playwright `webServer` for visual-regression tests.
 * Serves ./storybook-static on PORT (default 6007). Run `pnpm build-storybook`
 * first.
 */

const root = resolve(fileURLToPath(new URL('..', import.meta.url)), 'storybook-static') // prettier-ignore
const port = Number(process.env.SB_PORT) || 6007

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.map': 'application/json',
}

const server = createServer((req, res) => {
  // Strip query string, decode, and normalize to prevent path traversal.
  const pathname = decodeURIComponent((req.url || '/').split('?')[0])
  const relative = normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  let filePath = join(root, relative)

  if (existsSync(filePath) && statSync(filePath).isDirectory()) {
    filePath = join(filePath, 'index.html')
  }

  if (!filePath.startsWith(root) || !existsSync(filePath)) {
    res.writeHead(404, { 'content-type': 'text/plain' })
    res.end('Not found')
    return
  }

  res.writeHead(200, {
    'content-type': contentTypes[extname(filePath)] || 'application/octet-stream', // prettier-ignore
  })
  createReadStream(filePath).pipe(res)
})

server.listen(port, () => {
  console.log(`Serving storybook-static on http://localhost:${port}`)
})
