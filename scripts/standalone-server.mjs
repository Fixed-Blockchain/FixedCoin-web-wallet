import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { startProdServer } from 'vinext/server/prod-server';

const outDir = join(import.meta.dirname, 'dist');
const staticPolicy = readFileSync(join(outDir, 'client', '_headers'), 'utf8')
  .match(/^\s+Content-Security-Policy:\s*(.+)$/mu)?.[1];
if (!staticPolicy) throw new Error('The standalone security policy is missing.');

const { server } = await startProdServer({
  host: process.env.HOST ?? '127.0.0.1',
  port: Number.parseInt(process.env.PORT ?? '3000', 10),
  outDir,
});

// Vinext serves hashed assets before worker.ts. A dedicated Worker must carry
// the document's COEP even on localhost, where Nginx is not present.
server.prependListener('request', (request, response) => {
  response.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  response.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  response.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (request.url?.startsWith('/_next/static/workers/')) {
    response.setHeader('Content-Security-Policy', staticPolicy);
  }
});
