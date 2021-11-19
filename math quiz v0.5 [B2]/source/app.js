let toCache = ["style.css", "js/jquery.js", "js/script.js", "index.html","feedback.html", "images/clouds.png", "images/night.jpg", "images/logo.png", "icons/32x32.png", "icons/192x192.png", "icons/512x512.png", "icons/favicon.ico", "https://fonts.googleapis.com/css2?family=Ranchers&display=swap"], cacheName = "mqo-game-0242ac130003"; 

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(toCache);
    })
  );
});

self.addEventListener('activate', event => {});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).then((response) => {
        return caches.open('v1').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});