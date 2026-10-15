(function () {
  var video = document.querySelector('.hero-video');
  if (!video) return;
  var key = 'bciVideoTime';

  function resume() {
    try {
      var saved = JSON.parse(sessionStorage.getItem(key));
      if (!saved) return;
      var time = saved.time + (Date.now() - saved.at) / 1000;
      video.currentTime = video.duration ? time % video.duration : saved.time;
    } catch (e) {}
  }

  function save() {
    try {
      sessionStorage.setItem(key, JSON.stringify({ time: video.currentTime, at: Date.now() }));
    } catch (e) {}
  }

  if (video.readyState >= 1) resume();
  else video.addEventListener('loadedmetadata', resume, { once: true });

  window.addEventListener('pagehide', save);
  document.addEventListener('visibilitychange', save);
})();
