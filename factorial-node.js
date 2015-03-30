var htutil = require('./htutil');
var math = require('./math');



exports.get = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var result = req.a * req.b;

    var startText = '';
    if (!isNaN(req.a)) {
        var fact = math.factorial(Math.floor(req.a));
        startText = '<p class="result">{a} factorial = {fact}</p>'
            .replace('{a}', req.a)
            .replace('{fact}', fact);
    }


    var resultContent = [
        startText,
        '<p>Enter number to see factorial</p>',
        '<form name="factorial", action="/factorial" method="get">',
        '<p>A: <input name="a"/></p>',
        '<p><input type="submit" value="Submit" /></p>',
        '</form>'
    ].join('\n');

    res.end(
        htutil.page('Square', htutil.navbar(), resultContent)
    );
}