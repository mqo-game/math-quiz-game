console.log('app.js')
//service worker
if('serviceworker' in navigator){
  navigator.serviceworker.register('/mqo-sw.js').then((reg) => console.log('working',reg)).catch((err) => console.log('error',err))
}