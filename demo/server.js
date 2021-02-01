const express = require('express')
const app = express()
const port = 1337

// Run the app from root
app.use(express.static('demo/dist'));
app.use(express.static('demo/public'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})