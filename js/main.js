(() => {
  const modal = document.getElementById('videoModal');
  const video = document.getElementById('modalVideo');
  const closeBtn = document.getElementById('modalClose');
  const items = document.querySelectorAll('.grid-item');

  function openModal(src, item) {
    const isPortrait = item.classList.contains('portrait');
    const isSquare = item.classList.contains('square');
    const content = modal.querySelector('.modal-content');
    content.classList.remove('modal-portrait', 'modal-square');
    if (isPortrait) content.classList.add('modal-portrait');
    if (isSquare) content.classList.add('modal-square');
    video.querySelector('source').src = src;
    video.load();
    video.play();
    modal.classList.add('active');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    video.pause();
    video.currentTime = 0;
    video.querySelector('source').src = '';
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }

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
