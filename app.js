const express = require('express');
const swig = require('swig');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({ cache: false });


app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

app.listen(80, () => {
  console.log('App listening on port 80!')
});