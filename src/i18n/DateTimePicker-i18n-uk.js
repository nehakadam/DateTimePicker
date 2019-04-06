/* -----------------------------------------------------------------------------

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.39
  Copyright (c)2014-2019 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

  language: Ukrainian
  file: DateTimePicker-i18n-uk
  author: Valery Bogdanov (https://github.com/radkill)

*/

(function ($) {
    $.DateTimePicker.i18n["uk"] = $.extend($.DateTimePicker.i18n["uk"], {

    language: "uk",

    dateTimeFormat: "dd-MM-yyyy HH:mm",
    dateFormat: "dd-MM-yyyy",
    timeFormat: "HH:mm",

    shortDayNames: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    fullDayNames: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    shortMonthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    fullMonthNames: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
    fullDayNames: ["неділя", "понеділок", "вівторок", "середа", "четвер", "п'ятниця", "субота"],
    shortMonthNames: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
    fullMonthNames: ["січня", "лютого", "березня", "квітня", "травня", "червня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],

    titleContentDate: "Виберіть дату",
    titleContentTime: "Виберіть час",
    titleContentDateTime: "Виберіть дату і час",

    setButtonContent: "Вибрати",
    clearButtonContent: "Очистити",

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