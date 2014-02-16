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
    
    //ctx.beginPath();
    //ctx.lineWidth = "5";
    //ctx.strokeStyle = "green";
    //ctx.moveTo(100,200);
    //ctx.lineTo(250,400);
    //tx.stroke();

    function drawCircle( x , y , radius ){
	ctx.beginPath();
	ctx.arc( x , y , radius , 0 , Math.PI * 2 , true );
	ctx.fill();
	
    }
    function draw(frame){
	var brush; //cursor object
	var currentPosition; //current location of the cursor
	var brushDown = false;
	
	//ctx.clearRect(0,0,canvas.width, canvas.height);
	//	drawCircle( 0 , 0 , 100 );
	//
	if(!frame.fingers[0])
	{
	    if(frame.fingers.length > 0){
		// if the frame has some tools in it, we choose the first one
		brush = frame.fingers[0];
		lastPosition = brush.tipPosition;
	    }
	} else {

	    brush = frame.fingers[0];
	    currentPosition = brush.tipPosition;
	    
	    //If the user is not hovering 
	    if(brush.touchDistance < 0)
	    {
		currentPosScreen = leapToScene(frame, currentPosition); //convert position to scence coordinates
		//ctx.beginPath();
/*
		//if( !brushDown ) {
//		    brushDown = true;
//		    ctx.beginPath();
//		    console.log('begin path');
//		    ctx.lineWidth = "5";
		    ctx.strokeStyle = "green";
		    ctx.moveTo( currentPosScreen[0], currentPosScreen[1] );
		}

*/
		var radius = Math.abs( brush.touchDistance * 20 );
		drawCircle( currentPosScreen[0] , currentPosScreen[1] , 10);

//		ctx.lineTo( currentPosScreen[0], currentPosScreen[1]);
		//ctx.stroke();
		//draw a cursor
		//ctx.beginPath();
		//x.arc(currentPosScreen[0], currentPosScreen[1],50,0,2*Math.PI);
		//x.closePath();
		//x.fill();
		//ctx.fillRect(10,10,1,1);
		console.log(currentPosScreen[0]);
		//stroke();

		//draw a path from the cursors last position to the cursors current position
		//ctx.beginPath();
		//ctx.moveTo(lastPosition.x, -lastPosition.y);
		//ctx.lineTo(currentPosition.x, -currentPosition.y);
		//ctx.stroke();
	    }
	    else {
		brushDown = false;
		ctx.stroke();
//		console.log('draw');
		//console.log('pen up');
	    }

	    /// we should also look for a gesture to see if we should clear the drawing
	    if(frame.gestures.length > 0){
		// we check each gesture in the frame
		for(i=0, len=frame.gestures.length; i<len; i++){
		    // and if one is the end of a swipe, we clear the canvas
		    if(frame.gestures[i].type === 'swipe' && frame.gestures[i].state === 'stop'){
			ctx.clearRect(0,0,canvas.width,canvas.height);
		    }
		}
	    }
	    
	    lastposition = currentPosition; //Update last position
			
	}
    }

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



  
    // we have to enable gestures so that the device knows to send them through the websocket
    Leap.loop({ enableGestures: true }, draw);
})();
