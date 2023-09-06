// npm init -y
// npm i express
// npm i -g nodemon
// nodemon server.js
// npm i multer    helps to upload files in nodejs
const express = require('express')
const path = require('path')
const app = express()
const multer  = require('multer')  //copied from multer
const {mergePdfs}  = require('./merge')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))   //copied from express search static
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html")) //changed this
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {  //copied from merge pdf nodejs
  console.log(req.files)
  let d =await mergePdfs(path.join(__dirname, req.files[0].path) ,path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
  // res.send({data: req.files})
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)  //changed this
})