$(document).ready(function() 
{
	var bIsPopup = displayPopup();

    $("#dtBox").DateTimePicker(
    {
    	isPopup: bIsPopup,
    
    	addEventHandlers: function()
    	{
    		var dtPickerObj = this;
    	
    		$(window).resize(function()
    		{
    			bIsPopup = displayPopup();
    			dtPickerObj.setIsPopup(bIsPopup);
    		});
    	}
    });
});

function displayPopup()
{
	if($(document).width() >= 768)
		return false;
	else
		return true;
}