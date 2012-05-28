(function(){
    function demoCase($, selection) {
        var demo = $('#demo');
        var sel = selection(demo);
        demo.on('click select keyup', function(){
            $('#explain1').text(sel.text());
            $('#explain2').text(sel.cursor());
            $('#explain3').text(sel.surround());
        });

        $('#trigger2').click(function() {
            sel.cursor(5, 9);
            return false;
        });

        $('#trigger4').click(function() {
            sel.text('this is a replaced text');
            return false;
        });

        $('#trigger5').click(function() {
            sel.prepend('this is a prepend text');
            return false;
        });

        $('#trigger6').click(function() {
            sel.append('this is an append text');
            return false;
        });

        $('#trigger7').click(function() {
            alert(sel.line());
            return false;
        });
    }
    if (typeof jQuery !== 'undefined') {
        $(function(){
            demoCase($, selection);
        });
    } else {
        // seajs
        seajs.use(['jquery', './selection'], function($, selection) {
            demoCase($, selection);
        });
    }
})();
