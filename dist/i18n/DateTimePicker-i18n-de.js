/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.26
  Copyright (c)2016 Curious Solutions LLP and Neha Kadam
  http://curioussolutions.github.io/DateTimePicker
  https://github.com/CuriousSolutions/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: German
	file: DateTimePicker-i18n-de

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