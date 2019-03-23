/* -----------------------------------------------------------------------------

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.38
  Copyright (c)2014-2019 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

  language: Russian
  file: DateTimePicker-i18n-ru
  author: Valery Bogdanov (https://github.com/radkill)

*/

(function ($) {
    $.DateTimePicker.i18n["ru"] = $.extend($.DateTimePicker.i18n["ru"], {

    language: "ru",

    dateTimeFormat: "dd-MM-yyyy HH:mm",
    dateFormat: "dd-MM-yyyy",
    timeFormat: "HH:mm",

    shortDayNames: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    fullDayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    shortMonthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    fullMonthNames: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],

    titleContentDate: "Выберите дату",
    titleContentTime: "Выберите время",
    titleContentDateTime: "Выберите дату и время",

    setButtonContent: "Выбрать",
    clearButtonContent: "Очистить",

    formatHumanDate: function(oDate, sMode, sFormat)
		{
			if(sMode === "date")
				return oDate.dayShort + ", " + oDate.dd + " " + oDate.month+ " " + oDate.yyyy;
			else if(sMode === "time")
				return oDate.HH + ":" + oDate.mm + ":" + oDate.ss;
			else if(sMode === "datetime")
				return oDate.dayShort + ", " + oDate.dd + " " + oDate.month+ " " + oDate.yyyy + ", " + oDate.HH + ":" + oDate.mm + ":" + oDate.ss;
		}

    });
})(jQuery);