JavascriptTooltip
==================

A very easy to implement javascript code to create tooltips for html elements.

Usage:

Include the javascript file in your page and follow these simple steps to apply tooltips to your page elements:

###Create a new object from the ToolTipJS object.

```
tooltipJS = new ToolTipJS();
```

###Add the tooltip location preferences by using the function "**addLocationPreference**".

```
tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Top, "tooltip-Top"));
tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Right, "tooltip-Right"));
tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Left, "tooltip-Left"));
tooltipJS.addLocationPreference(new tooltipJS.tooltipLocation(tooltipJS.LocationConstants.Bottom, "tooltip-Bottom"));
```

###Apply the tooltip by calling function "**applyTooltip**". 

```
tooltipJS.applyTooltip("Div1", getProductContent("The Swede White", "29.00", "white"), 20, false);
tooltipJS.applyTooltip("Div2", getProductContent("Six by Seven", "29.00", "#DAF4F0"), 20, true);
tooltipJS.applyTooltip("Div3", getProductContent("1959", "29.00", "red"), 20, true);
tooltipJS.applyTooltip("Div4", getProductContent("The Professional", "29.00", "blue"), 20, true);
```

###Function Reference

**addLocationPreference(location)**

Parameters:

_location_: An object of type TooltipJS.tooltipLocation which contains the location constant and the css class name. 

***

**TooltipJS.tooltipLocation** object constructor has the following parameters: 

Parameters:

_location_: A value from the TooltipJS.LocationConstants indicating a single location.

_className_: Css class to be applied when the tooltip is showing at that particular location.

***

**applyTooltip**: Applies the tooltip to a particular page element.

Parameters:

_sourceControlId_: Id of the source element for which we want to apply the tooltip.

_content_: Tooltip content, this can be string or any valid html text. 

_distance_: Distance between the source element and the tooltip. If showAtPointer is true then this the distance between the current mouse position and the tooltip. 

_showAtPointer_: If set to true then the tooltip will move with the moving mouse pointer over the source element. 

***

**resetLocationPreference**: resets the location preference.

That was it, have fun creating tooltips!!
