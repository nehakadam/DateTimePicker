/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.13
  Copyright (c)2015 Curious Solutions LLP and Neha Kadam
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



/*

	language: English
	file: DateTimePicker-i18n-en

*/

(function ($) {
    $.DateTimePicker.i18n["en"] = $.extend($.DateTimePicker.i18n["en"], {
        
    	language: "en",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		fullDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		fullMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],

		titleContentDate: "Set Date",
		titleContentTime: "Set Time",
		titleContentDateTime: "Set Date & Time",
	
		setButtonContent: "Set",
		clearButtonContent: "Clear"
        
    });
})(jQuery);