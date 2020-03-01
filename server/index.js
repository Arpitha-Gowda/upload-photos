const express = require('express')
const multer  =   require('multer')
const formData = require('express-form-data')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const bodyParser = require('body-parser');
const cors = require('cors')
// const { CLIENT_ORIGIN } = require('./config')
const app = express()

app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));

app.use(express.static('public'));

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage : storage});

// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET
// })
  
app.use(cors()) 

// app.use(formData.parse())

//   app.get('/',function(req,res){
//         res.sendFile(__dirname + "/index.html");
//   });
  
app.post('/api/photo', upload.array('photo'), (req, res, next) => {
  console.log('request', req);
  
  MongoClient.connect('mongodb://localhost:27017/myphotos', (err, db) => {
      assert.equal(null, err);
      insertDocuments(db, './public/uploads/' + req.file.filename, () => {
          db.close();
          res.json({'message': 'File uploaded successfully'});
      });
  });
});

var insertDocuments = function(db, filePath, callback) {
  var collection = db.collection('user');
  collection.insertOne({'imagePath' : filePath }, (err, result) => {
      assert.equal(err, null);
      callback(result);
  });
}
// app.post('/image-upload', (req, res) => {

//   const values = Object.values(req.files)
//   const promises = values.map(image => cloudinary.uploader.upload(image.path))
  
//   Promise
//     .all(promises)
//     .then(results => res.json(results))
// })

app.listen(process.env.PORT || 4000, () => console.log('👍'))