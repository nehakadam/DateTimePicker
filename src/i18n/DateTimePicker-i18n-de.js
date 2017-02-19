/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.38
  Copyright (c)2017 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: German
	file: DateTimePicker-i18n-de
	author: Lu, Feng (https://github.com/solala888)

*/

(function ($) {
    $.DateTimePicker.i18n["de"] = $.extend($.DateTimePicker.i18n["de"], {
        
    	language: "de",

    	dateTimeFormat: "dd-MMM-yyyy HH:mm:ss",
		dateFormat: "dd-MMM-yyyy",
		timeFormat: "HH:mm:ss",

		shortDayNames: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
		fullDayNames: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
		shortMonthNames: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
		fullMonthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],

		titleContentDate: "Datum auswählen",
		titleContentTime: "Zeit auswählen",
		titleContentDateTime: "Datum & Zeit auswählen",
	
		setButtonContent: "Auswählen",
		clearButtonContent: "Zurücksetzen",

		formatHumanDate: function(oDate, sMode, sFormat)
		{
			if(sMode === "date")
				return oDate.dayShort + ", " + oDate.dd + " " + oDate.month+ ", " + oDate.yyyy;
			else if(sMode === "time")
				return oDate.HH + ":" + oDate.mm + ":" + oDate.ss;
			else if(sMode === "datetime")
				return oDate.dayShort + ", " + oDate.dd + " " + oDate.month+ ", " + oDate.yyyy + " " + oDate.HH + ":" + oDate.mm + ":" + oDate.ss;
		}
        
    });
})(jQuery);