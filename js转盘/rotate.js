;(function(window) {
  function Rotate(config) {
    var options = {
      steps: [],
      running: false,
      timer: null,
      // outEl: document.getElementById('outer')
    };
    this.options = Object.assign(options, config);
    // this.countSteps();
  }
  Rotate.prototype = {
    /*init: function() {
      this.countSteps();
      this.animCallback(this.step);
    },*/
    start: function() {
      var config = this.options,
          i = 10;
      if (config.running) return;
      config.running = true;
      
      config.timer = setInterval(function () {
        i += 4;
        config.outEl.style.webkitTransform = 'rotate3d(0,0,1,'+i+'deg)';
      }, 5)
    },
    end: function(prize) {
      var config = this.options;
      //重置
      config.now = 0;
      config.steps = [];

      this.countSteps(prize);
      // 设置停止角度
      config.timer && clearInterval(config.timer);

      this.animCallback(this.step);
    },
    // 组装step算法
    countSteps: function(prize) {
      var deg = this.getPrize(prize);
      var config = this.options,
          totalDeg = 360 * 3 + deg,
          a = 0.01,
          t = Math.sqrt(2 * totalDeg / a),
          v = a * t;

      for (var i = 0; i < t; i++) {
        config.steps.push((2 * v * i - a * i * i) / 2)
      }
      config.steps.push(totalDeg)
    },
    animCallback: function(callback) {
      setTimeout(callback.bind(this), 6)
    },
    step: function() {
      var config = this.options;

      config.outEl.style.webkitTransform = 'rotate3d(0,0,1,'+config.steps[config.now++]+'deg)';
      // outter.style.MozTransform = 'rotate(' + steps[now++] + 'deg)';
      if (config.now < config.steps.length) {
        this.animCallback(this.step);
      } else {
        config.running = false;
      }
    },
    getPrize: function(type) {
      //type必填
      var section = this.options.section[type],
          pareceRate = section.split('~'),
          minRate = parseInt(pareceRate[0]),
          maxRate = parseInt(pareceRate[1]);
      return parseInt(Math.random()*(maxRate-minRate+1)+minRate, 10);
      /*if (!type ) {return parseInt(Math.random()*360+1, 10);
      } else {}*/
    }
  }

  window.Rotate = Rotate;
}(window))