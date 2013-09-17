var procstreams = require('procstreams'),
    events = require('events'),
    util = require('util');

module.exports = Wav2png;

function Wav2png(arguments, executable) {

    if (!(this instanceof Wav2png)) {
        return new Wav2png(params);
    }
    
    events.EventEmitter.call(this);
    
    if (!executable) {
        executable = 'wav2png';
    }
  
    this.arguments  = arguments;
    this.executable = executable;
    this.agent      = procstreams;

}

util.inherits(Wav2png, events.EventEmitter);

Wav2png.prototype.capturePng = function(wavPath, pngPath) {

    var self        = this;
    self.arguments.push('-o ' + pngPath);
    self.wavPath    = wavPath;

    self.execute();
    
}

Wav2png.prototype.execute = function() {
    
    var self = this;
    var agentInstance = self.agent(self.getCommandString());

    agentInstance.data(function(err, stdout, stderr) {

        if (err) {
            self.emit('error', stderr.toString(), err);
        } 
        
    }).on('exit', function(code) {
        if (!code) {
            self.emit('done');
        }
    });

}

Wav2png.prototype.getCommandString = function() {
    
    var self = this;
    
    self.command = [
        self.executable,
        self.arguments.join(' '),
        self.wavPath
    ];
    
    return self.command.join(' ');
    
}