/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.39
  Copyright (c)2014-2019 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

  Author : Yanike Mann (https://github.com/yanike)

----------------------------------------------------------------------------- */



/* Detect iOS device */
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

/* Execute if iOS device is found  */
if (iOS) {
	function dtpickerContMoveiOS() {
		/* Execute if iOS device is found  */
		if (iOS) {
			/* Get SCROLL location */
			var tscroll = window.scrollY /*Modern Way (Chrome, Firefox)*/ || window.pageYOffset /*Modern IE, including IE11*/ || document.documentElement.scrollTop /*Old IE, 6,7,8*/ ;
			/* Calculate position */
			var topscroll = (((document.documentElement.clientHeight / 2) + tscroll) + "px");
			/* Make POSITION ABSOLUTE so iOS devices can interact with DateTimePicker */
			jQuery('.dtpicker-mobile').css('position', 'absolute');
			jQuery('.dtpicker-cont').css('position', 'absolute');
			/* Scroll DateTimePicker into position */
			jQuery('.dtpicker-cont').css('top', topscroll);
		}
	}

	/* WINDOW EVENTLISTENER to LOAD and SCROLL */
	if (window.addEventListener) {
		window.addEventListener('load', dtpickerContMoveiOS, false);
		window.addEventListener('scroll', dtpickerContMoveiOS, false);
	} else if (window.attachEvent) {
		window.attachEvent('on' + 'load', dtpickerContMoveiOS);
		window.attachEvent('on' + 'scroll', dtpickerContMoveiOS);
	} else {
		window['on' + 'load'] = dtpickerContMoveiOS;
		window['on' + 'scroll'] = dtpickerContMoveiOS;
	}

	/* Makes readonly INPUTS on iOS correctly work */
	$(function() {
		$('input[readonly]').on('focus', function(ev) {
			$(this).trigger('blur');
		});
	});
}
