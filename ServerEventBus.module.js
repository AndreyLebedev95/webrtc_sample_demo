define('js!WebRTC!ServerEventBus', [
    'js!WebRTC!Window',
    'js!WebRTC!Manager',
    'js!WebRTC!Adapter',
    'js!WebRTC!UserSettings',
    'js!WebRTC!VideoUtils',
    'js!WebRTC!DataProvider'
], function(Window, Manager, Adapter, UserSettings, VideoUtils, DataProvider){
    var ServerEventsBus = function(options){
        this.dataChannel = options.dataChannel;
        this.memberId = options.memberId;
        this.logger = options.logger;
        this.meesageHandler = (function(message){
            var self = this;

            this.dataChannel.sendMessage(message).addCallback(function(res){
                self.logger.log('send message success: ' + res);
            }).addErrback(function(err){
                self.logger.log('send message err: ' + err);
                console.err('Message does not send with error: ' + err);
            });
        }).bind(this);
    };


    Window
    DataProvider
    return new ServerEventsBus();
});