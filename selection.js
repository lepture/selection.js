// selection.js
// =============
//
// 1. on document
// 2. in textarea
//
// var selection = selection(inputor);
// selection.text();  #get text
// selection.text('new string')  # set text
// selection.line()
// selection.cursor()  # get or set
// selection.element # return parent node
// selection.append('text')
// selection.prepend('text')
// selection.position()


(function(root) {
    var selection;

    function Selection(inputor, type) {
        if (type === 'input') {
            this.element = inputor;

            // get or set cursor
            this.cursor = function(start, end) {
                var inputor = this.element;
                if (typeof start == 'undefined') {
                    return [inputor.selectionStart, inputor.selectionEnd];
                }
                if (isArray(start)) {
                    var _s = start;
                    start = _s[0];
                    end = _s[1];
                }
                if (typeof end === 'undefined') end = start;
                inputor.setSelectionRange(start, end);
                return this;
            }

            // get or set selected text
            this.text = function(text) {
                var inputor = this.element;
                var cursor = this.cursor();
                if (typeof text == 'undefined') {
                    return inputor.value.slice(cursor[0], cursor[1]);
                }
                return insertText(this, text, cursor[0], cursor[1]);
            }

            // append text to the end
            this.append = function(text) {
                var end = this.cursor()[1];
                return insertText(this, text, end, end);
            }

            this.prepend = function(text) {
                var start = this.cursor()[0];
                return insertText(this, text, start, start);
            }

            this.surround = function(count) {
                if (typeof count == 'undefined') count = 1;
                var value = this.element.value;
                var cursor = this.cursor();
                var before = value.slice(Math.max(0, cursor[0] - count),
                                         cursor[0]);
                var after = value.slice(cursor[1], cursor[1] + count);
                return [before, after];
            }

            this.line = function() {
                var value = this.element.value;
                var cursor = this.cursor();
                var before = value.slice(0, cursor[0]).lastIndexOf('\n');
                var after = value.slice(cursor[1]).indexOf('\n');

                // we don't need \n
                var start = before + 1;
                if (after === -1) {
                    return value.slice(start);
                }
                var end = cursor[1] + after;
                return value.slice(start, end);
            }
        }
        return this;
    }

    selection = function(inputor) {
        if (inputor) {
            // if inputor is jQuery or zepto
            if (inputor.length) inputor = inputor[0];
            console.dir(inputor);
            if (typeof inputor.selectionStart != 'undefined') {
                return new Selection(inputor, 'input');
            }
        }

        if (typeof document == 'undefined') throw 'document undefined';

        var sel = root.getSelection() || document.getSelection();

        if (sel) return new Selection(sel, 'document');

        return new Selection(document.selection, 'ie');
    }

    // Helpers
    // -------------

    var toString = Object.prototype.toString;
    var isArray = Array.isArray;
    if (!isArray) {
        isArray = function(val) {
            return toString.call(val) === '[object Array]';
        }
    }
    var isFunction = function(val) {
        return toString.call(val) === '[object Function]';
    }

    function insertText(selection, text, start, end) {
        if (typeof text == 'undefined') text = '';
        var value = selection.element.value;
        selection.element.value = [
            value.slice(0, start), text, value.slice(end)
        ].join('');
        end = start + text.length;
        selection.cursor(start, end);
        return selection;
    }

    // CommonJS compatable
    if (typeof module !== 'undefined') {
        module.exports = selection;
    } else {
        root.selection = selection;
    }
})(this);
