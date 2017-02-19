/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.38
  Copyright (c)2017 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Italiano
	file: DateTimePicker-i18n-it
	author: Cristian Segattini

*/


(function ($) {
    $.DateTimePicker.i18n["it"] = $.extend($.DateTimePicker.i18n["it"], {
        
    	language: "it",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
		fullDayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
		shortMonthNames: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
		fullMonthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],

		titleContentDate: "Imposta Data",
		titleContentTime: "Imposta Ora",
		titleContentDateTime: "Imposta Data & Ora",
	
		setButtonContent: "Imposta",
		clearButtonContent: "Pulisci"
        
    });
})(jQuery);
