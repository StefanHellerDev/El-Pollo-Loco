/**
 * Stores the modal element.
 *
 * @type {HTMLElement}
 */
const modal = document.getElementById('modal');

/**
 * Stores the button that opens the modal.
 *
 * @type {HTMLElement}
 */
const openBtn = document.getElementById('information');

/**
 * Stores the button that closes the modal.
 *
 * @type {HTMLElement}
 */
const closeBtn = document.getElementById('closeBtn');

/**
 * Opens the modal by adding the show class.
 *
 * @returns {void}
 */
function openModal() {
  modal.classList.add('show');
}

/**
 * Closes the modal by removing the show class.
 *
 * @returns {void}
 */
function closeModal() {
  modal.classList.remove('show');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

/* Close when clicking outside the modal box */
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

/* Close when pressing Escape */
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
