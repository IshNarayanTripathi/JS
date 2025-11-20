    // Make the clicked button the active one. Only one button has .is-toggled at a time.
function addClass(clickedButton) {
  // Remove the class from all buttons with the js-button class
  document.querySelectorAll('.js-button').forEach((btn) => {
    btn.classList.remove('is-toggled');
  });

  // Add it to the clicked button
  clickedButton.classList.add('is-toggled');
}
