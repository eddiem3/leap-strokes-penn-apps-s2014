(function(){
  // get the canvas, 2d context, paragraph for data and set the radius
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    var lastPosition;

  // set the canvas to cover the screen
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

  // move the context co-ordinates to the bottom middle of the screen
    ctx.translate(canvas.width/2, canvas.height);

    ctx.strokeStyle = "rgba(255,0,0,0.9)";
    ctx.lineWidth = 2;
    
    function draw(frame){
	var brush;
	var currentPosition;
	if(frame.fingers[0])
	{
	    brush = frame.fingers[0];
	    currentPosition = brush.tipPosition;
	    document.write(currentPosition);
	}
    }
	// we have to enable gestures so that the device knows to send them through the websocket
    Leap.loop({ enableGestures: true }, draw);
})();
