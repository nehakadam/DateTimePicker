/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.22
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



/*

	language: Spanish
	file: DateTimePicker-i18n-es
	author: kristophone(https://github.com/kristophone)

*/


(function ($) {
    $.DateTimePicker.i18n["es"] = $.extend($.DateTimePicker.i18n["es"], {
        
    	language: "es",

    	dateTimeFormat: "dd-MMM-yyyy HH:mm:ss",
		dateFormat: "dd-MMM-yyyy",
		timeFormat: "HH:mm:ss",

		shortDayNames: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
		fullDayNames: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
	    shortMonthNames: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
	    fullMonthNames: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],

	    titleContentDate: "Ingresar fecha",
		titleContentTime: "Ingresar hora",
		titleContentDateTime: "Ingresar fecha y hora",
	
		setButtonContent: "Guardar",
	    clearButtonContent: "Cancelar",

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

	language: French
	file: DateTimePicker-i18n-fr
	author: LivioGama(https://github.com/LivioGama)

*/

(function ($) {
    $.DateTimePicker.i18n["fr"] = $.extend($.DateTimePicker.i18n["fr"], {
        
    	language: "fr",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
		fullDayNames: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
		shortMonthNames: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
		fullMonthNames: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],

		titleContentDate: "Choisir une date",
		titleContentTime: "Choisir un horaire",
		titleContentDateTime: "Choisir une date et un horaire",
	
		setButtonContent: "Choisir",
		clearButtonContent: "Effacer",
		formatHumanDate: function(oDate, sMode, sFormat)
		{
			if(sMode === "date")
				return oDate.dayShort + " " + oDate.dd + " " + oDate.month+ " " + oDate.yyyy;
			else if(sMode === "time")
				return oDate.HH + ":" + oDate.mm + ":" + oDate.ss;
			else if(sMode === "datetime")
				return oDate.dayShort + " " + oDate.dd + " " + oDate.month+ " " + oDate.yyyy + ", " + oDate.HH + ":" + oDate.mm + ":" + oDate.ss;
		}
        
    });
})(jQuery);



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
