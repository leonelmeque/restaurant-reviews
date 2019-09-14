self.addEventListener('install', (e)=>{
    e.waitUntil(
      caches.open('airhorner').then((cache)=>{
        return cache.addAll(['/','/index.html','/css/styles.css','/js/main.js']);
      })
    )
  });

  self.addEventListener('fetch', function(event) { console.log(event.request.url); 
    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
  
}); 

  