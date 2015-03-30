var htutil = require('./htutil');
var math = require('./math');



exports.get = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var startText = '';
    if (!isNaN(req.a)) {
        var fibo = math.fibonacci(Math.floor(req.a));
        startText = '<p class="result">{a} fibonacci = {fibo}</p>'
            .replace('{a}', req.a)
            .replace('{fibo}', fibo)
    }
    var resultContent = [
        startText,
        '<p>Enter number to see fibonacci</p>',
        '<form name="fibonacci", action="/fibonacci" method="get">',
        '<p>A: <input name="a"/></p>',
        '<p><input type="submit" value="Submit" /></p>',
        '</form>'
    ].join('\n');

    res.end(
        htutil.page('Square', htutil.navbar(), resultContent)
    );
}