self.addEventListener('install', function(event) {
  console.log('install成功')
  event.waitUntil(
    caches.open('v3').then(function(cache) {
      return cache.addAll([
        '/index.html',
        '/style.css',
        '/app.js',
        '/gallery/bountyHunters.jpg',
        '/gallery/myLittleVader.jpg',
        '/gallery/snowTroopers.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('fetch成功'+event.request.url,event)

  if (event) {
    event.respondWith(new Response('离线后我会显示，当前网址为: '+event.request.url))
  }

  // event.respondWith(
  //       caches.match(event.request).then(function(response) {
  //       return response || fetch(event.request);
  //     })
  // );

  // event.respondWith(caches.match(event.request).then(function(response) {
  //   console.log('respondWith里的response',response)
  //   // return  response('<p>Hello from your friendly neighbourhood service worker!</p>', {
  //   //   headers: { 'Content-Type': 'text/html' }
  //   // })
  //   // caches.match() always resolves
  //   // but in case of success response will have value
  //
  //   // return response
  //
  //   if (response !== undefined) {
  //     return response;
  //   } else {
  //     return fetch(event.request).then(function (response) {
  //       // response may be used only once
  //       // we need to save clone to put one copy in cache
  //       // and serve second one
  //       let responseClone = response.clone();
  //
  //       caches.open('v2').then(function (cache) {
  //         cache.put(event.request, responseClone);
  //       });
  //       return response;
  //     }).catch(function () {
  //       return caches.match('/gallery/404.jpg');
  //     });
  //   }
  // }));
});

self.addEventListener('activate', function(event) {
  console.log('activate激活成功--event',event)

  // var cacheWhitelist = ['v2'];
  //
  // event.waitUntil(
  //     caches.keys().then(function(keyList) {
  //       return Promise.all(keyList.map(function(key) {
  //         if (cacheWhitelist.indexOf(key) === -1) {
  //           return caches.delete(key);
  //         }
  //       }));
  //     })
  // );
});
// 推荐资料 https://lavas-project.github.io/pwa-book/chapter04/2-service-worker-register.html
self.version = new Date().getTime()
