(function() {
  var safeEval = require('notevil');
  var Console = require('./console');
  var consoleIm = new Console('console');

  var app = new Vue({
    el: '#app',
    data: {
      script: ''
    },
    methods: {
      exec: function() {
        try {
          safeEval(this.$get('script'), {console: consoleIm});
        } catch(e) {
          consoleIm.error(e.message);
        }
      }
    }
  });
})();
