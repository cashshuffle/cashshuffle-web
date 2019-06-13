/*global $ */
$(document).ready(function() {

  function showModal(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#i18n').addClass('open');
    $('.body-wrap').addClass('noscroll');
  }

  function hideModal(e) {
    e.preventDefault();
    e.stopPropagation();
    $('#i18n').removeClass('open');
    $('.body-wrap').removeClass('noscroll');
  }

  $('.modal-open').click(showModal);
  $('.modal-close').click(hideModal);
});
