/* ----------------------------------------------------------------------------- 

  jQuery DateTimePicker - Responsive flat design jQuery DateTime Picker plugin for Web & Mobile
  Version 0.1.17
  Copyright (c)2017 Lajpat Shah
  Contributors : https://github.com/nehakadam/DateTimePicker/contributors
  Repository : https://nehakadam.github.io/DateTimePicker
  Documentation : https://github.com/nehakadam/DateTimePicker

 ----------------------------------------------------------------------------- */

$.DateTimePicker = $.DateTimePicker || {

	name: "DateTimePicker",

	i18n: {}, // Internationalization Objects

	defaults:  //Plugin Defaults
	{
		mode: "date",
		defaultDate: new Date(),
	
		dateSeparator: "-",
		timeSeparator: ":",
		timeMeridiemSeparator: " ",
		dateTimeSeparator: " ",
		monthYearSeparator: " ",
	
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

		language: "",
	
		init: null, // init(oDateTimePicker)
		addEventHandlers: null,  // addEventHandlers(oDateTimePicker)
		beforeShow: null,  // beforeShow(oInputElement)
		afterShow: null,  // afterShow(oInputElement)
		beforeHide: null,  // beforeHide(oInputElement)
		afterHide: null,  // afterHide(oInputElement)
		buttonClicked: null,  // buttonClicked(sButtonType, oInputElement) where sButtonType = "SET"|"CLEAR"|"CANCEL"
		formatHumanDate: null,  // formatHumanDate(oDate, sMode, sFormat)
	
		parseDateTimeString: null, // parseDateTimeString(sDateTime, sMode, oInputElement)
		formatDateTimeString: null, // formatDateTimeString(oFormat, sMode, oInputElement)
	},

	dataObject: // Temporary Variables For Calculation Specific to DateTimePicker Instance
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
	}

};

$.cf = {

	_isValid: function(sValue)
	{
		return (sValue !== undefined && sValue !== null && sValue !== "");
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
	}

};

var sLibrary = "zepto";

