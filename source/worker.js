const web_cache = 'mqo-game-v0.4.0';
const filesToCache = ["/assets","/assets/audio","/assets/audio/beep.mp3","/assets/audio/cheer_0.wav","/assets/audio/cheer_1.wav","/assets/fonts","/assets/fonts/montserrat.svg","/assets/fonts/montserrat.woff","/assets/fonts/montserrat.woff2","/assets/img","/assets/img/clouds.png","/assets/img/icons","/assets/img/icons/apple-touch-icon.png","/assets/img/icons/favicon.ico","/assets/img/icons/icon_144x144.png","/assets/img/icons/icon_168x168.png","/assets/img/icons/icon_192x192.png","/assets/img/icons/icon_48x48.png","/assets/img/icons/icon_72x72.png","/assets/img/icons/icon_96x96.png","/assets/img/like.png","/assets/img/logo.png","/assets/img/night.jpg","/assets/js","/assets/js/jquery.js","/assets/js/main.js","/assets/js/useful.js","/assets/main.css","/changes.txt","/index.html","/"];

self.addEventListener('install',(event)=> {
  event.waitUntil(
    caches.open(web_cache)
      .then((cache)=> {
        return cache.addAll(filesToCache);
      })
  );
});

/*self.addEventListener('activate', async event => { await self.registration.navigationPreload.enable(); event.waitUntil( caches.keys().then(function(cacheNames) { return Promise.all( cacheNames.filter(function(web_cache) {}).map(function(cacheName) { return caches.delete(web_cache); }) ); }) ); });


addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(async response => {
            if (response) {
                return response;
            }
            const networkResponse = await fetch(event.request);
            const clonedResponse = networkResponse.clone();
            const runtimeCache = await caches.open(web_cache);
            runtimeCache.put(event.request, networkResponse);
            return Promise.resolve(clonedResponse);
        })
    );
});*/