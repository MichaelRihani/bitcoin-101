import https from "node:https";
import type { IncomingMessage, ServerResponse } from "node:http";
import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const SERVER_CACHE_TTL_MS = 90_000;

type Next = (err?: unknown) => void;

function coingeckoProxyPlugin(apiKey: string): Plugin {
  const middleware = createCoingeckoMiddleware(apiKey);

  return {
    name: "coingecko-proxy-cache",
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

function createCoingeckoMiddleware(apiKey: string) {
  let serverCache: { body: string; pathKey: string; expires: number } | null =
    null;

  return function coingeckoMiddleware(
    req: IncomingMessage,
    res: ServerResponse,
    next: Next,
  ) {
    const url = req.url ?? "";
    if (!url.startsWith("/api/coingecko")) {
      next();
      return;
    }

    const upstreamPath = url.slice("/api/coingecko".length) || "/";
    const now = Date.now();
    if (
      serverCache &&
      serverCache.pathKey === upstreamPath &&
      now < serverCache.expires
    ) {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.setHeader("Cache-Control", "private, max-age=90");
      res.end(serverCache.body);
      return;
    }

    const headers: Record<string, string> = {
      Accept: "application/json",
      "User-Agent": "bitcoin-101/1.0",
    };
    if (apiKey) {
      headers["x-cg-demo-api-key"] = apiKey;
    }

    https
      .get(
        {
          hostname: "api.coingecko.com",
          path: upstreamPath,
          headers,
        },
        (upstream) => {
          let body = "";
          upstream.setEncoding("utf8");
          upstream.on("data", (chunk) => {
            body += chunk;
          });
          upstream.on("end", () => {
            const code = upstream.statusCode ?? 502;
            res.statusCode = code;
            res.setHeader("Content-Type", "application/json");
            if (code >= 200 && code < 300) {
              serverCache = {
                body,
                pathKey: upstreamPath,
                expires: Date.now() + SERVER_CACHE_TTL_MS,
              };
              res.setHeader("Cache-Control", "private, max-age=90");
            }
            res.end(body);
          });
        },
      )
      .on("error", (err) => {
        next(err);
      });
  };
}

/**
 * Project Pages live at https://<user>.github.io/bitcoin-101/
 * GITHUB_ACTIONS is always set on GitHub-hosted runners (reliable for CI builds).
 * GITHUB_PAGES_BASE=1 allows local: GITHUB_PAGES_BASE=1 npm run build
 */
const pagesBase =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.GITHUB_PAGES_BASE === "1"
    ? "/bitcoin-101/"
    : "/";

function injectHtmlBasePlugin(base: string): Plugin {
  return {
    name: "inject-html-base",
    transformIndexHtml(html) {
      if (base === "/") return html;
      if (html.includes("<base ")) return html;
      return html.replace("<head>", `<head>\n    <base href="${base}" />`);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const coingeckoKey = env.COINGECKO_API_KEY ?? "";

  return {
    base: pagesBase,
    plugins: [
      react(),
      coingeckoProxyPlugin(coingeckoKey),
      injectHtmlBasePlugin(pagesBase),
    ],
  };
});
