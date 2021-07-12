var ver = "041"
self.addEventListener('install', function(event) {
 event.waitUntil(
  caches.open(ver).then(function(cache) {
   return cache.addAll(
    [
     '/css/print.css',
     '/css/page.css',
     '/images/clouds.png',
     '/images/logo.png',
     'icons/android-chrome-192x192.png',
     'icons/android-chrome-512x512.png',
     'icons/favicon.ico',
     'icons/favicon-32x32.ico'
    ]
   );
  })
 );
});

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

self.addEventListener('beforeinstallprompt', (e) => {
 deferredPrompt = e
 // Update UI notify the user they can install the PWA
 showInstallPromotion();
});

self.addEventListener('activate', (evt) => {})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      return response || fetchAndCache(event.request);
    })
  );
});

function fetchAndCache(url) {
  return fetch(url)
  .then(function(response) {
    // Check if we received a valid response
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return caches.open(ver)
    .then(function(cache) {
      cache.put(url, response.clone());
      return response;
    });
  })  
  .catch(function(error) {
    console.log('Request failed:', error);
    // You could return a custom offline 404 page here
  });
}