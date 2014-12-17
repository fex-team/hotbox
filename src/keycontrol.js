define(function(require, exports, module) {

    var key = require('./key');
    var FOCUS_CLASS = 'hotbox-focus';
    var RECEIVER_CLASS = 'hotbox-key-receiver';

    function KeyControl($container) {
        var _actived = true;
        var _receiver = null;
        var _this = this;

        _createReceiver();

        function _createReceiver() {
            _receiver = document.createElement('input');
            _receiver.classList.add(RECEIVER_CLASS);
            _receiver.onkeyup = _handle;
            _receiver.onkeypress = _handle;
            _receiver.onkeydown = _handle;
            _receiver.onfocus = _active;
            _receiver.onblur = _deactive;
            _receiver.oninput = function(e) { _receiver.value = null; };
            $container.appendChild(_receiver);
            _active();
        }

        function _handle(keyEvent) {
            if (!_actived) return;

            var type = keyEvent.type.toLowerCase();
            var handler = _this['on' + type];

            if (handler) {
                keyEvent.keyHash = key.hash(keyEvent);
                keyEvent.isKey = function(keyExpression) {
                    return keyEvent.keyHash == key.hash(keyExpression);
                };
                keyEvent[type] = true;
                handler(keyEvent);
            }
        }

        function _active() {
            _receiver.select();
            _receiver.focus();
            _actived = true;
            $container.classList.add(FOCUS_CLASS);
        }

        function _deactive() {
            _receiver.blur();
            _actived = false;
            $container.classList.remove(FOCUS_CLASS);
        }

        this.active = _active;
        this.deactive = _deactive;
    }

    module.exports = KeyControl;
});