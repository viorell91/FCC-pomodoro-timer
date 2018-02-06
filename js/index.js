//------------------------
//INIT PARAMETERS
//------------------------
var scaleStartPos1 = parseFloat($("#scale1").css('margin-left'), 10);
var scaleStartPos2 = parseFloat($("#scale2").css('margin-left'), 10);
var scaleStartPos3 = parseFloat($("#scale3").css('margin-left'), 10);

var sessionDuration=0;
var start = new Boolean(true);
var firstRun = new Boolean(false);

var startButton = document.getElementById("start");
var pauseButton = document.getElementById("pause");
var resetButton = document.getElementById("start");
//------------------------
//FUNCTIONALITY
//------------------------
//move slider to set timer
 function move(){
	 //starting positions of sliders
   scaleStartPos1-=10;
	 scaleStartPos2-=10;
	 scaleStartPos3-=10;
	 if(scaleStartPos1<=-500){
		 scaleStartPos1=910;
	 }
	 else if(scaleStartPos2<=-500){
		 scaleStartPos2=910;
	 }
	 else if(scaleStartPos3<=-500){
		 scaleStartPos3=910;
	 }
	 $('#scale1').css({marginLeft: scaleStartPos1});
	 $('#scale2').css({marginLeft: scaleStartPos2});
	 $('#scale3').css({marginLeft: scaleStartPos3});
 }

function getTimeRemaining(endtime){
  var t = endtime - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
	
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}
//set timer function
function setEndTime(minutes){
	return Date.now()+minutes*60*1000;
}
//document.getElementById("display").innerHTML = setEndTime(2);
function initializeClock(id, endtime){
  var clock = document.getElementById(id);
	timeinterval = setInterval(function(){
		t = getTimeRemaining(endtime);
		clock.innerHTML = t.minutes +":"+ t.seconds;
		move();
		if(t.total<=1000){
			clearInterval(timeinterval);
			clock.innerHTML = t.minutes +":"+ t.seconds+"0";
		}
	},1000);
}
//display duration
$('#display').text(sessionDuration+":00");
$(function(){
	$(".slider").draggable({
		drag: function(){
			$(".instructions").hide(100);
			offset = $(this).offset();
			var xPos = offset.left;
			sessionDuration = Math.round(xPos/10);
			$('#display').text(sessionDuration+":00");
		},
		axis: "x",
		containment: $("#limiting-container"),
		cursor:"pointer"
	});
}); 
//function for start button of the timer
function startTimer(){
	if(start && sessionDuration>0){
			startButton.style.display = "none";
		  pauseButton.style.display = "block";
		if(firstRun){
			$(".slider").draggable("disable");
			var endTime = setEndTime(sessionDuration);
			firstRun = false;
		  initializeClock("display", endTime);
		}
		else{
			//startButton.style.display = "none";
		  //pauseButton.style.display = "block";
			var remainingTime = t.total + Date.parse(new Date());
			initializeClock("display", remainingTime);
		}
		start = false;
	}else{
		startButton.style.display = "block";
		pauseButton.style.display = "none";
		clearInterval(timeinterval);
		start = true;
	}
}
//reset
function resetTimer(){
	clearInterval(timeinterval);
	initializeClock("display", Date.parse(new Date())+1000);
	firstRun = true;
	start = true;
	sessionDuration=0;
	$(".slider").offset({left: 0});
	$(".slider").draggable("enable");
	startButton.style.display = "block";
  pauseButton.style.display = "none";
}