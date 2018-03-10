var Timer = function(options) {
  this._ = {
    options: {},
    duration: 0,
    start: 0,
  };

  this.defaultOptions = {
    onstart: null,
  };

  let {defaultOptions} = this;

  console.log('??? 14 options: ', options);
  for(let key in defaultOptions) {
    this._.options[key] = defaultOptions[key];
    console.log('??? 14 key: ', key);
    console.log('??? 14 options: ', this._);
  }

  for(let key in options) {
    this._.options[key] = options[key];
    console.log('??? 14 options: ', this._);
  }
};

Timer.prototype.start = function(duration) {
  duration && (duration *= 1000);
  this._.duration = duration || this._.duration;
  this._.start = +(new Date);

  this._.timeout = setTimeout(end.bind(this), duration);
  trigger.call(this, 'onstart', this.getDuration());

  let ontick = this._.options['ontick'];
  if(typeof(ontick) === 'function') {
    this._.interval = setInterval(function() {
      trigger.call(this, 'ontick', this.getDuration());
    }.bind(this),  1000);
  }

  return this;
};

Timer.prototype.getDuration = function() {
  let timeEnd = +(new Date);
  let timeStart = this._.start;
  let duration = this._.duration - (timeEnd - timeStart);

  return duration;
};

Timer.prototype.on = function(action, value) {
  if(typeof(action) !== 'string' || typeof(value) !== 'function') return this;

  if(!(/^on/).test(action)) {
    action = 'on' + action;
  }
  console.log('??? action: ', action);

  if(this._.options.hasOwnProperty(action)) {
    this._.options[action] = value;
  }
  return this;
};

function end() {
  clear.call(this);
  trigger.call(this, 'onend');
}

function clear(clearDuration) {
  clearTimeout(this._.timeout);
  clearInterval(this._.interval);
  clearDuration && (this._.duration = 0);
  console.log('??? clear duration: ', this._.duration);
}

function trigger(event) {

  let callback = this._.options[event];
  let args = [].slice.call(arguments, 1);
  typeof(callback) === 'function' && callback.apply(this, args);
  console.log('??? 41 trigger event: ', event);
  console.log('??? 41 trigger callback: ', callback);
}

console.log('??? global this: ', this);

var duration = 3;
var options = {
  onstart: function(milliSecond) {
    let second = Math.round(milliSecond/1000);
    console.log('??? onstart second: ', second);
  },
  ontick: function(milliSecond) {
    let second = Math.round(milliSecond/1000);
    console.log('??? ontick second: ', second);
  },
  onpause: function() {
    console.log('??? onpause : ');
  },
  onstop: function() {
    console.log('??? onstop: ');
  },
  onend: function() {
    console.log('??? onend: ');
  },
};

var timer = new Timer(options);
timer.start(duration);

