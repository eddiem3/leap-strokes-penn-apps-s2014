(function(){
  // get the canvas, 2d context, paragraph for data and set the radius
    var canvas = document.getElementsByTagName('canvas')[0];
    var ctx = canvas.getContext('2d');
    var lastPosition;

  // set the canvas to cover the screen
    canvas.width = 800;
    canvas.height = 600;

    ctx.strokeStyle = "rgba(255,0,0,0.9)";
    ctx.lineWidth = "5";
    

    function leapToScene( frame , leapPos ){
	
	var iBox = frame.interactionBox;
	
	var left = iBox.center[0] - iBox.size[0]/2;
	var top = iBox.center[1] + iBox.size[1]/2;
	
	var x = leapPos[0] - left;
	var y = leapPos[1] - top;

	x /= iBox.size[0];
	y /= iBox.size[1];

	x *= canvas.width;
	y *= canvas.height;

	return [ x , -y ];

    }

    function drawCircle( x , y , radius ){
	ctx.beginPath();
	ctx.arc( x , y , radius , 0 , Math.PI * 2 , true );
	ctx.fill();
    }

    function draw(frame){
	var brush; //cursor object
	var currentPosition; //current location of the cursor

	if(!frame.fingers[0])
	{
	    if(frame.fingers.length > 0){
		// if the frame has some tools in it, we choose the first one
		brush = frame.fingers[0];
	    }
	} else {

	    brush = frame.fingers[0];
	    currentPosition = brush.tipPosition;
	    
	    //If the user is not hovering 
	    if(brush.touchDistance < 0)
	    {
		currentPosScreen = leapToScene(frame, currentPosition); //convert position to scence coordinates
		var radius = Math.abs( brush.touchDistance * 20 );
		drawCircle( currentPosScreen[0] , currentPosScreen[1] , radius);

	    }
	    else {
		ctx.stroke();
	    }	    
	}
    }

      // we have to enable gestures so that the device knows to send them through the websocket
    Leap.loop({ enableGestures: true }, draw);
})();
