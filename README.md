## Selection.js

**UNDER DEVELOPMENT**

> This is a project by [Hsiaoming Yang](http://lepture.com). All projects are listed at [project page](http://project.lepture.com).

Selection.js provides a clean API to access selection. The basic syntax:

```javascript
// create a selection
var sel = selection(document.getElementById('#textarea'));
var sel = selection(document.getElementsByTagName('textarea'));
var sel = selection($('textarea'));  // jQuery or zepto is accepted too

// get current cursor position
sel.cursor();

// set cursor position
sel.cursor(1);
sel.cursor(1, 4);
sel.cursor([1, 4]);

// get current selected text
sel.text();

// replace current selected text
sel.text('replaced text');

// insert text after current selection
sel.append('append text');

// insert text before current selection
sel.prepend('prepend text');

// get current line text
sel.line()

// get surround word
sel.surround();
sel.surround(3);   // get surroud 3 characters.

// actions in a chain
sel.cursor(1, 4).text('replaced text').prepend('prepend text').append('append text');
```

This project is still under development. But it just works, take a look at
[DEMO](http://project.lepture.com/selection.js/demo.html).
