var express = require('express');
var app = express();
app.set('port', (process.env.PORT || 3000));//Port for start Application server
app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'), function () {
    console.log('Example app listening on port 3000!');
});