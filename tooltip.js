;
var ToolTipJS = null;
(function () {
    var toolTipJS = function () {
        //array to hold tooltip location preferences
        this.locationPreference = [];
        //tooltip location constants
        this.LocationConstants = {
            Top: 1,
            Left: 2,
            Right: 3,
            Bottom: 4
        };
        //Add a location preference
        this.addLocationPreference = function (l) {
            this.locationPreference.push(l);
        };
        //Resets location preferences
        this.resetLocationPreference = function(l) {
            this.locationPreference = [];
        }
        //applies the tooltip show and hide functions on the mouseover and
        //mouseout events of the source control
        this.applyTooltip = function (sourceControlId, content, distance) {
            var divToolTip = null;
            var sourceControl = $("#" + sourceControlId);
            divToolTip = $("#divToolTip");

            //create our tooltip div if not already present
            if (!(divToolTip.length > 0)) {
                divToolTip = document.createElement("div");
                divToolTip.setAttribute("id", "divToolTip");
                $("body").append(divToolTip);
                divToolTip = $("#divToolTip");
                divToolTip.css("position", "absolute");
                divToolTip.css("display", "none");
            }

            //divToolTip.css("border", "solid 1px black");
            //divToolTip.css("font-family", "Arial");
            //divToolTip.css("font-size", "medium");

            sourceControl.mouseover({
                "sourceControl": sourceControl,
                "content": content,
                "distance": distance,
                "lP": this.locationPreference,
                "lC": this.LocationConstants
            }, this.showToolTip);
            sourceControl.mouseout(this.hideTooltip);
        };
        //show the tooltip after computing the position and the correct style to apply on
        //the tooltip div.
        this.showToolTip = function (e) {
            var i = 0;
            var sourceControl = e.data.sourceControl;
            var content = e.data.content;
            var targetLeft = null, targetTop = null; //top and left of the tooltip div
            var top = sourceControl.offset().top;
            var left = sourceControl.offset().left;
            var right = sourceControl.offset().left + sourceControl.outerWidth();
            var bottom = sourceControl.offset().top + sourceControl.outerHeight();
            var divToolTip = $("#divToolTip");
            var distance = e.data.distance;
            var lP = e.data.lP, lC = e.data.lC;

            divToolTip.removeClass(); //remove any previous class
            //reset top and left
            divToolTip.css("top", 0);
            divToolTip.css("left", 0);
            divToolTip.html(content); //set the tooltip content
            for (; i < lP.length; i++) {
                switch (lP[i]) {
                    case lC.Top:
                        if (divToolTip.outerHeight() + distance > top) {
                            continue;
                        }
                        else {
                            $("#divToolTip").addClass("tooltip-Top");
                            targetLeft = left;
                            //we need to set css left here to correctly compute the tooltip div height
                            $("#divToolTip").css("left", targetLeft);
                            targetTop = top - divToolTip.outerHeight() - distance;
                        }
                        break;
                    case lC.Right:
                        if ((divToolTip.outerWidth() + distance) > ($(document).width() - right)) {
                            continue;
                        }
                        else {
                            $("#divToolTip").addClass("tooltip-Right");
                            targetLeft = right + distance;
                            targetTop = top;
                        }
                        break;
                    case lC.Left:
                        if (divToolTip.outerWidth() + distance > left) {
                            continue;
                        }
                        else {
                            $("#divToolTip").addClass("tooltip-Left");
                            targetLeft = left - divToolTip.outerWidth() - distance;
                            targetTop = top;
                        }
                        break;
                    case lC.Bottom:
                        if (divToolTip.outerHeight() + distance > $(document).height() - bottom) {
                            continue;
                        }
                        else {
                            $("#divToolTip").addClass("tooltip-Bottom");
                            targetLeft = left;
                            targetTop = bottom + distance;
                        }
                        break;
                }
                break;
            }

            $("#divToolTip").css("top", targetTop);
            $("#divToolTip").css("left", targetLeft);
            $("#divToolTip").css("display", "block");
        };
        //hides the toooltip div.
        this.hideTooltip = function () {
            $("#divToolTip").css("display", "none");
        };
    };
    ToolTipJS = toolTipJS;
})();