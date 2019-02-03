console.log("Hello Service Worker!");

const version = 1;
const appCacheName = `cache-v${version}`;

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(appCacheName).then(function(cache) {
            console.log('Service Worker installed');
            return cache.addAll([
                'my_vehicles.html',
                'vehicle_inf.html',
                'ratings.html',
                'ratings_driver.html',
                'ratings_passenger.html',
                'my_journeys.ejs',
                'my_journeys_driver.ejs',
                'map.ejs',
                'menu.ejs',
                'main_map.html',
                'images/user.png',
                'my_journeys_matching.ejs',
                'my_journeys_passenger.ejs',
                'personal_inf.ejs',
                'manifest.json',
                'https://unpkg.com/onsenui/css/onsenui.min.css',
                'https://unpkg.com/onsenui/css/onsen-css-components.min.css',
                'https://unpkg.com/onsenui/js/onsenui.min.js',
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (appCacheName.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        event.respondWith(
            caches.match(event.request).then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request).then(function(response) {
                    return response;
                }).catch(function(error) {
                    throw error;
                });
            }).catch(function() {
                return new Response('No cached items');
            })
        );
    }

});