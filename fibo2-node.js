var htutil = require('./htutil');
var math = require('./math');

function sendResult(req, res, a, fiboval) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var startText = (isNaN(fiboval) ? '' : fiboval);

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
};

exports.get = function(req, res) {
    if (!isNaN(req.a)) {
        math.fibonacciAsync(Math.floor(req.a), function(val) {
            sendResult(req, res, Math.floor(req.a), val);
        });
    } else {
        sendResult(req, res, NaN, NaN);
    }
}