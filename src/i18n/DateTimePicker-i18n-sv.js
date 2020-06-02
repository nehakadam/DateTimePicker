/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.39
  Copyright (c)2014-2019 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Swedish
	file: DateTimePicker-i18n-sv

*/

(function ($) {
    $.DateTimePicker.i18n["sv"] = $.extend($.DateTimePicker.i18n["sv"], {
        
    	language: "sv",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["sö", "må", "ti", "on", "to", "fr", "lö"],
		fullDayNames: ["söndag", "måndag", "tisdag", "onsdag", "torsdag", "fredag", "lördag"],
		shortMonthNames: ["jan", "feb", "mar", "apr", "maj", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
		fullMonthNames: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],

		titleContentDate: "Välj datum",
		titleContentTime: "Välj tid",
		titleContentDateTime: "Välj datum & tid",
	
		setButtonContent: "Välj",
		clearButtonContent: "Rensa"
        
    });
})(jQuery);
