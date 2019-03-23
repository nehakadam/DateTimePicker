/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.38
  Copyright (c)2014-2019 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

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
