var Console = function(consoleId) {
  this._out = document.getElementById(consoleId);
};

Console.prototype = {
  _appendLog: function(message, style) {
    var li = document.createElement('li');
    li.textContent = message;
    this._out.insertBefore(li, this._out.firstChild);
  },

  log: function(message) {
    this._appendLog(message);
  },
  error: function(message) {
    this._appendLog(message, 'error');
  }
};

module.exports = Console;
