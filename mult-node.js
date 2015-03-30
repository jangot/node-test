var htutil = require('./htutil');



exports.get = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var result = req.a * req.b;

    var resultContent = [
        (!isNaN(req.a) && !isNaN(req.b)) ?
            '<p class="result">{a} * {b} = {result}</p>'
                .replace('{a}', req.a)
                .replace('{b}', req.b)
                .replace('{result}', result)
            : '',
        '<p>Enter numbers to multiply</p>',
        '<form name="mult", action="/mult" method="get">',
        '<p>A: <input name="a"/></p>',
        '<p>B: <input name="b"/></p>',
        '<p><input type="submit" value="Submit" /></p>',
        '</form>'
    ].join('\n');

    res.end(
        htutil.page('Multiplication', htutil.navbar(), resultContent)
    );
}