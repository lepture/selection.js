(function(root) {
/**
 * Selection.js
 */

// = Selection;


/**
 * Selection interface.
 */
function Selection(input) {
  if (!(this instanceof Selection)) {
    return new Selection(input);
  }

  if (input && input.length) {
    // if input is jQuery or zepto or a list of elements
    input = input[0];
  }

  this.element = input;
}


/**
 * Getter and Setter for cursor.
 */
Selection.prototype.cursor = function(start, end) {
  var input = this.element;
  var isIE = typeof input.selectionStart === 'undefined';

  // get cursor
  if (typeof start === 'undefined') {
    if (isIE) {
      return getIECursor(input);
    }
    return [input.selectionStart, input.selectionEnd];
  }

  // set cursor
  if (isArray(start)) {
    var _s = start;
    start = _s[0];
    end = _s[1];
  }

  if (typeof end === 'undefined') {
    end = start;
  }

  if (isIE) {
    setIECursor(input, start, end);
  } else {
    input.setSelectionRange(start, end);
  }
  return this;
};


// get or set selected text
Selection.prototype.text = function(text) {
  var input = this.element;
  var cursor = this.cursor();
  if (typeof text === 'undefined') {
    return input.value.slice(cursor[0], cursor[1]);
  }
  insertText(input, text, cursor[0], cursor[1]);
  return this.cursor(cursor[0], cursor[0] + text.length);
};


// append text to the end, and select the appended text
Selection.prototype.append = function(text) {
  var cursor = this.cursor();
  insertText(this.element, text, cursor[1], cursor[1]);
  return this.cursor(cursor[0], cursor[1] + text.length);
};


// prepend text to the start, and select the prepended text
Selection.prototype.prepend = function(text) {
  var cursor = this.cursor();
  insertText(this.element, text, cursor[0], cursor[0]);
  return this.cursor(cursor[0], cursor[1] + text.length);
};


// get the surround words of the selection
Selection.prototype.surround = function(count) {
  if (typeof count === 'undefined') count = 1;
  var value = this.element.value;
  var cursor = this.cursor();
  var before = value.slice(
  Math.max(0, cursor[0] - count), cursor[0]);
  var after = value.slice(cursor[1], cursor[1] + count);
  return [before, after];
};


Selection.prototype.line = function() {
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
};


var toString = Object.prototype.toString;
var isArray = Array.isArray;
if (!isArray) {
  isArray = function(val) {
    return toString.call(val) === '[object Array]';
  };
}


// IE sucks. This is how to get cursor position in IE.
// Thanks to [ichord](https://github.com/ichord/At.js)

function getIECursor(input) {
  var start, end;
  var range = document.selection.createRange();

  var normalizedValue = input.value.replace(/\r\n/g, "\n");
  var len = normalizedValue.length;

  // Create a working TextRange that lives only in the input
  var textInputRange = input.createTextRange();
  textInputRange.moveToBookmark(range.getBookmark());

  // Check if the start and end of the selection are at the very end
  // of the input, since moveStart/moveEnd doesn't return what we want
  // in those cases
  var endRange = input.createTextRange();
  endRange.collapse(false);

  if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
    start = end = len;
  } else {
    start = -textInputRange.moveStart("character", -len);

    if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
      end = len;
    } else {
      end = -textInputRange.moveEnd("character", -len);
    }
  }

  return [start, end];
}


function setIECursor(input, start, end) {
  var range = input.createTextRange();
  range.move('character', start);
  // why should it be named as ``moveEnd`` ?
  range.moveEnd('character', end - start);
  range.select();
}


function insertText(el, text, start, end) {
  if (typeof text === 'undefined') {
    text = '';
  }
  var value = el.value.replace(/\r\n/g, '\n');
  // fix problems with undo/redo.
  // Thanks to [StackOverflow](http://stackoverflow.com/questions/7553430/javascript-textarea-undo-redo)
  var event = document.createEvent('TextEvent');
  if ('function' === typeof event.initTextEvent) {
    event.initTextEvent('textInput', true, true, null, text);
    el.selectionStart = start;
    el.selectionEnd = end;
    el.dispatchEvent(event);
  } else {
    // fallback for firefox or old opera. And, probably, old IEs
    el.value = [value.slice(0, start), text, value.slice(end)].join('');
  }
}

root.Selection = Selection;

})(this);
