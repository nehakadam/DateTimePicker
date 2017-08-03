/* -----------------------------------------------------------------------------

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.38
  Copyright (c)2017 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Brazilian Portuguese
	file: DateTimePicker-i18n-pt-br

*/

(function ($) {
    $.DateTimePicker.i18n["pt-br"] = $.extend($.DateTimePicker.i18n["pt-br"], {

    	language: "pt-br",

    	dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["Dom", "Seg", "Terç", "Qua", "Qui", "Sex", "Sáb"],
		fullDayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
		shortMonthNames: ["jan", "fev", "mar", "abr", "maio", "jun", "jul", "ago", "set", "out", "nov", "dez"],
		fullMonthNames: ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",],

		titleContentDate: "Definir Data",
		titleContentTime: "Definir Hora",
		titleContentDateTime: "Definir Data e Hora",
	
		setButtonContent: "Definir",
		clearButtonContent: "Limpar"

    });
})(jQuery);
