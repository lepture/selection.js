# Selection.js

**UNDER DEVELOPMENT**

> This is a project by [Hsiaoming Yang](http://lepture.com). All projects are listed at [project page](http://project.lepture.com).

Selection.js provides a clean API to access selection. It is powerful and easy
to use. It helps developers to deal with editor or something like that.

- [GitHub](https://github.com/lepture/selection.js)
- [DEMO](http://project.lepture.com/selection.js/demo.html)

## Selection in textare or input

The basic syntax:

- create a selection.

```javascript
var sel = selection(document.getElementById('#textarea'));
var sel = selection(document.getElementsByTagName('textarea'));
var sel = selection($('textarea'));  // jQuery or zepto is accepted too
```

- get current cursor position, return [start, end]

```javascript
sel.cursor();
```

- set cursor position (or select text)

```javascript
sel.cursor(1);
sel.cursor(1, 4);
sel.cursor([1, 4]);
```

- get current selected text

```javascript
sel.text();
```

- replace current selected text

```javascript
sel.text('replaced text');
```

- insert text after current selection

```javascript
sel.append('append text');
```

- insert text before current selection

```javascript
sel.prepend('prepend text');
```

- get current line text

```javascript
sel.line()
```

- get surround word

```javascript
sel.surround();
sel.surround(3);   // get surroud 3 characters.
```

- actions in a chain

```javascript
sel.cursor(1, 4).text('replaced text').prepend('prepend text').append('append text');
```


## Selection on document

Selection on document is much more complex. Should it support selection on document?

### selection in the same element

This is similar to selection in textarea, it is easy to implement this feature.

### selection has an element in it

```html
this is a [selected <em>TEST</em> text] for explain
```

assume that we have selected ``selected <em>TEST</em> text`` ,
this is much more complex, but we can handle it.

### selection between elements

```html
<div>this is a [selection </div><p>between different] elements</p>
```

assume that we have selected ``selection <div><p> between different``, it is even
more complex.

### selection with a large area

What if we select a very large area, it has elements in it, it is between two
elements.
