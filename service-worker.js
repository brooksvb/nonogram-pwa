const a=self,e="cache1633126474317",s=["/nonogram-pwa/_app/start-f2c1739e.js","/nonogram-pwa/_app/assets/start-464e9d0a.css","/nonogram-pwa/_app/pages/__layout.svelte-9c9c6375.js","/nonogram-pwa/_app/assets/pages/__layout.svelte-d27438b4.css","/nonogram-pwa/_app/error.svelte-2ba1003e.js","/nonogram-pwa/_app/pages/index.svelte-54cc58c6.js","/nonogram-pwa/_app/assets/pages/index.svelte-d1a1a9de.css","/nonogram-pwa/_app/pages/game.svelte-368aa274.js","/nonogram-pwa/_app/assets/pages/game.svelte-18dc9e6f.css","/nonogram-pwa/_app/chunks/vendor-af053b12.js"].concat(["/nonogram-pwa/crossmark.svg","/nonogram-pwa/favicon.png","/nonogram-pwa/manifest.json","/nonogram-pwa/pencil-pictogram.svg"]),t=new Set(s);a.addEventListener("install",(t=>{t.waitUntil(caches.open(e).then((a=>a.addAll(s))).then((()=>{a.skipWaiting()})))})),a.addEventListener("activate",(s=>{s.waitUntil(caches.keys().then((async s=>{for(const a of s)a!==e&&await caches.delete(a);a.clients.claim()})))})),a.addEventListener("fetch",(a=>{if("GET"!==a.request.method||a.request.headers.has("range"))return;const e=new URL(a.request.url),s=e.protocol.startsWith("http"),n=e.hostname===self.location.hostname&&e.port!==self.location.port,o=e.host===self.location.host&&t.has(e.pathname),c="only-if-cached"===a.request.cache&&!o;!s||n||c||a.respondWith((async()=>o&&await caches.match(a.request)||async function(a){const e=await caches.open("offline1633126474317");try{const s=await fetch(a);return e.put(a,s.clone()),s}catch(s){const t=await e.match(a);if(t)return t;throw s}}(a.request))())}));
