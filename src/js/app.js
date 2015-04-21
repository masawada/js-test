(function() {
  var safeEval = require('notevil');
  var Console = require('./console');
  var consoleIm = new Console('console');

  Vue.config.async = false;
  var app = new Vue({
    el: '#app',
    data: {
      raw_script: '',
      script: '',
      tabwidth: 2,
      errorLine: null
    },
    computed: {
      lines: function() {
        return this.$get('raw_script').split('\n').length;
      }
    },
    methods: {
      sourceinput: function(e) {
        var flag = false;
        var textarea = e.target;
        var text =  this.$get('raw_script');
        var tabwidth = this.$get('tabwidth');
        var selectionStart = textarea.selectionStart;
        var selectionEnd = textarea.selectionEnd;
        var lineHighlight = document.querySelector('.line-highlight');

        if ((e.metaKey === true || e.ctrlKey === true) && e.keyCode === 13) { // execute
          if (lineHighlight) lineHighlight.parentNode.removeChild(lineHighlight); // black magic
          this.$set('errorLine', '');
          this.exec();
          this.$set('script', text);
          Prism.highlightAll(false);
          flag = true;
        } else if (e.keyCode === 9) { // tab insert
          text = text.substr(0, selectionStart) + Array(tabwidth + 1).join(' ') + text.slice(selectionEnd);
          this.$set('raw_script', text);
          textarea.selectionStart = textarea.selectionEnd = selectionStart + tabwidth;
          flag = true;
        }

        if (flag) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      },
      exec: function() {
        try {
          safeEval(this.$get('raw_script'), {console: consoleIm});
        } catch(e) {
          consoleIm.error(e.message);
          if (e.lineNumber) {
            this.$set('errorLine', e.lineNumber);
          }
        }
      }
    }
  });
})();
