import devServer, { defaultOptions } from "@hono/vite-dev-server";
import adapter from "@hono/vite-dev-server/cloudflare";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { cloudflareDevProxyVitePlugin } from "@remix-run/dev/dist/vite/cloudflare-proxy-plugin";
import {DefineRouteFunction} from '@remix-run/dev/dist/config/routes'
import {  getSimpleRoutes, getRoutes} from './bootstrap/supports/RouteManager'
import path from "path";

async function defineAppRoutes(route: DefineRouteFunction) {

  getRoutes(true)

  getSimpleRoutes().forEach((singleRoute:any )  => {
        route(singleRoute.path, singleRoute.file);
    })
}


export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
  ssr: {
    resolve: {
      externalConditions: ["workerd", "worker"],
    },
  },
  plugins: [
    cloudflareDevProxyVitePlugin(),
    remix({
      appDirectory: "./",
      future: {
        v3_fetcherPersist: true,
        v3_lazyRouteDiscovery: true,
        v3_relativeSplatPath: true,
        v3_singleFetch: true,
        v3_throwAbortReason: true
      },
      routes(defineRoutes) {
        return defineRoutes(defineAppRoutes);
      },
    }),
    devServer({
      adapter,
      entry: "server.ts",
      exclude: [...defaultOptions.exclude, "/assets/**", "/app/**"],
      injectClientScript: false,
    }),
  ],
});
