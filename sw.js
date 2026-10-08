// The app lived at culstats.ie until 2026-10-07 and installed a service worker here. It moved to
// app.culstats.ie; this worker takes the old one's place, clears its cache, removes itself and reloads
// the page it controlled, so culstats.ie shows the website.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil((async () => {
  try { const keys = await caches.keys(); await Promise.all(keys.map(k => caches.delete(k))); } catch(err){}
  try { await self.registration.unregister(); } catch(err){}
  try { (await self.clients.matchAll({ type: "window" })).forEach(c => c.navigate(c.url)); } catch(err){}
})()));
