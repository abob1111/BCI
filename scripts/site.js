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

(function () {
  var header = document.querySelector('.masthead');
  var panel = document.querySelector('.abstract-window');
  if (!header || !panel) return;

  function update() {
    var top = panel.getBoundingClientRect().top;
    header.classList.toggle('solid', top < header.offsetHeight);
  }

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

(function () {
  var panel = document.querySelector('.abstract-window');
  if (!panel) return;
  var below = panel.previousElementSibling;
  if (!below) return;
  below.classList.add('pin-under');

  function update() {
    below.style.top = window.innerHeight - below.offsetHeight + 'px';
  }

  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
})();
