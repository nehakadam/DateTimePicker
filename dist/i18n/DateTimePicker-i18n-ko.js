/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.39
  Copyright (c)2014-2019 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://github.com/nehakadam/DateTimePicker
  Documentation : https://nehakadam.github.io/DateTimePicker

 ----------------------------------------------------------------------------- */

/*

	language: Korean
	file: DateTimePicker-i18n-ko

*/

(function ($) {
    $.DateTimePicker.i18n["ko"] = $.extend($.DateTimePicker.i18n["ko"], {
        
    	language: "ko",
			labels: {
				'year': '년',
				'month': '월',
				'day': '일',
				'hour': '시',
				'minutes': '분',
				'seconds': '초',
				'meridiem': '정오'
		},
    	dateTimeFormat: "yyyy-MM-dd HH:mm",
		dateFormat: "yyyy-MM-dd",
		timeFormat: "HH:mm",

		shortDayNames: ["일", "월", "화", "수", "목", "금", "토"],
		fullDayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
		shortMonthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		fullMonthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],

		titleContentDate: "날짜 설정",
		titleContentTime: "시간 설정",
		titleContentDateTime: "날짜 및 시간 설정 ",
	
		setButtonContent: "설정하기",
		clearButtonContent: "초기화"
        
    });
})(jQuery);