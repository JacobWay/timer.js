(function() {
  let q = document.querySelector.bind(document);
  let timerDom = q('.prompt');
  let playDom = q('.play');
  let pauseDom = q('.pause');
  let stopDom = q('.stop');
  let timeDom = q('.time-input');

  var timer = new Timer({
    onstart: function(milliSecond) {
      let sec = Math.round(milliSecond/1000);
      timerDom.innerText = sec;
    },
    ontick: function(milliSecond) {
      let sec = Math.round(milliSecond/1000);
      timerDom.innerText = sec;
    },
    onpause: function() {
      timerDom.innerText = 'pause';
    },
    onstop: function() {
      timerDom.innerText = 'stop';
    },
    onend: function() {
      timerDom.innerText = 'end';
    }
  });

  playDom.addEventListener('click', function() {
    let time = parseInt(timeDom.value);
    console.log('time: ', time);
    timer.start(time);
  });
  pauseDom.addEventListener('click', function() {
    if(timer.getStatus() === 'started') {
      timer.pause();
    }
  });
  stopDom.addEventListener('click', function() {
    if(/started|paused/.test(timer.getStatus())) {
      timer.stop();
    }
  });
})();
