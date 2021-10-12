const toCache = [
  'css/main.css',
  'css/page.css',
  'index.html',
  'images/clouds.png',
  'images/night.jpg',
  'images/logo.png',
  'icons/32x32.png',
  'icons/192x192.png',
  'icons/512x512.png',
  'icons/favicon.ico',
  'https://fonts.googleapis.com/css2?family=Ranchers&display=swap'
 ], cacheName = "math-quiz-v050-b1";

 self.addEventListener('install', (e) => {
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(toCache);
  })());
});

self.addEventListener('beforeinstallprompt', (e) => {});

self.addEventListener('activate', () => {});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});