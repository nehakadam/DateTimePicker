/* -----------------------------------------------------------------------------

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.26
  Copyright (c)2016 Curious Solutions LLP and Neha Kadam
  http://curioussolutions.github.io/DateTimePicker
  https://github.com/CuriousSolutions/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

  language: Japanese
  file: DateTimePicker-i18n-ja
  author: JasonYCHuang (https://github.com/JasonYCHuang)

*/

(function ($) {
   $.DateTimePicker.i18n["ja"] = $.extend($.DateTimePicker.i18n["ja"], {

        language: "ja",
        labels: {
            'year': '年',
            'month': '月',
            'day': '日',
            'hour': '時',
            'minutes': '分',
            'seconds': '秒',
            'meridiem': '昼'
        },
        dateTimeFormat: "yyyy-MM-dd HH:mm",
        dateFormat: "yyyy-MM-dd",
        timeFormat: "HH:mm",

        shortDayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        fullDayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
        shortMonthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        fullMonthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

        titleContentDate: "日付の設定",
        titleContentTime: "時刻の設定",
        titleContentDateTime: "日付と時間の設定",

        setButtonContent: "設定",
        clearButtonContent: "取消",
        formatHumanDate: function (oDate, sMode, sFormat) {
            if (sMode === "date")
                return  oDate.dayShort + ", " + oDate.yyyy + "年" +  oDate.month +"月" + oDate.dd + "日";
            else if (sMode === "time")
                return oDate.HH + "時" + oDate.mm + "分" + oDate.ss + "秒";
            else if (sMode === "datetime")
                return oDate.dayShort + ", " + oDate.yyyy + "年" +  oDate.month +"月" + oDate.dd + "日 " + oDate.HH + "時" + oDate.mm + "分";
        }
    });
})(jQuery);
