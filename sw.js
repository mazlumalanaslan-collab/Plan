const C='plan-v3';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','icon-192.png'])));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request.url,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
self.addEventListener('notificationclick',e=>{const n=e.notification,u=(n.data&&n.data.url)||'./';
 e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(cs=>{const c=cs[0];return c?c.focus().then(()=>c.navigate(u).catch(()=>{})):clients.openWindow(u)})
 .then(()=>self.registration.showNotification(n.title,{body:n.body,tag:n.tag,requireInteraction:true,silent:true,icon:n.icon,badge:n.badge,data:n.data})))});
