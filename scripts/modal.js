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

/**
 * Closes the modal when the user clicks outside the modal content.
 *
 * @param {MouseEvent} event - The click event triggered on the modal.
 * @returns {void}
 */
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

/**
 * Closes the modal when the Escape key is pressed.
 *
 * @param {KeyboardEvent} event - The keyboard event triggered on the document.
 * @returns {void}
 */
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeModal();
  }
});
