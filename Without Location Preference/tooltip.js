;
(function (jQuery, w) {
    var $ = jQuery;
    var toolTipJS = function () {
        //***Summary***
        //applies the tooltip show and hide functions on the mouseover and
        //mouseout events of the source control
        //***Params****
        //sourceControlId = ID of source control.
        //content = Tooltip content.
        //distance = Distance between the tooltip and the source control.
        //*************
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

            sourceControl.mouseover({
                "sourceControl": sourceControl,
                "content": content,
                "distance": distance
            }, showToolTip);
            sourceControl.mouseout(hideTooltip);
        };
    };

    //***Summary***
    //show the tooltip after computing the position and the correct style to apply on
    //the tooltip div.
    //*************
    function showToolTip(e) {
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

        //check for suitable location to show the tooltip
        //sequence is top>right>left>bottom
        if (!(divToolTip.outerHeight() + distance > top)) { //top
            divToolTip.addClass("tooltip-Top");
            targetLeft = left;
            //we need to set css left here to correctly compute the tooltip div height
            divToolTip.css("left", targetLeft);
            targetTop = top - divToolTip.outerHeight() - distance;
        }
        else if (!(divToolTip.outerWidth() + distance > $(document).width() - right)) { //right
            divToolTip.addClass("tooltip-Right");
            targetLeft = right + distance;
            targetTop = top;
        }
        else if (!(divToolTip.outerWidth() + distance > left)) { //left
            divToolTip.addClass("tooltip-Left");
            targetLeft = left - divToolTip.outerWidth() - distance;
            targetTop = top;
        }
        else if (!(divToolTip.outerHeight() + distance > $(document).height() - bottom)) { //bottom
            divToolTip.addClass("tooltip-Bottom");
            targetLeft = left;
            targetTop = bottom + distance;
        }

        divToolTip.css("top", targetTop);
        divToolTip.css("left", targetLeft);
        divToolTip.css("display", "block");
    };

    //***Summary***
    //hides the toooltip div.
    //*************
    function hideTooltip() {
        $("#divToolTip").css("display", "none");
    };
    
    w["ToolTipJS"] = toolTipJS;
})($, window);