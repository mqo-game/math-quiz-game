const toCache = [
  '/css/print.css',
  '/css/page.css',
  '/index.html',
  '/images/clouds.png',
  'images/night.jpg',
  '/images/logo.png',
  'icons/android-chrome-192x192.png',
  'icons/android-chrome-512x512.png',
  'icons/favicon.ico',
  'icons/favicon-32x32.ico'
 ], cacheName = "math-quiz-v041-d6"

 self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install');
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName);
    console.log('[Service Worker] Caching all: app shell and content');
    await cache.addAll(toCache);
  })());
});

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
 deferredPrompt = e
 // Update UI notify the user they can install the PWA
 showInstallPromotion();
});

self.addEventListener('activate', (evt) => {})

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});