window.onload = function () {
	document.body.addEventListener('click', function (event) {
		if (event.target.nodeName === 'INPUT') {
			//event.preventDefault(); Отмена действия браузера по умолчанию              
			var control = event.target;
			var master = new objectWashingOptions(control);
		}
	}, true);
};




/*global timer*/

var timerGlobal = function () {
	var timeInterval = function () {setTimeout(timerGlobal, 1000)};
	var elemMinutes = document.getElementById('minutes');
	var elemHourse = document.getElementById('hours');
	var elemSeconds = document.getElementById('seconds');


	if (washMachineModel.statusWashing === 'process') {
		elemSeconds.innerHTML--;
		var elemSecondsSecound = ('0' + elemSeconds.innerHTML).slice(-2);
		elemSeconds.innerHTML = elemSecondsSecound;


		if (elemSeconds.innerHTML == 0) {
			
			if (elemMinutes.innerHTML == 0) {
				
				if (elemHourse.innerHTML !== '00') {
					elemMinutes.innerHTML = '59';
					elemSeconds.innerHTML = '59';
					elemHourse.innerHTML--;
					var elemHourseSecound = ('0' + elemHourse.innerHTML).slice(-2);
					elemHourse.innerHTML = elemHourseSecound;
					timeInterval();
					
				} else {
					var infoTextElement = document.createElement('div');
					infoTextElement.innerHTML = '<p class="message">Program was finished</p>';
					elemMinutes.parentNode.parentNode.appendChild(infoTextElement);
					washMachineModel.statusWashing = 'finished';
					objectWashingOptions.statusOnChange();
					clearInterval(timeInterval);
				}
				
			} else {
				elemSeconds.innerHTML = '59';
				elemMinutes.innerHTML--;
				var elemMinutesSecound = ('0' + elemMinutes.innerHTML).slice(-2);
				elemMinutes.innerHTML = elemMinutesSecound;
				timeInterval();
			}

		} else {
			timeInterval();
		}
	} else {
		clearTimeout(timeInterval);
	}



	clearInterval(timerGlobal);
}