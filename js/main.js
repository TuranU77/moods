(() => {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const closeBtn = document.getElementById('modalClose');
  const items = document.querySelectorAll('.grid-item');
  const modalContent = modal.querySelector('.modal-content');

  let hideTimer = null;

  function showControls() {
    modal.classList.add('controls-visible');
    modalContent.classList.add('controls-visible');
    modalContent.classList.remove('controls-hidden');
    resetHideTimer();
  }

  function hideControls() {
    modal.classList.remove('controls-visible');
    modalContent.classList.remove('controls-visible');
    modalContent.classList.add('controls-hidden');
  }

  function resetHideTimer() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(hideControls, 2000);
  }

  function clearHideTimer() {
    clearTimeout(hideTimer);
  }

  function openModal(src, item) {
    const isPortrait = item.classList.contains('portrait');
    const isSquare = item.classList.contains('square');
    modalContent.classList.remove('modal-portrait', 'modal-square');
    if (isPortrait) modalContent.classList.add('modal-portrait');
    if (isSquare) modalContent.classList.add('modal-square');
    video.querySelector('source').src = src;
    video.load();
    video.play();
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    hideControls();
  }

  function closeModal() {
    video.pause();
    video.currentTime = 0;
    video.querySelector('source').src = '';
    modal.classList.remove('active', 'controls-visible');
    modalContent.classList.remove('controls-visible', 'controls-hidden');
    document.body.classList.remove('modal-open');
    clearHideTimer();
  }

  // Show controls on mouse move over modal
  modal.addEventListener('mousemove', showControls);

  // Keep controls visible while hovering over the video controls area (bottom 15%)
  video.addEventListener('mouseenter', showControls);

  // Open on thumbnail click
  items.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.dataset.video;
      if (src) openModal(src, item);
    });
  });

  // Close button
  closeBtn.addEventListener('click', closeModal);

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
})();
