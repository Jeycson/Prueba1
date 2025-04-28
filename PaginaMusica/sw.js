const CACHE_NAME = 'v0_pwa_ejemplo',
urlsToCache = [
    './',
    'https://fonts.googleapis.com/css?family=Raleway:400,700',
    'https://fonts.gstatic.com/s/raleway/v12/1Ptrg8zYS_SKggPNwJYtWqZPAA.woff2',
    'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
    'https://use.fontawesome.com/releases/v5.0.6/webfonts/fa-brands-400.woff2',
    './style.css',
    './img/Logo.png',
    './img/favicon.png'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
            })
            .catch(err => console.error('❌ Error en la fase de instalación', err))
    );
});

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName)
                        }
                    })
                )
            })
            .then(()=>self.clients.claim())
    )
})


self.addEventListener('fetch', e =>{
    e.respondWith(
        caches.match(e.request)
            .then(response => {
                if (response) {
                    return response
                }
                return fetch(e.request)
            })
    )
})