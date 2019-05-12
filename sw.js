// Asignar nombre y version de la cache
const CACHE_NAME = 'V1_cache_ivan_mendoza_pwa';

// Ficheros a cachear en la aplicación
var urlsToCache = [
    './',
    './css/style.css',
    './img/favicon.png',
    './img/1.png',
    './img/2.png',
    './img/3.png',
    './img/4.png',
    './img/5.png',
    './img/6.png',
    './img/facebook.png',
    './img/instagram.png',
    './img/twitter.png',
    './img/favicon-1024.png',
    './img/favicon-512.png',
    './img/favicon-384.png',
    './img/favicon-256.png',
    './img/favicon-192.png',
    './img/favicon-128.png',
    './img/favicon-96.png',
    './img/favicon-64.png',
    './img/favicon-32.png',
    './img/favicon-16.png'
];


// Evento install
// Instalación del service worker y guardar en cache los recursos estaticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
              .then(cache => {
                return cache.addAll(urlsToCache)
                            .then(()=>{
                                self.skipWaiting();
                            });
              })
              .catch(err => console.log('No se ha registrado el cache', err))
    );
});

// Evento activate
// Que la app funcione sin conexion
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys()
              .then(cachesNames => {
                  return Promise.all(
                        cachesNames.map(cacheName => {
                            
                            if(cacheWhitelist.indexOf(cacheName) === -1){
                                // Borrar elementos que no se necesitan
                                return caches.delete(cacheName);
                            }

                        })
                  );
              })
              .then(() => {
                  // Activar cache
                  self.clients.claim();
              })
    );
});


// Evento fetch
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
              .then(res => {
                  if(res){
                    // devuelvo datos desde cache
                    return res;
                  }

                  return fetch(e.request);
              })  
    );
})
