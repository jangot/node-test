var htutil = require('./htutil');



exports.get = function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var result = req.a * req.b;

    var resultContent = [
        (!isNaN(req.a)) ?
            '<p class="result">{a} square = {sq}</p>'
                .replace('{a}', req.a)
                .replace('{sq}', req.a * req.a)
            : '',
        '<p>Enter number to see its square</p>',
        '<form name="mult", action="/square" method="get">',
        '<p>A: <input name="a"/></p>',
        '<p><input type="submit" value="Submit" /></p>',
        '</form>'
    ].join('\n');

    res.end(
        htutil.page('Square', htutil.navbar(), resultContent)
    );
}