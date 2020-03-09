(async () => {
  const express = require('express')
  const multer  =   require('multer')
  const bodyParser = require('body-parser');
  const cors = require('cors')
  const app = express()
  const { db, models } = await require('./mongodb/connection')();


  app.use(bodyParser.json({
    limit: '50mb'
  }));
  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false
  }));

  app.use('/static',express.static('public'));

  var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './public/uploads/');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
  var upload = multer({ storage : storage});
    
  app.use(cors()) 
  app.use((req, res, next) => {
    req.db = db;
    req.models = models;
    next();
  });
    
  app.post('/api/photo', upload.array('photo'), async (req, res) => {
    console.log('request', req.files);
    try {
      req.files.forEach(async (file) => {
        await req.models.photos.insertOne({'imagePath' : '/uploads/' + file.filename }, { w: 1 }); 
      });
      res.json({'message': 'File uploaded successfully'});
    } catch (err) {
        throw (Error(err));
    }
  });

  app.get('/api/photo', async(req, res) => {
    try {
        let result = await req.models.photos.find().toArray();
        console.log(result);
        
        const imgArray= result.map(element => "http://192.168.2.30:4000/static"+element.imagePath);
        console.log(imgArray);
        res.send(imgArray)
    } catch (err) {
      throw (Error(err));
    }
  })

  app.listen(process.env.PORT || 4000, () => console.log('👍'))
})();
