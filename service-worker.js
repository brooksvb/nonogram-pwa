const timestamp = 1633128764336;
const build = [
  "/nonogram-pwa/_app/start-5dfadcf6.js",
  "/nonogram-pwa/_app/assets/start-464e9d0a.css",
  "/nonogram-pwa/_app/pages/__layout.svelte-cfb60634.js",
  "/nonogram-pwa/_app/assets/pages/__layout.svelte-d27438b4.css",
  "/nonogram-pwa/_app/error.svelte-14f0e1d9.js",
  "/nonogram-pwa/_app/pages/index.svelte-5544a0f0.js",
  "/nonogram-pwa/_app/assets/pages/index.svelte-d1a1a9de.css",
  "/nonogram-pwa/_app/pages/game.svelte-741d06a2.js",
  "/nonogram-pwa/_app/assets/pages/game.svelte-18dc9e6f.css",
  "/nonogram-pwa/_app/chunks/vendor-8b4ed79a.js"
];
const files = [
  "/nonogram-pwa/crossmark.svg",
  "/nonogram-pwa/favicon.png",
  "/nonogram-pwa/manifest.json",
  "/nonogram-pwa/pencil-pictogram.svg"
];
const worker = self;
const FILES = `cache${timestamp}`;
const to_cache = build.concat(files);
const staticAssets = new Set(to_cache);
worker.addEventListener("install", (event) => {
  event.waitUntil(caches.open(FILES).then((cache) => cache.addAll(to_cache)).then(() => {
    worker.skipWaiting();
  }));
});
worker.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then(async (keys) => {
    for (const key of keys) {
      if (key !== FILES)
        await caches.delete(key);
    }
    worker.clients.claim();
  }));
});
async function fetchAndCache(request) {
  const cache = await caches.open(`offline${timestamp}`);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (err) {
    const response = await cache.match(request);
    if (response)
      return response;
    throw err;
  }
}
worker.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || event.request.headers.has("range"))
    return;
  const url = new URL(event.request.url);
  const isHttp = url.protocol.startsWith("http");
  const isDevServerRequest = url.hostname === self.location.hostname && url.port !== self.location.port;
  const isStaticAsset = url.host === self.location.host && staticAssets.has(url.pathname);
  const skipBecauseUncached = event.request.cache === "only-if-cached" && !isStaticAsset;
  if (isHttp && !isDevServerRequest && !skipBecauseUncached) {
    event.respondWith((async () => {
      const cachedAsset = isStaticAsset && await caches.match(event.request);
      return cachedAsset || fetchAndCache(event.request);
    })());
  }
});
