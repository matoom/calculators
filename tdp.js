function drawTable(circleFirst, circleSecond) {
   	circleFirst = parseInt(circleFirst);
   	circleSecond = parseInt(circleSecond);

    var text =  "";
	var tdps = new Array();
    var sumTdps = new Number();
        
    if(circleFirst < 1) {
        circleFirst = 1;
	}

   	/*if ((circleSecond - circleFirst) > 50) {
        document.getElementById('tdpsFromCircle').innerHTML = "Can't display more than 50 circles at a time.";
   		return;
   	}*/

   	if (circleSecond > 150) {
   		document.getElementById('tdpsFromCircle').innerHTML = "Can't display more than 150 circles.";
   		return;
    }

	var baseTdps = 50;
    for(var i = circleFirst; i < circleSecond; i++) {
	    if(i >= 13) {
	        baseTdps = 100;
	    }

	    tdps[i] = baseTdps + i + 1;
	    sumTdps = tdps[i] + sumTdps;

	    text = sumTdps;
	}

   	document.getElementById('tdpsFromCircle').innerHTML = text;
}