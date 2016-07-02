/* -----------------------------------------------------------------------------

 jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
 Version 0.1.30
 Copyright (c)2016 Curious Solutions LLP and Neha Kadam
 http://curioussolutions.github.io/DateTimePicker
 https://github.com/CuriousSolutions/DateTimePicker

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
