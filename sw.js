// const cacheFiles = [
//   "/",
//   "/index.html",
//   "/restaurant.html",
//   "/css/styles.css",
//   "/js/main.js ",
//   "js/dbhelper.js",
//   "/js/restaurant_info.js",
//   "/img/1.jpg",
//   "/img/2.jpg",
//   "/img/3.jpg",
//   "/img/4.jpg",
//   "/img/5.jpg",
//   "/img/6.jpg",
//   "/img/7.jpg",
//   "/img/8.jpg",
//   "/img/9.jpg",
//   "/img/10.jpg"
// ];
const cacheFiles = []
const staticCache = "res-reviews-v1";

self.addEventListener("install", e => {
  
});

// SOURCE: https://www.youtube.com/watch?v=ksXwaWHCW6k
// Activate Event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          console.log("Removing old cache!!!");
          return cacheName != staticCache;
        })
      );
    })
  );
});

// TODO: make a 404 if statement
// self.addEventListener("fetch", event => {
//   console.log(event.request.url);
//   event.respondWith(
//     caches.match(event.request).then(response => {
//       return response || fetch(event.request);
//     })
//   );
// });


/**
 * I found this way of caching all of the website very interesting so I decided
 * to use it for my self SOURCE:  https://www.youtube.com/watch?v=ksXwaWHCW6k
 */

 self.addEventListener('fetch', e =>{
   console.log('Service Worker: Fetching');
   e.respondWith(
     fetch(e.request).then(res =>{
       const resClone = res.clone();
       caches.open(staticCache).then(cache => {
         cache.put(e.request,resClone);
       });
       return res;
     }).catch(err => caches.match(e.request).then(res => res))
   );
 })