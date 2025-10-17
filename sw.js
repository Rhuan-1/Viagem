// Service Worker - PWA Support
const CACHE_NAME = 'texas-viagens-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/styles-premium.css',
  '/assets/js/script-premium.js',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[SW] Recursos em cache');
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker ativado');
        return self.clients.claim();
      })
  );
});

// Fetch event - Cache-first strategy
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        
        // Clone the request
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            
            return response;
          })
          .catch((error) => {
            console.log('[SW] Fetch failed:', error);
            
            // Return offline page if available
            return caches.match('/offline.html');
          });
      })
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-forms') {
    console.log('[SW] Sincronizando formulários...');
    event.waitUntil(syncForms());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  console.log('[SW] Push recebido');
  
  const options = {
    body: event.data ? event.data.text() : 'Nova notificação',
    icon: '/assets/images/icon-192.png',
    badge: '/assets/images/badge-72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalhes',
        icon: '/assets/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Fechar',
        icon: '/assets/images/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Texas Viagens', options)
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notificação clicada:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function to sync forms
async function syncForms() {
  try {
    const formData = await getFormDataFromIndexedDB();
    
    if (formData && formData.length > 0) {
      for (const data of formData) {
        await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      
      await clearFormDataFromIndexedDB();
      console.log('[SW] Formulários sincronizados');
    }
  } catch (error) {
    console.error('[SW] Erro ao sincronizar:', error);
    throw error;
  }
}

// IndexedDB helpers (simplified)
async function getFormDataFromIndexedDB() {
  // Implementation would go here
  return [];
}

async function clearFormDataFromIndexedDB() {
  // Implementation would go here
  return true;
}
