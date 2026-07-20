// 1. Change version to v2 to force browsers to download the new code
const CACHE_NAME = 'org-verify-cache-v2'; 

const ASSETS = [
  '/',
  '/index.html',
  '/README.md',
  '/favicon.ico', 
  '/favicon.png',
  '/logo.png',       // Ensure this file exists in your root folder
  '/jobberman.png',  // Ensure this file exists in your root folder
  // Keep these if they still exist in your images folder
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
