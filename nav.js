/* ============================================
   nav.js — reliable hamburger menu
   Load with defer in <head> on every page.
   ============================================ */
(function () {
  'use strict';

  var isOpen = false;

  function getEls() {
    return {
      btn:     document.querySelector('.mobile-menu-toggle'),
      menu:    document.getElementById('navMenu'),
      overlay: document.getElementById('mobileOverlay'),
    };
  }

  function open() {
    var e = getEls();
    if (!e.menu || isOpen) return;
    isOpen = true;
    e.menu.classList.add('open');
    if (e.btn)     e.btn.classList.add('active');
    if (e.overlay) e.overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }

  function close() {
    var e = getEls();
    if (!e.menu || !isOpen) return;
    isOpen = false;
    e.menu.classList.remove('open');
    if (e.btn)     e.btn.classList.remove('active');
    if (e.overlay) e.overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  function toggle() {
    isOpen ? close() : open();
  }

  window.toggleMobileMenu = toggle;
  window.openMobileMenu   = open;
  window.closeMobileMenu  = close;

  function init() {
    var e = getEls();
    if (!e.btn || e.btn._navInit) return;
    e.btn._navInit = true;

    e.btn.removeAttribute('onclick');

    e.btn.addEventListener('click', function (ev) {
      ev.preventDefault();
      ev.stopPropagation();
      toggle();
    });

    if (e.overlay) {
      e.overlay.removeAttribute('onclick');
      e.overlay.addEventListener('click', close);
    }

    document.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) close();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
