/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.26
  Copyright (c)2016 Curious Solutions LLP and Neha Kadam
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




/*

	language: Romanian
	file: DateTimePicker-i18n-nl
	author: Radu Mogoș(https://github.com/pixelplant)

 */

(function ($) {
	$.DateTimePicker.i18n["ro"] = $.extend($.DateTimePicker.i18n["ro"], {

		language: "ro",

		dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",

		shortDayNames: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vim", "Sâm"],
		fullDayNames: ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"],
		shortMonthNames: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec"],
		fullMonthNames: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],

		titleContentDate: "Setare Dată",
		titleContentTime: "Setare Oră",
		titleContentDateTime: "Setare Dată și Oră",
	
		setButtonContent: "Setează",
		clearButtonContent: "Șterge"

	});
})(jQuery);



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



/*

  language: Traditional Chinese
  file: DateTimePicker-i18n-zh-TW
  author: JasonYCHuang (https://github.com/JasonYCHuang)

*/

(function ($) {
   $.DateTimePicker.i18n["zh-TW"] = $.extend($.DateTimePicker.i18n["zh-TW"], {

        language: "zh-TW",
        labels: {
            'year': '年',
            'month': '月',
            'day': '日',
            'hour': '時',
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

        titleContentDate: "設置日期",
        titleContentTime: "設置時間",
        titleContentDateTime: "設置日期和時間",

        setButtonContent: "設置",
        clearButtonContent: "清除",
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