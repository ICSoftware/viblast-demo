require('./VideoFrame.js');


var video = VideoFrame({
    id: 'player',
    frameRate: FrameRates.NTSC_Film,
    callback: function(response) {
        console.log(response);
    }
});
