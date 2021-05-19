self.addEventListener('install', evt  => {
  console.log('installed!',evt)
});

self.addEventListener('activate', evt => {
  console.log('activated!',evt)
});

setse.addEventListener('fetch',evt => {
  console.log('fetched!',evt)
})