(function (factory) 
{
    if(typeof define === 'function' && define.amd) 
    {
        // AMD. Register as an anonymous module.
        define([sLibrary], factory);
    }
    else if(typeof exports === 'object') 
    {
        // Node/CommonJS
        module.exports = factory(require(sLibrary));
    }
    else 
    {
        // Browser globals
        if(sLibrary === "zepto")
        	factory(Zepto);
        else if(sLibrary === "jquery")
        	factory(jQuery);
    }
}(function ($) 
{
	"use strict";

	function DateTimePicker(element, options)
	{
		this.element = element;

		var sLanguage = "";
		sLanguage = ($.cf._isValid(options) && $.cf._isValid(options.language)) ? options.language : $.DateTimePicker.defaults.language;
		this.settings = $.extend({}, $.DateTimePicker.defaults, options, $.DateTimePicker.i18n[sLanguage]);

		this.oData = $.extend({}, $.DateTimePicker.dataObject);
		this._defaults = $.DateTimePicker.defaults;
		this._name = $.DateTimePicker.name;

		this.init();
	}

	$.fn.DateTimePicker = function (options)
	{
		var oDTP = $(this).data(),
		sArrDataKeys = Object.keys(oDTP),
		iKey, sKey;
		
		if(typeof options === "string")
		{			
			if($.cf._isValid(oDTP))
			{
				if(options === "destroy")
				{
					if(sArrDataKeys.length > 0)
					{
						for(iKey in sArrDataKeys)
						{
							sKey = sArrDataKeys[iKey];
							if(sKey.search("plugin_DateTimePicker") !== -1)
							{
								$(document).unbind("click.DateTimePicker");
								$(document).unbind("keydown.DateTimePicker");
								$(document).unbind("keyup.DateTimePicker");
							
								$(this).children().remove();
								$(this).removeData();
								$(this).unbind();
								$(this).removeClass("dtpicker-overlay dtpicker-mobile");

								oDTP = oDTP[sKey];
							
								console.log("Destroyed DateTimePicker Object");
								console.log(oDTP);
							
								break;
							}
						}
					}
					else
					{
						console.log("No DateTimePicker Object Defined For This Element");
					}
				}
				else if(options === "object")
				{
					if(sArrDataKeys.length > 0)
					{
						for(iKey in sArrDataKeys)
						{
							sKey = sArrDataKeys[iKey];
							if(sKey.search("plugin_DateTimePicker") !== -1)
							{
								return oDTP[sKey];
							}
						}
					}
					else
					{
						console.log("No DateTimePicker Object Defined For This Element");
					}
				}
			}
		}
		else
		{
			return this.each(function() 
			{
				$(this).removeData("plugin_DateTimePicker");
				if(!$(this).data("plugin_DateTimePicker"))
					$(this).data("plugin_DateTimePicker", new DateTimePicker(this, options));
			});
		}
	};

	DateTimePicker.prototype = {
	
		// Public Method
		init: function () 
		{
			var oDTP = this;					
		
			oDTP._setDateFormatArray(); // Set DateFormatArray
			oDTP._setTimeFormatArray(); // Set TimeFormatArray
			oDTP._setDateTimeFormatArray(); // Set DateTimeFormatArray
		
			if(oDTP.settings.isPopup)
			{
				oDTP._createPicker();
				$(oDTP.element).addClass("dtpicker-mobile");
			}

			if(oDTP.settings.init)
				oDTP.settings.init.call(oDTP);

			oDTP._addEventHandlersForInput();
		},
	
		_setDateFormatArray: function()
		{
			var oDTP = this;
		
			oDTP.oData.sArrInputDateFormats = [];		
			var sDate = "";
		
			//  "dd-MM-yyyy"
			sDate = "dd" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "yyyy";
			oDTP.oData.sArrInputDateFormats.push(sDate);
		
			//  "MM-dd-yyyy"
			sDate = "MM" + oDTP.settings.dateSeparator + "dd" + oDTP.settings.dateSeparator + "yyyy";
			oDTP.oData.sArrInputDateFormats.push(sDate);
		
			//  "yyyy-MM-dd"
			sDate = "yyyy" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "dd";
			oDTP.oData.sArrInputDateFormats.push(sDate);
		
			// "dd-MMM-yyyy"
			sDate = "dd" + oDTP.settings.dateSeparator + "MMM" + oDTP.settings.dateSeparator + "yyyy";
			oDTP.oData.sArrInputDateFormats.push(sDate);

			//  "MM yyyy"
			sDate = "MM" + oDTP.settings.monthYearSeparator + "yyyy";
			oDTP.oData.sArrInputDateFormats.push(sDate);

			//  "MMM yyyy"
			sDate = "MMM" + oDTP.settings.monthYearSeparator + "yyyy";
			oDTP.oData.sArrInputDateFormats.push(sDate);

			//  "MMM yyyy"
			sDate = "MMMM" + oDTP.settings.monthYearSeparator + "yyyy";
			oDTP.oData.sArrInputDateFormats.push(sDate);
		},
	
		_setTimeFormatArray: function()
		{
			var oDTP = this;
		
			oDTP.oData.sArrInputTimeFormats = [];
			var sTime = "";

			//  "hh:mm:ss AA"
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss" + oDTP.settings.timeMeridiemSeparator + "AA";
			oDTP.oData.sArrInputTimeFormats.push(sTime);
		
			//  "HH:mm:ss"
			sTime = "HH" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss";
			oDTP.oData.sArrInputTimeFormats.push(sTime);
		
			//  "hh:mm AA"
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeMeridiemSeparator + "AA";
			oDTP.oData.sArrInputTimeFormats.push(sTime);
		
			//  "HH:mm"
			sTime = "HH" + oDTP.settings.timeSeparator + "mm";
			oDTP.oData.sArrInputTimeFormats.push(sTime);
		},
	
		_setDateTimeFormatArray: function()
		{
			var oDTP = this;
		
			oDTP.oData.sArrInputDateTimeFormats = [];
			var sDate = "", sTime = "", sDateTime = "";

			//  "dd-MM-yyyy HH:mm:ss"
			sDate = "dd" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "HH" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "dd-MM-yyyy hh:mm:ss AA"
			sDate = "dd" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy HH:mm:ss"
			sDate = "MM" + oDTP.settings.dateSeparator + "dd" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "HH" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy hh:mm:ss AA"
			sDate = "MM" + oDTP.settings.dateSeparator + "dd" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd HH:mm:ss"
			sDate = "yyyy" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "dd";
			sTime = "HH" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd hh:mm:ss AA"
			sDate = "yyyy" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "dd";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm:ss"
			sDate = "dd" + oDTP.settings.dateSeparator + "MMM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm:ss AA"
			sDate = "dd" + oDTP.settings.dateSeparator + "MMM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeSeparator + "ss" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);

			//--------------
		
			//  "dd-MM-yyyy HH:mm"
			sDate = "dd" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "HH" + oDTP.settings.timeSeparator + "mm";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "dd-MM-yyyy hh:mm AA"
			sDate = "dd" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy HH:mm"
			sDate = "MM" + oDTP.settings.dateSeparator + "dd" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "HH" + oDTP.settings.timeSeparator + "mm";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "MM-dd-yyyy hh:mm AA"
			sDate = "MM" + oDTP.settings.dateSeparator + "dd" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd HH:mm"
			sDate = "yyyy" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "dd";
			sTime = "HH" + oDTP.settings.timeSeparator + "mm";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		
			//  "yyyy-MM-dd hh:mm AA"
			sDate = "yyyy" + oDTP.settings.dateSeparator + "MM" + oDTP.settings.dateSeparator + "dd";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm"
			sDate = "dd" + oDTP.settings.dateSeparator + "MMM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
			
			//  "dd-MMM-yyyy hh:mm AA"
			sDate = "dd" + oDTP.settings.dateSeparator + "MMM" + oDTP.settings.dateSeparator + "yyyy";
			sTime = "hh" + oDTP.settings.timeSeparator + "mm" + oDTP.settings.timeMeridiemSeparator + "AA";
			sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
			oDTP.oData.sArrInputDateTimeFormats.push(sDateTime);
		},

		_matchFormat: function(sMode, sFormat)
		{
			var oDTP = this;

			oDTP.oData.bArrMatchFormat = [];
			oDTP.oData.bDateMode = false;
			oDTP.oData.bTimeMode = false;
			oDTP.oData.bDateTimeMode = false;
			var oArrInput = [], iTempIndex;

			sMode = $.cf._isValid(sMode) ? sMode : oDTP.settings.mode;
			if($.cf._compare(sMode, "date"))
			{
				sFormat = $.cf._isValid(sFormat) ? sFormat : oDTP.oData.sDateFormat;
				oDTP.oData.bDateMode = true;
				oArrInput = oDTP.oData.sArrInputDateFormats;
			}
			else if($.cf._compare(sMode, "time"))
			{
				sFormat = $.cf._isValid(sFormat) ? sFormat : oDTP.oData.sTimeFormat;
				oDTP.oData.bTimeMode = true;
				oArrInput = oDTP.oData.sArrInputTimeFormats;
			}
			else if($.cf._compare(sMode, "datetime"))
			{
				sFormat = $.cf._isValid(sFormat) ? sFormat : oDTP.oData.sDateTimeFormat;
				oDTP.oData.bDateTimeMode = true;
				oArrInput = oDTP.oData.sArrInputDateTimeFormats;
			}

			for(iTempIndex = 0; iTempIndex < oArrInput.length; iTempIndex++)
			{
				oDTP.oData.bArrMatchFormat.push(
					$.cf._compare(sFormat, oArrInput[iTempIndex])
				);
			}
		},

		_setMatchFormat: function(iArgsLength, sMode, sFormat)
		{
			var oDTP = this;

			if(iArgsLength > 0)
				oDTP._matchFormat(sMode, sFormat);
		},

		_createPicker: function()
		{
			var oDTP = this;
		
			$(oDTP.element).addClass("dtpicker-overlay");
			$(".dtpicker-overlay").click(function(e)
			{
				oDTP._hidePicker("");
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
			$(oDTP.element).html(sTempStr);
		},
	
		_addEventHandlersForInput: function()
		{
			var oDTP = this;
		
			oDTP.oData.oInputElement = null;

			$(oDTP.settings.parentElement).find("input[type='date'], input[type='time'], input[type='datetime']").each(function()
			{
				$(this).attr("data-field", $(this).attr("type"));
				$(this).attr("type", "text");
			});	
        
			var sel = "[data-field='date'], [data-field='time'], [data-field='datetime']";
			$(oDTP.settings.parentElement).off("focus", sel, oDTP._inputFieldFocus);
			$(oDTP.settings.parentElement).on ("focus", sel, {"obj": oDTP}, oDTP._inputFieldFocus);
		
			$(oDTP.settings.parentElement).off("click", sel, oDTP._inputFieldClick);
			$(oDTP.settings.parentElement).on ("click", sel, {"obj": oDTP}, oDTP._inputFieldClick);

			if(oDTP.settings.addEventHandlers) //this is not an event-handler really. Its just a function called
				oDTP.settings.addEventHandlers.call(oDTP); // which could add EventHandlers
		},
	
		_inputFieldFocus: function(e)
		{
			var oDTP = e.data.obj;
			oDTP.showDateTimePicker(this);
			oDTP.oData.bMouseDown = false;
		},

		_inputFieldClick: function(e)
		{
          	var oDTP = e.data.obj;
			if(!$.cf._compare($(this).prop("tagName"), "input"))
			{
				oDTP.showDateTimePicker(this);
			}
			e.stopPropagation();
		},

		// Public Method
		setDateTimeStringInInputField: function(oInputField, dInput)
		{
			var oDTP = this;

			dInput = dInput || oDTP.oData.dCurrentDate;
		
			var oArrElements;
			if($.cf._isValid(oInputField))
			{
				oArrElements = [];
				if(typeof oInputField === "string")
					oArrElements.push(oInputField);
				else if(typeof oInputField === "object")
					oArrElements = oInputField;
			}
			else
			{
				if($.cf._isValid(oDTP.settings.parentElement))
				{
					oArrElements = $(oDTP.settings.parentElement).find("[data-field='date'], [data-field='time'], [data-field='datetime']");
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
		        if(!$.cf._isValid(sMode))
		    		sMode = oDTP.settings.mode;
		    
		    	sFormat = $(oElement).data("format");
		    	if(!$.cf._isValid(sFormat))
		    	{
			    	if($.cf._compare(sMode, "date"))
			    		sFormat = oDTP.settings.dateFormat;
			    	else if($.cf._compare(sMode, "time"))
			        	sFormat = oDTP.settings.timeFormat;
			        else if($.cf._compare(sMode, "datetime"))
			        	sFormat = oDTP.settings.dateTimeFormat;
			    }
			
				bIs12Hour = oDTP.getIs12Hour(sMode, sFormat);

		    	sOutput = oDTP._setOutput(sMode, sFormat, bIs12Hour, dInput);
		        $(oElement).val(sOutput);
			});
		},

		// Public Method
		getDateTimeStringInFormat: function(sMode, sFormat, dInput)
		{
			var oDTP = this;
			return oDTP._setOutput(sMode, sFormat, oDTP.getIs12Hour(sMode, sFormat), dInput);
		},
	
		// Public Method
		showDateTimePicker: function(oElement)
		{
			var oDTP = this;
			
			if(oDTP.oData.oInputElement !== null)
				oDTP._hidePicker(0, oElement);
			else
				oDTP._showPicker(oElement);
		},
	
		_setButtonAction: function(bFromTab)
		{
			var oDTP = this;
		
			if(oDTP.oData.oInputElement !== null)
			{
				oDTP._setValueOfElement(oDTP._setOutput());
				if(bFromTab)
					oDTP._hidePicker(0);
				else
					oDTP._hidePicker("");					
			}
		},

		_setOutput: function(sMode, sFormat, bIs12Hour, dCurrentDate)
		{
			var oDTP = this;
		
			dCurrentDate = $.cf._isValid(dCurrentDate) ? dCurrentDate : oDTP.oData.dCurrentDate;
			bIs12Hour = bIs12Hour || oDTP.oData.bIs12Hour;
		
			var sOutput = "",
			iDate = dCurrentDate.getDate(),
			iMonth = dCurrentDate.getMonth(),
			iYear = dCurrentDate.getFullYear(),
			iHour = dCurrentDate.getHours(),
			iMinutes = dCurrentDate.getMinutes(),
			iSeconds = dCurrentDate.getSeconds(),

			sDate, sMonth, sMeridiem, sHour, sMinutes, sSeconds,
			sDateStr = "", sTimeStr = "",
			iArgsLength = Function.length,
			bAddSeconds;

			// Set bDate, bTime, bDateTime & bArrMatchFormat based on arguments of this function 
			oDTP._setMatchFormat(iArgsLength, sMode, sFormat);
		
			if(oDTP.oData.bDateMode)
			{
				if(oDTP.oData.bArrMatchFormat[0])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
					sOutput = sDate + oDTP.settings.dateSeparator + sMonth + oDTP.settings.dateSeparator + iYear;
				}
				else if(oDTP.oData.bArrMatchFormat[1])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
					sOutput = sMonth + oDTP.settings.dateSeparator + sDate + oDTP.settings.dateSeparator + iYear;
				}
				else if(oDTP.oData.bArrMatchFormat[2])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
					sOutput = iYear + oDTP.settings.dateSeparator + sMonth + oDTP.settings.dateSeparator + sDate;
				}
				else if(oDTP.oData.bArrMatchFormat[3])
				{
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = oDTP.settings.shortMonthNames[iMonth];
				
					sOutput = sDate + oDTP.settings.dateSeparator + sMonth + oDTP.settings.dateSeparator + iYear;
				}
				else if(oDTP.oData.bArrMatchFormat[4])
				{
					iDate = 1;
					iMonth++;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sOutput = sMonth + oDTP.settings.monthYearSeparator + iYear;
				}
				else if(oDTP.oData.bArrMatchFormat[5])
				{
					iDate = 1;
					sMonth = oDTP.settings.shortMonthNames[iMonth];
				
					sOutput = sMonth + oDTP.settings.monthYearSeparator + iYear;
				}
				else if(oDTP.oData.bArrMatchFormat[6])
				{
					iDate = 1;
					sMonth = oDTP.settings.fullMonthNames[iMonth];
				
					sOutput = sMonth + oDTP.settings.monthYearSeparator + iYear;
				}
			}
			else if(oDTP.oData.bTimeMode)
			{
				if(oDTP.oData.bArrMatchFormat[0] ||
					oDTP.oData.bArrMatchFormat[2])
				{
					sMeridiem = oDTP._determineMeridiemFromHourAndMinutes(iHour, iMinutes);
					if(iHour === 0 && sMeridiem === "AM")
						iHour = 12;
					else if(iHour > 12 && sMeridiem === "PM")
						iHour -= 12;
				}

				sHour = (iHour < 10) ? ("0" + iHour) : iHour;
				sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;

				if(oDTP.oData.bArrMatchFormat[0])
				{
					sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;
					sOutput = sHour + oDTP.settings.timeSeparator + sMinutes + oDTP.settings.timeSeparator + sSeconds + oDTP.settings.timeMeridiemSeparator + sMeridiem;
				}
				else if(oDTP.oData.bArrMatchFormat[1])
				{
					sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;
					sOutput = sHour + oDTP.settings.timeSeparator + sMinutes + oDTP.settings.timeSeparator + sSeconds;
				}
				else if(oDTP.oData.bArrMatchFormat[2])
				{
					sOutput = sHour + oDTP.settings.timeSeparator + sMinutes + oDTP.settings.timeMeridiemSeparator + sMeridiem;
				}
				else if(oDTP.oData.bArrMatchFormat[3])
				{
					sOutput = sHour + oDTP.settings.timeSeparator + sMinutes;
				}
			}
			else if(oDTP.oData.bDateTimeMode) 
			{
				// Date Part - "dd-MM-yyyy"
				if(oDTP.oData.bArrMatchFormat[0] || 
					oDTP.oData.bArrMatchFormat[1] ||
					oDTP.oData.bArrMatchFormat[8] || 
					oDTP.oData.bArrMatchFormat[9])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sDateStr = sDate + oDTP.settings.dateSeparator + sMonth + oDTP.settings.dateSeparator + iYear;
				}
				// Date Part - "MM-dd-yyyy"
				else if(oDTP.oData.bArrMatchFormat[2] || 
						oDTP.oData.bArrMatchFormat[3] ||
						oDTP.oData.bArrMatchFormat[10] || 
						oDTP.oData.bArrMatchFormat[11])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sDateStr = sMonth + oDTP.settings.dateSeparator + sDate + oDTP.settings.dateSeparator + iYear;
				}
				// Date Part - "yyyy-MM-dd"
				else if(oDTP.oData.bArrMatchFormat[4] || 
						oDTP.oData.bArrMatchFormat[5] ||
						oDTP.oData.bArrMatchFormat[12] || 
						oDTP.oData.bArrMatchFormat[13])
				{
					iMonth++;
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
				
					sDateStr = iYear + oDTP.settings.dateSeparator + sMonth + oDTP.settings.dateSeparator + sDate;
				}
				// Date Part - "dd-MMM-yyyy"
				else if(oDTP.oData.bArrMatchFormat[6] || 
						oDTP.oData.bArrMatchFormat[7] ||
						oDTP.oData.bArrMatchFormat[14] || 
						oDTP.oData.bArrMatchFormat[15])
				{
					sDate = (iDate < 10) ? ("0" + iDate) : iDate;
					sMonth = oDTP.settings.shortMonthNames[iMonth];
				
					sDateStr = sDate + oDTP.settings.dateSeparator + sMonth + oDTP.settings.dateSeparator + iYear;
				}
			
				bAddSeconds = oDTP.oData.bArrMatchFormat[0] || 
						oDTP.oData.bArrMatchFormat[1] ||
						oDTP.oData.bArrMatchFormat[2] || 
						oDTP.oData.bArrMatchFormat[3] ||
						oDTP.oData.bArrMatchFormat[4] || 
						oDTP.oData.bArrMatchFormat[5] ||
						oDTP.oData.bArrMatchFormat[6] || 
						oDTP.oData.bArrMatchFormat[7];
				if(bIs12Hour)
				{
					sMeridiem = oDTP._determineMeridiemFromHourAndMinutes(iHour, iMinutes);
					if(iHour === 0 && sMeridiem === "AM")
						iHour = 12;
					else if(iHour > 12 && sMeridiem === "PM")
						iHour -= 12;
				
					sHour = (iHour < 10) ? ("0" + iHour) : iHour;
					sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
				
					if(bAddSeconds)
					{
						sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;						
						sTimeStr = sHour + oDTP.settings.timeSeparator + sMinutes + oDTP.settings.timeSeparator + sSeconds + oDTP.settings.timeMeridiemSeparator + sMeridiem;
					}
					else
					{
						sTimeStr = sHour + oDTP.settings.timeSeparator + sMinutes + oDTP.settings.timeMeridiemSeparator + sMeridiem;
					}
				}
				else
				{
					sHour = (iHour < 10) ? ("0" + iHour) : iHour;
					sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
				
					if(bAddSeconds)
					{
						sSeconds = (iSeconds < 10) ? ("0" + iSeconds) : iSeconds;						
						sTimeStr = sHour + oDTP.settings.timeSeparator + sMinutes + oDTP.settings.timeSeparator + sSeconds;
					}
					else
					{
						sTimeStr = sHour + oDTP.settings.timeSeparator + sMinutes;
					}
				}
			
				sOutput = sDateStr + oDTP.settings.dateTimeSeparator + sTimeStr;
			}

			// Reset bDate, bTime, bDateTime & bArrMatchFormat to original values
			oDTP._setMatchFormat(iArgsLength);

			return sOutput;
		},
	
		_clearButtonAction: function()
		{
			var oDTP = this;
		
			if(oDTP.oData.oInputElement !== null)
			{
				oDTP._setValueOfElement("");
			}
			oDTP._hidePicker("");
		},
	
		_setOutputOnIncrementOrDecrement: function()
		{
			var oDTP = this;
		
			if($.cf._isValid(oDTP.oData.oInputElement) && oDTP.settings.setValueInTextboxOnEveryClick)
			{
				oDTP._setValueOfElement(oDTP._setOutput());
			}
		},
	
		_showPicker: function(oElement)
		{
			var oDTP = this;

			if(oDTP.oData.oInputElement === null)
			{
				oDTP.oData.oInputElement = oElement;
				oDTP.oData.iTabIndex = parseInt($(oElement).attr("tabIndex"));
			
				var sMode = $(oElement).data("field") || "",
				sMinValue = $(oElement).data("min") || "",
				sMaxValue = $(oElement).data("max") || "",
				sFormat = $(oElement).data("format") || "",
				sView = $(oElement).data("view") || "",
				sStartEnd = $(oElement).data("startend") || "",
				sStartEndElem = $(oElement).data("startendelem") || "",
				sCurrent = oDTP._getValueOfElement(oElement) || "";
			
				if(sView !== "")
				{
					if($.cf._compare(sView, "Popup"))
						oDTP.setIsPopup(true);
					else 
						oDTP.setIsPopup(false);
				}
			
				if(!oDTP.settings.isPopup)
				{
					oDTP._createPicker();
				
					var iElemTop = $(oDTP.oData.oInputElement).offset().top + $(oDTP.oData.oInputElement).outerHeight(),
					iElemLeft = $(oDTP.oData.oInputElement).offset().left,
					iElemWidth =  $(oDTP.oData.oInputElement).outerWidth();
				
					$(oDTP.element).css({position: "absolute", top: iElemTop, left: iElemLeft, width: iElemWidth, height: "auto"});
				}

				if(oDTP.settings.beforeShow)
					oDTP.settings.beforeShow.call(oDTP, oElement);
			
				sMode = $.cf._isValid(sMode) ? sMode : oDTP.settings.mode;
				oDTP.settings.mode = sMode;
				if(!$.cf._isValid(sFormat))
				{
					if($.cf._compare(sMode, "date"))
						sFormat = oDTP.settings.dateFormat;
					else if($.cf._compare(sMode, "time"))
						sFormat = oDTP.settings.timeFormat;
					else if($.cf._compare(sMode, "datetime"))
						sFormat = oDTP.settings.dateTimeFormat;
				}

				oDTP._matchFormat(sMode, sFormat);
			
				oDTP.oData.dMinValue = null;
				oDTP.oData.dMaxValue = null;
				oDTP.oData.bIs12Hour = false;

				var sMin, sMax,
				sTempDate, dTempDate,
				sTempTime, dTempTime,
				sTempDateTime, dTempDateTime;
			
				if(oDTP.oData.bDateMode)
				{
					sMin = sMinValue || oDTP.settings.minDate;
					sMax = sMaxValue || oDTP.settings.maxDate;
				
					oDTP.oData.sDateFormat = sFormat;
				
					if($.cf._isValid(sMin))
						oDTP.oData.dMinValue = oDTP._parseDate(sMin);
					if($.cf._isValid(sMax))
						oDTP.oData.dMaxValue = oDTP._parseDate(sMax);
				
					if(sStartEnd !== "" && ($.cf._compare(sStartEnd, "start") || $.cf._compare(sStartEnd, "end")) && sStartEndElem !== "")
					{
						if($(sStartEndElem).length >= 1)
						{
							sTempDate = oDTP._getValueOfElement($(sStartEndElem));
							if(sTempDate !== "")
							{
								if(oDTP.settings.parseDateTimeString)
									dTempDate = oDTP.settings.parseDateTimeString.call(oDTP, sTempDate, sMode, $(sStartEndElem));
								else
									dTempDate = oDTP._parseDate(sTempDate);

								if($.cf._compare(sStartEnd, "start"))
								{
									if($.cf._isValid(sMax))
									{
										if(oDTP._compareDates(dTempDate, oDTP.oData.dMaxValue) < 0)
											oDTP.oData.dMaxValue = new Date(dTempDate);
									}
									else
										oDTP.oData.dMaxValue = new Date(dTempDate);
								}
								else if($.cf._compare(sStartEnd, "end"))
								{
									if($.cf._isValid(sMin))
									{
										if(oDTP._compareDates(dTempDate, oDTP.oData.dMinValue) > 0)
											oDTP.oData.dMinValue = new Date(dTempDate);
									}
									else
										oDTP.oData.dMinValue = new Date(dTempDate);
								}
							}
						}
					}
				
					if(oDTP.settings.parseDateTimeString)
						oDTP.oData.dCurrentDate = oDTP.settings.parseDateTimeString.call(oDTP, sCurrent, sMode, $(oElement));
					else
						oDTP.oData.dCurrentDate = oDTP._parseDate(sCurrent);

					oDTP.oData.dCurrentDate.setHours(0);
					oDTP.oData.dCurrentDate.setMinutes(0);
					oDTP.oData.dCurrentDate.setSeconds(0);
				}
				else if(oDTP.oData.bTimeMode)
				{
					sMin = sMinValue || oDTP.settings.minTime;
					sMax = sMaxValue || oDTP.settings.maxTime;
				
					oDTP.oData.sTimeFormat = sFormat;
				
					if($.cf._isValid(sMin))
						oDTP.oData.dMinValue = oDTP._parseTime(sMin);
					if($.cf._isValid(sMax))
						oDTP.oData.dMaxValue = oDTP._parseTime(sMax);
				
					if(sStartEnd !== "" && ($.cf._compare(sStartEnd, "start") || $.cf._compare(sStartEnd, "end")) && sStartEndElem !== "")
					{
						if($(sStartEndElem).length >= 1)
						{
							sTempTime = oDTP._getValueOfElement($(sStartEndElem));
							if(sTempTime !== "")
							{
								if(oDTP.settings.parseDateTimeString)
									dTempDate = oDTP.settings.parseDateTimeString.call(oDTP, sTempTime, sMode, $(sStartEndElem));
								else
									dTempTime = oDTP._parseTime(sTempTime);

								if($.cf._compare(sStartEnd, "start"))
								{
									dTempTime.setMinutes(dTempTime.getMinutes() - 1);
									if($.cf._isValid(sMax))
									{
										if(oDTP._compareTime(dTempTime, oDTP.oData.dMaxValue) === 2)
											oDTP.oData.dMaxValue = new Date(dTempTime);
									}
									else
										oDTP.oData.dMaxValue = new Date(dTempTime);
								}
								else if($.cf._compare(sStartEnd, "end"))
								{
									dTempTime.setMinutes(dTempTime.getMinutes() + 1);
									if($.cf._isValid(sMin))
									{
										if(oDTP._compareTime(dTempTime, oDTP.oData.dMinValue) === 3)
											oDTP.oData.dMinValue = new Date(dTempTime);
									}
									else
										oDTP.oData.dMinValue = new Date(dTempTime);
								}
							}
						}
					}
				
					oDTP.oData.bIs12Hour = oDTP.getIs12Hour();
					if(oDTP.settings.parseDateTimeString)
						oDTP.oData.dCurrentDate = oDTP.settings.parseDateTimeString.call(oDTP, sCurrent, sMode, $(oElement));
					else
						oDTP.oData.dCurrentDate = oDTP._parseTime(sCurrent);
				}
				else if(oDTP.oData.bDateTimeMode)
				{
					sMin = sMinValue || oDTP.settings.minDateTime;
					sMax = sMaxValue || oDTP.settings.maxDateTime;
				
					oDTP.oData.sDateTimeFormat = sFormat;
				
					if($.cf._isValid(sMin))
						oDTP.oData.dMinValue = oDTP._parseDateTime(sMin);
					if($.cf._isValid(sMax))
						oDTP.oData.dMaxValue = oDTP._parseDateTime(sMax);
				
					if(sStartEnd !== "" && ($.cf._compare(sStartEnd, "start") || $.cf._compare(sStartEnd, "end")) && sStartEndElem !== "")
					{
						if($(sStartEndElem).length >= 1)
						{
							sTempDateTime = oDTP._getValueOfElement($(sStartEndElem));
							if(sTempDateTime !== "")
							{
								if(oDTP.settings.parseDateTimeString)
									dTempDateTime = oDTP.settings.parseDateTimeString.call(oDTP, sTempDateTime, sMode, $(sStartEndElem));
								else
									dTempDateTime = oDTP._parseDateTime(sTempDateTime);

								if($.cf._compare(sStartEnd, "start"))
								{
									if($.cf._isValid(sMax))
									{
										if(oDTP._compareDateTime(dTempDateTime, oDTP.oData.dMaxValue) < 0)
											oDTP.oData.dMaxValue = new Date(dTempDateTime);
									}
									else
										oDTP.oData.dMaxValue = new Date(dTempDateTime);
								}
								else if($.cf._compare(sStartEnd, "end"))
								{
									if($.cf._isValid(sMin))
									{
										if(oDTP._compareDateTime(dTempDateTime, oDTP.oData.dMinValue) > 0)
											oDTP.oData.dMinValue = new Date(dTempDateTime);
									}
									else
										oDTP.oData.dMinValue = new Date(dTempDateTime);
								}
							}
						}
					}
				
					oDTP.oData.bIs12Hour = oDTP.getIs12Hour();
					if(oDTP.settings.parseDateTimeString)
						oDTP.oData.dCurrentDate = oDTP.settings.parseDateTimeString.call(oDTP, sCurrent, sMode, $(oElement));
					else
						oDTP.oData.dCurrentDate = oDTP._parseDateTime(sCurrent);
				}
			
				oDTP._setVariablesForDate();
				oDTP._modifyPicker();
				$(oDTP.element).fadeIn(oDTP.settings.animationDuration);

				if(oDTP.settings.afterShow)
				{
					setTimeout(function()
					{
						oDTP.settings.afterShow.call(oDTP, oElement);
					}, oDTP.settings.animationDuration);	
				}
			}
		},
	
		_hidePicker: function(iDuration, oElementToShow)
		{
			var oDTP = this;
			var oElement = oDTP.oData.oInputElement;

			if(oDTP.settings.beforeHide)
				oDTP.settings.beforeHide.call(oDTP, oElement);

			if(!$.cf._isValid(iDuration))
				iDuration = oDTP.settings.animationDuration;
		
			if($.cf._isValid(oDTP.oData.oInputElement))
			{
				$(oDTP.oData.oInputElement).blur();
				oDTP.oData.oInputElement = null;
			}
		
			$(oDTP.element).fadeOut(iDuration);
			if(iDuration === 0)
			{
				$(oDTP.element).find('.dtpicker-subcontent').html("");
			}
			else
			{
				setTimeout(function()
				{
					$(oDTP.element).find('.dtpicker-subcontent').html("");
				}, iDuration);
			}

			$(document).unbind("click.DateTimePicker");
			$(document).unbind("keydown.DateTimePicker");
			$(document).unbind("keyup.DateTimePicker");

			if(oDTP.settings.afterHide)
			{
				if(iDuration === 0)
				{
					oDTP.settings.afterHide.call(oDTP, oElement);
				}
				else
				{
					setTimeout(function()
					{
						oDTP.settings.afterHide.call(oDTP, oElement);
					}, iDuration);
				}
			}

			if($.cf._isValid(oElementToShow))
				oDTP._showPicker(oElementToShow);
		},
	
		_modifyPicker: function()
		{
			var oDTP = this;

			var sTitleContent, iNumberOfColumns;
			var sArrFields = [];
			if(oDTP.oData.bDateMode)
			{
				sTitleContent = oDTP.settings.titleContentDate;
				iNumberOfColumns = 3;
			
				if(oDTP.oData.bArrMatchFormat[0])  // "dd-MM-yyyy"
				{
					sArrFields = ["day", "month", "year"];
				}
				else if(oDTP.oData.bArrMatchFormat[1])  // "MM-dd-yyyy"
				{
					sArrFields = ["month", "day", "year"];
				}
				else if(oDTP.oData.bArrMatchFormat[2])  // "yyyy-MM-dd"
				{
					sArrFields = ["year", "month", "day"];
				}
				else if(oDTP.oData.bArrMatchFormat[3])  // "dd-MMM-yyyy"
				{
					sArrFields = ["day", "month", "year"];
				}
				else if(oDTP.oData.bArrMatchFormat[4])  // "MM-yyyy"
				{
					iNumberOfColumns = 2;
					sArrFields = ["month", "year"];
				}
				else if(oDTP.oData.bArrMatchFormat[5])  // "MMM yyyy"
				{
					iNumberOfColumns = 2;
					sArrFields = ["month", "year"];
				}
				else if(oDTP.oData.bArrMatchFormat[6])  // "MMMM yyyy"
				{
					iNumberOfColumns = 2;
					sArrFields = ["month", "year"];
				}
			}
			else if(oDTP.oData.bTimeMode)
			{
				sTitleContent = oDTP.settings.titleContentTime;
				if(oDTP.oData.bArrMatchFormat[0]) // hh:mm:ss AA
				{
					iNumberOfColumns = 4;
					sArrFields = ["hour", "minutes", "seconds", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[1]) // HH:mm:ss
				{
					iNumberOfColumns = 3;
					sArrFields = ["hour", "minutes", "seconds"];
				}
				else if(oDTP.oData.bArrMatchFormat[2]) // hh:mm AA
				{
					iNumberOfColumns = 3;
					sArrFields = ["hour", "minutes", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[3]) // HH:mm
				{
					iNumberOfColumns = 2;
					sArrFields = ["hour", "minutes"];
				}
			}
			else if(oDTP.oData.bDateTimeMode)
			{
				sTitleContent = oDTP.settings.titleContentDateTime;
			
				if(oDTP.oData.bArrMatchFormat[0])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds"];
				}
				else if(oDTP.oData.bArrMatchFormat[1])
				{
					iNumberOfColumns = 7;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[2])
				{
					iNumberOfColumns = 6;
					sArrFields = ["month", "day", "year", "hour", "minutes", "seconds"];
				}
				else if(oDTP.oData.bArrMatchFormat[3])
				{
					iNumberOfColumns = 7;
					sArrFields = ["month", "day", "year", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[4])
				{
					iNumberOfColumns = 6;
					sArrFields = ["year", "month", "day", "hour", "minutes", "seconds"];
				}
				else if(oDTP.oData.bArrMatchFormat[5])
				{
					iNumberOfColumns = 7;
					sArrFields = ["year", "month", "day", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[6])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds"];
				}
				else if(oDTP.oData.bArrMatchFormat[7])
				{
					iNumberOfColumns = 7;
					sArrFields = ["day", "month", "year", "hour", "minutes", "seconds", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[8])
				{
					iNumberOfColumns = 5;
					sArrFields = ["day", "month", "year", "hour", "minutes"];
				}
				else if(oDTP.oData.bArrMatchFormat[9])
				{
					iNumberOfColumns = 6;
					sArrFields = ["day", "month", "year", "hour", "minutes", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[10])
				{
					iNumberOfColumns = 5;
					sArrFields = ["month", "day", "year", "hour", "minutes"];
				}
				else if(oDTP.oData.bArrMatchFormat[11])
				{
					iNumberOfColumns = 6;
					sArrFields = ["month", "day", "year", "hour", "minutes", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[12])
				{
					iNumberOfColumns = 5;
					sArrFields = ["year", "month", "day", "hour", "minutes"];
				}
				else if(oDTP.oData.bArrMatchFormat[13])
				{
					iNumberOfColumns = 6;
					sArrFields = ["year", "month", "day", "hour", "minutes", "meridiem"];
				}
				else if(oDTP.oData.bArrMatchFormat[14])
				{
					iNumberOfColumns = 5;
					sArrFields = ["day", "month", "year", "hour", "minutes"];
				}
				else if(oDTP.oData.bArrMatchFormat[15])
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
			
			for(iTempIndex = 0; iTempIndex < oDTP.settings.buttonsToDisplay.length; iTempIndex++)
			{
				if($.cf._compare(oDTP.settings.buttonsToDisplay[iTempIndex], "HeaderCloseButton"))
					bDisplayHeaderCloseButton = true;
				else if($.cf._compare(oDTP.settings.buttonsToDisplay[iTempIndex], "SetButton"))
					bDisplaySetButton = true;
				else if($.cf._compare(oDTP.settings.buttonsToDisplay[iTempIndex], "ClearButton"))
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
				sDTPickerComp += "<a class='dtpicker-compButton increment'>" + oDTP.settings.incrementButtonContent + "</a>";
				sDTPickerComp += "<input type='text' class='dtpicker-compValue'></input>";
				sDTPickerComp += "<a class='dtpicker-compButton decrement'>" + oDTP.settings.decrementButtonContent + "</a>";
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
				sDTPickerButtons += "<a class='dtpicker-button dtpicker-buttonSet'>" + oDTP.settings.setButtonContent + "</a>";
			if(bDisplayClearButton)
				sDTPickerButtons += "<a class='dtpicker-button dtpicker-buttonClear'>" + oDTP.settings.clearButtonContent + "</a>";
			sDTPickerButtons += "</div>";
		
			//--------------------------------------------------------------------
		
			var sTempStr = sHeader + sDTPickerComp + sDTPickerButtons;
		
			$(oDTP.element).find('.dtpicker-subcontent').html(sTempStr);
		
			oDTP._setCurrentDate();
			oDTP._addEventHandlersForPicker();
		},
	
		_addEventHandlersForPicker: function()
		{
			var oDTP = this;
		
			$(document).on("click.DateTimePicker", function(e)
			{
				oDTP._hidePicker("");
			});
		
			$(document).on("keydown.DateTimePicker", function(e)
			{
				if(! $('.dtpicker-compValue').is(':focus') && parseInt(e.keyCode ? e.keyCode : e.which) === 9)
				{
					oDTP._setButtonAction(true);
					$("[tabIndex=" + (oDTP.oData.iTabIndex + 1) + "]").focus();
					return false;
				}
			});

			$(document).on("keydown.DateTimePicker", function(e)
			{
				if(! $('.dtpicker-compValue').is(':focus') && parseInt(e.keyCode ? e.keyCode : e.which) !== 9)
				{
					oDTP._hidePicker("");
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
				oDTP.oData.bElemFocused = true;
			});
		
			$('.dtpicker-compValue').on("blur", function()
			{
				console.log("Executed blur");
				oDTP._getValuesFromInputBoxes();
				oDTP._setCurrentDate();
			
				oDTP.oData.bElemFocused = false;
				var $oParentElem = $(this).parent().parent();
				setTimeout(function()
				{
					if($oParentElem.is(':last-child') && !oDTP.oData.bElemFocused)
					{
						oDTP._setButtonAction(false);
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
		
			$(oDTP.element).find('.dtpicker-close').click(function(e)
			{
				if(oDTP.settings.buttonClicked)
					oDTP.settings.buttonClicked.call(oDTP, "CLOSE", oDTP.oData.oInputElement);
				oDTP._hidePicker("");
			});
		
			$(oDTP.element).find('.dtpicker-buttonSet').click(function(e)
			{
				if(oDTP.settings.buttonClicked)
					oDTP.settings.buttonClicked.call(oDTP, "SET", oDTP.oData.oInputElement);
				oDTP._setButtonAction(false);
			});
		
			$(oDTP.element).find('.dtpicker-buttonClear').click(function(e)
			{
				if(oDTP.settings.buttonClicked)
					oDTP.settings.buttonClicked.call(oDTP, "CLEAR", oDTP.oData.oInputElement);
				oDTP._clearButtonAction();
			});
		
			// ----------------------------------------------------------------------------
		
			$(oDTP.element).find(".day .increment, .day .increment *").click(function(e)
			{
				oDTP.oData.iCurrentDay++;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".day .decrement, .day .decrement *").click(function(e)
			{
				oDTP.oData.iCurrentDay--;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".month .increment, .month .increment *").click(function(e)
			{
				oDTP.oData.iCurrentMonth++;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".month .decrement, .month .decrement *").click(function(e)
			{
				oDTP.oData.iCurrentMonth--;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".year .increment, .year .increment *").click(function(e)
			{
				oDTP.oData.iCurrentYear++;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".year .decrement, .year .decrement *").click(function(e)
			{
				oDTP.oData.iCurrentYear--;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".hour .increment, .hour .increment *").click(function(e)
			{
				oDTP.oData.iCurrentHour++;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".hour .decrement, .hour .decrement *").click(function(e)
			{
				oDTP.oData.iCurrentHour--;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".minutes .increment, .minutes .increment *").click(function(e)
			{
				oDTP.oData.iCurrentMinutes += oDTP.settings.minuteInterval;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".minutes .decrement, .minutes .decrement *").click(function(e)
			{
				oDTP.oData.iCurrentMinutes -= oDTP.settings.minuteInterval;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});

			$(oDTP.element).find(".seconds .increment, .seconds .increment *").click(function(e)
			{
				oDTP.oData.iCurrentSeconds += oDTP.settings.secondsInterval;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".seconds .decrement, .seconds .decrement *").click(function(e)
			{
				oDTP.oData.iCurrentSeconds -= oDTP.settings.secondsInterval;
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		
			$(oDTP.element).find(".meridiem .dtpicker-compButton").click(function(e)
			{
				if($.cf._compare(oDTP.oData.sCurrentMeridiem, "AM"))
				{
					oDTP.oData.sCurrentMeridiem = "PM";
					oDTP.oData.iCurrentHour += 12;
				}
				else if($.cf._compare(oDTP.oData.sCurrentMeridiem, "PM"))
				{
					oDTP.oData.sCurrentMeridiem = "AM";
					oDTP.oData.iCurrentHour -= 12;
				}				
				oDTP._setCurrentDate();
				oDTP._setOutputOnIncrementOrDecrement();
			});
		},

		_adjustMinutes: function(iMinutes) 
		{
			var oDTP = this;
			if(oDTP.settings.roundOffMinutes && oDTP.settings.minuteInterval !== 1)
			{
				iMinutes = (iMinutes % oDTP.settings.minuteInterval) ? (iMinutes - (iMinutes % oDTP.settings.minuteInterval) + oDTP.settings.minuteInterval) : iMinutes;
			}
			return iMinutes;
		},

		_adjustSeconds: function(iSeconds) 
		{
			var oDTP = this;
			if(oDTP.settings.roundOffSeconds && oDTP.settings.secondsInterval !== 1)
			{
				iSeconds = (iSeconds % oDTP.settings.secondsInterval) ? (iSeconds - (iSeconds % oDTP.settings.secondsInterval) + oDTP.settings.secondsInterval) : iSeconds;
			}
			return iSeconds;
		},
	
		_getValueOfElement: function(oElem)
		{
			var oDTP = this;
			var sElemValue = "";
		
			if($.cf._compare($(oElem).prop("tagName"), "INPUT"))
				sElemValue = $(oElem).val();
			else
				sElemValue = $(oElem).html();
		
			return sElemValue;
		},
	
		_setValueOfElement: function(sElemValue)
		{
			var oDTP = this;
		
			var $oElem = $(oDTP.oData.oInputElement);
			
			if(sElemValue !== "" && oDTP.settings.formatDateTimeString)
			{
				var sMode, oDate;

				sMode = $oElem.data("field");
				sMode = $.cf._isValid(sMode) ? sMode : oDTP.settings.mode;

				if(oDTP.oData.bDateMode || oDTP.oData.bDateTimeMode)
					oDate = $.extend(oDate, oDTP._formatDate());
				if(oDTP.oData.bTimeMode || oDTP.oData.bDateTimeMode)
					oDate = $.extend(oDate, oDTP._formatDate());
				
				sElemValue = oDTP.settings.formatDateTimeString.call(oDTP, oDate, sMode, $oElem);
			}

			if($.cf._compare($oElem.prop("tagName"), "INPUT"))
				$oElem.val(sElemValue);
			else
				$oElem.html(sElemValue);
		
			$oElem.change();
		
			return sElemValue;
		},
	
		//-----------------------------------------------------------------
	
		_parseDate: function(sDate)
		{
			var oDTP = this;

			var dTempDate = new Date(oDTP.settings.defaultDate),
			iDate = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iYear = dTempDate.getFullYear();
		
			if($.cf._isValid(sDate))
			{
				var sArrDate;
				if(oDTP.oData.bArrMatchFormat[4] || oDTP.oData.bArrMatchFormat[5] || oDTP.oData.bArrMatchFormat[6])
					sArrDate = sDate.split(oDTP.settings.monthYearSeparator);
				else
					sArrDate = sDate.split(oDTP.settings.dateSeparator);
			
				if(oDTP.oData.bArrMatchFormat[0])  // "dd-MM-yyyy"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iYear = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[1])  // "MM-dd-yyyy"
				{
					iMonth = parseInt(sArrDate[0] - 1);
					iDate = parseInt(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[2])  // "yyyy-MM-dd"
				{
					iYear = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iDate = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[3])  // "dd-MMM-yyyy"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = oDTP._getShortMonthIndex(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[4])  // "MM-yyyy"
				{
					iDate = 1;
					iMonth = parseInt(sArrDate[0]) - 1;
					iYear = parseInt(sArrDate[1]);
				}
				else if(oDTP.oData.bArrMatchFormat[5])  // "MMM yyyy"
				{
					iDate = 1;
					iMonth = oDTP._getShortMonthIndex(sArrDate[0]);
					iYear = parseInt(sArrDate[1]);
				}
				else if(oDTP.oData.bArrMatchFormat[6])  // "MMMM yyyy"
				{
					iDate = 1;
					iMonth = oDTP._getFullMonthIndex(sArrDate[0]);
					iYear = parseInt(sArrDate[1]);
				}
			}

			dTempDate = new Date(iYear, iMonth, iDate, 0, 0, 0, 0);
			return dTempDate;
		},
	
		_parseTime: function(sTime)
		{
			var oDTP = this;
		
			var dTempDate = new Date(oDTP.settings.defaultDate),
			iDate = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iYear = dTempDate.getFullYear(),
			iHour = dTempDate.getHours(),
			iMinutes = dTempDate.getMinutes(),
			iSeconds = dTempDate.getSeconds(),
			sArrTime, sMeridiem, sArrTimeComp,
			bShowSeconds = oDTP.oData.bArrMatchFormat[0] ||
							oDTP.oData.bArrMatchFormat[1];

			iSeconds = bShowSeconds ? oDTP._adjustSeconds(iSeconds) : 0;
		
			if($.cf._isValid(sTime))
			{
				if(oDTP.oData.bIs12Hour)
				{
					sArrTime = sTime.split(oDTP.settings.timeMeridiemSeparator);
					sTime = sArrTime[0];
					sMeridiem = sArrTime[1];

					if(!($.cf._compare(sMeridiem, "AM") || $.cf._compare(sMeridiem, "PM")))
						sMeridiem = "";
				}

				sArrTimeComp = sTime.split(oDTP.settings.timeSeparator);
				iHour = parseInt(sArrTimeComp[0]);
				iMinutes = parseInt(sArrTimeComp[1]);

				if(bShowSeconds)
				{
					iSeconds = parseInt(sArrTimeComp[2]);
					iSeconds = oDTP._adjustSeconds(iSeconds);
				}

				if(iHour === 12 && $.cf._compare(sMeridiem, "AM"))
					iHour = 0;
				else if(iHour < 12 && $.cf._compare(sMeridiem, "PM"))
					iHour += 12;
			}
			iMinutes = oDTP._adjustMinutes(iMinutes);
		
			dTempDate = new Date(iYear, iMonth, iDate, iHour, iMinutes, iSeconds, 0);
		
			return dTempDate;
		},
	
		_parseDateTime: function(sDateTime)
		{
			var oDTP = this;
		
			var dTempDate = new Date(oDTP.settings.defaultDate),
			iDate = dTempDate.getDate(),
			iMonth = dTempDate.getMonth(),
			iYear = dTempDate.getFullYear(),
			iHour = dTempDate.getHours(),
			iMinutes = dTempDate.getMinutes(),
			iSeconds = dTempDate.getSeconds(),
			sMeridiem = "",
			sArrDateTime, sArrDate, sTime, sArrTimeComp, sArrTime,
			bShowSeconds = oDTP.oData.bArrMatchFormat[0] || 
							oDTP.oData.bArrMatchFormat[1] ||
							oDTP.oData.bArrMatchFormat[2] || 
							oDTP.oData.bArrMatchFormat[3] ||
							oDTP.oData.bArrMatchFormat[4] || 
							oDTP.oData.bArrMatchFormat[5] ||
							oDTP.oData.bArrMatchFormat[6] || 
							oDTP.oData.bArrMatchFormat[7];

			iSeconds = bShowSeconds ? oDTP._adjustSeconds(iSeconds) : 0;
		
			if($.cf._isValid(sDateTime))
			{
				sArrDateTime = sDateTime.split(oDTP.settings.dateTimeSeparator);
				sArrDate = sArrDateTime[0].split(oDTP.settings.dateSeparator);
			
				if(oDTP.oData.bArrMatchFormat[0] || // "dd-MM-yyyy HH:mm:ss"
					oDTP.oData.bArrMatchFormat[1]) // ""dd-MM-yyyy hh:mm:ss AA"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iYear = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[2] ||  // "MM-dd-yyyy HH:mm:ss"
					oDTP.oData.bArrMatchFormat[3]) // "MM-dd-yyyy hh:mm:ss AA"
				{
					iMonth = parseInt(sArrDate[0] - 1);
					iDate = parseInt(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[4] ||  // "yyyy-MM-dd HH:mm:ss"
					oDTP.oData.bArrMatchFormat[5]) // "yyyy-MM-dd hh:mm:ss AA"
				{
					iYear = parseInt(sArrDate[0]);
					iMonth = parseInt(sArrDate[1] - 1);
					iDate = parseInt(sArrDate[2]);
				}
				else if(oDTP.oData.bArrMatchFormat[6] || // "dd-MMM-yyyy HH:mm:ss"
					oDTP.oData.bArrMatchFormat[7]) // "dd-MMM-yyyy hh:mm:ss AA"
				{
					iDate = parseInt(sArrDate[0]);
					iMonth = oDTP._getShortMonthIndex(sArrDate[1]);
					iYear = parseInt(sArrDate[2]);
				}
			
				sTime = sArrDateTime[1];
				if(oDTP.oData.bIs12Hour)
				{
					if($.cf._compare(oDTP.settings.dateTimeSeparator, oDTP.settings.timeMeridiemSeparator) && (sArrDateTime.length === 3))
						sMeridiem = sArrDateTime[2];
					else
					{
						sArrTimeComp = sTime.split(oDTP.settings.timeMeridiemSeparator);
						sTime = sArrTimeComp[0];
						sMeridiem = sArrTimeComp[1];
					}
				
					if(!($.cf._compare(sMeridiem, "AM") || $.cf._compare(sMeridiem, "PM")))
						sMeridiem = "";
				}
				
				sArrTime = sTime.split(oDTP.settings.timeSeparator);

				iHour = parseInt(sArrTime[0]);
				iMinutes = parseInt(sArrTime[1]);
				if(bShowSeconds)
				{
					iSeconds = parseInt(sArrTime[2]);
				}

				if(iHour === 12 && $.cf._compare(sMeridiem, "AM"))
					iHour = 0;
				else if(iHour < 12 && $.cf._compare(sMeridiem, "PM"))
					iHour += 12;
			}
			iMinutes = oDTP._adjustMinutes(iMinutes);
    	
			dTempDate = new Date(iYear, iMonth, iDate, iHour, iMinutes, iSeconds, 0);
			return dTempDate;
		},
	
		_getShortMonthIndex: function(sMonthName)
		{
			var oDTP = this;

			for(var iTempIndex = 0; iTempIndex < oDTP.settings.shortMonthNames.length; iTempIndex++)
			{
				if($.cf._compare(sMonthName, oDTP.settings.shortMonthNames[iTempIndex]))
					return iTempIndex;
			}
		},

		_getFullMonthIndex: function(sMonthName)
		{
			var oDTP = this;

			for(var iTempIndex = 0; iTempIndex < oDTP.settings.fullMonthNames.length; iTempIndex++)
			{
				if($.cf._compare(sMonthName, oDTP.settings.fullMonthNames[iTempIndex]))
					return iTempIndex;
			}
		},

		// Public Method
		getIs12Hour: function(sMode, sFormat)
		{
			var oDTP = this;

			var bIs12Hour = false, 
			iArgsLength = Function.length;

			oDTP._setMatchFormat(iArgsLength, sMode, sFormat);

			if(oDTP.oData.bTimeMode)
	        {
	        	bIs12Hour = oDTP.oData.bArrMatchFormat[0] || 
	        				oDTP.oData.bArrMatchFormat[2];
	        }
	        else if(oDTP.oData.bDateTimeMode)
	        {
	        	bIs12Hour = oDTP.oData.bArrMatchFormat[1] ||
							oDTP.oData.bArrMatchFormat[3] ||
							oDTP.oData.bArrMatchFormat[5] ||
							oDTP.oData.bArrMatchFormat[7] ||
							oDTP.oData.bArrMatchFormat[9] ||
							oDTP.oData.bArrMatchFormat[11] ||
							oDTP.oData.bArrMatchFormat[13] ||
							oDTP.oData.bArrMatchFormat[15];
			}

			oDTP._setMatchFormat(iArgsLength);

			return bIs12Hour;
		},
	
		//-----------------------------------------------------------------
	
		_setVariablesForDate: function()
		{
			var oDTP = this;
		
			oDTP.oData.iCurrentDay = oDTP.oData.dCurrentDate.getDate();
			oDTP.oData.iCurrentMonth = oDTP.oData.dCurrentDate.getMonth();
			oDTP.oData.iCurrentYear = oDTP.oData.dCurrentDate.getFullYear();
		
			if(oDTP.oData.bTimeMode || oDTP.oData.bDateTimeMode)
			{
				oDTP.oData.iCurrentHour = oDTP.oData.dCurrentDate.getHours();
				oDTP.oData.iCurrentMinutes = oDTP.oData.dCurrentDate.getMinutes();
				oDTP.oData.iCurrentSeconds = oDTP.oData.dCurrentDate.getSeconds();
			
				if(oDTP.oData.bIs12Hour)
				{
					oDTP.oData.sCurrentMeridiem = oDTP._determineMeridiemFromHourAndMinutes(oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes);
				}
			}
		},
	
		_getValuesFromInputBoxes: function()
		{
			var oDTP = this;
		
			if(oDTP.oData.bDateMode || oDTP.oData.bDateTimeMode)
			{
				var sMonth, iMonth;

				sMonth = $(oDTP.element).find(".month .dtpicker-compValue").val();
				if(sMonth.length > 1)
					sMonth = sMonth.charAt(0).toUpperCase() + sMonth.slice(1);
				iMonth = oDTP.settings.shortMonthNames.indexOf(sMonth);
				if(iMonth !== -1)
				{
					oDTP.oData.iCurrentMonth = parseInt(iMonth);
				}
				else
				{
					if(sMonth.match("^[+|-]?[0-9]+$"))
					{
						oDTP.oData.iCurrentMonth = parseInt(sMonth - 1);
					}
				}
			
				oDTP.oData.iCurrentDay = parseInt($(oDTP.element).find(".day .dtpicker-compValue").val()) || oDTP.oData.iCurrentDay;					
				oDTP.oData.iCurrentYear = parseInt($(oDTP.element).find(".year .dtpicker-compValue").val()) || oDTP.oData.iCurrentYear;
			}
		
			if(oDTP.oData.bTimeMode || oDTP.oData.bDateTimeMode)
			{
				var iTempHour, iTempMinutes, iTempSeconds, sMeridiem;

				iTempHour = parseInt($(oDTP.element).find(".hour .dtpicker-compValue").val());
				iTempMinutes = oDTP._adjustMinutes(parseInt($(oDTP.element).find(".minutes .dtpicker-compValue").val()));
				iTempSeconds = oDTP._adjustMinutes(parseInt($(oDTP.element).find(".seconds .dtpicker-compValue").val()));

				oDTP.oData.iCurrentHour = isNaN(iTempHour) ? oDTP.oData.iCurrentHour : iTempHour;
				oDTP.oData.iCurrentMinutes = isNaN(iTempMinutes) ? oDTP.oData.iCurrentMinutes : iTempMinutes;
				oDTP.oData.iCurrentSeconds = isNaN(iTempSeconds) ? oDTP.oData.iCurrentSeconds : iTempSeconds;
			
				if(oDTP.oData.iCurrentSeconds > 59)
				{
					oDTP.oData.iCurrentMinutes += oDTP.oData.iCurrentSeconds / 60;
					oDTP.oData.iCurrentSeconds = oDTP.oData.iCurrentSeconds % 60;
				}
				if(oDTP.oData.iCurrentMinutes > 59)
				{
					oDTP.oData.iCurrentHour += oDTP.oData.iCurrentMinutes / 60;
					oDTP.oData.iCurrentMinutes = oDTP.oData.iCurrentMinutes % 60;
				}

				if(oDTP.oData.bIs12Hour)
				{
					if(oDTP.oData.iCurrentHour > 12)
						oDTP.oData.iCurrentHour = (oDTP.oData.iCurrentHour % 12);
				}
				else
				{
					if(oDTP.oData.iCurrentHour > 23)
						oDTP.oData.iCurrentHour = (oDTP.oData.iCurrentHour % 23);
				}
			
				if(oDTP.oData.bIs12Hour)
				{
					sMeridiem = $(oDTP.element).find(".meridiem .dtpicker-compValue").val();
					if($.cf._compare(sMeridiem, "AM") || $.cf._compare(sMeridiem, "PM"))
						oDTP.oData.sCurrentMeridiem = sMeridiem;
				
					if($.cf._compare(oDTP.oData.sCurrentMeridiem, "PM"))
					{
						if(oDTP.oData.iCurrentHour !== 12 && oDTP.oData.iCurrentHour < 13)
							oDTP.oData.iCurrentHour += 12;
					}
					if($.cf._compare(oDTP.oData.sCurrentMeridiem, "AM") && oDTP.oData.iCurrentHour === 12)
						oDTP.oData.iCurrentHour = 0;
				}
			}
		},
	
		_setCurrentDate: function()
		{
			var oDTP = this;
		
			if(oDTP.oData.bTimeMode || oDTP.oData.bDateTimeMode)
			{
				if(oDTP.oData.iCurrentSeconds > 59)
				{
					oDTP.oData.iCurrentMinutes += oDTP.oData.iCurrentSeconds / 60;
					oDTP.oData.iCurrentSeconds = oDTP.oData.iCurrentSeconds % 60;
				}
				else if(oDTP.oData.iCurrentSeconds < 0)
				{
					oDTP.oData.iCurrentMinutes -= oDTP.settings.minuteInterval;
					oDTP.oData.iCurrentSeconds += 60;
				}
				oDTP.oData.iCurrentMinutes = oDTP._adjustMinutes(oDTP.oData.iCurrentMinutes);
				oDTP.oData.iCurrentSeconds = oDTP._adjustSeconds(oDTP.oData.iCurrentSeconds);
			}

			var dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0),
			bGTMaxDate = false, bLTMinDate = false,
			sFormat, oDate, oFormattedDate, oFormattedTime,
			sDate, sTime, sDateTime;
		
			if(oDTP.oData.dMaxValue !== null)
				bGTMaxDate = (dTempDate.getTime() > oDTP.oData.dMaxValue.getTime());
			if(oDTP.oData.dMinValue !== null)
				bLTMinDate = (dTempDate.getTime() < oDTP.oData.dMinValue.getTime());
		
			if(bGTMaxDate || bLTMinDate)
			{
				var bCDGTMaxDate = false, bCDLTMinDate = false; 
				if(oDTP.oData.dMaxValue !== null)
					bCDGTMaxDate = (oDTP.oData.dCurrentDate.getTime() > oDTP.oData.dMaxValue.getTime());
				if(oDTP.oData.dMinValue !== null)
					bCDLTMinDate = (oDTP.oData.dCurrentDate.getTime() < oDTP.oData.dMinValue.getTime());
			
				if(!(bCDGTMaxDate || bCDLTMinDate))
					dTempDate = new Date(oDTP.oData.dCurrentDate);
				else
				{
					if(bCDGTMaxDate)
					{
						dTempDate = new Date(oDTP.oData.dMaxValue);
						console.log("Info : Date/Time/DateTime you entered is later than Maximum value, so DateTimePicker is showing Maximum value in Input Field.");
					}
					if(bCDLTMinDate)
					{
						dTempDate = new Date(oDTP.oData.dMinValue);
						console.log("Info : Date/Time/DateTime you entered is earlier than Minimum value, so DateTimePicker is showing Minimum value in Input Field.");
					}
					console.log("Please enter proper Date/Time/DateTime values.");
				}
			}
		
			oDTP.oData.dCurrentDate = new Date(dTempDate);
			oDTP._setVariablesForDate();

			oDate = {}; sDate = ""; sTime = ""; sDateTime = "";

			if(oDTP.oData.bDateMode || oDTP.oData.bDateTimeMode)
			{
				if(oDTP.oData.bDateMode && (oDTP.oData.bArrMatchFormat[4] || oDTP.oData.bArrMatchFormat[5] || oDTP.oData.bArrMatchFormat[6]))
					oDTP.oData.iCurrentDay = 1;
			
				oFormattedDate = oDTP._formatDate();

				$(oDTP.element).find('.day .dtpicker-compValue').val(oFormattedDate.dd);
			
				if(oDTP.oData.bDateMode)
				{
					if(oDTP.oData.bArrMatchFormat[4])  // "MM-yyyy"
						$(oDTP.element).find('.month .dtpicker-compValue').val(oFormattedDate.MM);
					else if(oDTP.oData.bArrMatchFormat[6])  // "MMMM yyyy"
						$(oDTP.element).find('.month .dtpicker-compValue').val(oFormattedDate.month);
					else
						$(oDTP.element).find('.month .dtpicker-compValue').val(oFormattedDate.monthShort);
				}
				else
					$(oDTP.element).find('.month .dtpicker-compValue').val(oFormattedDate.monthShort);
			
				$(oDTP.element).find('.year .dtpicker-compValue').val(oFormattedDate.yyyy);
			
				if(oDTP.settings.formatHumanDate)
				{
					oDate = $.extend(oDate, oFormattedDate);
				}
				else
				{
					if(oDTP.oData.bDateMode && (oDTP.oData.bArrMatchFormat[4] || oDTP.oData.bArrMatchFormat[5] || oDTP.oData.bArrMatchFormat[6]))
					{
						if(oDTP.oData.bArrMatchFormat[4])
							sDate = oFormattedDate.MM + oDTP.settings.monthYearSeparator + oFormattedDate.yyyy;
						else if(oDTP.oData.bArrMatchFormat[5])
							sDate = oFormattedDate.monthShort + oDTP.settings.monthYearSeparator + oFormattedDate.yyyy;
						else if(oDTP.oData.bArrMatchFormat[6])
							sDate = oFormattedDate.month + oDTP.settings.monthYearSeparator + oFormattedDate.yyyy;
					}
					else
						sDate = oFormattedDate.dayShort + ", " + oFormattedDate.month + " " + oFormattedDate.dd + ", " + oFormattedDate.yyyy;
				}
			}
			if(oDTP.oData.bTimeMode || oDTP.oData.bDateTimeMode)
			{
				oFormattedTime = oDTP._formatTime();

				if(oDTP.oData.bIs12Hour)
					$(oDTP.element).find('.meridiem .dtpicker-compValue').val(oDTP.oData.sCurrentMeridiem);
				$(oDTP.element).find('.hour .dtpicker-compValue').val(oFormattedTime.hour);
				$(oDTP.element).find('.minutes .dtpicker-compValue').val(oFormattedTime.mm);
				$(oDTP.element).find('.seconds .dtpicker-compValue').val(oFormattedTime.ss);
			
				if(oDTP.settings.formatHumanDate)
				{
					oDate = $.extend(oDate, oFormattedTime);
				}
				else
				{
					var bShowSecondsTime = (oDTP.oData.bTimeMode && (
						oDTP.oData.bArrMatchFormat[0] ||
						oDTP.oData.bArrMatchFormat[1])),

					bShowSecondsDateTime = (oDTP.oData.bDateTimeMode && 
							(oDTP.oData.bArrMatchFormat[0] || 
							oDTP.oData.bArrMatchFormat[1] ||
							oDTP.oData.bArrMatchFormat[2] || 
							oDTP.oData.bArrMatchFormat[3] ||
							oDTP.oData.bArrMatchFormat[4] || 
							oDTP.oData.bArrMatchFormat[5] ||
							oDTP.oData.bArrMatchFormat[6] || 
							oDTP.oData.bArrMatchFormat[7]));

					if(bShowSecondsTime || bShowSecondsDateTime)
						sTime = oFormattedTime.hour + oDTP.settings.timeSeparator + oFormattedTime.mm + oDTP.settings.timeSeparator + oFormattedTime.ss;
					else
						sTime = oFormattedTime.hour + oDTP.settings.timeSeparator + oFormattedTime.mm;

					if(oDTP.oData.bIs12Hour)
						sTime += oDTP.settings.timeMeridiemSeparator + oDTP.oData.sCurrentMeridiem;
				}
			}
		
			if(oDTP.settings.formatHumanDate)
			{
				if(oDTP.oData.bDateTimeMode)
					sFormat = oDTP.oData.sDateFormat;
				else if(oDTP.oData.bDateMode)
					sFormat = oDTP.oData.sTimeFormat;
				else if(oDTP.oData.bTimeMode)
					sFormat = oDTP.oData.sDateTimeFormat;

				sDateTime = oDTP.settings.formatHumanDate.call(oDTP, oDate, oDTP.settings.mode, sFormat);
			}
			else		
			{
				if(oDTP.oData.bDateTimeMode)
					sDateTime = sDate + oDTP.settings.dateTimeSeparator + sTime;
				else if(oDTP.oData.bDateMode)
					sDateTime = sDate;
				else if(oDTP.oData.bTimeMode)
					sDateTime = sTime;
			}

			$(oDTP.element).find('.dtpicker-value').html(sDateTime);

			oDTP._setButtons();
		},

		_formatDate: function()
		{
			var oDTP = this;
			var sDay, sYear, 
			iMonth, sMonth, sMonthShort, sMonthFull, 
			iDayOfTheWeek, sDayOfTheWeek, sDayOfTheWeekFull;

			sDay = oDTP.oData.iCurrentDay;
			sDay = (sDay < 10) ? ("0" + sDay) : sDay;
			iMonth = oDTP.oData.iCurrentMonth;
			sMonth = oDTP.oData.iCurrentMonth + 1;
			sMonth = (sMonth < 10) ? ("0" + sMonth) : sMonth;
			sMonthShort = oDTP.settings.shortMonthNames[iMonth];
			sMonthFull = oDTP.settings.fullMonthNames[iMonth];
			sYear = oDTP.oData.iCurrentYear;
			iDayOfTheWeek = oDTP.oData.dCurrentDate.getDay();
			sDayOfTheWeek = oDTP.settings.shortDayNames[iDayOfTheWeek];
			sDayOfTheWeekFull = oDTP.settings.fullDayNames[iDayOfTheWeek];
		
			return {
				"dd": sDay,
				"MM": sMonth,
				"monthShort": sMonthShort,
				"month": sMonthFull,
				"yyyy": sYear,
				"dayShort": sDayOfTheWeek,
				"day": sDayOfTheWeekFull
			};
		},

		_formatTime: function()
		{
			var oDTP = this;
			var iHour24, sHour24, iHour12, sHour12, sHour,
			sMinutes, sSeconds;

			iHour24 = oDTP.oData.iCurrentHour;
			sHour24 = (iHour24 < 10) ? ("0" + iHour24) : iHour24;
			sHour = sHour24;

			if(oDTP.oData.bIs12Hour)
			{
				iHour12 = oDTP.oData.iCurrentHour;
				if(iHour12 > 12)
					iHour12 -= 12;
				if(sHour === 0)
					iHour12 = 12;
				sHour12 = (iHour12 < 10) ? ("0" + iHour12) : iHour12;
				sHour = sHour12;
			}
		
			sMinutes = oDTP.oData.iCurrentMinutes;
			sMinutes = (sMinutes < 10) ? ("0" + sMinutes) : sMinutes;
			sSeconds = oDTP.oData.iCurrentSeconds;
			sSeconds = (sSeconds < 10) ? ("0" + sSeconds) : sSeconds;
		
			return {
				"H": iHour24,
				"HH": sHour24,
				"h": iHour12,
				"hh": sHour12,
				"hour": sHour,
				"m": oDTP.oData.iCurrentMinutes,
				"mm": sMinutes,
				"s": oDTP.oData.iCurrentSeconds,
				"ss": sSeconds,
				"ME": oDTP.oData.sCurrentMeridiem
			};
		},
	
		_setButtons: function()
		{
			var oDTP = this;
			$(oDTP.element).find('.dtpicker-compButton').removeClass("dtpicker-compButtonDisable").addClass('dtpicker-compButtonEnable');
		
			var dTempDate;
			if(oDTP.oData.dMaxValue !== null)
			{
				if(oDTP.oData.bTimeMode)
				{
					// Decrement Hour
					if((oDTP.oData.iCurrentHour + 1) > oDTP.oData.dMaxValue.getHours() || ((oDTP.oData.iCurrentHour + 1) === oDTP.oData.dMaxValue.getHours() && oDTP.oData.iCurrentMinutes > oDTP.oData.dMaxValue.getMinutes()))
						$(oDTP.element).find(".hour .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Minutes
					if(oDTP.oData.iCurrentHour >= oDTP.oData.dMaxValue.getHours() && (oDTP.oData.iCurrentMinutes + 1) > oDTP.oData.dMaxValue.getMinutes())
						$(oDTP.element).find(".minutes .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
				else
				{
					// Increment Day
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, (oDTP.oData.iCurrentDay + 1), oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
						$(oDTP.element).find(".day .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Month
					dTempDate = new Date(oDTP.oData.iCurrentYear, (oDTP.oData.iCurrentMonth + 1), oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
						$(oDTP.element).find(".month .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Year
					dTempDate = new Date((oDTP.oData.iCurrentYear + 1), oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
						$(oDTP.element).find(".year .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Hour
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, (oDTP.oData.iCurrentHour + 1), oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
						$(oDTP.element).find(".hour .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Increment Minutes
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, (oDTP.oData.iCurrentMinutes + 1), oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
						$(oDTP.element).find(".minutes .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");

					// Increment Seconds
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, (oDTP.oData.iCurrentSeconds + 1), 0);
					if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
						$(oDTP.element).find(".seconds .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
			}
		
			if(oDTP.oData.dMinValue !== null)
			{
				if(oDTP.oData.bTimeMode)
				{
					// Decrement Hour
					if((oDTP.oData.iCurrentHour - 1) < oDTP.oData.dMinValue.getHours() || ((oDTP.oData.iCurrentHour - 1) === oDTP.oData.dMinValue.getHours() && oDTP.oData.iCurrentMinutes < oDTP.oData.dMinValue.getMinutes()))
						$(oDTP.element).find(".hour .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Minutes
					if(oDTP.oData.iCurrentHour <= oDTP.oData.dMinValue.getHours() && (oDTP.oData.iCurrentMinutes - 1) < oDTP.oData.dMinValue.getMinutes())
						$(oDTP.element).find(".minutes .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
				else
				{
					// Decrement Day 
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, (oDTP.oData.iCurrentDay - 1), oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
						$(oDTP.element).find(".day .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Month 
					dTempDate = new Date(oDTP.oData.iCurrentYear, (oDTP.oData.iCurrentMonth - 1), oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
						$(oDTP.element).find(".month .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Year 
					dTempDate = new Date((oDTP.oData.iCurrentYear - 1), oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
						$(oDTP.element).find(".year .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Hour
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, (oDTP.oData.iCurrentHour - 1), oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
						$(oDTP.element).find(".hour .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				
					// Decrement Minutes
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, (oDTP.oData.iCurrentMinutes - 1), oDTP.oData.iCurrentSeconds, 0);
					if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
						$(oDTP.element).find(".minutes .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");

					// Decrement Seconds
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, oDTP.oData.iCurrentHour, oDTP.oData.iCurrentMinutes, (oDTP.oData.iCurrentSeconds - 1), 0);
					if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
						$(oDTP.element).find(".seconds .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
				}
			}
			
			if(oDTP.oData.bIs12Hour)
			{
				var iTempHour, iTempMinutes;
				if(oDTP.oData.dMaxValue !== null || oDTP.oData.dMinValue !== null)
				{
					iTempHour = oDTP.oData.iCurrentHour;
					if($.cf._compare(oDTP.oData.sCurrentMeridiem, "AM"))
						iTempHour += 12;
					else if($.cf._compare(oDTP.oData.sCurrentMeridiem, "PM"))
						iTempHour -= 12;
				
					dTempDate = new Date(oDTP.oData.iCurrentYear, oDTP.oData.iCurrentMonth, oDTP.oData.iCurrentDay, iTempHour, oDTP.oData.iCurrentMinutes, oDTP.oData.iCurrentSeconds, 0);
				
					if(oDTP.oData.dMaxValue !== null)
					{
						if(oDTP.oData.bTimeMode)
						{
							iTempMinutes = oDTP.oData.iCurrentMinutes;
							if(iTempHour > oDTP.oData.dMaxValue.getHours() || (iTempHour === oDTP.oData.dMaxValue.getHours() && iTempMinutes > oDTP.oData.dMaxValue.getMinutes()))
								$(oDTP.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
						else
						{
							if(dTempDate.getTime() > oDTP.oData.dMaxValue.getTime())
								$(oDTP.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
					}
				
					if(oDTP.oData.dMinValue !== null)
					{
						if(oDTP.oData.bTimeMode)
						{
							iTempMinutes = oDTP.oData.iCurrentMinutes;
							if(iTempHour < oDTP.oData.dMinValue.getHours() || (iTempHour === oDTP.oData.dMinValue.getHours() && iTempMinutes < oDTP.oData.dMinValue.getMinutes()))
								$(oDTP.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
						else
						{
							if(dTempDate.getTime() < oDTP.oData.dMinValue.getTime())
								$(oDTP.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
						}
					}
				}
			}
		},
	
		// Public Method
		setIsPopup: function(bIsPopup)
		{
			var oDTP = this;
			oDTP.settings.isPopup = bIsPopup;
		
			if($(oDTP.element).css("display") !== "none")
				oDTP._hidePicker(0);
		
			if(oDTP.settings.isPopup)
			{
				$(oDTP.element).addClass("dtpicker-mobile");
				
				$(oDTP.element).css({position: "fixed", top: 0, left: 0, width: "100%", height: "100%"});
			}
			else
			{
				$(oDTP.element).removeClass("dtpicker-mobile");
				
				if(oDTP.oData.oInputElement !== null)
				{
					var iElemTop = $(oDTP.oData.oInputElement).offset().top + $(oDTP.oData.oInputElement).outerHeight(),
					iElemLeft = $(oDTP.oData.oInputElement).offset().left,
					iElemWidth =  $(oDTP.oData.oInputElement).outerWidth();
				
					$(oDTP.element).css({position: "absolute", top: iElemTop, left: iElemLeft, width: iElemWidth, height: "auto"});
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
		},

		// Public Method
		setLanguage: function(sLanguage)
		{
			var oDTP = this;

			oDTP.settings = $.extend({}, oDTP.settings, $.DateTimePicker.i18n[sLanguage]);
		
			oDTP._setDateFormatArray(); // Set DateFormatArray
			oDTP._setTimeFormatArray(); // Set TimeFormatArray
			oDTP._setDateTimeFormatArray(); // Set DateTimeFormatArray

			return oDTP;
		}

	};
	
}));

