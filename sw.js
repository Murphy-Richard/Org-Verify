// 1. INCREMENTED VERSION to v3 (Forces phones to download the new HTML/JS)
const CACHE_NAME = 'org-verify-cache-v3';

const ASSETS = [
  '/',
  '/index.html',
  '/README.md',
  '/favicon.ico',       // Updated to match HTML
  '/favicon.png',       // Kept as fallback
  '/jobberman.png',     // Ensure this is in your root folder
  '/logo.png',          // Ensure this is in your root folder
  
  // If you still have the long-named files in an images folder, keep these. 
  // Otherwise, you can delete these two lines and just use the root files above.
  '/images/png-clipart-mastercard-logo-moneylive-mobile-payment-brand-mastercard-text-orange-removebg-preview.png',
  '/images/jobbermanyouth_ng_logo__1_-removebg-preview.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(err => {
        console.warn('Service Worker: Some assets failed to cache', err);
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
