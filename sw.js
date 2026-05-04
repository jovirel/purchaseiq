const CACHE = 'purchaseiq-v1';
const ASSETS = ['/purchaseiq/'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
});

self.addEventListener('fetch', e => {
  // Network first — always get fresh data from Supabase/Gemini
  if (e.request.url.includes('supabase') || e.request.url.includes('googleapis')) {
    return; // don't intercept API calls
  }
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
