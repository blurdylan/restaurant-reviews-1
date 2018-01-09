// Chrome's currently missing some useful cache methods,
// This polyfill adds them.

importScripts("serviceworker-cache-polyfill.js");

// Here comes the install event!
// This only happens once, when the browser sees this
// Version of the ServiceWorker for the first time.
self.addEventListener("install", event => {
  // We pass a promise to event.waitUntil to signal how
  // Long install takes, and if it failed
  event.waitUntil(
    // We open a cache…
    caches.open("sw-restaurant").then(cache =>
      // And add resources to it
      cache.addAll([
        "/",
        "/index.html",
        "/restaurant.html",
        "/css/styles.css",
        "/css/responsive.css",
        "/data/restaurants.json",
        "/img/1.jpg",
        "/img/2.jpg",
        "/img/3.jpg",
        "/img/4.jpg",
        "/img/5.jpg",
        "/img/6.jpg",
        "/img/7.jpg",
        "/img/8.jpg",
        "/img/9.jpg",
        "/img/10.jpg",
        "/js/dbhelper.js",
        "/js/main.js",
        "/js/restaurant_info.js"
      ])
    )
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// Page
self.addEventListener("fetch", event => {
  // Calling event.respondWith means we're in charge
  // Of providing the response. We pass in a promise
  // That resolves with a response object
  event.respondWith(
    // First we look for something in the caches that
    // Matches the request
    caches.match(event.request).then(
      response =>
        // If we get something, we return it, otherwise
        // It's null, and we'll pass the request to
        // Fetch, which will use the network.
        response || fetch(event.request)
    )
  );
});
