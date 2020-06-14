const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage});

const app = express();
app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'main' }));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.urlencoded({ extended: true }));

app.use('/user',(req, res) => {
  res.send('You have to be logged to see this page!');
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/home', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {layout: 'dark'});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', upload.single('file'), async (req, res) => {
  const { author, sender, title, message } = req.body;
  const file = req.file;

  if(author && sender && title && message && file) {
    res.render('contact', { isSent: true, file: file.originalname });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});