const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
app.engine('hbs', hbs());
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use('/user',(req, res) => {
  res.send('You have to be logged to see this page!');
});

app.get('/', (req, res) => {
  res.render('index', {layout: false});
});

app.get('/home', (req, res) => {
  res.render('index', {layout: false});
});

app.get('/about', (req, res) => {
  res.render('about', {layout: false});
});

app.get('/contact', (req, res) => {
  res.render('contact', {layout: false});
});

app.get('/info', (req, res) => {
  res.render('info', {layout: false});
});

app.get('/history', (req, res) => {
  res.render('history', {layout: false});
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { layout: false, name: req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404', {layout: false});
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});