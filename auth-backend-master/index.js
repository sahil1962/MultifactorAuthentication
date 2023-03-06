const http = require('http');
const app = require('./app');
const { sendEmail } = require('./sendEmail');
const fs = require('fs');
const Jimp = require('jimp');



const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};


app.post("/sendEmail", async(req, res) =>{
  console.log("Email : "+req.body.email)
  console.log("Email : "+req.body.createdToken)
  try {
    await sendEmail(req.body.email, req.body.createdToken);

    res.status(200).json({success : true, message : "Email sents"})    
  } catch (error) {
    res.status(500)
    console.log(error)
  }
});


app.post("/checkpic", async(request, response) => {
  try {
  let img1 = "./images/"+request.body.email + "1.jpg"
  console.log("Image1 path : "+img1)
  let img2 = "./images/"+request.body.email + "2.jpg"
  console.log("Image2 path : "+img1)
  Jimp.read(img1, (err, image1) => {
      if (err) throw err;
      Jimp.read(img2, (err, image2) => {
          if (err) throw err;
          let diff = Jimp.diff(image1, image2);
          if (diff.percent<0.5){
            console.log("Matched",diff.percent)
            response.status(200).json({success : true, message : "Matched"})  
          }
          else{
            console.log("Not Matched",diff.percent)
            response.status(200).json({success : true, message : "Not Matched"})    
            
          }
      });
  });
  }
  catch (error) {
    res.status(500)
    console.log(error)
  }

  })


const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
