nodejs-wav2png
==============

Node.js wrapper for beschulz wav2png (https://github.com/beschulz/wav2png)

Install
-------
```npm install wav2png```

Usage
-----
```javascript
var Wav2png   = require('wav2png');

var arguments = ['--foreground-color=ffb400aa', '--background-color=2e4562ff'];
var wav2png   = new Wav2png(arguments);

wav2png.capturePng('test.wav', 'test.png');

wav2png.on('error', function(err, stdErr) {

    console.log(err, stdErr);

});

wav2png.on('done', function() {

    console.log('done');
    
});
```
