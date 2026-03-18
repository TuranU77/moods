(() => {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const closeBtn = document.getElementById('modalClose');
  const items = document.querySelectorAll('.grid-item');
  const modalContent = modal.querySelector('.modal-content');

  // Custom controls
  const playPauseBtn = document.getElementById('ctrlPlayPause');
  const muteBtn = document.getElementById('ctrlMute');
  const progressBar = document.getElementById('ctrlProgress');
  const progressFill = document.getElementById('ctrlProgressFill');

  let hideTimer = null;

  // --- Controls visibility ---
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

  // --- Play / Pause ---
  function updatePlayPause() {
    playPauseBtn.classList.toggle('paused', video.paused);
  }

  playPauseBtn.addEventListener('click', () => {
    if (video.paused) { video.play(); } else { video.pause(); }
  });

  video.addEventListener('play', updatePlayPause);
  video.addEventListener('pause', updatePlayPause);

  // Click on video to toggle play/pause
  video.addEventListener('click', () => {
    if (video.paused) { video.play(); } else { video.pause(); }
  });

  // --- Mute ---
  function updateMute() {
    muteBtn.classList.toggle('is-muted', video.muted);
  }

  muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateMute();
  });

  // --- Progress ---
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      progressFill.style.width = (video.currentTime / video.duration * 100) + '%';
    }
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * video.duration;
  });

  // --- Modal open/close ---
  function openModal(src, item) {
    const isPortrait = item.classList.contains('portrait');
    const isSquare = item.classList.contains('square');
    modalContent.classList.remove('modal-portrait', 'modal-square');
    if (isPortrait) modalContent.classList.add('modal-portrait');
    if (isSquare) modalContent.classList.add('modal-square');
    video.querySelector('source').src = src;
    video.load();
    video.muted = true;
    video.play();
    modal.classList.add('active');
    document.body.classList.add('modal-open');
    hideControls();
    updatePlayPause();
    updateMute();
    progressFill.style.width = '0%';
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

  // Show controls on mouse move
  modal.addEventListener('mousemove', showControls);

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
