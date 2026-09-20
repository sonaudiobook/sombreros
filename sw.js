const CACHE_NAME = 'sombreros-perdidos-v1';
const assetsToCache = [
  'index.html',
  'javascript/config.js',
  'javascript/LoadingJS.js',
  'javascript/resource_skeleton.js',
  'javascript/editor.js',
  'javascript/BookPreview.js',
  'files/search/book_config.js',
  'files/extfile/icon-192.png',
  'files/extfile/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(assetsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});