const CACHE_NAME = 'org-verify-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/README.md',
  '/favicon.png',
  '/logo.png',
  '/jobberman.png',
  '/images/png-clipart-mastercard-logo-moneylive-mobile-payment-brand-mastercard-text-orange-removebg-preview.png',
  '/images/jobbermanyouth_ng_logo__1_-removebg-preview.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
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
