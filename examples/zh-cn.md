# 示例

-------------


上帝说，要有输入框，于是就有了输入框。

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

````js
seajs.use(['$', 'selection'], function($, selection) {
    var sel = selection(document.getElementById('editor'));
    $('#editor').on('click select keyup', function() {
        $('#speaker-text').text(sel.text());
        $('#speaker-cursor').text(sel.cursor());
        $('#speaker-surround').text(sel.surround());
    });
});
````
