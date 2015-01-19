//originally from 
// http://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-money-in-javascript
// Added Additional 'pledge' scale 
function formatCurrency(n, c, d, t) {
    "use strict";

    var s, i, j;

    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d === undefined ? "." : d;
    t = t === undefined ? "," : t;

    s = n < 0 ? "-" : "";
    i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + "";
    j = (j = i.length) > 3 ? j % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}

/**
 * http://community.sitepoint.com/t/code-for-a-fundraising-thermometer/21832/13
 * Thermometer Progress meter.
 * This function will update the progress element in the "thermometer"
 * to the updated percentage.
 * If no parameters are passed in it will read them from the DOM
 *
 * @param {Number} goalAmount The Goal amount, this represents the 100% mark
 * @param {Number} progressAmount The progress amount is the current amount
 * @param {Boolean} animate Whether to animate the height or not
 *
 */
function thermometer(goalAmount, pledgeAmount, progressAmount, animate) {
    "use strict";

    var $thermo = $("#thermometer"),
        $progress = $(".progress", $thermo),
        $pledge = $(".pledge", $thermo),
        $goal = $(".goal", $thermo),
        percentageAmount, percentagePledge;

    goalAmount = goalAmount || parseFloat( $goal.text() ),
    pledgeAmount = progressAmount || parseFloat( $pledge.text() ),
    progressAmount = progressAmount || parseFloat( $progress.text() ),

    percentagePledge =  Math.min( Math.round(pledgeAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point
    percentageAmount =  Math.min( Math.round(progressAmount / goalAmount * 1000) / 10, 100); //make sure we have 1 decimal point

    //let's format the numbers and put them back in the DOM
    $goal.find(".amount").text( "$" + formatCurrency( goalAmount, 0 ) );
    $pledge.find(".amount").text( "$" + formatCurrency( pledgeAmount, 0 ) );
    $progress.find(".amount").text( "$" + formatCurrency( progressAmount, 0 ) );


    //let's set the progress indicator
    $pledge.find(".amount").hide();
    $progress.find(".amount").hide();

    if (animate !== false) {
        // THe pledge amount first
        $pledge.animate({
            "height": percentagePledge + "%"
        }, 1200, function(){
            $(this).find(".amount").fadeIn(500);

            // Then the actual amount
            $progress.animate({
                "height": percentageAmount + "%"
            }, 1200, function(){
                $(this).find(".amount").fadeIn(500);
            });

        });
    }
    else {
        $progress.css({
            "height": percentageAmount + "%"
        });
        $progress.find(".amount").fadeIn(500);
    }
}

$(document).ready(function(){

    //call without the parameters to have it read from the DOM
    thermometer();
    // or with parameters if you want to update it using JavaScript.
    // you can update it live, and choose whether to show the animation
    // (which you might not if the updates are relatively small)
    //thermometer( 1000000, 425610, false );

});
