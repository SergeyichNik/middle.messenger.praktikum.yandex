const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('dist'));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist/index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
