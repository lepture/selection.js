# Example

-------------

<style type="text/css">
#speaker em {
color: #d14;
padding: 1px 4px;
font-style: normal;
background: #f7f7f9;
border: 1px solid #e1e1e8;
}
</style>

<textarea id="editor" rows="10" cols="80">Love its people, but never trust its government. Believe in evolution rather than revolution.</textarea>

<div id="speaker">
You are selecting <em id="speaker-text"></em>
at <em id="speaker-cursor"></em>,
surrounded by <em id="speaker-surround"></em>
</div>


## Let's play the game

````html
<a href="javascript:;" id="button-cursor">set cursor</a>
<a href="javascript:;" id="button-text">change text</a>
<a href="javascript:;" id="button-prepend">prepend text</a>
<a href="javascript:;" id="button-append">append text</a>
<a href="javascript:;" id="button-line">current line</a>
````



````js
seajs.use(['jquery', '../src/selection.js'], function($, selection) {
    var sel = selection(document.getElementById('editor'));
    $('#editor').on('click select keyup', function() {
        $('#speaker-text').text(sel.text());
        $('#speaker-cursor').text(sel.cursor());
        $('#speaker-surround').text(sel.surround());
    });

    $('#button-cursor').click(function() {
        sel.cursor(10, 19);
        // equal sel.cursor([10, 19])
    });
    $('#button-text').click(function() {
        sel.text('hello world');
        // sel.text('hello world', 'left')
        // sel.text('hello world', 'right')
    });
    $('#button-prepend').click(function() {
        sel.prepend('hello prepend', 'right');
    });
    $('#button-append').click(function() {
        sel.prepend('hello append', 'left');
    });
    $('#button-line').click(function() {
        alert(sel.line());
    });
});
````
