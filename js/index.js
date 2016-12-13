//http://www.html5rocks.com/en/tutorials/webaudio/intro/#toc-load
//wanna be able to type the time in
//show visually when the pomodoro is active/not active, eh, kinda
//change color of blob basaed on session (blue for break, red for session)


window.onload = function() {

	var duration, minutes, seconds, timer, refreshIntervalId;
	var audio = new Audio('http://www.noiseaddicts.com/samples_1w72b820/3721.mp3');

	 var toggleTime = function() {
		var action = document.getElementById(this.id).innerHTML;
		if (action=="-") {
			var timename = document.getElementById(this.id).nextElementSibling.id;
			var time = parseInt(document.getElementById(this.id).nextElementSibling.innerHTML,10);
				if (time > 1) {
					time-=1;
					document.getElementById(this.id).nextElementSibling.innerHTML = time;
					}
				if (document.getElementById("phase").innerHTML === timename) {
						document.getElementById("counter").innerHTML = time;
				}
			}
		if (action=="+") {
			var timename = document.getElementById(this.id).previousElementSibling.id;
			var time = parseInt(document.getElementById(this.id).previousElementSibling.innerHTML,10);
			time+=1;
			document.getElementById(this.id).previousElementSibling.innerHTML = time;
			}
			if (document.getElementById("phase").innerHTML === timename) {
						document.getElementById("counter").innerHTML = time;
				}
	 }
	
	function startTimer() {
		removeToggleTime();
		document.getElementById("timerblob").classList.add("glow-button");
		document.getElementById("sessSym").classList.remove("glyphicon-play");
		document.getElementById("sessSym").classList.add("glyphicon-pause");
		document.getElementById("timerblob").removeEventListener("click",startTimer,false);
		document.getElementById("timerblob").addEventListener("click",stopTimer,false);
			//duration has to be taken from the toggle-window with the same time_id as the blob
			var timerState = document.getElementById("counter").innerHTML;
			if (timerState.indexOf(":")===-1) {
				duration = parseInt(document.getElementById("counter").innerHTML,10)*60;
			}
			else {
				var durationArray = document.getElementById("counter").innerHTML.split(":");
				duration = parseInt(durationArray[0],10)*60+parseInt(durationArray[1],10);
				}
			timer = duration, minutes, seconds;
			refreshIntervalId = setInterval(function () {
				minutes = parseInt(timer / 60,10);
				seconds = parseInt(timer % 60, 10);

				minutes = minutes < 10 ? "0" + minutes : minutes;
				seconds = seconds < 10 ? "0" + seconds : seconds;
				document.getElementById("counter").innerHTML = minutes + ":" + seconds;

				if (--timer < 0) {
					audio.play();
					clearInterval(refreshIntervalId);
					if(document.getElementById("phase").innerHTML==="session") {
						document.getElementById("phase").innerHTML="break";
						document.getElementById("counter").innerHTML = parseInt(document.getElementById("break").innerHTML,10);
						document.getElementById("timerblob").classList.remove("btn-danger");
						document.getElementById("timerblob").classList.add("btn-success");
					}
					else {
						document.getElementById("phase").innerHTML="session";
						document.getElementById("counter").innerHTML = parseInt(document.getElementById("session").innerHTML,10);
						document.getElementById("timerblob").classList.remove("btn-success");
						document.getElementById("timerblob").classList.add("btn-danger");
						}
					startTimer();
				}
			}, 1000);
	}
	
	function stopTimer() {
		document.getElementById("sessSym").classList.add("glyphicon-play");
		document.getElementById("sessSym").classList.remove("glyphicon-pause");
		document.getElementById("timerblob").classList.remove("glow-button");
		document.getElementById("timerblob").removeEventListener("click",stopTimer,false);
		document.getElementById("timerblob").addEventListener("click",startTimer,false);
		addToggleTime();
		clearInterval(refreshIntervalId);
	}
	
	function toggleSound() {
		//change glyphicon on condition
		if (document.getElementById("icon").className === "glyphicon glyphicon-volume-up") {
			document.getElementById("icon").classList.remove("glyphicon-volume-up");
			document.getElementById("icon").classList.add("glyphicon-volume-off");
			audio.muted = true;
			}
		else {
			document.getElementById("icon").classList.remove("glyphicon-volume-off");
			document.getElementById("icon").classList.add("glyphicon-volume-up");
			audio.muted = false;
		}
	}
	
	//add Eventlisteners
	var timeSetters = document.getElementsByClassName("toggletime");
	
	var addToggleTime = function() {
		for (var i=0;i<timeSetters.length;i++) {
			timeSetters[i].addEventListener("click", toggleTime, false);
			timeSetters[i].classList.remove("disabled");
			timeSetters[i].classList.add("enabled");
			}
		};
	
	var removeToggleTime = function() {
		for (var i=0;i<timeSetters.length;i++) {
			timeSetters[i].removeEventListener("click", toggleTime, false);
			timeSetters[i].classList.remove("enabled");
			timeSetters[i].classList.add("disabled");
			}
		};
		
	addToggleTime();		
	document.getElementById("timerblob").addEventListener("click",startTimer,false);
	document.getElementById("sound").addEventListener("click",toggleSound,false);
};