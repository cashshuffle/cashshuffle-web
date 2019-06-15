/*global $ */
$(document).ready(function() {

  function showModal(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.i18nModal').addClass('open');
    $('.page-wrap').addClass('noscroll');
  }

  function hideModal(e) {
    e.preventDefault();
    e.stopPropagation();
    $('.i18nModal').removeClass('open');
    $('.page-wrap').removeClass('noscroll');
  }

  $('.modal-open').click(showModal);
  $('.modal-close').click(hideModal);
});
