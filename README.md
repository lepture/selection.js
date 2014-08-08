# Selection.js

Selection.js provides a clean API to access selection. It is powerful and
easy to use. It helps developers to deal with editor or something like that.

## Installation

Install with component:

    $ component install lepture/selection.js


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

// cursor will be at the left of the replaced text
// word ... |replaced text word ...
sel.text('replaced text', 'left');

// curosr will be at the right of the replaced text
// word ... replaced text| word ...
sel.text('replaced text', 'right');
```

### Selection#append(text)

Insert text after current selection

```javascript
sel.append('append text');
sel.append('append text', 'left');
sel.append('append text', 'right');
```

### Selection#prepend(text)

Insert text before current selection:

```javascript
sel.prepend('prepend text');
sel.prepend('prepend text', 'left');
sel.prepend('prepend text', 'right');
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

## License

New BSD
