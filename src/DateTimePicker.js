/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.12
  Copyright (c)2015 Curious Solutions LLP and Neha Kadam
  http://curioussolutions.github.io/DateTimePicker
  https://github.com/CuriousSolutions/DateTimePicker

 ----------------------------------------------------------------------------- */

 (function (factory) 
 {
    if(typeof define === 'function' && define.amd) 
    {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    }
    else if(typeof exports === 'object') 
    {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    }
    else 
    {
        // Browser globals
        factory(jQuery);
    }
}(function ($) 
{
	"use strict";

	var pluginName = "DateTimePicker";

	var defaults = 
	{
		mode: "date",
		defaultDate: new Date(),
	
		dateSeparator: "-",
		timeSeparator: ":",
		timeMeridiemSeparator: " ",
		dateTimeSeparator: " ",
	
		dateTimeFormat: "dd-MM-yyyy HH:mm",
		dateFormat: "dd-MM-yyyy",
		timeFormat: "HH:mm",
	
		maxDate: null,
		minDate:  null,
	
		maxTime: null,
		minTime: null,
	
		maxDateTime: null,
		minDateTime: null,
	
		shortDayNames: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		fullDayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		shortMonthNames: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		fullMonthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		formatHumanDate: function(sDate) 
		{
			return sDate.dayShort + ", " + sDate.month + " " + sDate.dd + ", " + sDate.yyyy;
		},
	
		minuteInterval: 1,
		roundOffMinutes: true,

		secondsInterval: 1,
		roundOffSeconds: true,
	
		titleContentDate: "Set Date",
		titleContentTime: "Set Time",
		titleContentDateTime: "Set Date & Time",
	
		buttonsToDisplay: ["HeaderCloseButton", "SetButton", "ClearButton"],
		setButtonContent: "Set",
		clearButtonContent: "Clear",
    	incrementButtonContent: "+",
    	decrementButtonContent: "-",
		setValueInTextboxOnEveryClick: false,
	
		animationDuration: 400,
	
		isPopup: true,
	
		parentElement: "body",
	
		addEventHandlers: null,  // addEventHandlers(oDateTimePicker)
		beforeShow: null,  // beforeShow(oInputElement)
		afterShow: null,  // afterShow(oInputElement)
		beforeHide: null,  // beforeHide(oInputElement)
		afterHide: null,  // afterHide(oInputElement)
		buttonClicked: null	 // buttonClicked(sButtonType, oInputElement) where sButtonType = "SET"|"CLEAR"|"CANCEL"
	};

	var dataObject = 
	{
	
		dCurrentDate: new Date(),
		iCurrentDay: 0,
		iCurrentMonth: 0,
		iCurrentYear: 0,
		iCurrentHour: 0,
		iCurrentMinutes: 0,
		iCurrentSeconds: 0,
		sCurrentMeridiem: "",
		iMaxNumberOfDays: 0,
	
		sDateFormat: "",
		sTimeFormat: "",
		sDateTimeFormat: "",
	
		dMinValue: null,
		dMaxValue: null,
	
		sArrInputDateFormats: [],
		sArrInputTimeFormats: [],
		sArrInputDateTimeFormats: [],

		bArrMatchFormat: [],
		bDateMode: false,
		bTimeMode: false,
		bDateTimeMode: false,
	
		oInputElement: null,

		iTabIndex: 0,
		bElemFocused: false,
	
		bIs12Hour: false	
	};

	function DateTimePicker(element, options)
	{
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this.dataObject = dataObject;
		this._defaults = defaults;
		this._name = pluginName;
	
		this.init();
	}

	$.fn.DateTimePicker = function (options)
	{
		return this.each(function() 
		{
			$.removeData(this, "plugin_" + pluginName);
			if(!$.data(this, "plugin_" + pluginName))
				$.data(this, "plugin_" + pluginName, new DateTimePicker(this, options));
		});
	};

	DateTimePicker.prototype = {
	
		// Public Method
		init: function () 
		{
			var dtPickerObj = this;					
		
			dtPickerObj._setDateFormatArray(); // Set DateFormatArray
			dtPickerObj._setTimeFormatArray(); // Set TimeFormatArray
			dtPickerObj._setDateTimeFormatArray(); // Set DateTimeFormatArray
		
			if(dtPickerObj.settings.isPopup)
			{
				dtPickerObj._createPicker();
				$(dtPickerObj.element).addClass("dtpicker-mobile");
			}
			dtPickerObj._addEventHandlersForInput();
		},
	
		_setDateFormatArray: function()
		{
			var dtPickerObj = this;
		
			dtPickerObj.dataObject.sArrInputDateFormats = [];		
			var sDate = "";
		
			//  "dd-MM-yyyy"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "yyyy";
			dtPickerObj.dataObject.sArrInputDateFormats.push(sDate);
		
			//  "MM-dd-yyyy"
			sDate = "MM" + dtPickerObj.settings.dateSeparator + "dd" + dtPickerObj.settings.dateSeparator + "yyyy";
			dtPickerObj.dataObject.sArrInputDateFormats.push(sDate);
		
			//  "yyyy-MM-dd"
			sDate = "yyyy" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "dd";
			dtPickerObj.dataObject.sArrInputDateFormats.push(sDate);
		
			// "dd-MMM-yyyy"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MMM" + dtPickerObj.settings.dateSeparator + "yyyy";
			dtPickerObj.dataObject.sArrInputDateFormats.push(sDate);
		},
	
		_setTimeFormatArray: function()
		{
			var dtPickerObj = this;
		
			dtPickerObj.dataObject.sArrInputTimeFormats = [];
			var sTime = "";

			//  "hh:mm:ss AA"
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			dtPickerObj.dataObject.sArrInputTimeFormats.push(sTime);
		
			//  "HH:mm:ss"
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss";
			dtPickerObj.dataObject.sArrInputTimeFormats.push(sTime);
		
			//  "hh:mm AA"
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			dtPickerObj.dataObject.sArrInputTimeFormats.push(sTime);
		
			//  "HH:mm"
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm";
			dtPickerObj.dataObject.sArrInputTimeFormats.push(sTime);
		},
	
		_setDateTimeFormatArray: function()
		{
			var dtPickerObj = this;
		
			dtPickerObj.dataObject.sArrInputDateTimeFormats = [];
			var sDate = "", sTime = "", sDateTime = "";

			//  "dd-MM-yyyy HH:mm:ss"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "dd-MM-yyyy hh:mm:ss AA"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy HH:mm:ss"
			sDate = "MM" + dtPickerObj.settings.dateSeparator + "dd" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy hh:mm:ss AA"
			sDate = "MM" + dtPickerObj.settings.dateSeparator + "dd" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd HH:mm:ss"
			sDate = "yyyy" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "dd";
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd hh:mm:ss AA"
			sDate = "yyyy" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "dd";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm:ss"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MMM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm:ss AA"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MMM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeSeparator + "ss" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);

			//--------------
		
			//  "dd-MM-yyyy HH:mm"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "dd-MM-yyyy hh:mm AA"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy HH:mm"
			sDate = "MM" + dtPickerObj.settings.dateSeparator + "dd" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy hh:mm AA"
			sDate = "MM" + dtPickerObj.settings.dateSeparator + "dd" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd HH:mm"
			sDate = "yyyy" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "dd";
			sTime = "HH" + dtPickerObj.settings.timeSeparator + "mm";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd hh:mm AA"
			sDate = "yyyy" + dtPickerObj.settings.dateSeparator + "MM" + dtPickerObj.settings.dateSeparator + "dd";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MMM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm AA"
			sDate = "dd" + dtPickerObj.settings.dateSeparator + "MMM" + dtPickerObj.settings.dateSeparator + "yyyy";
			sTime = "hh" + dtPickerObj.settings.timeSeparator + "mm" + dtPickerObj.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			dtPickerObj.dataObject.sArrInputDateTimeFormats.push(sDateTime);
		},

		_matchFormat: function(sMode, sFormat)
		{
			var dtPickerObj = this;

			dtPickerObj.dataObject.bArrMatchFormat = [];
			dtPickerObj.dataObject.bDateMode = false;
			dtPickerObj.dataObject.bTimeMode = false;
			dtPickerObj.dataObject.bDateTimeMode = false;
			var oArrInput = [], iTempIndex;

			sMode = dtPickerObj._isValid(sMode) ? sMode : dtPickerObj.settings.mode;
			if(dtPickerObj._compare(sMode, "date"))
			{
				sFormat = dtPickerObj._isValid(sFormat) ? sFormat : dtPickerObj.dataObject.sDateFormat;
				dtPickerObj.dataObject.bDateMode = true;
				oArrInput = dtPickerObj.dataObject.sArrInputDateFormats;
			}
			else if(dtPickerObj._compare(sMode, "time"))
			{
				sFormat = dtPickerObj._isValid(sFormat) ? sFormat : dtPickerObj.dataObject.sTimeFormat;
				dtPickerObj.dataObject.bTimeMode = true;
				oArrInput = dtPickerObj.dataObject.sArrInputTimeFormats;
			}
			else if(dtPickerObj._compare(sMode, "datetime"))
			{
				sFormat = dtPickerObj._isValid(sFormat) ? sFormat : dtPickerObj.dataObject.sDateTimeFormat;
				dtPickerObj.dataObject.bDateTimeMode = true;
				oArrInput = dtPickerObj.dataObject.sArrInputDateTimeFormats;
			}

			for(iTempIndex = 0; iTempIndex < oArrInput.length; iTempIndex++)
			{
				dtPickerObj.dataObject.bArrMatchFormat.push(
					dtPickerObj._compare(sFormat, oArrInput[iTempIndex])
				);
			}
		},

		_setMatchFormat: function(iArgsLength, sMode, sFormat)
		{
			var dtPickerObj = this;

			if(iArgsLength > 0)
				dtPickerObj._matchFormat(sMode, sFormat);
		},

		_createPicker: function()
		{
			var dtPickerObj = this;
		
			$(dtPickerObj.element).addClass("dtpicker-overlay");
			$(".dtpicker-overlay").click(function(e)
			{
				dtPickerObj._hidePicker("");
			});
		
			var sTempStr = "";	
			sTempStr += "<div class='dtpicker-bg'>";
			sTempStr += "<div class='dtpicker-cont'>";
			sTempStr += "<div class='dtpicker-content'>";
			sTempStr += "<div class='dtpicker-subcontent'>";
			sTempStr += "</div>";
			sTempStr += "</div>";
			sTempStr += "</div>";
			sTempStr += "</div>";
			$(dtPickerObj.element).html(sTempStr);
		},
	
		_addEventHandlersForInput: function()
		{
			var dtPickerObj = this;
		
			dtPickerObj.dataObject.oInputElement = null;

			$(dtPickerObj.settings.parentElement).find("input[type='date'], input[type='time'], input[type='datetime']").each(function()
			{
				$(this).attr("type", "text");
				$(this).attr("data-field", $(this).attr("type"));
			});	
        
			var sel = "[data-field='date'], [data-field='time'], [data-field='datetime']";
			$(dtPickerObj.settings.parentElement).off("focus", sel, dtPickerObj._inputFieldFocus);
			$(dtPickerObj.settings.parentElement).on ("focus", sel, {"obj": dtPickerObj}, dtPickerObj._inputFieldFocus);
		
			$(dtPickerObj.settings.parentElement).off("click", sel, dtPickerObj._inputFieldClick);
			$(dtPickerObj.settings.parentElement).on ("click", sel, {"obj": dtPickerObj}, dtPickerObj._inputFieldClick);

			if(dtPickerObj.settings.addEventHandlers) //this is not an event-handler really. Its just a function called
				dtPickerObj.settings.addEventHandlers.call(dtPickerObj); // which could add EventHandlers
		},
	
		_inputFieldFocus: function(e)
		{
			var dtPickerObj = e.data.obj;
			dtPickerObj.showDateTimePicker(this);
			dtPickerObj.dataObject.bMouseDown = false;
		},

		_inputFieldClick: function(e)
		{
          	var dtPickerObj = e.data.obj;
			if(!dtPickerObj._compare($(this).prop("tagName"), "input"))
			{
				dtPickerObj.showDateTimePicker(this);
			}
			e.stopPropagation();
		},

		// Public Method
		setDateTimeStringInInputField: function(oInputField, dInput)
		{
			var dtPickerObj = this;

			dInput = dInput || dtPickerObj.dataObject.dCurrentDate;
		
			var oArrElements;
			if(dtPickerObj._isValid(oInputField))
			{
				oArrElements = [];
				if(typeof oInputField === "string")
					oArrElements.push(oInputField);
				else if(typeof oInputField === "object")
					oArrElements = oInputField;
			}
			else
			{
				if(dtPickerObj._isValid(dtPickerObj.settings.parentElement))
				{
					oArrElements = $(dtPickerObj.settings.parentElement).find("[data-field='date'], [data-field='time'], [data-field='datetime']");
				}
				else
				{
					oArrElements = $("[data-field='date'], [data-field='time'], [data-field='datetime']");
				}
			}
		
			oArrElements.each(function()
			{
				var oElement = this,
				sMode, sFormat, bIs12Hour, sOutput;
			
		        sMode = $(oElement).data("field");
		        if(!dtPickerObj._isValid(sMode))
		    		sMode = dtPickerObj.settings.mode;
		    
		    	sFormat = $(oElement).data("format");
		    	if(!dtPickerObj._isValid(sFormat))
		    	{
			    	if(dtPickerObj._compare(sMode, "date"))
			    		sFormat = dtPickerObj.settings.dateFormat;
			    	else if(dtPickerObj._compare(sMode, "time"))
			        	sFormat = dtPickerObj.settings.timeFormat;
			        else if(dtPickerObj._compare(sMode, "datetime"))
			        	sFormat = dtPickerObj.settings.dateTimeFormat;
			    }
			
				bIs12Hour = dtPickerObj.getIs12Hour(sMode, sFormat);

		    	sOutput = dtPickerObj._setOutput(sMode, sFormat, bIs12Hour, dInput);
		        $(oElement).val(sOutput);
			});
		},

		// Public Method
		getDateTimeStringInFormat: function(sMode, sFormat, dInput)
		{
			var dtPickerObj = this;
			return dtPickerObj._setOutput(sMode, sFormat, dtPickerObj.getIs12Hour(sMode, sFormat), dInput);
		},
	
		// Public Method
		showDateTimePicker: function(oElement)
		{
			var dtPickerObj = this;
			
			if(dtPickerObj.dataObject.oInputElement !== null && dtPickerObj.dataObject.oInputElement !== oElement)
				dtPickerObj._hidePicker(0, oElement);
			else
				dtPickerObj._showPicker(oElement);
		},
	
		_setButtonAction: function(bFromTab)
		{
			var dtPickerObj = this;
		
			if(dtPickerObj.dataObject.oInputElement !== null)
			{
				dtPickerObj._setValueOfElement(dtPickerObj._setOutput());
				if(bFromTab)
					dtPickerObj._hidePicker(0);
				else
					dtPickerObj._hidePicker("");					
			}
		},

		_setOutput: function(sMode, sFormat, bIs12Hour, dCurrentDate)
		{
			var dtPickerObj = this;
		
			dCurrentDate = dtPickerObj._isValid(dCurrentDate) ? dCurrentDate : dtPickerObj.dataObject.dCurrentDate;
			bIs12Hour = bIs12Hour || dtPickerObj.dataObject.bIs12Hour;
		
			var sOutput = "",
			iDate = dCurrentDate.getDate(),
			iMonth = dCurrentDate.getMonth(),
			iYear = dCurrentDate.getFullYear(),
			iHour = dCurrentDate.getHours(),
			iMinutes = dCurrentDate.getMinutes(),
			iSeconds = dCurrentDate.getSeconds(),

			sDate, sMonth, sMeridiem, sHour, sMinutes, sSeconds,
			sDateStr = "", sTimeStr = "",
			iArgsLength = Function.length;

			// Set bDate, bTime, bDateTime & bArrMatchFormat based on arguments of this function 
			dtPickerObj._setMatchFormat(iArgsLength, sMode, sFormat);
		
			if(dtPickerObj.dataObject.bDateMode)
			{
				if(dtPickerObj.dataObject.bArrMatchFormat[0])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
					sOutput = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[1])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
					sOutput = sMonth + dtPickerObj.settings.dateSeparator + sDate + dtPickerObj.settings.dateSeparator + iYear;
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
					sOutput = iYear + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + sDate;
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[3])
				{
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = dtPickerObj.settings.shortMonthNames[iMonth];
				
					sOutput = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
				}
			}
			else if(dtPickerObj.dataObject.bTimeMode)
			{
				if(dtPickerObj.dataObject.bArrMatchFormat[0] ||
					dtPickerObj.dataObject.bArrMatchFormat[2])
				{
					sMeridiem = dtPickerObj._determineMeridiemFromHourAndMinutes(iHour, iMinutes);
					if(iHour === 0 && sMeridiem === "AM")
						iHour = 12;
					else if(iHour > 12 && sMeridiem === "PM")
						iHour -= 12;
				}

				sHour = (iHour < 10) ? ("0" + iHour) : iHour;
				sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;

				if(dtPickerObj.dataObject.bArrMatchFormat[0])
				{
					sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;
					sOutput = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeSeparator + sSeconds + dtPickerObj.settings.timeMeridiemSeparator + sMeridiem;
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[1])
				{
					sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;
					sOutput = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeSeparator + sSeconds;
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2])
				{
					sOutput = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeMeridiemSeparator + sMeridiem;
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[3])
				{
					sOutput = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
				}
			}
			else if(dtPickerObj.dataObject.bDateTimeMode) 
			{
				// Date Part - "dd-MM-yyyy"
				if(dtPickerObj.dataObject.bArrMatchFormat[0] || 
					dtPickerObj.dataObject.bArrMatchFormat[1] ||
					dtPickerObj.dataObject.bArrMatchFormat[8] || 
					dtPickerObj.dataObject.bArrMatchFormat[9])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sDateStr = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
				}
				// Date Part - "MM-dd-yyyy"
				else if(dtPickerObj.dataObject.bArrMatchFormat[2] || 
						dtPickerObj.dataObject.bArrMatchFormat[3] ||
						dtPickerObj.dataObject.bArrMatchFormat[10] || 
						dtPickerObj.dataObject.bArrMatchFormat[11])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sDateStr = sMonth + dtPickerObj.settings.dateSeparator + sDate + dtPickerObj.settings.dateSeparator + iYear;
				}
				// Date Part - "yyyy-MM-dd"
				else if(dtPickerObj.dataObject.bArrMatchFormat[4] || 
						dtPickerObj.dataObject.bArrMatchFormat[5] ||
						dtPickerObj.dataObject.bArrMatchFormat[12] || 
						dtPickerObj.dataObject.bArrMatchFormat[13])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sDateStr = iYear + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + sDate;
				}
				// Date Part - "dd-MMM-yyyy"
				else if(dtPickerObj.dataObject.bArrMatchFormat[6] || 
						dtPickerObj.dataObject.bArrMatchFormat[7] ||
						dtPickerObj.dataObject.bArrMatchFormat[14] || 
						dtPickerObj.dataObject.bArrMatchFormat[15])
				{
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = dtPickerObj.settings.shortMonthNames[iMonth];
				
					sDateStr = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
				}
			
				bAddSeconds = dtPickerObj.dataObject.bArrMatchFormat[0] || 
						dtPickerObj.dataObject.bArrMatchFormat[1] ||
						dtPickerObj.dataObject.bArrMatchFormat[2] || 
						dtPickerObj.dataObject.bArrMatchFormat[3] ||
						dtPickerObj.dataObject.bArrMatchFormat[4] || 
						dtPickerObj.dataObject.bArrMatchFormat[5] ||
						dtPickerObj.dataObject.bArrMatchFormat[6] || 
						dtPickerObj.dataObject.bArrMatchFormat[7];
				if(bIs12Hour)
				{
					sMeridiem = dtPickerObj._determineMeridiemFromHourAndMinutes(iHour, iMinutes);
					if(iHour === 0 && sMeridiem === "AM")
						iHour = 12;
					else if(iHour > 12 && sMeridiem === "PM")
						iHour -= 12;
				
					sHour = (iHour < 10) ? ("0" + iHour) : iHour;
					sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
				
					if(bAddSeconds)
					{
						sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;						
						sTimeStr = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeSeparator + sSeconds + dtPickerObj.settings.timeMeridiemSeparator + sMeridiem;
					}
					else
					{
						sTimeStr = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeMeridiemSeparator + sMeridiem;
					}
				}
				else
				{
					sHour = (iHour < 10) ? ("0" + iHour) : iHour;
					sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
				
					if(bAddSeconds)
					{
						sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;						
						sTimeStr = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeSeparator + sSeconds;
					}
					else
					{
						sTimeStr = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
					}
				}
			
				sOutput = sDateStr + dtPickerObj.settings.dateTimeSeparator + sTimeStr;
			}

			// Reset bDate, bTime, bDateTime & bArrMatchFormat to original values
			dtPickerObj._setMatchFormat(iArgsLength);

			return sOutput;
		},
	
		_clearButtonAction: function()
		{
			var dtPickerObj = this;
		
			if(dtPickerObj.dataObject.oInputElement !== null)
			{
				dtPickerObj._setValueOfElement("");
			}
			dtPickerObj._hidePicker("");
		},
	
		_setOutputOnIncrementOrDecrement: function()
		{
			var dtPickerObj = this;
		
			if(dtPickerObj._isValid(dtPickerObj.dataObject.oInputElement) && dtPickerObj.settings.setValueInTextboxOnEveryClick)
			{
				dtPickerObj._setValueOfElement(dtPickerObj._setOutput());
			}
		},
	
		_showPicker: function(oElement)
		{
			var dtPickerObj = this;

			if(dtPickerObj.dataObject.oInputElement === null)
			{
				dtPickerObj.dataObject.oInputElement = oElement;
				dtPickerObj.dataObject.iTabIndex = parseInt($(oElement).attr("tabIndex"));
			
				var sMode = $(oElement).data("field") || "",
				sMinValue = $(oElement).data("min") || "",
				sMaxValue = $(oElement).data("max") || "",
				sFormat = $(oElement).data("format") || "",
				sView = $(oElement).data("view") || "",
				sStartEnd = $(oElement).data("startend") || "",
				sStartEndElem = $(oElement).data("startendelem") || "",
				sCurrent = dtPickerObj._getValueOfElement(oElement) || "";
			
				if(sView !== "")
				{
					if(dtPickerObj._compare(sView, "Popup"))
						dtPickerObj.setIsPopup(true);
					else 
						dtPickerObj.setIsPopup(false);
				}
			
				if(!dtPickerObj.settings.isPopup)
				{
					dtPickerObj._createPicker();
				
					var iElemTop = $(dtPickerObj.dataObject.oInputElement).offset().top + $(dtPickerObj.dataObject.oInputElement).outerHeight(),
					iElemLeft = $(dtPickerObj.dataObject.oInputElement).offset().left,
					iElemWidth =  $(dtPickerObj.dataObject.oInputElement).outerWidth();
				
					$(dtPickerObj.element).css({position: "absolute", top: iElemTop, left: iElemLeft, width: iElemWidth, height: "auto"});
				}



				if(dtPickerObj.settings.beforeShow)
					dtPickerObj.settings.beforeShow.call(dtPickerObj, oElement);
			
				sMode = dtPickerObj._isValid(sMode) ? sMode : dtPickerObj.settings.mode;
				dtPickerObj.settings.mode = sMode;
				if(!dtPickerObj._isValid(sFormat))
				{
					if(dtPickerObj._compare(sMode, "date"))
						sFormat = dtPickerObj.settings.dateFormat;
					else if(dtPickerObj._compare(sMode, "time"))
						sFormat = dtPickerObj.settings.timeFormat;
					else if(dtPickerObj._compare(sMode, "datetime"))
						sFormat = dtPickerObj.settings.dateTimeFormat;
				}

				dtPickerObj._matchFormat(sMode, sFormat);
			
				dtPickerObj.dataObject.dMinValue = null;
				dtPickerObj.dataObject.dMaxValue = null;
				dtPickerObj.dataObject.bIs12Hour = false;

				var sMin, sMax,
				sTempDate, dTempDate,
				sTempTime, dTempTime,
				sTempDateTime, dTempDateTime;
			
				if(dtPickerObj.dataObject.bDateMode)
				{
					sMin = sMinValue || dtPickerObj.settings.minDate;
					sMax = sMaxValue || dtPickerObj.settings.maxDate;
				
					dtPickerObj.dataObject.sDateFormat = sFormat;
				
					if(dtPickerObj._isValid(sMin))
						dtPickerObj.dataObject.dMinValue = dtPickerObj._parseDate(sMin);
					if(dtPickerObj._isValid(sMax))
						dtPickerObj.dataObject.dMaxValue = dtPickerObj._parseDate(sMax);
				
					if(sStartEnd !== "" && (dtPickerObj._compare(sStartEnd, "start") || dtPickerObj._compare(sStartEnd, "end")) && sStartEndElem !== "")
					{
						if($(sStartEndElem).length >= 1)
						{
							sTempDate = dtPickerObj._getValueOfElement($(sStartEndElem));
							if(sTempDate !== "")
							{
								dTempDate = dtPickerObj._parseDate(sTempDate);
								if(dtPickerObj._compare(sStartEnd, "start"))
								{
									if(dtPickerObj._isValid(sMax))
									{
										if(dtPickerObj._compareDates(dTempDate, dtPickerObj.dataObject.dMaxValue) < 0)
											dtPickerObj.dataObject.dMaxValue = new Date(dTempDate);
									}
									else
										dtPickerObj.dataObject.dMaxValue = new Date(dTempDate);
								}
								else if(dtPickerObj._compare(sStartEnd, "end"))
								{
									if(dtPickerObj._isValid(sMin))
									{
										if(dtPickerObj._compareDates(dTempDate, dtPickerObj.dataObject.dMinValue) > 0)
											dtPickerObj.dataObject.dMinValue = new Date(dTempDate);
									}
									else
										dtPickerObj.dataObject.dMinValue = new Date(dTempDate);
								}
							}
						}
					}
				
					dtPickerObj.dataObject.dCurrentDate = dtPickerObj._parseDate(sCurrent);
					dtPickerObj.dataObject.dCurrentDate.setHours(0);
					dtPickerObj.dataObject.dCurrentDate.setMinutes(0);
					dtPickerObj.dataObject.dCurrentDate.setSeconds(0);
				}
				else if(dtPickerObj.dataObject.bTimeMode)
				{
					sMin = sMinValue || dtPickerObj.settings.minTime;
					sMax = sMaxValue || dtPickerObj.settings.maxTime;
				
					dtPickerObj.dataObject.sTimeFormat = sFormat;
				
					if(dtPickerObj._isValid(sMin))
						dtPickerObj.dataObject.dMinValue = dtPickerObj._parseTime(sMin);
					if(dtPickerObj._isValid(sMax))
						dtPickerObj.dataObject.dMaxValue = dtPickerObj._parseTime(sMax);
				
					if(sStartEnd !== "" && (dtPickerObj._compare(sStartEnd, "start") || dtPickerObj._compare(sStartEnd, "end")) && sStartEndElem !== "")
					{
						if($(sStartEndElem).length >= 1)
						{
							sTempTime = dtPickerObj._getValueOfElement($(sStartEndElem));
							if(sTempTime !== "")
							{
								dTempTime = dtPickerObj._parseTime(sTempTime);
								if(dtPickerObj._compare(sStartEnd, "start"))
								{
									dTempTime.setMinutes(dTempTime.getMinutes() - 1);
									if(dtPickerObj._isValid(sMax))
									{
										if(dtPickerObj._compareTime(dTempTime, dtPickerObj.dataObject.dMaxValue) === 2)
											dtPickerObj.dataObject.dMaxValue = new Date(dTempTime);
									}
									else
										dtPickerObj.dataObject.dMaxValue = new Date(dTempTime);
								}
								else if(dtPickerObj._compare(sStartEnd, "end"))
								{
									dTempTime.setMinutes(dTempTime.getMinutes() + 1);
									if(dtPickerObj._isValid(sMin))
									{
										if(dtPickerObj._compareTime(dTempTime, dtPickerObj.dataObject.dMinValue) === 3)
											dtPickerObj.dataObject.dMinValue = new Date(dTempTime);
									}
									else
										dtPickerObj.dataObject.dMinValue = new Date(dTempTime);
								}
							}
						}
					}
				
					dtPickerObj.dataObject.bIs12Hour = dtPickerObj.getIs12Hour();
					dtPickerObj.dataObject.dCurrentDate = dtPickerObj._parseTime(sCurrent);
				}
				else if(dtPickerObj.dataObject.bDateTimeMode)
				{
					sMin = sMinValue || dtPickerObj.settings.minDateTime;
					sMax = sMaxValue || dtPickerObj.settings.maxDateTime;
				
					dtPickerObj.dataObject.sDateTimeFormat = sFormat;
				
					if(dtPickerObj._isValid(sMin))
						dtPickerObj.dataObject.dMinValue = dtPickerObj._parseDateTime(sMin);
					if(dtPickerObj._isValid(sMax))
						dtPickerObj.dataObject.dMaxValue = dtPickerObj._parseDateTime(sMax);
				
					if(sStartEnd !== "" && (dtPickerObj._compare(sStartEnd, "start") || dtPickerObj._compare(sStartEnd, "end")) && sStartEndElem !== "")
					{
						if($(sStartEndElem).length >= 1)
						{
							sTempDateTime = dtPickerObj._getValueOfElement($(sStartEndElem));
							if(sTempDateTime !== "")
							{
								dTempDateTime = dtPickerObj._parseDateTime(sTempDateTime);
								if(dtPickerObj._compare(sStartEnd, "start"))
								{
									if(dtPickerObj._isValid(sMax))
									{
										if(dtPickerObj._compareDateTime(dTempDateTime, dtPickerObj.dataObject.dMaxValue) < 0)
											dtPickerObj.dataObject.dMaxValue = new Date(dTempDateTime);
									}
									else
										dtPickerObj.dataObject.dMaxValue = new Date(dTempDateTime);
								}
								else if(dtPickerObj._compare(sStartEnd, "end"))
								{
									if(dtPickerObj._isValid(sMin))
									{
										if(dtPickerObj._compareDateTime(dTempDateTime, dtPickerObj.dataObject.dMinValue) > 0)
											dtPickerObj.dataObject.dMinValue = new Date(dTempDateTime);
									}
									else
										dtPickerObj.dataObject.dMinValue = new Date(dTempDateTime);
								}
							}
						}
					}
				
					dtPickerObj.dataObject.bIs12Hour = dtPickerObj.getIs12Hour();
					dtPickerObj.dataObject.dCurrentDate = dtPickerObj._parseDateTime(sCurrent);
				}
			
				dtPickerObj._setVariablesForDate();
				dtPickerObj._modifyPicker();
				$(dtPickerObj.element).fadeIn(dtPickerObj.settings.animationDuration);

				if(dtPickerObj.settings.afterShow)
				{
					setTimeout(function()
					{
						dtPickerObj.settings.afterShow.call(dtPickerObj, oElement);
					}, dtPickerObj.settings.animationDuration);	
				}
			}
		},
	
		_hidePicker: function(iDuration, oElementToShow)
		{
			var dtPickerObj = this;
			var oElement = dtPickerObj.dataObject.oInputElement;

			if(dtPickerObj.settings.beforeHide)
				dtPickerObj.settings.beforeHide.call(dtPickerObj, oElement);

			if(!dtPickerObj._isValid(iDuration))
				iDuration = dtPickerObj.settings.animationDuration;
		
			if(dtPickerObj._isValid(dtPickerObj.dataObject.oInputElement))
			{
				$(dtPickerObj.dataObject.oInputElement).blur();
				dtPickerObj.dataObject.oInputElement = null;
			}
		
			$(dtPickerObj.element).fadeOut(iDuration);
			if(iDuration === 0)
			{
				$(dtPickerObj.element).find('.dtpicker-subcontent').html("");
			}
			else
			{
				setTimeout(function()
				{
					$(dtPickerObj.element).find('.dtpicker-subcontent').html("");
				}, iDuration);
			}

			$(document).unbind("click.DateTimePicker");
			$(document).unbind("keydown.DateTimePicker");
			$(document).unbind("keyup.DateTimePicker");

			if(dtPickerObj.settings.afterHide)
			{
				if(iDuration === 0)
				{
					dtPickerObj.settings.afterHide.call(dtPickerObj, oElement);
				}
				else
				{
					setTimeout(function()
					{
						dtPickerObj.settings.afterHide.call(dtPickerObj, oElement);
					}, iDuration);
				}
			}

			if(dtPickerObj._isValid(oElementToShow))
				dtPickerObj._showPicker(oElementToShow);
		},
	
		_modifyPicker: function()
		{
			var dtPickerObj = this;

			var sTitleContent, iNumberOfColumns;
			var sArrFields = [];
			if(dtPickerObj.dataObject.bDateMode)
			{
				sTitleContent = dtPickerObj.settings.titleContentDate;
				iNumberOfColumns = 3;
			
				if(dtPickerObj.dataObject.bArrMatchFormat[0])  // "dd-MM-yyyy"
				{
					sArrFields = ["day", "month", "year"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[1])  // "MM-dd-yyyy"
				{
					sArrFields = ["month", "day", "year"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2])  // "yyyy-MM-dd"
				{
					sArrFields = ["year", "month", "day"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[3])  // "dd-MMM-yyyy"
				{
					sArrFields = ["day", "month", "year"];
				}
			}
			else if(dtPickerObj.dataObject.bTimeMode)
			{
				sTitleContent = dtPickerObj.settings.titleContentTime;
				if(dtPickerObj.dataObject.bArrMatchFormat[0]) // hh:mm:ss AA
				{
					iNumberOfColumns = 4;
					sArrFields = ["hour", "minutes", "seconds", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[1]) // HH:mm:ss
				{
					iNumberOfColumns = 3;
					sArrFields = ["hour", "minutes", "seconds"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2]) // hh:mm AA
				{
					iNumberOfColumns = 3;
					sArrFields = ["hour", "minutes", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[3]) // HH:mm
				{
					iNumberOfColumns = 2;
					sArrFields = ["hour", "minutes"];
				}
			}
			else if(dtPickerObj.dataObject.bDateTimeMode)
			{
				sTitleContent = dtPickerObj.settings.titleContentDateTime;
			
				if(dtPickerObj.dataObject.bArrMatchFormat[0])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[1])
				{
					iNumberOfColumns = 7;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2])
				{
					iNumberOfColumns = 6;
					sArrFields = ["month", "day", "year", "hour", "minutes", "seconds"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[3])
				{
					iNumberOfColumns = 7;
					sArrFields = ["month", "day", "year", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[4])
				{
					iNumberOfColumns = 6;
					sArrFields = ["year", "month", "day", "hour", "minutes", "seconds"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[5])
				{
					iNumberOfColumns = 7;
					sArrFields = ["year", "month", "day", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[6])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[7])
				{
					iNumberOfColumns = 7;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[8])
				{
					iNumberOfColumns = 5;
					sArrFields = ["day", "month", "year", "hour", "minutes"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[9])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[10])
				{
					iNumberOfColumns = 5;
					sArrFields = ["month", "day", "year", "hour", "minutes"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[11])
				{
					iNumberOfColumns = 6;
					sArrFields = ["month", "day", "year", "hour", "minutes", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[12])
				{
					iNumberOfColumns = 5;
					sArrFields = ["year", "month", "day", "hour", "minutes"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[13])
				{
					iNumberOfColumns = 6;
					sArrFields = ["year", "month", "day", "hour", "minutes", "meridiem"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[14])
				{
					iNumberOfColumns = 5;
					sArrFields = ["day", "month", "year", "hour", "minutes"];
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[15])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "meridiem"];
				}
			}
			
		
			//--------------------------------------------------------------------
			var sColumnClass = "dtpicker-comp" + iNumberOfColumns,
			bDisplayHeaderCloseButton = false,
			bDisplaySetButton = false,
			bDisplayClearButton = false,
			iTempIndex;
			
			for(iTempIndex = 0; iTempIndex < dtPickerObj.settings.buttonsToDisplay.length; iTempIndex++)
			{
				if(dtPickerObj._compare(dtPickerObj.settings.buttonsToDisplay[iTempIndex], "HeaderCloseButton"))
					bDisplayHeaderCloseButton = true;
				else if(dtPickerObj._compare(dtPickerObj.settings.buttonsToDisplay[iTempIndex], "SetButton"))
					bDisplaySetButton = true;
				else if(dtPickerObj._compare(dtPickerObj.settings.buttonsToDisplay[iTempIndex], "ClearButton"))
					bDisplayClearButton = true;
			}
		
			var sHeader = "";
			sHeader += "<div class='dtpicker-header'>";
			sHeader += "<div class='dtpicker-title'>" + sTitleContent + "</div>";
			if(bDisplayHeaderCloseButton)
				sHeader += "<a class='dtpicker-close'>&times;</a>";
			sHeader += "<div class='dtpicker-value'></div>";
			sHeader += "</div>";
		
			//--------------------------------------------------------------------
		
			var sDTPickerComp = "";
			sDTPickerComp += "<div class='dtpicker-components'>";
		
			for(iTempIndex = 0; iTempIndex < iNumberOfColumns; iTempIndex++)
			{
				var sFieldName = sArrFields[iTempIndex];
			
				sDTPickerComp += "<div class='dtpicker-compOutline " + sColumnClass + "'>";
				sDTPickerComp += "<div class='dtpicker-comp " + sFieldName + "'>";
				sDTPickerComp += "<a class='dtpicker-compButton increment'>" + dtPickerObj.settings.incrementButtonContent + "</a>";
				sDTPickerComp += "<input type='text' class='dtpicker-compValue'></input>";
				sDTPickerComp += "<a class='dtpicker-compButton decrement'>" + dtPickerObj.settings.decrementButtonContent + "</a>";
				sDTPickerComp += "</div>";
				sDTPickerComp += "</div>";
			}
		
			sDTPickerComp += "</div>";
		
			//--------------------------------------------------------------------
		
			var sButtonContClass = "";
			if(bDisplaySetButton && bDisplayClearButton)
				sButtonContClass = " dtpicker-twoButtons";
			else
				sButtonContClass = " dtpicker-singleButton";
		
			var sDTPickerButtons = "";
			sDTPickerButtons += "<div class='dtpicker-buttonCont" + sButtonContClass + "'>";
			if(bDisplaySetButton)
				sDTPickerButtons += "<a class='dtpicker-button dtpicker-buttonSet'>" + dtPickerObj.settings.setButtonContent + "</a>";
			if(bDisplayClearButton)
				sDTPickerButtons += "<a class='dtpicker-button dtpicker-buttonClear'>" + dtPickerObj.settings.clearButtonContent + "</a>";
			sDTPickerButtons += "</div>";
		
			//--------------------------------------------------------------------
		
			var sTempStr = sHeader + sDTPickerComp + sDTPickerButtons;
		
			$(dtPickerObj.element).find('.dtpicker-subcontent').html(sTempStr);
		
			dtPickerObj._setCurrentDate();
			dtPickerObj._addEventHandlersForPicker();
		},
	
		_addEventHandlersForPicker: function()
		{
			var dtPickerObj = this;
		
			$(document).on("click.DateTimePicker", function(e)
			{
				dtPickerObj._hidePicker("");
			});
		
			$(document).on("keydown.DateTimePicker", function(e)
			{
				if(! $('.dtpicker-compValue').is(':focus') && (e.keyCode ? e.keyCode : e.which) === "9")
				{
					dtPickerObj._setButtonAction(true);
					$("[tabIndex=" + (dtPickerObj.dataObject.iTabIndex + 1) + "]").focus();
					return false;
				}
			});

			$(document).on("keydown.DateTimePicker", function(e)
			{
				if(! $('.dtpicker-compValue').is(':focus') && (e.keyCode ? e.keyCode : e.which) !== "9")
				{
					dtPickerObj._hidePicker("");
				}
			});

			$(".dtpicker-cont *").click(function(e)
			{
				e.stopPropagation();
			});
		
			$('.dtpicker-compValue').not('.month .dtpicker-compValue, .meridiem .dtpicker-compValue').keyup(function() 
			{ 
				this.value = this.value.replace(/[^0-9\.]/g,'');
			});

			$('.dtpicker-compValue').focus(function()
			{
				dtPickerObj.dataObject.bElemFocused = true;
			});
		
			$('.dtpicker-compValue').blur(function()
			{
				dtPickerObj._getValuesFromInputBoxes();
				dtPickerObj._setCurrentDate();
			
				dtPickerObj.dataObject.bElemFocused = false;
				var $oParentElem = $(this).parent().parent();
				setTimeout(function()
				{
					if($oParentElem.is(':last-child') && !dtPickerObj.dataObject.bElemFocused)
					{
						dtPickerObj._setButtonAction(false);
					}
				}, 50);			
			});
		
			$(".dtpicker-compValue").keyup(function()
			{
				var $oTextField = $(this),
			
				sTextBoxVal = $oTextField.val(),
				iLength = sTextBoxVal.length,
				sNewTextBoxVal;
			
				if($oTextField.parent().hasClass("day") || $oTextField.parent().hasClass("hour") || $oTextField.parent().hasClass("minutes") || $oTextField.parent().hasClass("meridiem"))
				{
					if(iLength > 2)
					{
						sNewTextBoxVal = sTextBoxVal.slice(0, 2);
						$oTextField.val(sNewTextBoxVal);
					}
				}
				else if($oTextField.parent().hasClass("month"))
				{
					if(iLength > 3)
					{
						sNewTextBoxVal = sTextBoxVal.slice(0, 3);
						$oTextField.val(sNewTextBoxVal);
					}
				}
				else if($oTextField.parent().hasClass("year"))
				{
					if(iLength > 4)
					{
						sNewTextBoxVal = sTextBoxVal.slice(0, 4);
						$oTextField.val(sNewTextBoxVal);
					}
				}
			});

			//-----------------------------------------------------------------------
		
			$(dtPickerObj.element).find('.dtpicker-close').click(function(e)
			{
				if(dtPickerObj.settings.buttonClicked)
					dtPickerObj.settings.buttonClicked.call(dtPickerObj, "CLOSE", dtPickerObj.dataObject.oInputElement);
				dtPickerObj._hidePicker("");
			});
		
			$(dtPickerObj.element).find('.dtpicker-buttonSet').click(function(e)
			{
				if(dtPickerObj.settings.buttonClicked)
					dtPickerObj.settings.buttonClicked.call(dtPickerObj, "SET", dtPickerObj.dataObject.oInputElement);
				dtPickerObj._setButtonAction(false);
			});
		
			$(dtPickerObj.element).find('.dtpicker-buttonClear').click(function(e)
			{
				if(dtPickerObj.settings.buttonClicked)
					dtPickerObj.settings.buttonClicked.call(dtPickerObj, "CLEAR", dtPickerObj.dataObject.oInputElement);
				dtPickerObj._clearButtonAction();
			});
		
			// ----------------------------------------------------------------------------
		
			$(dtPickerObj.element).find(".day .increment, .day .increment *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentDay++;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".day .decrement, .day .decrement *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentDay--;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".month .increment, .month .increment *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentMonth++;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".month .decrement, .month .decrement *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentMonth--;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".year .increment, .year .increment *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentYear++;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".year .decrement, .year .decrement *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentYear--;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".hour .increment, .hour .increment *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentHour++;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".hour .decrement, .hour .decrement *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentHour--;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".minutes .increment, .minutes .increment *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentMinutes += dtPickerObj.settings.minuteInterval;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".minutes .decrement, .minutes .decrement *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentMinutes -= dtPickerObj.settings.minuteInterval;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});

			$(dtPickerObj.element).find(".seconds .increment, .seconds .increment *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentSeconds += dtPickerObj.settings.secondsInterval;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".seconds .decrement, .seconds .decrement *").click(function(e)
			{
				dtPickerObj.dataObject.iCurrentSeconds -= dtPickerObj.settings.secondsInterval;
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		
			$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").click(function(e)
			{
				if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "AM"))
				{
					dtPickerObj.dataObject.sCurrentMeridiem = "PM";
					dtPickerObj.dataObject.iCurrentHour += 12;
				}
				else if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "PM"))
				{
					dtPickerObj.dataObject.sCurrentMeridiem = "AM";
					dtPickerObj.dataObject.iCurrentHour -= 12;
				}				
				dtPickerObj._setCurrentDate();
				dtPickerObj._setOutputOnIncrementOrDecrement();
			});
		},

		_adjustMinutes: function(iMinutes) 
		{
			var dtPickerObj = this;
			if(dtPickerObj.settings.roundOffMinutes && dtPickerObj.settings.minuteInterval !== 1)
			{
				iMinutes = (iMinutes % dtPickerObj.settings.minuteInterval) ? (iMinutes - (iMinutes % dtPickerObj.settings.minuteInterval) + dtPickerObj.settings.minuteInterval) : iMinutes;
			}
			return iMinutes;
		},

		_adjustSeconds: function(iSeconds) 
		{
			var dtPickerObj = this;
			if(dtPickerObj.settings.roundOffSeconds && dtPickerObj.settings.secondsInterval !== 1)
			{
				iSeconds = (iSeconds % dtPickerObj.settings.secondsInterval) ? (iSeconds - (iSeconds % dtPickerObj.settings.secondsInterval) + dtPickerObj.settings.secondsInterval) : iSeconds;
			}
			return iSeconds;
		},
	
		_getValueOfElement: function(oElem)
		{
			var dtPickerObj = this;
			var sElemValue = "";
		
			if(dtPickerObj._compare($(oElem).prop("tagName"), "INPUT"))
				sElemValue = $(oElem).val();
			else
				sElemValue = $(oElem).html();
		
			return sElemValue;
		},
	
		_setValueOfElement: function(sElemValue)
		{
			var dtPickerObj = this;
		
			var $oElem = $(dtPickerObj.dataObject.oInputElement);
			if(dtPickerObj._compare($oElem.prop("tagName"), "INPUT"))
				$oElem.val(sElemValue);
			else
				$oElem.html(sElemValue);
		
			$oElem.change();
		
			return sElemValue;
		},
	
		//-----------------------------------------------------------------
	
		_parseDate: function(sDate)
		{
			var dtPickerObj = this;
		
			var dTempDate = new Date(dtPickerObj.settings.defaultDate),
			iDate = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iYear = dTempDate.getFullYear();
		
			if(dtPickerObj._isValid(sDate))
			{
				var sArrDate = sDate.split(dtPickerObj.settings.dateSeparator);
			
				if(dtPickerObj.dataObject.bArrMatchFormat[0])  // "dd-MM-yyyy"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iYear = parseInt(sArrDate[2]);
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[1])  // "MM-dd-yyyy"
				{
					iMonth = parseInt(sArrDate[0] - 1);
					iDate = parseInt(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2])  // "yyyy-MM-dd"
				{
					iYear = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iDate = parseInt(sArrDate[2]);
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[3])  // "dd-MMM-yyyy"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = dtPickerObj._getShortMonthIndex(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
			}
		
			dTempDate = new Date(iYear, iMonth, iDate, 0, 0, 0, 0);
			return dTempDate;
		},
	
		_parseTime: function(sTime)
		{
			var dtPickerObj = this;
		
			var dTempDate = new Date(dtPickerObj.settings.defaultDate),
			iDate = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iYear = dTempDate.getFullYear(),
			iHour = dTempDate.getHours(),
			iMinutes = dTempDate.getMinutes(),
			iSeconds = dTempDate.getSeconds(),
			sArrTime, sMeridiem, sArrTimeComp,
			bShowSeconds = dtPickerObj.dataObject.bArrMatchFormat[0] ||
							dtPickerObj.dataObject.bArrMatchFormat[1];

			iSeconds = bShowSeconds ? dtPickerObj._adjustSeconds(iSeconds) : 0;
		
			if(dtPickerObj._isValid(sTime))
			{
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					sArrTime = sTime.split(dtPickerObj.settings.timeMeridiemSeparator);
					sTime = sArrTime[0];
					sMeridiem = sArrTime[1];

					if(!(dtPickerObj._compare(sMeridiem, "AM") || dtPickerObj._compare(sMeridiem, "PM")))
						sMeridiem = "";
				}

				sArrTimeComp = sTime.split(dtPickerObj.settings.timeSeparator);
				iHour = parseInt(sArrTimeComp[0]);
				iMinutes = parseInt(sArrTimeComp[1]);

				if(bShowSeconds)
				{
					iSeconds = parseInt(sArrTimeComp[2]);
					iSeconds = dtPickerObj._adjustSeconds(iSeconds);
				}

				if(iHour === 12 && dtPickerObj._compare(sMeridiem, "AM"))
					iHour = 0;
				else if(iHour < 12 && dtPickerObj._compare(sMeridiem, "PM"))
					iHour += 12;
			}
			iMinutes = dtPickerObj._adjustMinutes(iMinutes);
		
			dTempDate = new Date(iYear, iMonth, iDate, iHour, iMinutes, iSeconds, 0);
		
			return dTempDate;
		},
	
		_parseDateTime: function(sDateTime)
		{
			var dtPickerObj = this;
		
			var dTempDate = new Date(dtPickerObj.settings.defaultDate),
			iDate = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iYear = dTempDate.getFullYear(),
			iHour = dTempDate.getHours(),
			iMinutes = dTempDate.getMinutes(),
			iSeconds = 0,
			sMeridiem = "",
			sArrDateTime, sArrDate, sTime, sArrTimeComp, sArrTime,
			bShowSeconds = dtPickerObj.dataObject.bArrMatchFormat[0] || 
							dtPickerObj.dataObject.bArrMatchFormat[1] ||
							dtPickerObj.dataObject.bArrMatchFormat[2] || 
							dtPickerObj.dataObject.bArrMatchFormat[3] ||
							dtPickerObj.dataObject.bArrMatchFormat[4] || 
							dtPickerObj.dataObject.bArrMatchFormat[5] ||
							dtPickerObj.dataObject.bArrMatchFormat[6] || 
							dtPickerObj.dataObject.bArrMatchFormat[7];

			iSeconds = bShowSeconds ? dtPickerObj._adjustSeconds(iSeconds) : 0;
		
			if(dtPickerObj._isValid(sDateTime))
			{
				sArrDateTime = sDateTime.split(dtPickerObj.settings.dateTimeSeparator);
				sArrDate = sArrDateTime[0].split(dtPickerObj.settings.dateSeparator);
			
				if(dtPickerObj.dataObject.bArrMatchFormat[0] || // "dd-MM-yyyy HH:mm:ss"
					dtPickerObj.dataObject.bArrMatchFormat[1]) // ""dd-MM-yyyy hh:mm:ss AA"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iYear = parseInt(sArrDate[2]);
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[2] ||  // "MM-dd-yyyy HH:mm:ss"
					dtPickerObj.dataObject.bArrMatchFormat[3]) // "MM-dd-yyyy hh:mm:ss AA"
				{
					iMonth = parseInt(sArrDate[0] - 1);
					iDate = parseInt(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[4] ||  // "yyyy-MM-dd HH:mm:ss"
					dtPickerObj.dataObject.bArrMatchFormat[5]) // "yyyy-MM-dd hh:mm:ss AA"
				{
					iYear = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iDate = parseInt(sArrDate[2]);
				}
				else if(dtPickerObj.dataObject.bArrMatchFormat[6] || // "dd-MMM-yyyy HH:mm:ss"
					dtPickerObj.dataObject.bArrMatchFormat[7]) // "dd-MMM-yyyy hh:mm:ss AA"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = dtPickerObj._getShortMonthIndex(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
			
				sTime = sArrDateTime[1];
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					if(dtPickerObj._compare(dtPickerObj.settings.dateTimeSeparator, dtPickerObj.settings.timeMeridiemSeparator) && (sArrDateTime.length === 3))
						sMeridiem = sArrDateTime[2];
					else
					{
						sArrTimeComp = sTime.split(dtPickerObj.settings.timeMeridiemSeparator);
						sTime = sArrTimeComp[0];
						sMeridiem = sArrTimeComp[1];
					}
				
					if(!(dtPickerObj._compare(sMeridiem, "AM") || dtPickerObj._compare(sMeridiem, "PM")))
						sMeridiem = "";
				}
				
				sArrTime = sTime.split(dtPickerObj.settings.timeSeparator);

				iHour = parseInt(sArrTime[0]);
				iMinutes = parseInt(sArrTime[1]);
				if(bShowSeconds)
				{
					iSeconds = parseInt(sArrTime[2]);
				}

				if(iHour === 12 && dtPickerObj._compare(sMeridiem, "AM"))
					iHour = 0;
				else if(iHour < 12 && dtPickerObj._compare(sMeridiem, "PM"))
					iHour += 12;
			}
			iMinutes = dtPickerObj._adjustMinutes(iMinutes);
    			
			dTempDate = new Date(iYear, iMonth, iDate, iHour, iMinutes, iSeconds, 0);
		
			return dTempDate;
		},
	
		_getShortMonthIndex: function(sMonthName)
		{
			var dtPickerObj = this;
			
			for(var iTempIndex = 0; iTempIndex < dtPickerObj.settings.shortMonthNames.length; iTempIndex++)
			{
				if(dtPickerObj._compare(sMonthName, dtPickerObj.settings.shortMonthNames[iTempIndex]))
					return iTempIndex;
			}
		},

		// Public Method
		getIs12Hour: function(sMode, sFormat)
		{
			var dtPickerObj = this;

			var bIs12Hour = false, 
			iArgsLength = Function.length;

			dtPickerObj._setMatchFormat(iArgsLength, sMode, sFormat);

			if(dtPickerObj.dataObject.bTimeMode)
	        {
	        	bIs12Hour = dtPickerObj.dataObject.bArrMatchFormat[0] || 
	        				dtPickerObj.dataObject.bArrMatchFormat[2];
	        }
	        else if(dtPickerObj.dataObject.bDateTimeMode)
	        {
	        	bIs12Hour = dtPickerObj.dataObject.bArrMatchFormat[1] ||
							dtPickerObj.dataObject.bArrMatchFormat[3] ||
							dtPickerObj.dataObject.bArrMatchFormat[5] ||
							dtPickerObj.dataObject.bArrMatchFormat[7] ||
							dtPickerObj.dataObject.bArrMatchFormat[9] ||
							dtPickerObj.dataObject.bArrMatchFormat[11] ||
							dtPickerObj.dataObject.bArrMatchFormat[13] ||
							dtPickerObj.dataObject.bArrMatchFormat[15];
			}

			dtPickerObj._setMatchFormat(iArgsLength);

			return bIs12Hour;
		},
	
		//-----------------------------------------------------------------
	
		_setVariablesForDate: function()
		{
			var dtPickerObj = this;
		
			dtPickerObj.dataObject.iCurrentDay = dtPickerObj.dataObject.dCurrentDate.getDate();
			dtPickerObj.dataObject.iCurrentMonth = dtPickerObj.dataObject.dCurrentDate.getMonth();
			dtPickerObj.dataObject.iCurrentYear = dtPickerObj.dataObject.dCurrentDate.getFullYear();
		
			if(dtPickerObj.dataObject.bTimeMode || dtPickerObj.dataObject.bDateTimeMode)
			{
				dtPickerObj.dataObject.iCurrentHour = dtPickerObj.dataObject.dCurrentDate.getHours();
				dtPickerObj.dataObject.iCurrentMinutes = dtPickerObj.dataObject.dCurrentDate.getMinutes();
				dtPickerObj.dataObject.iCurrentSeconds = dtPickerObj.dataObject.dCurrentDate.getSeconds();
			
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					dtPickerObj.dataObject.sCurrentMeridiem = dtPickerObj._determineMeridiemFromHourAndMinutes(dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes);
				}
			}
		},
	
		_getValuesFromInputBoxes: function()
		{
			var dtPickerObj = this;
		
			if(dtPickerObj.dataObject.bDateMode || dtPickerObj.dataObject.bDateTimeMode)
			{
				var sMonth, iMonth;

				sMonth = $(dtPickerObj.element).find(".month .dtpicker-compValue").val();
				if(sMonth.length > 1)
					sMonth = sMonth.charAt(0).toUpperCase() + sMonth.slice(1);
				iMonth = dtPickerObj.settings.shortMonthNames.indexOf(sMonth);
				if(iMonth !== -1)
				{
					dtPickerObj.dataObject.iCurrentMonth = parseInt(iMonth);
				}
				else
				{
					if(sMonth.match("^[+|-]?[0-9]+$"))
					{
						dtPickerObj.dataObject.iCurrentMonth = parseInt(sMonth - 1);
					}
				}
			
				dtPickerObj.dataObject.iCurrentDay = parseInt($(dtPickerObj.element).find(".day .dtpicker-compValue").val()) || dtPickerObj.dataObject.iCurrentDay;					
				dtPickerObj.dataObject.iCurrentYear = parseInt($(dtPickerObj.element).find(".year .dtpicker-compValue").val()) || dtPickerObj.dataObject.iCurrentYear;
			}
		
			if(dtPickerObj.dataObject.bTimeMode || dtPickerObj.dataObject.bDateTimeMode)
			{
				var iTempHour, iTempMinutes, iTempSeconds, sMeridiem;

				iTempHour = parseInt($(dtPickerObj.element).find(".hour .dtpicker-compValue").val());
				iTempMinutes = dtPickerObj._adjustMinutes(parseInt($(dtPickerObj.element).find(".minutes .dtpicker-compValue").val()));
				iTempSeconds = dtPickerObj._adjustMinutes(parseInt($(dtPickerObj.element).find(".seconds .dtpicker-compValue").val()));

				dtPickerObj.dataObject.iCurrentHour = isNaN(iTempHour) ? dtPickerObj.dataObject.iCurrentHour : iTempHour;
				dtPickerObj.dataObject.iCurrentMinutes = isNaN(iTempMinutes) ? dtPickerObj.dataObject.iCurrentMinutes : iTempMinutes;
				dtPickerObj.dataObject.iCurrentSeconds = isNaN(iTempSeconds) ? dtPickerObj.dataObject.iCurrentSeconds : iTempSeconds;
			
				if(dtPickerObj.dataObject.iCurrentSeconds > 59)
				{
					dtPickerObj.dataObject.iCurrentMinutes += dtPickerObj.dataObject.iCurrentSeconds / 60;
					dtPickerObj.dataObject.iCurrentSeconds = dtPickerObj.dataObject.iCurrentSeconds % 60;
				}
				if(dtPickerObj.dataObject.iCurrentMinutes > 59)
				{
					dtPickerObj.dataObject.iCurrentHour += dtPickerObj.dataObject.iCurrentMinutes / 60;
					dtPickerObj.dataObject.iCurrentMinutes = dtPickerObj.dataObject.iCurrentMinutes % 60;
				}

				if(dtPickerObj.dataObject.bIs12Hour)
				{
					if(dtPickerObj.dataObject.iCurrentHour > 12)
						dtPickerObj.dataObject.iCurrentHour = (dtPickerObj.dataObject.iCurrentHour % 12);
				}
				else
				{
					if(dtPickerObj.dataObject.iCurrentHour > 23)
						dtPickerObj.dataObject.iCurrentHour = (dtPickerObj.dataObject.iCurrentHour % 23);
				}
			
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					sMeridiem = $(dtPickerObj.element).find(".meridiem .dtpicker-compValue").val();
					if(dtPickerObj._compare(sMeridiem, "AM") || dtPickerObj._compare(sMeridiem, "PM"))
						dtPickerObj.dataObject.sCurrentMeridiem = sMeridiem;
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "PM"))
					{
						if(dtPickerObj.dataObject.iCurrentHour !== 12 && dtPickerObj.dataObject.iCurrentHour < 13)
							dtPickerObj.dataObject.iCurrentHour += 12;
					}
					if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "AM") && dtPickerObj.dataObject.iCurrentHour === 12)
						dtPickerObj.dataObject.iCurrentHour = 0;
				}
			}
		},
	
		_setCurrentDate: function()
		{
			var dtPickerObj = this;
		
			if(dtPickerObj.dataObject.bTimeMode || dtPickerObj.dataObject.bDateTimeMode)
			{
				if(dtPickerObj.dataObject.iCurrentSeconds > 59)
				{
					dtPickerObj.dataObject.iCurrentMinutes += dtPickerObj.dataObject.iCurrentSeconds / 60;
					dtPickerObj.dataObject.iCurrentSeconds = dtPickerObj.dataObject.iCurrentSeconds % 60;
				}
				else if(dtPickerObj.dataObject.iCurrentSeconds < 0)
				{
					dtPickerObj.dataObject.iCurrentMinutes -= dtPickerObj.settings.minuteInterval;
					dtPickerObj.dataObject.iCurrentSeconds += 60;
				}
				dtPickerObj.dataObject.iCurrentMinutes = dtPickerObj._adjustMinutes(dtPickerObj.dataObject.iCurrentMinutes);
				dtPickerObj.dataObject.iCurrentSeconds = dtPickerObj._adjustSeconds(dtPickerObj.dataObject.iCurrentSeconds);
			}

			var dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0),
			bGTMaxDate = false, bLTMinDate = false,
			sDay, iDayOfTheWeek, sDayOfTheWeek, sDayOfTheWeekFull,
			iMonth, sMonth, sMonthShort, sMonthFull,
			sYear, sHour, sMinutes, sSeconds, sTime, sDateTime,
			sDate;
		
			if(dtPickerObj.dataObject.dMaxValue !== null)
				bGTMaxDate = (dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime());
			if(dtPickerObj.dataObject.dMinValue !== null)
				bLTMinDate = (dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime());
		
			if(bGTMaxDate || bLTMinDate)
			{
				var bCDGTMaxDate = false, bCDLTMinDate = false; 
				if(dtPickerObj.dataObject.dMaxValue !== null)
					bCDGTMaxDate = (dtPickerObj.dataObject.dCurrentDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime());
				if(dtPickerObj.dataObject.dMinValue !== null)
					bCDLTMinDate = (dtPickerObj.dataObject.dCurrentDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime());
			
				if(!(bCDGTMaxDate || bCDLTMinDate))
					dTempDate = new Date(dtPickerObj.dataObject.dCurrentDate);
				else
				{
					if(bCDGTMaxDate)
						dTempDate = new Date(dtPickerObj.dataObject.dMaxValue);
					if(bCDLTMinDate)
						dTempDate = new Date(dtPickerObj.dataObject.dMinValue);
				}
			}
		
			dtPickerObj.dataObject.dCurrentDate = new Date(dTempDate);
			dtPickerObj._setVariablesForDate();
		
			if(dtPickerObj.dataObject.bDateMode)
			{
				sDay = dtPickerObj.dataObject.iCurrentDay;
				sDay = (sDay < 10) ? ("0" + sDay) : sDay;
				iMonth = dtPickerObj.dataObject.iCurrentMonth;
				sMonth = dtPickerObj.dataObject.iCurrentMonth;
				sMonth = (sMonth < 10) ? ("0" + sMonth) : sMonth;
				sMonthShort = dtPickerObj.settings.shortMonthNames[iMonth];
				sMonthFull = dtPickerObj.settings.fullMonthNames[iMonth];
				sYear = dtPickerObj.dataObject.iCurrentYear;
				iDayOfTheWeek = dtPickerObj.dataObject.dCurrentDate.getDay();
				sDayOfTheWeek = dtPickerObj.settings.shortDayNames[iDayOfTheWeek];
				sDayOfTheWeekFull = dtPickerObj.settings.fullDayNames[iDayOfTheWeek];
			
				$(dtPickerObj.element).find('.day .dtpicker-compValue').val(sDay);
				$(dtPickerObj.element).find('.month .dtpicker-compValue').val(sMonthShort);
				$(dtPickerObj.element).find('.year .dtpicker-compValue').val(sYear);
			
				sDate = dtPickerObj.settings.formatHumanDate({
					dd: sDay,
					MM: sMonth,
					yyyy: sYear,
					day: sDayOfTheWeekFull,
					dayShort: sDayOfTheWeek,
					month: sMonthFull,
					monthShort: sMonthShort
				});
				// var sDate = sDayOfTheWeek + ", " + sMonthFull + " " + sDay + ", " + sYear;
				$(dtPickerObj.element).find('.dtpicker-value').html(sDate);
			}
			else if(dtPickerObj.dataObject.bTimeMode)
			{
				sHour = dtPickerObj.dataObject.iCurrentHour;
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					if(sHour > 12)
						sHour -= 12;
				
					$(dtPickerObj.element).find('.meridiem .dtpicker-compValue').val(dtPickerObj.dataObject.sCurrentMeridiem);
				}
				sHour = (sHour < 10) ? ("0" + sHour) : sHour;
				if(dtPickerObj.dataObject.bIs12Hour && sHour === "00")
					sHour = 12;
				sMinutes = dtPickerObj.dataObject.iCurrentMinutes;
				sMinutes = (sMinutes < 10) ? ("0" + sMinutes) : sMinutes;
				sSeconds = dtPickerObj.dataObject.iCurrentSeconds;
				sSeconds = (sSeconds < 10) ? ("0" + sSeconds) : sSeconds;
			
				$(dtPickerObj.element).find('.hour .dtpicker-compValue').val(sHour);
				$(dtPickerObj.element).find('.minutes .dtpicker-compValue').val(sMinutes);
				$(dtPickerObj.element).find('.seconds .dtpicker-compValue').val(sSeconds);
			
				// Format with Seconds
				if(dtPickerObj.dataObject.bArrMatchFormat[0] ||
					dtPickerObj.dataObject.bArrMatchFormat[1])
					sTime = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeSeparator + sSeconds;
				// Format without Seconds
				else
					sTime = sHour + dtPickerObj.settings.timeSeparator + sMinutes;

				if(dtPickerObj.dataObject.bIs12Hour)
					sTime += dtPickerObj.settings.timeMeridiemSeparator + dtPickerObj.dataObject.sCurrentMeridiem;
				
				$(dtPickerObj.element).find('.dtpicker-value').html(sTime);
			}
			else if(dtPickerObj.dataObject.bDateTimeMode)
			{
				sDay = dtPickerObj.dataObject.iCurrentDay;
				sDay = (sDay < 10) ? ("0" + sDay) : sDay;
				iMonth = dtPickerObj.dataObject.iCurrentMonth;
				sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				sMonthShort = dtPickerObj.settings.shortMonthNames[iMonth];
				sMonthFull = dtPickerObj.settings.fullMonthNames[iMonth];
				sYear = dtPickerObj.dataObject.iCurrentYear;
				iDayOfTheWeek = dtPickerObj.dataObject.dCurrentDate.getDay();
				sDayOfTheWeek = dtPickerObj.settings.shortDayNames[iDayOfTheWeek];
				sDayOfTheWeekFull = dtPickerObj.settings.fullDayNames[iDayOfTheWeek];
			
				$(dtPickerObj.element).find('.day .dtpicker-compValue').val(sDay);
				$(dtPickerObj.element).find('.month .dtpicker-compValue').val(sMonthShort);
				$(dtPickerObj.element).find('.year .dtpicker-compValue').val(sYear);

				// var sDate = sDayOfTheWeek + ", " + sMonthFull + " " + sDay + ", " + sYear;
				sDate = dtPickerObj.settings.formatHumanDate({
					dd: sDay,
					MM: sMonth,
					yyyy: sYear,
					day: sDayOfTheWeekFull,
					dayShort: sDayOfTheWeek,
					month: sMonthFull,
					monthShort: sMonthShort
				});

				//------------------------------------------------------------------
			
				sHour = dtPickerObj.dataObject.iCurrentHour;
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					if(sHour > 12)
						sHour -= 12;
				
					$(dtPickerObj.element).find('.meridiem .dtpicker-compValue').val(dtPickerObj.dataObject.sCurrentMeridiem);
				}
				sHour = (sHour < 10) ? ("0" + sHour) : sHour;
				if(dtPickerObj.dataObject.bIs12Hour && sHour === "00")
					sHour = 12;
				sMinutes = dtPickerObj.dataObject.iCurrentMinutes;
				sMinutes = (sMinutes < 10) ? ("0" + sMinutes) : sMinutes;
				sSeconds = dtPickerObj.dataObject.iCurrentSeconds;
				sSeconds = (sSeconds < 10) ? ("0" + sSeconds) : sSeconds;

				$(dtPickerObj.element).find('.hour .dtpicker-compValue').val(sHour);
				$(dtPickerObj.element).find('.minutes .dtpicker-compValue').val(sMinutes);
				$(dtPickerObj.element).find('.seconds .dtpicker-compValue').val(sSeconds);

				// Format with Seconds 
				if(dtPickerObj.dataObject.bArrMatchFormat[0] || 
						dtPickerObj.dataObject.bArrMatchFormat[1] ||
						dtPickerObj.dataObject.bArrMatchFormat[2] || 
						dtPickerObj.dataObject.bArrMatchFormat[3] ||
						dtPickerObj.dataObject.bArrMatchFormat[4] || 
						dtPickerObj.dataObject.bArrMatchFormat[5] ||
						dtPickerObj.dataObject.bArrMatchFormat[6] || 
						dtPickerObj.dataObject.bArrMatchFormat[7])
				{
					sTime = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeSeparator + sSeconds;
				}
				// Format without Seconds
				else
				{
					sTime = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
				}

				if(dtPickerObj.dataObject.bIs12Hour)
					sTime += dtPickerObj.settings.timeMeridiemSeparator + dtPickerObj.dataObject.sCurrentMeridiem;
			
				//------------------------------------------------------------------
			
				sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
			
				$(dtPickerObj.element).find('.dtpicker-value').html(sDateTime);
			}
		
			dtPickerObj._setButtons();
		},
	
		_setButtons: function()
		{
			var dtPickerObj = this;
			$(dtPickerObj.element).find('.dtpicker-compButton').removeClass("dtpicker-compButtonDisable").addClass('dtpicker-compButtonEnable');
		
			var dTempDate;
			if(dtPickerObj.dataObject.dMaxValue !== null)
			{
				if(dtPickerObj.dataObject.bTimeMode)
				{
					// Decrement Hour
					if((dtPickerObj.dataObject.iCurrentHour + 1) > dtPickerObj.dataObject.dMaxValue.getHours() || ((dtPickerObj.dataObject.iCurrentHour + 1) === dtPickerObj.dataObject.dMaxValue.getHours() && dtPickerObj.dataObject.iCurrentMinutes > dtPickerObj.dataObject.dMaxValue.getMinutes()))
						$(dtPickerObj.element).find(".hour .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Minutes
					if(dtPickerObj.dataObject.iCurrentHour >= dtPickerObj.dataObject.dMaxValue.getHours() && (dtPickerObj.dataObject.iCurrentMinutes + 1) > dtPickerObj.dataObject.dMaxValue.getMinutes())
						$(dtPickerObj.element).find(".minutes .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
				else
				{
					// Increment Day
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, (dtPickerObj.dataObject.iCurrentDay + 1), dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
						$(dtPickerObj.element).find(".day .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Month
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, (dtPickerObj.dataObject.iCurrentMonth + 1), dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
						$(dtPickerObj.element).find(".month .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Year
					dTempDate = new Date((dtPickerObj.dataObject.iCurrentYear + 1), dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
						$(dtPickerObj.element).find(".year .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Hour
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, (dtPickerObj.dataObject.iCurrentHour + 1), dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
						$(dtPickerObj.element).find(".hour .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Minutes
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, (dtPickerObj.dataObject.iCurrentMinutes + 1), dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
						$(dtPickerObj.element).find(".minutes .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");

					// Increment Seconds
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, (dtPickerObj.dataObject.iCurrentSeconds + 1), 0);
					if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
						$(dtPickerObj.element).find(".seconds .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
			}
		
			if(dtPickerObj.dataObject.dMinValue !== null)
			{
				if(dtPickerObj.dataObject.bTimeMode)
				{
					// Decrement Hour
					if((dtPickerObj.dataObject.iCurrentHour - 1) < dtPickerObj.dataObject.dMinValue.getHours() || ((dtPickerObj.dataObject.iCurrentHour - 1) === dtPickerObj.dataObject.dMinValue.getHours() && dtPickerObj.dataObject.iCurrentMinutes < dtPickerObj.dataObject.dMinValue.getMinutes()))
						$(dtPickerObj.element).find(".hour .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Minutes
					if(dtPickerObj.dataObject.iCurrentHour <= dtPickerObj.dataObject.dMinValue.getHours() && (dtPickerObj.dataObject.iCurrentMinutes - 1) < dtPickerObj.dataObject.dMinValue.getMinutes())
						$(dtPickerObj.element).find(".minutes .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
				else
				{
					// Decrement Day 
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, (dtPickerObj.dataObject.iCurrentDay - 1), dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
						$(dtPickerObj.element).find(".day .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Month 
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, (dtPickerObj.dataObject.iCurrentMonth - 1), dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
						$(dtPickerObj.element).find(".month .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Year 
					dTempDate = new Date((dtPickerObj.dataObject.iCurrentYear - 1), dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
						$(dtPickerObj.element).find(".year .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Hour
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, (dtPickerObj.dataObject.iCurrentHour - 1), dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
						$(dtPickerObj.element).find(".hour .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Minutes
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, (dtPickerObj.dataObject.iCurrentMinutes - 1), dtPickerObj.dataObject.iCurrentSeconds, 0);
					if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
						$(dtPickerObj.element).find(".minutes .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");

					// Decrement Seconds
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, (dtPickerObj.dataObject.iCurrentSeconds - 1), 0);
					if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
						$(dtPickerObj.element).find(".seconds .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
			}
			
			if(dtPickerObj.dataObject.bIs12Hour)
			{
				var iTempHour, iTempMinutes;
				if(dtPickerObj.dataObject.dMaxValue !== null || dtPickerObj.dataObject.dMinValue !== null)
				{
					iTempHour = dtPickerObj.dataObject.iCurrentHour;
					if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "AM"))
						iTempHour += 12;
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "PM"))
						iTempHour -= 12;
				
					dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, iTempHour, dtPickerObj.dataObject.iCurrentMinutes, dtPickerObj.dataObject.iCurrentSeconds, 0);
				
					if(dtPickerObj.dataObject.dMaxValue !== null)
					{
						if(dtPickerObj.dataObject.bTimeMode)
						{
							iTempMinutes = dtPickerObj.dataObject.iCurrentMinutes;
							if(iTempHour > dtPickerObj.dataObject.dMaxValue.getHours() || (iTempHour === dtPickerObj.dataObject.dMaxValue.getHours() && iTempMinutes > dtPickerObj.dataObject.dMaxValue.getMinutes()))
								$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
						else
						{
							if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
								$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
					}
				
					if(dtPickerObj.dataObject.dMinValue !== null)
					{
						if(dtPickerObj.dataObject.bTimeMode)
						{
							iTempMinutes = dtPickerObj.dataObject.iCurrentMinutes;
							if(iTempHour < dtPickerObj.dataObject.dMinValue.getHours() || (iTempHour === dtPickerObj.dataObject.dMinValue.getHours() && iTempMinutes < dtPickerObj.dataObject.dMinValue.getMinutes()))
								$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
						else
						{
							if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
								$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
					}
				}
			}
		},
	
		_compare: function(sString1, sString2)
		{
			var bString1 = (sString1 !== undefined && sString1 !== null),
			bString2 = (sString2 !== undefined && sString2 !== null);
			if(bString1 && bString2)
			{
				if(sString1.toLowerCase() === sString2.toLowerCase())
					return true;
				else
					return false;
			}
			else
				return false;			
		},

		_isValid: function(sValue)
		{
			return (sValue !== undefined && sValue !== null && sValue !== "");
		},
	
		// Public Method
		setIsPopup: function(bIsPopup)
		{
			var dtPickerObj = this;
			dtPickerObj.settings.isPopup = bIsPopup;
		
			if($(dtPickerObj.element).css("display") !== "none")
				dtPickerObj._hidePicker(0);
		
			if(dtPickerObj.settings.isPopup)
			{
				$(dtPickerObj.element).addClass("dtpicker-mobile");
				
				$(dtPickerObj.element).css({position: "fixed", top: 0, left: 0, width: "100%", height: "100%"});
			}
			else
			{
				$(dtPickerObj.element).removeClass("dtpicker-mobile");
				
				if(dtPickerObj.dataObject.oInputElement !== null)
				{
					var iElemTop = $(dtPickerObj.dataObject.oInputElement).offset().top + $(dtPickerObj.dataObject.oInputElement).outerHeight(),
					iElemLeft = $(dtPickerObj.dataObject.oInputElement).offset().left,
					iElemWidth =  $(dtPickerObj.dataObject.oInputElement).outerWidth();
				
					$(dtPickerObj.element).css({position: "absolute", top: iElemTop, left: iElemLeft, width: iElemWidth, height: "auto"});
				}
			}
		},
	
		_compareDates: function(dDate1, dDate2)
		{
			dDate1 = new Date(dDate1.getDate(), dDate1.getMonth(), dDate1.getFullYear(), 0, 0, 0, 0);
			dDate1 = new Date(dDate1.getDate(), dDate1.getMonth(), dDate1.getFullYear(), 0, 0, 0, 0);
			var iDateDiff = (dDate1.getTime() - dDate2.getTime()) / 864E5;
			return (iDateDiff === 0) ? iDateDiff: (iDateDiff/Math.abs(iDateDiff));
		},
	
		_compareTime: function(dTime1, dTime2)
		{
			var iTimeMatch = 0;
			if((dTime1.getHours() === dTime2.getHours()) && (dTime1.getMinutes() === dTime2.getMinutes()))
				iTimeMatch = 1;  	// 1 = Exact Match
			else
			{
				if(dTime1.getHours() < dTime2.getHours())
					iTimeMatch = 2;	 // time1 < time2
				else if(dTime1.getHours() > dTime2.getHours())
					iTimeMatch = 3; 	// time1 > time2
				else if(dTime1.getHours() === dTime2.getHours())
				{
					if(dTime1.getMinutes() < dTime2.getMinutes())
						iTimeMatch = 2;	 // time1 < time2
					else if(dTime1.getMinutes() > dTime2.getMinutes())
						iTimeMatch = 3; 	// time1 > time2
				}
			}
			return iTimeMatch;
		},
	
		_compareDateTime: function(dDate1, dDate2)
		{
			var iDateTimeDiff = (dDate1.getTime() - dDate2.getTime()) / 6E4;
			return (iDateTimeDiff === 0) ? iDateTimeDiff: (iDateTimeDiff/Math.abs(iDateTimeDiff));
		},

		_determineMeridiemFromHourAndMinutes: function(iHour, iMinutes)
		{
			if(iHour > 12) 
			{
				return "PM";
			} 
			else if(iHour === 12 && iMinutes >= 0) 
			{
				return "PM";
			} 
			else 
			{
				return "AM";
			}
		}

	};
	
}));

