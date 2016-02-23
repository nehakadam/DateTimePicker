/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.26
  Copyright (c)2016 Curious Solutions LLP and Neha Kadam
  http://curioussolutions.github.io/DateTimePicker
  https://github.com/CuriousSolutions/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Dutch
	file: DateTimePicker-i18n-nl
	author: Bernardo(https://github.com/bhulsman)

*/

(function ($) {
    $.DateTimePicker.i18n["nl"] = $.extend($.DateTimePicker.i18n["nl"], {
        
    	language: "nl",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["zo", "ma", "di", "wo", "do", "vr", "za"],
		fullDayNames: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"],
		shortMonthNames: ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"],
		fullMonthNames: ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"],

		titleContentDate: "Kies datum",
		titleContentTime: "Kies tijd",
		titleContentDateTime: "Kies datum & tijd",
	
		setButtonContent: "Kiezen",
		clearButtonContent: "Leegmaken"
        
    });
})(jQuery);
