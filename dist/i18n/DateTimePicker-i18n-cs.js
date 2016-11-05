/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.37
  Copyright (c)2016 Curious Solutions LLP and Neha Kadam
  http://curioussolutions.github.io/DateTimePicker
  https://github.com/CuriousSolutions/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Czech
	file: DateTimePicker-i18n-cs
  	author: aiphee (https://github.com/aiphee)

*/

(function ($) {
    $.DateTimePicker.i18n["cs"] = $.extend($.DateTimePicker.i18n["cs"], {

    	language: "cs",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
		fullDayNames: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"],
		shortMonthNames: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer",  "čvc", "Srp", "Zář", "Říj", "Lis", "Pro"],
		fullMonthNames: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen",  "červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],

		titleContentDate: "Nastavit datum",
		titleContentTime: "Nastavit čas",
		titleContentDateTime: "Nastavit datum a čas",

		setButtonContent: "Nastavit",
		clearButtonContent: "Resetovat"

    });
})(jQuery);