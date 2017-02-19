/* -----------------------------------------------------------------------------

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.38
  Copyright (c)2017 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

  language: Norsk Bokmål
  file: DateTimePicker-i18n-nb
  author: Tommy Eliassen (https://github.com/pusle)

 */

(function ($) {
    $.DateTimePicker.i18n["nb"] = $.extend($.DateTimePicker.i18n["nb"], {

        language: "nb",

        dateTimeFormat: "dd.MM.yyyy HH:mm",
        dateFormat: "dd.MM.yyyy",
        timeFormat: "HH:mm",

        dateSeparator: ".",

        shortDayNames: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"],
        fullDayNames: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"],
        shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
        fullMonthNames: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],

        titleContentDate: "Sett Dato",
        titleContentTime: "Sett Klokkeslett",
        titleContentDateTime: "Sett Dato & Klokkeslett",

        setButtonContent: "Bruk",
        clearButtonContent: "Nullstill"

    });
})(jQuery);
