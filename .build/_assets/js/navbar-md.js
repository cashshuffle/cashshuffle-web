/*global $ */
$(document).ready(function () {

  var debug = true;
  var verbose = false;
  var activeSubnav = '';
  var subnavToClose = '';

  function getLevelPrefix(id) {
    var levelPrefix = id.substr(3, id.indexOf('-'));
    return levelPrefix;
  }

  function getHandle(id) {
    var levelPrefix = getLevelPrefix(id);
    var buttonPrefix = 'md-' + levelPrefix + '-btn-';
    var listHandle = id.replace(buttonPrefix, '');

    if (debug && verbose) {
      console.log(listHandle);
    }
    return listHandle;
  }

  function getSubnavClass(buttonID) {
    var levelPrefix = getLevelPrefix(buttonID);
    var buttonPrefix = 'md-' + levelPrefix + '-btn-';
    var handle = buttonID.replace(buttonPrefix, '');
    var subnavClass = '.md-' + levelPrefix + '-subnav-' + handle;
    return subnavClass;
  }

  function createSubnavClass(handle, levelPrefix) {
    var subnavClass = '.md-' + levelPrefix + '-subnav-' + handle;
    return subnavClass;
  }

  function closeSubnav() {
    subnavClass = createSubnavClass(subnavToClose, 'sn');

    setTimeout(function() {
      if (activeSubnav == subnavToClose) {
        $(subnavClass).removeClass('navbar-md-subnav-show');
        activeSubnav = '';
        subnavToClose = '';
      }
    }, 500);
  }

  function closeAllNonActiveSubnavs() {
    var activeSubnavClass = 'md-sn-subnav-' + activeSubnav;
    $('[class*=navbar-md-subnav-show]').each(function() {
      if (!($(this).hasClass(activeSubnavClass))) {
        $(this).removeClass('navbar-md-subnav-show');
      }
    });
  }

  function handleMouseLeavingButton(e) {
    if (debug && verbose) {
      console.log('About to hide dropdown');
    }
    var button = e.delegateTarget;
    var buttonID = $(button).attr('id');
    var subnavClass = getSubnavClass(buttonID);
    subnavToClose = activeSubnav;
    closeSubnav();
  }

  function handleMouseOverButton(e) {
    if (debug && verbose) {
      console.log('About to show dropdown');
    }
    var button = e.delegateTarget;
    var buttonID = $(button).attr('id');
    var subnavClass = getSubnavClass(buttonID);
    activeSubnav = getHandle(buttonID);
    subnavToClose = '';
    closeAllNonActiveSubnavs();
    $(subnavClass).addClass('navbar-md-subnav-show');
  }

  function handleMouseOverSubnav(e) {
    if (debug && verbose) {
      console.log('Mouse is now over the subnav');
    }
    subnavToClose = '';
  }

  function handleMouseLeavingSubnav(e) {
    if (debug && verbose) {
      console.log('Mouse has left the subnav');
    }
    subnavToClose = activeSubnav;
    closeSubnav();
  }

  function disableClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  // Attach all subnav buttons to the handler function
  $('[id^=md-sn-btn-]').click(disableClick);
  $('[id^=md-sn-btn-]').mouseenter(handleMouseOverButton);
  $('[id^=md-sn-btn-]').mouseleave(handleMouseLeavingButton);
  $('[class*=md-sn-subnav-]').mouseenter(handleMouseOverSubnav);
  $('[class*=md-sn-subnav-]').mouseleave(handleMouseLeavingSubnav);
  //$('[id^=md-ssn-btn-]').click(toggleDesktopNavSubmenu);
  
});
