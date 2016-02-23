/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.26
  Copyright (c)2016 Curious Solutions LLP and Neha Kadam
  http://curioussolutions.github.io/DateTimePicker
  https://github.com/CuriousSolutions/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Simple Chinese
	file: DateTimePicker-i18n-zh-CN
	author: Calvin(https://github.com/Calvin-he)

*/

(function ($) {
   $.DateTimePicker.i18n["zh-CN"] = $.extend($.DateTimePicker.i18n["zh-CN"], {

        language: "zh-CN",
        labels: {
            'year': '年',
            'month': '月',
            'day': '日',
            'hour': '时',
            'minutes': '分',
            'seconds': '秒',
            'meridiem': '午'
        },
        dateTimeFormat: "yyyy-MM-dd HH:mm",
        dateFormat: "yyyy-MM-dd",
        timeFormat: "HH:mm",

        shortDayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        fullDayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        shortMonthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        fullMonthNames: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],

        titleContentDate: "设置日期",
        titleContentTime: "设置时间",
        titleContentDateTime: "设置日期和时间",

        setButtonContent: "设置",
        clearButtonContent: "清除",
        formatHumanDate: function (oDate, sMode, sFormat) {
            if (sMode === "date")
                return  oDate.dayShort + ", " + oDate.yyyy + "年" +  oDate.month +"月" + oDate.dd + "日";
            else if (sMode === "time")
                return oDate.HH + "时" + oDate.mm + "分" + oDate.ss + "秒";
            else if (sMode === "datetime")
                return oDate.dayShort + ", " + oDate.yyyy + "年" +  oDate.month +"月" + oDate.dd + "日 " + oDate.HH + "时" + oDate.mm + "分";
        }
    });
})(jQuery);