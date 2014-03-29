/*  
	-------------------------	jQuery DateTimePicker v0.1.1	----------------------------
	
	https://github.com/CuriousSolutions/DateTimePicker
	
*/


;(function ( $, window, document, undefined ) {
	
		var pluginName = "DateTimePicker";
	
		var defaults = {
		
			mode: "date",
			defaultDate: new Date(),
		
			dateSeparator: "-",
			timeSeparator: ":",
			timeMeridiemSeparator: " ",
			dateTimeSeparator: " ",
		
			dateTimeFormat: "dd-MM-yyyy HH:mm:ss",
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
		
			titleContentDate: "Set Date",
			titleContentTime: "Set Time",
			titleContentDateTime: "Set Date & Time",
		
			setButtonContent: "Set",
			clearButtonContent: "Clear",
		
			animationDuration: 400,
		
			isPopup: true,
		
			addEventHandlers: null
		};
	
		var dataObject = {
		
			dCurrentDate: new Date(),
			iCurrentDay: 0,
			iCurrentMonth: 0,
			iCurrentYear: 0,
			iCurrentHour: 0,
			iCurrentMinutes: 0,
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
		
			oInputElement: null,
		
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
				if (!$.data(this, "plugin_" + pluginName)) 
				{
					$.data(this, "plugin_" + pluginName, new DateTimePicker(this, options));
				}
			});
		};
	
		DateTimePicker.prototype = {
		
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
			
				dtPickerObj.dataObject.sArrInputDateFormats = new Array();		
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
			
				dtPickerObj.dataObject.sArrInputTimeFormats = new Array();
				var sTime = "";
			
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
			
				dtPickerObj.dataObject.sArrInputDateTimeFormats = new Array();
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
			},
		
			_createPicker: function()
			{
				var dtPickerObj = this;
			
				$(dtPickerObj.element).addClass("dtpicker-overlay");
			
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
			
				$("input[type='date'], input[type='time'], input[type='datetime']").each(function()
				{
					var sType = $(this).attr("type");
					$(this).attr("type", "text");
					$(this).attr("data-field", sType);
				});
			
				$("[data-field='date'], [data-field='time'], [data-field='datetime']").unbind("focus", dtPickerObj._inputFieldFocus);
				$("[data-field='date'], [data-field='time'], [data-field='datetime']").on("focus", {"obj": dtPickerObj}, dtPickerObj._inputFieldFocus);
			
				$("[data-field='date'], [data-field='time'], [data-field='datetime']").not('input').click(function()
				{
					if(dtPickerObj.dataObject.oInputElement == null)
					{
						dtPickerObj.showDateTimePicker(this);
					}
				});
			
				if(dtPickerObj.settings.addEventHandlers)
					dtPickerObj.settings.addEventHandlers.call(dtPickerObj);
			},
		
			_inputFieldFocus: function(e)
			{
				var dtPickerObj = e.data.obj;
			
				if(dtPickerObj.dataObject.oInputElement == null)
				{
					dtPickerObj.showDateTimePicker(e.target);
				}
			},
		
			showDateTimePicker: function(element)
			{
				var dtPickerObj = this;
			
				if(dtPickerObj.dataObject.oInputElement == null)
				{
					dtPickerObj.dataObject.oInputElement = element;
				
					var sMode = $(element).data("field") || "";
					var sMinValue = $(element).data("min") || "";
					var sMaxValue = $(element).data("max") || "";
					var sFormat = $(element).data("format") || "";
					var sView = $(element).data("view") || "";
					var sStartEnd = $(element).data("startend") || "";
					var sStartEndElem = $(element).data("startendelem") || "";
					var sCurrent = dtPickerObj._getValueOfElement(element) || "";
				
					if(sView != "")
					{
						if(dtPickerObj._compare(sView, "Popup"))
							dtPickerObj.setIsPopup(true);
						else 
							dtPickerObj.setIsPopup(false);
					}
				
					if(! dtPickerObj.settings.isPopup)
					{
						dtPickerObj._createPicker();
					
						var iElemTop = $(dtPickerObj.dataObject.oInputElement).offset().top + $(dtPickerObj.dataObject.oInputElement).outerHeight();
						var iElemLeft = $(dtPickerObj.dataObject.oInputElement).offset().left;
						var iElemWidth =  $(dtPickerObj.dataObject.oInputElement).outerWidth();
					
						$(dtPickerObj.element).css({position: "absolute", top: iElemTop, left: iElemLeft, width: iElemWidth, height: "auto"});
					}
				
					dtPickerObj._showPicker(sMode, sMinValue, sMaxValue, sFormat, sCurrent, element, sStartEnd, sStartEndElem);
				}
			},
		
			_setButtonAction: function()
			{
				var dtPickerObj = this;
			
				if(dtPickerObj.dataObject.oInputElement != null)
				{
					var sOutput = dtPickerObj._setOutput();
					dtPickerObj._setValueOfElement(sOutput);
					dtPickerObj._hidePicker();
				}
			},
		
			_setOutput: function()
			{
				var dtPickerObj = this;
			
				var sOutput = "";
			
				var iDate = dtPickerObj.dataObject.dCurrentDate.getDate();
				var iMonth = dtPickerObj.dataObject.dCurrentDate.getMonth();
				var iYear = dtPickerObj.dataObject.dCurrentDate.getFullYear();
				var iHour = dtPickerObj.dataObject.dCurrentDate.getHours();
				var iMinutes = dtPickerObj.dataObject.dCurrentDate.getMinutes();
			
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "date"))
				{
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[0]))
					{
						iMonth++;
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
						
						sOutput = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[1]))
					{
						iMonth++;
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
						
						sOutput = sMonth + dtPickerObj.settings.dateSeparator + sDate + dtPickerObj.settings.dateSeparator + iYear;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[2]))
					{
						iMonth++;
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
						
						sOutput = iYear + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + sDate;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[3]))
					{
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = dtPickerObj.settings.shortMonthNames[iMonth];
					
						sOutput = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
					}
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
				{
					if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[0]))
					{
						var sMeridiem = "";
						if(iHour > 12)
						{
							iHour -= 12;
							sMeridiem = "PM";
						}
						else if(iHour == 12 && iMinutes > 0)
						{
							sMeridiem = "PM";
						}
						else
						{
							sMeridiem = "AM";
						}
					
						var sHour = (iHour < 10) ? ("0" + iHour) : iHour;
						var sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
					
						sOutput = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeMeridiemSeparator + sMeridiem;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[1]))
					{
						var sHour = (iHour < 10) ? ("0" + iHour) : iHour;
						var sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
					
						sOutput = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
					}
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					var sDateStr = "";
					var sTimeStr = "";
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[0]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[1]))
					{
						iMonth++;
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
						sDateStr = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[2]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[3]))
					{
						iMonth++;
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
						sDateStr = sMonth + dtPickerObj.settings.dateSeparator + sDate + dtPickerObj.settings.dateSeparator + iYear;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[4]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[5]))
					{
						iMonth++;
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = (iMonth < 10) ? ("0" + iMonth) : iMonth;
					
						sDateStr = iYear + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + sDate;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[6]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[7]))
					{
						var sDate = (iDate < 10) ? ("0" + iDate) : iDate;
						var sMonth = dtPickerObj.settings.shortMonthNames[iMonth];
					
						sDateStr = sDate + dtPickerObj.settings.dateSeparator + sMonth + dtPickerObj.settings.dateSeparator + iYear;
					}
				
					if(dtPickerObj.dataObject.bIs12Hour)
					{
						var sMeridiem = "";
						if(iHour > 12)
						{
							iHour -= 12;
							sMeridiem = "PM";
						}
						else if(iHour == 12 && iMinutes > 0)
						{
							sMeridiem = "PM";
						}
						else
						{
							sMeridiem = "AM";
						}
					
						var sHour = (iHour < 10) ? ("0" + iHour) : iHour;
						var sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
					
						sTimeStr = sHour + dtPickerObj.settings.timeSeparator + sMinutes + dtPickerObj.settings.timeMeridiemSeparator + sMeridiem;
					}
					else
					{
						var sHour = (iHour < 10) ? ("0" + iHour) : iHour;
						var sMinutes = (iMinutes < 10) ? ("0" + iMinutes) : iMinutes;
					
						sTimeStr = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
					}
				
					sOutput = sDateStr + dtPickerObj.settings.dateTimeSeparator + sTimeStr;
				}
			
				return sOutput;
			},
		
			_clearButtonAction: function()
			{
				var dtPickerObj = this;
			
				if(dtPickerObj.dataObject.oInputElement != null)
				{
					dtPickerObj._setValueOfElement("");
				}
				dtPickerObj._hidePicker();
			},
		
			_showPicker: function(sMode, sMinValue, sMaxValue, sFormat, sCurrent, oElement, sStartEnd, sStartEndElem)
			{
				var dtPickerObj = this;
			
				if(sMode != "")
					dtPickerObj.settings.mode = sMode;
			
				dtPickerObj.dataObject.dMinValue = null;
				dtPickerObj.dataObject.dMaxValue = null;
				dtPickerObj.dataObject.bIs12Hour = false;
			
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "date"))
				{
					var sMin = sMinValue || dtPickerObj.settings.minDate;
					var sMax = sMaxValue || dtPickerObj.settings.maxDate;
				
					var sDateFormat = sFormat || dtPickerObj.settings.dateFormat;
					if(sDateFormat != "" && sDateFormat != null)
						dtPickerObj.dataObject.sDateFormat = sDateFormat;
				
					if(sMin != "" && sMin != null)
						dtPickerObj.dataObject.dMinValue = dtPickerObj._parseDate(sMin);
					if(sMax != "" && sMax != null)
						dtPickerObj.dataObject.dMaxValue = dtPickerObj._parseDate(sMax);
				
					
				
					if(sStartEnd != "" && (dtPickerObj._compare(sStartEnd, "start") || dtPickerObj._compare(sStartEnd, "end")) && sStartEndElem != "")
					{
						if($(sStartEndElem).length >= 1)
						{
							var sTempDate = dtPickerObj._getValueOfElement($(sStartEndElem));
							if(sTempDate != "")
							{
								var dTempDate = dtPickerObj._parseDate(sTempDate);
								if(dtPickerObj._compare(sStartEnd, "start"))
								{
									if(sMax != "" && sMax != null)
									{
										if(dtPickerObj._compareDates(dTempDate, dtPickerObj.dataObject.dMaxValue) == 2)
											dtPickerObj.dataObject.dMaxValue = new Date(dTempDate);
									}
									else
										dtPickerObj.dataObject.dMaxValue = new Date(dTempDate);
								}
								else if(dtPickerObj._compare(sStartEnd, "end"))
								{
									if(sMin != "" && sMin != null)
									{
										if(dtPickerObj._compareDates(dTempDate, dtPickerObj.dataObject.dMinValue) == 3)
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
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
				{
					var sMin = sMinValue || dtPickerObj.settings.minTime;
					var sMax = sMaxValue || dtPickerObj.settings.maxTime;
				
					var sTimeFormat = sFormat || dtPickerObj.settings.timeFormat;
					if(sTimeFormat != "" && sTimeFormat != null)
						dtPickerObj.dataObject.sTimeFormat = sTimeFormat;
				
					if(sMin != "" && sMin != null)
						dtPickerObj.dataObject.dMinValue = dtPickerObj._parseTime(sMin);
					if(sMax != "" && sMax != null)
						dtPickerObj.dataObject.dMaxValue = dtPickerObj._parseTime(sMax);
				
					if(sStartEnd != "" && (dtPickerObj._compare(sStartEnd, "start") || dtPickerObj._compare(sStartEnd, "end")) && sStartEndElem != "")
					{
						if($(sStartEndElem).length >= 1)
						{
							var sTempTime = dtPickerObj._getValueOfElement($(sStartEndElem));
						
							if(sTempTime != "")
							{
								var dTempTime = dtPickerObj._parseTime(sTempTime);
								if(dtPickerObj._compare(sStartEnd, "start"))
								{
									dTempTime.setMinutes(dTempTime.getMinutes() - 1);
									if(sMax != "" && sMax != null)
									{
										if(dtPickerObj._compareTime(dTempTime, dtPickerObj.dataObject.dMaxValue) == 2)
											dtPickerObj.dataObject.dMaxValue = new Date(dTempTime);
									}
									else
										dtPickerObj.dataObject.dMaxValue = new Date(dTempTime);
								}
								else if(dtPickerObj._compare(sStartEnd, "end"))
								{
									dTempTime.setMinutes(dTempTime.getMinutes() + 1);
									if(sMin != "" && sMin != null)
									{
										if(dtPickerObj._compareTime(dTempTime, dtPickerObj.dataObject.dMinValue) == 3)
											dtPickerObj.dataObject.dMinValue = new Date(dTempTime);
									}
									else
										dtPickerObj.dataObject.dMinValue = new Date(dTempTime);
								}
							}
						}
					}
				
					dtPickerObj.dataObject.dCurrentDate = dtPickerObj._parseTime(sCurrent);
					dtPickerObj.dataObject.bIs12Hour = dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[0]);
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					var sMin = sMinValue || dtPickerObj.settings.minDateTime;
					var sMax = sMaxValue || dtPickerObj.settings.maxDateTime;
				
					var sDateTimeFormat = sFormat || dtPickerObj.settings.dateTimeFormat;
					if(sDateTimeFormat != "" && sDateTimeFormat != null)
						dtPickerObj.dataObject.sDateTimeFormat = sDateTimeFormat;
				
					if(sMin != "" && sMin != null)
						dtPickerObj.dataObject.dMinValue = dtPickerObj._parseDateTime(sMin);
					if(sMax != "" && sMax != null)
						dtPickerObj.dataObject.dMaxValue = dtPickerObj._parseDateTime(sMax);
				
					if(sStartEnd != "" && (dtPickerObj._compare(sStartEnd, "start") || dtPickerObj._compare(sStartEnd, "end")) && sStartEndElem != "")
					{
						if($(sStartEndElem).length >= 1)
						{
							var sTempDateTime = dtPickerObj._getValueOfElement($(sStartEndElem));
							if(sTempDateTime != "")
							{
								var dTempDateTime = dtPickerObj._parseDateTime(sTempDateTime);
								if(dtPickerObj._compare(sStartEnd, "start"))
								{
									if(sMax != "" && sMax != null)
									{
										if(dtPickerObj._compareDateTime(dTempDateTime, dtPickerObj.dataObject.dMaxValue) == 2)
											dtPickerObj.dataObject.dMaxValue = new Date(dTempDateTime);
									}
									else
										dtPickerObj.dataObject.dMaxValue = new Date(dTempDateTime);
								}
								else if(dtPickerObj._compare(sStartEnd, "end"))
								{
									if(sMin != "" && sMin != null)
									{
										if(dtPickerObj._compareDateTime(dTempDateTime, dtPickerObj.dataObject.dMinValue) == 3)
											dtPickerObj.dataObject.dMinValue = new Date(dTempDateTime);
									}
									else
										dtPickerObj.dataObject.dMinValue = new Date(dTempDateTime);
								}
							}
						}
					}
				
					dtPickerObj.dataObject.dCurrentDate = dtPickerObj._parseDateTime(sCurrent);
				
					dtPickerObj.dataObject.bIs12Hour = dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[1]) ||
					dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[3]) ||
					dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[5]) ||
					dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[7]);
				}
			
				dtPickerObj._setVariablesForDate();
				dtPickerObj._modifyPicker();
				$(dtPickerObj.element).fadeIn(dtPickerObj.settings.animationDuration);
			},
		
			_hidePicker: function(iDuration)
			{
				var dtPickerObj = this;
			
				if(dtPickerObj.dataObject.oInputElement != null)
				{
					$(dtPickerObj.dataObject.oInputElement).blur();
					dtPickerObj.dataObject.oInputElement = null;
				}
			
				$(dtPickerObj.element).fadeOut(iDuration || dtPickerObj.settings.animationDuration);
				setTimeout(function()
				{
					$(dtPickerObj.element).find('.dtpicker-subcontent').html("");
				}, (iDuration || dtPickerObj.settings.animationDuration));
			},
		
			_modifyPicker: function()
			{
				var dtPickerObj = this;
			
				var sTitleContent, iNumberOfColumns;
				var sArrFields = new Array();
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "date"))
				{
					sTitleContent = dtPickerObj.settings.titleContentDate;
					iNumberOfColumns = 3;
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[0]))  // "dd-MM-yyyy"
					{
						sArrFields = ["day", "month", "year"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[1]))  // "MM-dd-yyyy"
					{
						sArrFields = ["month", "day", "year"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[2]))  // "yyyy-MM-dd"
					{
						sArrFields = ["year", "month", "day"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[3]))  // "dd-MMM-yyyy"
					{
						sArrFields = ["day", "month", "year"];
					}
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
				{
					sTitleContent = dtPickerObj.settings.titleContentTime;
					if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[0]))
					{
						iNumberOfColumns = 3;
						sArrFields = ["hour", "minutes", "meridiem"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[1]))
					{
						iNumberOfColumns = 2;
						sArrFields = ["hour", "minutes"];
					}
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					sTitleContent = dtPickerObj.settings.titleContentDateTime;
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[0]))
					{
						iNumberOfColumns = 5;
						sArrFields = ["day", "month", "year", "hour", "minutes"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[1]))
					{
						iNumberOfColumns = 6;
						sArrFields = ["day", "month", "year", "hour", "minutes", "meridiem"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[2]))
					{
						iNumberOfColumns = 5;
						sArrFields = ["month", "day", "year", "hour", "minutes"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[3]))
					{
						iNumberOfColumns = 6;
						sArrFields = ["month", "day", "year", "hour", "minutes", "meridiem"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[4]))
					{
						iNumberOfColumns = 5;
						sArrFields = ["year", "month", "day", "hour", "minutes"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[5]))
					{
						iNumberOfColumns = 6;
						sArrFields = ["year", "month", "day", "hour", "minutes", "meridiem"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[6]))
					{
						iNumberOfColumns = 5;
						sArrFields = ["day", "month", "year", "hour", "minutes"];
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[7]))
					{
						iNumberOfColumns = 6;
						sArrFields = ["day", "month", "year", "hour", "minutes", "meridiem"];
					}
				}
				var sColumnClass = "dtpicker-comp" + iNumberOfColumns;
			
				//--------------------------------------------------------------------
			
				var sHeader = "";
				sHeader += "<div class='dtpicker-header'>";
				sHeader += "<div class='dtpicker-title'>" + sTitleContent + "</div>";
				sHeader += "<a class='dtpicker-close'>X</a>";
				sHeader += "<div class='dtpicker-value'></div>";
				sHeader += "</div>";
			
				//--------------------------------------------------------------------
			
				var sDTPickerComp = "";
				sDTPickerComp += "<div class='dtpicker-components'>";
			
				for(var iTempIndex = 0; iTempIndex < iNumberOfColumns; iTempIndex++)
				{
					var sFieldName = sArrFields[iTempIndex];
				
					sDTPickerComp += "<div class='dtpicker-compOutline " + sColumnClass + "'>";
					sDTPickerComp += "<div class='dtpicker-comp " + sFieldName + "'>";
					sDTPickerComp += "<a class='dtpicker-compButton increment'>+</a>";
					sDTPickerComp += "<input type='text' class='dtpicker-compValue'></input>";
					sDTPickerComp += "<a class='dtpicker-compButton decrement'>-</a>";
					sDTPickerComp += "</div>";
					sDTPickerComp += "</div>";
				}
			
				sDTPickerComp += "</div>";
			
				//--------------------------------------------------------------------
			
				var sDTPickerButtons = "";
				sDTPickerButtons += "<div class='dtpicker-buttonCont'>";
				sDTPickerButtons += "<a class='dtpicker-button dtpicker-buttonSet'>" + dtPickerObj.settings.setButtonContent + "</a>";
				sDTPickerButtons += "<a class='dtpicker-button dtpicker-buttonClear'>" + dtPickerObj.settings.clearButtonContent + "</a>";
				sDTPickerButtons += "</div>";
			
				//--------------------------------------------------------------------
			
				sTempStr = sHeader + sDTPickerComp + sDTPickerButtons;
			
				$(dtPickerObj.element).find('.dtpicker-subcontent').html(sTempStr);
			
				dtPickerObj._setCurrentDate();
				dtPickerObj._addEventHandlersForPicker();
			},
		
			_addEventHandlersForPicker: function()
			{
				var dtPickerObj = this;
			
				$('.dtpicker-compValue').not('.month .dtpicker-compValue, .meridiem .dtpicker-compValue').keyup(function() 
				{ 
					this.value = this.value.replace(/[^0-9\.]/g,'');
				});
			
				$('.dtpicker-compValue').blur(function()
				{
					dtPickerObj._getValuesFromInputBoxes();
					dtPickerObj._setCurrentDate();
				});
			
				$(".dtpicker-comp .dtpicker-compValue").keyup(function()
				{
					var $oTextField = $(this);
				
					var sTextBoxVal = $oTextField.val();
					var iLength = sTextBoxVal.length;
				
					if($oTextField.parent().hasClass("day") || $oTextField.parent().hasClass("hour") || $oTextField.parent().hasClass("minutes") || $oTextField.parent().hasClass("meridiem"))
					{
						if(iLength > 2)
						{
							var sNewTextBoxVal = sTextBoxVal.slice(0, 2);
							$oTextField.val(sNewTextBoxVal);
						}
					}
					else if($oTextField.parent().hasClass("month"))
					{
						if(iLength > 3)
						{
							var sNewTextBoxVal = sTextBoxVal.slice(0, 3);
							$oTextField.val(sNewTextBoxVal);
						}
					}
					else if($oTextField.parent().hasClass("year"))
					{
						if(iLength > 4)
						{
							var sNewTextBoxVal = sTextBoxVal.slice(0, 4);
							$oTextField.val(sNewTextBoxVal);
						}
					}					
				});
			
				//-----------------------------------------------------------------------
			
				$(dtPickerObj.element).find('.dtpicker-close').click(function()
				{
					dtPickerObj._hidePicker();
				});
			
				$(dtPickerObj.element).find('.dtpicker-buttonSet').click(function()
				{
					dtPickerObj._setButtonAction();
				});
			
				$(dtPickerObj.element).find('.dtpicker-buttonClear').click(function()
				{
					dtPickerObj._clearButtonAction();
				});
			
				// ----------------------------------------------------------------------------
			
				$(dtPickerObj.element).find(".day .increment").click(function()
				{
					 dtPickerObj.dataObject.iCurrentDay++;
					 dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".day .decrement").click(function()
				{
					dtPickerObj.dataObject.iCurrentDay--;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".month .increment").click(function()
				{
					dtPickerObj.dataObject.iCurrentMonth++;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".month .decrement").click(function()
				{
					dtPickerObj.dataObject.iCurrentMonth--;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".year .increment").click(function()
				{
					dtPickerObj.dataObject.iCurrentYear++;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".year .decrement").click(function()
				{
					dtPickerObj.dataObject.iCurrentYear--;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".hour .increment").click(function()
				{
					dtPickerObj.dataObject.iCurrentHour++;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".hour .decrement").click(function()
				{
					dtPickerObj.dataObject.iCurrentHour--;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".minutes .increment").click(function()
				{
					dtPickerObj.dataObject.iCurrentMinutes++;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".minutes .decrement").click(function()
				{
					dtPickerObj.dataObject.iCurrentMinutes--;
					dtPickerObj._setCurrentDate();
				});
			
				$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").click(function()
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
				});
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
			
				var dTempDate = new Date(dtPickerObj.settings.defaultDate);
				var iDate = dTempDate.getDate();
				var iMonth = dTempDate.getMonth();
				var iYear = dTempDate.getFullYear();
			
				if(sDate != "" &&  sDate != undefined && sDate != null)
				{
					var sArrDate = sDate.split(dtPickerObj.settings.dateSeparator);
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[0]))  // "dd-MM-yyyy"
					{
						iDate = parseInt(sArrDate[0]);
						iMonth = parseInt(sArrDate[1] - 1);
						iYear = parseInt(sArrDate[2]);
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[1]))  // "MM-dd-yyyy"
					{
						iMonth = parseInt(sArrDate[0] - 1);
						iDate = parseInt(sArrDate[1]);
						iYear = parseInt(sArrDate[2]);
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[2]))  // "yyyy-MM-dd"
					{
						iYear = parseInt(sArrDate[0]);
						iMonth = parseInt(sArrDate[1] - 1);
						iDate = parseInt(sArrDate[2]);
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateFormat, dtPickerObj.dataObject.sArrInputDateFormats[3]))  // "dd-MMM-yyyy"
					{
						iDate = parseInt(sArrDate[0]);
						iMonth = dtPickerObj.getShortMonthIndex(sArrDate[1]);
						iYear = parseInt(sArrDate[2]);
					}
				}
			
				dTempDate = new Date(iYear, iMonth, iDate, 0, 0, 0, 0);
				return dTempDate;
			},
		
			_parseTime: function(sTime)
			{
				var dtPickerObj = this;
			
				var dTempDate = new Date(dtPickerObj.settings.defaultDate);
				var iDate = dTempDate.getDate();
				var iMonth = dTempDate.getMonth();
				var iYear = dTempDate.getFullYear();
				var iHour = dTempDate.getHours();
				var iMinutes = dTempDate.getMinutes();
			
				if(sTime != "" &&  sTime != undefined && sTime != null)
				{
					if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[0]))  //  "hh:mm AA"
					{
						var sArrTime = sTime.split(dtPickerObj.settings.timeMeridiemSeparator);
						var sMeridiem = sArrTime[1];
					
						var sArrTimeComp = sArrTime[0].split(dtPickerObj.settings.timeSeparator);
						iHour = parseInt(sArrTimeComp[0]);
						iMinutes = parseInt(sArrTimeComp[1]);
					
						if(dtPickerObj._compare(sMeridiem, "PM"))
							iHour += 12;
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[1]))  //  "HH:mm"
					{
						var sArrTimeComp = sTime.split(dtPickerObj.settings.timeSeparator);
						iHour = parseInt(sArrTimeComp[0]);
						iMinutes = parseInt(sArrTimeComp[1]);
					}
				}
			
				dTempDate = new Date(iYear, iMonth, iDate, iHour, iMinutes, 0, 0);
			
				return dTempDate;
			},
		
			_parseDateTime: function(sDateTime)
			{
				var dtPickerObj = this;
			
				var dTempDate = new Date(dtPickerObj.settings.defaultDate);
				var iDate = dTempDate.getDate();
				var iMonth = dTempDate.getMonth();
				var iYear = dTempDate.getFullYear();
				var iHour = dTempDate.getHours();
				var iMinutes = dTempDate.getMinutes();
				var sMeridiem = "";
			
				if(sDateTime != "" &&  sDateTime != undefined && sDateTime != null)
				{
					var sArrDateTime = sDateTime.split(dtPickerObj.settings.dateTimeSeparator);
					var sArrDate = sArrDateTime[0].split(dtPickerObj.settings.dateSeparator);
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[0]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[1])) // "dd-MM-yyyy HH:mm:ss", "dd-MM-yyyy hh:mm:ss AA"
					{
						iDate = parseInt(sArrDate[0]);
						iMonth = parseInt(sArrDate[1] - 1);
						iYear = parseInt(sArrDate[2]);
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[2]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[3])) // "MM-dd-yyyy HH:mm:ss", "MM-dd-yyyy hh:mm:ss AA"
					{
						iMonth = parseInt(sArrDate[0] - 1);
						iDate = parseInt(sArrDate[1]);
						iYear = parseInt(sArrDate[2]);
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[4]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[5])) // "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd hh:mm:ss AA"
					{
						iYear = parseInt(sArrDate[0]);
						iMonth = parseInt(sArrDate[1] - 1);
						iDate = parseInt(sArrDate[2]);
					}
					else if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[6]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[7])) // "dd-MMM-yyyy HH:mm:ss", "dd-MMM-yyyy hh:mm:ss AA"
					{
						iDate = parseInt(sArrDate[0]);
						iMonth = dtPickerObj.getShortMonthIndex(sArrDate[1]);
						iYear = parseInt(sArrDate[2]);
					}
				
					var sTime;
					if(dtPickerObj.dataObject.bIs12Hour)
					{
						if(dtPickerObj._compare(dtPickerObj.settings.dateTimeSeparator, dtPickerObj.settings.timeMeridiemSeparator) && (sArrDateTime.length == 3))
						{
							sMeridiem = sArrDateTime[2];
						}
						else
						{
							var sArrTimeComp = sArrDateTime[1].split(dtPickerObj.settings.timeMeridiemSeparator);
							sTime = sArrTimeComp[0];
							sMeridiem = sArrTimeComp[1];
						}
					
						if(!(!dtPickerObj._compare(sMeridiem, "AM") || dtPickerObj._compare(sMeridiem, "PM")))
							sMeridiem = "";
					}
					else
					{
						sTime = sArrDateTime[1];
					}
				
					var sArrTime = sTime.split(dtPickerObj.settings.timeSeparator);
					iHour = parseInt(sArrTime[0]);
					iMinutes = parseInt(sArrTime[1]);
					if(dtPickerObj._compare(sMeridiem, "PM"))
						iHour += 12;
				}
			
				dTempDate = new Date(iYear, iMonth, iDate, iHour, iMinutes, 0, 0);
			
				return dTempDate;
			},
		
			getShortMonthIndex: function(sMonthName)
			{
				var dtPickerObj = this;
				
				for(var iTempIndex = 0; iTempIndex < dtPickerObj.settings.shortMonthNames.length; iTempIndex++)
				{
					if(dtPickerObj._compare(sMonthName, dtPickerObj.settings.shortMonthNames[iTempIndex]))
						return iTempIndex;
				}
			},
		
			//-----------------------------------------------------------------
		
			_setVariablesForDate: function()
			{
				var dtPickerObj = this;
			
				dtPickerObj.dataObject.iCurrentDay = dtPickerObj.dataObject.dCurrentDate.getDate();
				dtPickerObj.dataObject.iCurrentMonth = dtPickerObj.dataObject.dCurrentDate.getMonth();
				dtPickerObj.dataObject.iCurrentYear = dtPickerObj.dataObject.dCurrentDate.getFullYear();
			
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
				{
					dtPickerObj.dataObject.iCurrentHour = dtPickerObj.dataObject.dCurrentDate.getHours();
					dtPickerObj.dataObject.iCurrentMinutes = dtPickerObj.dataObject.dCurrentDate.getMinutes();
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sTimeFormat, dtPickerObj.dataObject.sArrInputTimeFormats[0]))
					{
						if(dtPickerObj.dataObject.iCurrentHour > 12)
							dtPickerObj.dataObject.sCurrentMeridiem = "PM";
						else if(dtPickerObj.dataObject.iCurrentHour == 12 && dtPickerObj.dataObject.iCurrentMinutes > 0)
							dtPickerObj.dataObject.sCurrentMeridiem = "PM";
						else
							dtPickerObj.dataObject.sCurrentMeridiem = "AM";
					}
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					dtPickerObj.dataObject.iCurrentHour = dtPickerObj.dataObject.dCurrentDate.getHours();
					dtPickerObj.dataObject.iCurrentMinutes = dtPickerObj.dataObject.dCurrentDate.getMinutes();
				
					if(dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[1]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[3]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[5]) || dtPickerObj._compare(dtPickerObj.dataObject.sDateTimeFormat, dtPickerObj.dataObject.sArrInputDateTimeFormats[7]))
					{
						if(dtPickerObj.dataObject.iCurrentHour > 12)
							dtPickerObj.dataObject.sCurrentMeridiem = "PM";
						else if(dtPickerObj.dataObject.iCurrentHour == 12 && dtPickerObj.dataObject.iCurrentMinutes > 0)
							dtPickerObj.dataObject.sCurrentMeridiem = "PM";
						else
							dtPickerObj.dataObject.sCurrentMeridiem = "AM";
					}
				}
			},
		
			_getValuesFromInputBoxes: function()
			{
				var dtPickerObj = this;
			
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "date") || dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					var sMonth = $(dtPickerObj.element).find(".month .dtpicker-compValue").val();
					if(sMonth.length > 1)
						sMonth = sMonth.charAt(0).toUpperCase() + sMonth.slice(1);
					var iMonth = dtPickerObj.settings.shortMonthNames.indexOf(sMonth);
					if(iMonth != -1)
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
			
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "time") || dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					dtPickerObj.dataObject.iCurrentHour = parseInt($(dtPickerObj.element).find(".hour .dtpicker-compValue").val());
					dtPickerObj.dataObject.iCurrentMinutes = parseInt($(dtPickerObj.element).find(".minutes .dtpicker-compValue").val());
				
					if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
					{
						if(dtPickerObj.dataObject.bIs12Hour)
						{
							if(dtPickerObj.dataObject.iCurrentHour > 12)
								dtPickerObj.dataObject.iCurrentHour = (dtPickerObj.dataObject.iCurrentHour % 12);
							if(dtPickerObj.dataObject.iCurrentMinutes > 59)
							{
								var iExtraHour = dtPickerObj.dataObject.iCurrentMinutes / 60;
								var iExtraMinutes = dtPickerObj.dataObject.iCurrentMinutes % 59;
							
								var iNewHour = dtPickerObj.dataObject.iCurrentHour + iExtraHour;
								if(iNewHour > 12)
									dtPickerObj.dataObject.iCurrentHour = (iNewHour % 12);
								dtPickerObj.dataObject.iCurrentMinutes = iExtraMinutes;
							}
						}
						else
						{
							if(dtPickerObj.dataObject.iCurrentHour > 23)
								dtPickerObj.dataObject.iCurrentHour = (dtPickerObj.dataObject.iCurrentHour % 23);
						
							if(dtPickerObj.dataObject.iCurrentMinutes > 59)
							{
								var iExtraHour = dtPickerObj.dataObject.iCurrentMinutes / 60;
								var iExtraMinutes = dtPickerObj.dataObject.iCurrentMinutes % 59;
							
								var iNewHour = dtPickerObj.dataObject.iCurrentHour + iExtraHour;
								if(iNewHour > 23)
								dtPickerObj.dataObject.iCurrentHour = (iNewHour % 23);
								dtPickerObj.dataObject.iCurrentMinutes = iExtraMinutes;
							}
						}
					}
				
					if(dtPickerObj.dataObject.bIs12Hour)
					{
						var sMeridiem = $(dtPickerObj.element).find(".meridiem .dtpicker-compValue").val();
						if(dtPickerObj._compare(sMeridiem, "AM") || dtPickerObj._compare(sMeridiem, "PM"))
							dtPickerObj.dataObject.sCurrentMeridiem = sMeridiem;
					
						if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "PM") && dtPickerObj.dataObject.iCurrentHour < 13)
							dtPickerObj.dataObject.iCurrentHour += 12;
						if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "AM") && dtPickerObj.dataObject.iCurrentHour == 12)
							dtPickerObj.dataObject.iCurrentHour = 0;
					}
				}
			},
		
			_setCurrentDate: function()
			{
				var dtPickerObj = this;
			
				var dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
				var bGTMaxDate = false, bLTMinDate = false;
			
				if(dtPickerObj.dataObject.dMaxValue != null)
					bGTMaxDate = (dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime());
				if(dtPickerObj.dataObject.dMinValue != null)
					bLTMinDate = (dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime());
			
				if(bGTMaxDate || bLTMinDate)
				{
					var bCDGTMaxDate = false, bCDLTMinDate = false; 
					if(dtPickerObj.dataObject.dMaxValue != null)
						bCDGTMaxDate = (dtPickerObj.dataObject.dCurrentDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime());
					if(dtPickerObj.dataObject.dMinValue != null)
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
			
				if(dtPickerObj._compare(dtPickerObj.settings.mode, "date"))
				{
					var sDay = dtPickerObj.dataObject.iCurrentDay;
					sDay = (sDay < 10) ? ("0" + sDay) : sDay;
					var iMonth = dtPickerObj.dataObject.iCurrentMonth;
					var sMonthShort = dtPickerObj.settings.shortMonthNames[iMonth];
					var sMonthFull = dtPickerObj.settings.fullMonthNames[iMonth];
					var sYear = dtPickerObj.dataObject.iCurrentYear;
					var iDayOfTheWeek = dtPickerObj.dataObject.dCurrentDate.getDay();
					var sDayOfTheWeek = dtPickerObj.settings.shortDayNames[iDayOfTheWeek];
				
					$(dtPickerObj.element).find('.day .dtpicker-compValue').val(sDay);
					$(dtPickerObj.element).find('.month .dtpicker-compValue').val(sMonthShort);
					$(dtPickerObj.element).find('.year .dtpicker-compValue').val(sYear);
				
					var sDate = sDayOfTheWeek + ", " + sMonthFull + " " + sDay + ", " + sYear;
					$(dtPickerObj.element).find('.dtpicker-value').html(sDate);
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
				{
					var sHour = dtPickerObj.dataObject.iCurrentHour;
					if(dtPickerObj.dataObject.bIs12Hour)
					{
						if(sHour > 12)
							sHour -= 12;
					
						$(dtPickerObj.element).find('.meridiem .dtpicker-compValue').val(dtPickerObj.dataObject.sCurrentMeridiem);
					}
					sHour = (sHour < 10) ? ("0" + sHour) : sHour;
					if(dtPickerObj.dataObject.bIs12Hour && sHour == "00")
						sHour = 12;
					var sMinutes = dtPickerObj.dataObject.iCurrentMinutes;
					sMinutes = (sMinutes < 10) ? ("0" + sMinutes) : sMinutes;
				
					$(dtPickerObj.element).find('.hour .dtpicker-compValue').val(sHour);
					$(dtPickerObj.element).find('.minutes .dtpicker-compValue').val(sMinutes);
				
					var sTime = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
					if(dtPickerObj.dataObject.bIs12Hour)
						sTime += dtPickerObj.settings.timeMeridiemSeparator + dtPickerObj.dataObject.sCurrentMeridiem;
					$(dtPickerObj.element).find('.dtpicker-value').html(sTime);
				}
				else if(dtPickerObj._compare(dtPickerObj.settings.mode, "datetime"))
				{
					var sDay = dtPickerObj.dataObject.iCurrentDay;
					sDay = (sDay < 10) ? ("0" + sDay) : sDay;
					var iMonth = dtPickerObj.dataObject.iCurrentMonth;
					var sMonthShort = dtPickerObj.settings.shortMonthNames[iMonth];
					var sMonthFull = dtPickerObj.settings.fullMonthNames[iMonth];
					var sYear = dtPickerObj.dataObject.iCurrentYear;
					var iDayOfTheWeek = dtPickerObj.dataObject.dCurrentDate.getDay();
					var sDayOfTheWeek = dtPickerObj.settings.shortDayNames[iDayOfTheWeek];
				
					$(dtPickerObj.element).find('.day .dtpicker-compValue').val(sDay);
					$(dtPickerObj.element).find('.month .dtpicker-compValue').val(sMonthShort);
					$(dtPickerObj.element).find('.year .dtpicker-compValue').val(sYear);
				
					var sDate = sDayOfTheWeek + ", " + sMonthFull + " " + sDay + ", " + sYear;
				
					//------------------------------------------------------------------
				
					var sHour = dtPickerObj.dataObject.iCurrentHour;
					if(dtPickerObj.dataObject.bIs12Hour)
					{
						if(sHour > 12)
							sHour -= 12;
					
						$(dtPickerObj.element).find('.meridiem .dtpicker-compValue').val(dtPickerObj.dataObject.sCurrentMeridiem);
					}
					sHour = (sHour < 10) ? ("0" + sHour) : sHour;
					if(dtPickerObj.dataObject.bIs12Hour && sHour == "00")
						sHour = 12;
					var sMinutes = dtPickerObj.dataObject.iCurrentMinutes;
					sMinutes = (sMinutes < 10) ? ("0" + sMinutes) : sMinutes;
				
					$(dtPickerObj.element).find('.hour .dtpicker-compValue').val(sHour);
					$(dtPickerObj.element).find('.minutes .dtpicker-compValue').val(sMinutes);
				
					var sTime = sHour + dtPickerObj.settings.timeSeparator + sMinutes;
					if(dtPickerObj.dataObject.bIs12Hour)
						sTime += dtPickerObj.settings.timeMeridiemSeparator + dtPickerObj.dataObject.sCurrentMeridiem;
				
					//------------------------------------------------------------------
				
					var sDateTime = sDate + dtPickerObj.settings.dateTimeSeparator + sTime;
				
					$(dtPickerObj.element).find('.dtpicker-value').html(sDateTime);
				}
			
				dtPickerObj._setButtons();
			},
		
			_setButtons: function()
			{
				var dtPickerObj = this;
				$(dtPickerObj.element).find('.dtpicker-compButton').removeClass("dtpicker-compButtonDisable").addClass('dtpicker-compButtonEnable');
			
				var dTempDate;
				if(dtPickerObj.dataObject.dMaxValue != null)
				{
					if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
					{
						// Decrement Hour
						if((dtPickerObj.dataObject.iCurrentHour + 1) > dtPickerObj.dataObject.dMaxValue.getHours() || ((dtPickerObj.dataObject.iCurrentHour + 1) == dtPickerObj.dataObject.dMaxValue.getHours() && dtPickerObj.dataObject.iCurrentMinutes > dtPickerObj.dataObject.dMaxValue.getMinutes()))
							$(dtPickerObj.element).find(".hour .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Decrement Minutes
						if(dtPickerObj.dataObject.iCurrentHour >= dtPickerObj.dataObject.dMaxValue.getHours() && (dtPickerObj.dataObject.iCurrentMinutes + 1) > dtPickerObj.dataObject.dMaxValue.getMinutes())
							$(dtPickerObj.element).find(".minutes .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					}
					else
					{
						// Increment Day
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, (dtPickerObj.dataObject.iCurrentDay + 1), dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
							$(dtPickerObj.element).find(".day .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Increment Month
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, (dtPickerObj.dataObject.iCurrentMonth + 1), dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
							$(dtPickerObj.element).find(".month .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Increment Year
						dTempDate = new Date((dtPickerObj.dataObject.iCurrentYear + 1), dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
							$(dtPickerObj.element).find(".year .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Increment Hour
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, (dtPickerObj.dataObject.iCurrentHour + 1), dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
							$(dtPickerObj.element).find(".hour .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Increment Minutes
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, (dtPickerObj.dataObject.iCurrentMinutes + 1), 0, 0);
						if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
							$(dtPickerObj.element).find(".minutes .increment").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					}
				}
			
				if(dtPickerObj.dataObject.dMinValue != null)
				{
					if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
					{
						// Decrement Hour
						if((dtPickerObj.dataObject.iCurrentHour - 1) < dtPickerObj.dataObject.dMinValue.getHours() || ((dtPickerObj.dataObject.iCurrentHour - 1) == dtPickerObj.dataObject.dMinValue.getHours() && dtPickerObj.dataObject.iCurrentMinutes < dtPickerObj.dataObject.dMinValue.getMinutes()))
							$(dtPickerObj.element).find(".hour .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Decrement Minutes
						if(dtPickerObj.dataObject.iCurrentHour <= dtPickerObj.dataObject.dMinValue.getHours() && (dtPickerObj.dataObject.iCurrentMinutes - 1) < dtPickerObj.dataObject.dMinValue.getMinutes())
							$(dtPickerObj.element).find(".minutes .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					}
					else
					{
						// Decrement Day 
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, (dtPickerObj.dataObject.iCurrentDay - 1), dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
							$(dtPickerObj.element).find(".day .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Decrement Month 
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, (dtPickerObj.dataObject.iCurrentMonth - 1), dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
							$(dtPickerObj.element).find(".month .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Decrement Year 
						dTempDate = new Date((dtPickerObj.dataObject.iCurrentYear - 1), dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
							$(dtPickerObj.element).find(".year .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Decrement Hour
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, (dtPickerObj.dataObject.iCurrentHour - 1), dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
						if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
							$(dtPickerObj.element).find(".hour .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					
						// Decrement Minutes
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, dtPickerObj.dataObject.iCurrentHour, (dtPickerObj.dataObject.iCurrentMinutes - 1), 0, 0);
						if(dTempDate.getTime() < dtPickerObj.dataObject.dMinValue.getTime())
							$(dtPickerObj.element).find(".minutes .decrement").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
					}
				}
				
				if(dtPickerObj.dataObject.bIs12Hour)
				{
					if(dtPickerObj.dataObject.dMaxValue != null || dtPickerObj.dataObject.dMinValue != null)
					{
						var iTempHour = dtPickerObj.dataObject.iCurrentHour;
						if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "AM"))
							iTempHour += 12;
						else if(dtPickerObj._compare(dtPickerObj.dataObject.sCurrentMeridiem, "PM"))
							iTempHour -= 12;
					
						dTempDate = new Date(dtPickerObj.dataObject.iCurrentYear, dtPickerObj.dataObject.iCurrentMonth, dtPickerObj.dataObject.iCurrentDay, iTempHour, dtPickerObj.dataObject.iCurrentMinutes, 0, 0);
					
						if(dtPickerObj.dataObject.dMaxValue != null)
						{
							if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
							{
								var iTempMinutes = dtPickerObj.dataObject.iCurrentMinutes;
								if(iTempHour > dtPickerObj.dataObject.dMaxValue.getHours() || (iTempHour == dtPickerObj.dataObject.dMaxValue.getHours() && iTempMinutes > dtPickerObj.dataObject.dMaxValue.getMinutes()))
									$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
							}
							else
							{
								if(dTempDate.getTime() > dtPickerObj.dataObject.dMaxValue.getTime())
									$(dtPickerObj.element).find(".meridiem .dtpicker-compButton").removeClass("dtpicker-compButtonEnable").addClass("dtpicker-compButtonDisable");
							}
						}
					
						if(dtPickerObj.dataObject.dMinValue != null)
						{
							if(dtPickerObj._compare(dtPickerObj.settings.mode, "time"))
							{
								var iTempMinutes = dtPickerObj.dataObject.iCurrentMinutes;
								if(iTempHour < dtPickerObj.dataObject.dMinValue.getHours() || (iTempHour == dtPickerObj.dataObject.dMinValue.getHours() && iTempMinutes < dtPickerObj.dataObject.dMinValue.getMinutes()))
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
				if(sString1.toLowerCase() == sString2.toLowerCase())
					return true;
				else
					return false;				
			},
		
			setIsPopup: function(isPopup)
			{
				var dtPickerObj = this;
				dtPickerObj.settings.isPopup = isPopup;
			
				if($(dtPickerObj.element).css("display") != "none")
					dtPickerObj._hidePicker(1);
				if(dtPickerObj.settings.isPopup)
				{
					$(dtPickerObj.element).addClass("dtpicker-mobile");
					
					$(dtPickerObj.element).css({position: "fixed", top: 0, left: 0, width: "100%", height: "100%"});
				}
				else
				{
					$(dtPickerObj.element).removeClass("dtpicker-mobile");
					
					if(dtPickerObj.dataObject.oInputElement != null)
					{
						var iElemTop = $(dtPickerObj.dataObject.oInputElement).offset().top + $(dtPickerObj.dataObject.oInputElement).outerHeight();
						var iElemLeft = $(dtPickerObj.dataObject.oInputElement).offset().left;
						var iElemWidth =  $(dtPickerObj.dataObject.oInputElement).outerWidth();
				
						$(dtPickerObj.element).css({position: "absolute", top: iElemTop, left: iElemLeft, width: iElemWidth, height: "auto"});
					}
				}
			},
		
			_compareDates: function(dDate1, dDate2)
			{
				var iDateMatch = 0;
				if(dDate1.getDate() == dDate2.getDate() && dDate1.getMonth() == dDate2.getMonth() && dDate1.getFullYear() == dDate2.getFullYear())
					iDateMatch = 1;  	// 1 = Exact Match
				else
				{
					if(dDate1.getFullYear() < dDate2.getFullYear())
						iDateMatch = 2;	 // date1 < date2
					else if(dDate1.getFullYear() > dDate2.getFullYear())
						iDateMatch = 3; 	// date1 > date2
					else if(dDate1.getFullYear() == dDate2.getFullYear())
					{
						if(dDate1.getMonth() < dDate2.getMonth())
							iDateMatch = 2;	 // date1 < date2
						else if(dDate1.getMonth() > dDate2.getMonth())
							iDateMatch = 3; 	// date1 > date2
						else if(dDate1.getMonth() == dDate2.getMonth())
						{
							if(dDate1.getDate() < dDate2.getDate())
								iDateMatch = 2;	 // date1 < date2
							else if(dDate1.getDate() > dDate2.getDate())
								iDateMatch = 3; 	// date1 > date2
						}
					}
				}
				return iDateMatch;
			},
		
			_compareTime: function(dTime1, dTime2)
			{
				var iTimeMatch = 0;
				if((dTime1.getHours() == dTime2.getHours()) && (dTime1.getMinutes() == dTime2.getMinutes()))
					iTimeMatch = 1;  	// 1 = Exact Match
				else
				{
					if(dTime1.getHours() < dTime2.getHours())
						iTimeMatch = 2;	 // time1 < time2
					else if(dTime1.getHours() > dTime2.getHours())
						iTimeMatch = 3; 	// time1 > time2
					else if(dTime1.getHours() == dTime2.getHours())
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
				var iDateTimeMatch = 0;
				if((dDate1.getDate() == dDate2.getDate() && dDate1.getMonth() == dDate2.getMonth() && dDate1.getFullYear() == dDate2.getFullYear()) && (dDate1.getHours() == dDate2.getHours()) && (dDate1.getMinutes() == dDate2.getMinutes()))
					iDateTimeMatch = 1;  	// 1 = Exact Match
				else
				{
					if(dDate1.getFullYear() < dDate2.getFullYear())
						iDateTimeMatch = 2;	 // date1 < date2
					else if(dDate1.getFullYear() > dDate2.getFullYear())
						iDateTimeMatch = 3; 	// date1 > date2
					else if(dDate1.getFullYear() == dDate2.getFullYear())
					{
						if(dDate1.getMonth() < dDate2.getMonth())
							iDateTimeMatch = 2;	 // date1 < date2
						else if(dDate1.getMonth() > dDate2.getMonth())
							iDateTimeMatch = 3; 	// date1 > date2
						else if(dDate1.getMonth() == dDate2.getMonth())
						{
							if(dDate1.getDate() < dDate2.getDate())
								iDateTimeMatch = 2;	 // date1 < date2
							else if(dDate1.getDate() > dDate2.getDate())
								iDateTimeMatch = 3; 	// date1 > date2
							else if(dDate1.getDate() == dDate2.getDate())
							{
								if(dDate1.getHours() < dDate2.getHours())
									iDateTimeMatch = 2;	 // date1 < date2
								else if(dDate1.getHours() > dDate2.getHours())
									iDateTimeMatch = 3; 	// date1 > date2
								else if(dDate1.getHours() == dDate2.getHours())
								{
									if(dDate1.getMinutes() < dDate2.getMinutes())
										iDateTimeMatch = 2;	 // date1 < date2
									else if(dDate1.getMinutes() > dDate2.getMinutes())
										iDateTimeMatch = 3; 	// date1 > date2
								}
							}
						}
					}
				}
				return iDateTimeMatch;
			}
		
		};
	
})( jQuery, window, document );


