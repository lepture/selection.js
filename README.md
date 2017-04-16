# Selection.js

Selection.js provides a clean API to access the selection in a `<textarea`>. It is powerful and
easy to use. It helps developers to deal with editors or the like.

## Installation

Install with npm:

    $ npm install selection.js --save


## API

```js
var Selection = require('selection.js');

new Selection(document.getElementById('textarea'));
new Selection(document.getElementsByTagName('textarea'));
new Selection($('textarea'));
```

### Selection#cursor()

Get current cursor position, return [start, end]:

```javascript
sel.cursor();
```

Set cursor position (or select text):

```javascript
sel.cursor(1);
sel.cursor(1, 4);
sel.cursor([1, 4]);
```

### Selection#text()

Get current selected text:

```javascript
sel.text();
```

Replace current selected text:

```javascript
// will select replaced text
// word ... [replaced text] word ...
sel.text('replaced text');
```

### Selection#append(text)

Insert text after current selection

```javascript
sel.append('append text');
```

### Selection#prepend(text)

Insert text before current selection:

```javascript
sel.prepend('prepend text');
```

### Selection#line()

Get current line text:

```javascript
sel.line()
```

### Selection#surround()

Get surround word:

```javascript
sel.surround();
sel.surround(3);   // get surroud 3 characters.
```

### Selection#insertText(text, cursorStart, cursorEnd)

Insert text at the give cursor:

```javascript
sel.insertText('text', 3, 4);
```

## License

New BSD
