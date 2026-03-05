/**
 * Lite YouTube Embed
 *
 * Usage: add a container with the markup below anywhere on the page.
 * This script will auto-initialise every instance it finds.
 *
 *   <div class="lite-yt" data-yt-id="VIDEO_ID">
 *     <div class="lite-yt-thumb" role="button" aria-label="Play video" tabindex="0">
 *       <img src="https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg" alt="..." />
 *       <span class="lite-yt-play">
 *         <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
 *           <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#FF0000"/>
 *           <path d="M45 24 27 14v20" fill="#fff"/>
 *         </svg>
 *       </span>
 *     </div>
 *   </div>
 */
(function () {
  function activateEmbed(wrapper) {
    var videoId = wrapper.getAttribute('data-yt-id');
    if (!videoId) return;

    var iframe = document.createElement('iframe');
    iframe.src =
      'https://www.youtube-nocookie.com/embed/' +
      videoId +
      '?rel=0&autoplay=1&enablejsapi=1';
    iframe.title = 'SuperDuper demo video';
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
  }

  function init() {
    var embeds = document.querySelectorAll('.lite-yt[data-yt-id]');
    embeds.forEach(function (wrapper) {
      var thumb = wrapper.querySelector('.lite-yt-thumb');
      if (!thumb) return;

      thumb.addEventListener('click', function () {
        activateEmbed(wrapper);
      });
      thumb.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activateEmbed(wrapper);
        }
      });
    });
  }

  // Support both DOMContentLoaded and late-loading (already-loaded DOM)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for dynamic content (e.g. quiz results rendered after page load)
  window.liteYtInit = init;
})();
