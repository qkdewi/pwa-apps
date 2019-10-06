// Menyimpan aset ke cache
const CACHE_NAME = 'pwaSANDEC-v7';
var urlsToCache = [
	'/',
	'/nav.html',
	'/index.html',
	'/gmb/logo.png',
	'/gmb/new.jpg',
	'/gmb/senior.jpg',
	'/hal/about.html',
	'/hal/contact.html',
	'/hal/gambar.html',
	'/hal/home.html',
	'/images/icons/icon-72x72.png',
	'/images/icons/icon-96x96.png',
	'/images/icons/icon-128x128.png',
	'/images/icons/icon-144x144.png',
	'/images/icons/icon-152x152.png',
	'/images/icons/icon-192x192.png',
	'/images/icons/icon-384x384.png',
	'/images/icons/icon-512x512.png',
	'/css/materialize.min.css',
	'/js/materialize.min.js',
	'/js/nav.js',
];

//install service worker
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			console.log('in install serviceWorker.... cache opened');
			return cache.addAll(urlsToCache);
		})
	);
});

// Menggunakan aset dari cache
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if (response) {
				return response;
			}
			return fetch(event.request);
		})
	);
});

// Menghapus cache lama
self.addEventListener('activate', function(event) {
	var cacheWhitelist = ['pages-cache-v1', 'blog-posts-cache-v1'];
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(
				cacheNames
					.filter(function(cacheName) {
						return cacheName != CACHE_NAME;
					})
					.map(function(cacheName) {
						return caches.delete(cacheName);
					})
			);
		})
	);
});
