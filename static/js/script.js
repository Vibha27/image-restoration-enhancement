var loadFile = function(event) {
	var output = document.getElementById('uploaded_img');
	output.src = URL.createObjectURL(event.target.files[0]);
	output.onload = function() {
		var image = new Image();
		image.src = output.src

		document.getElementById('inpaint-mask').style.visibility = 'visible';
		// document.getElementById('mask-title').style.visibility = 'visible';
		document.getElementById('inpaint-uplaod').style.visibility = 'hidden';
		
		var canvas = document.querySelector("#canvas");
		var hidden_canvas = document.querySelector("#hidden-canvas");
		var context = canvas.getContext("2d");
		var context_hidden = hidden_canvas.getContext("2d");
		canvas.width = image.width;
		canvas.height = image.height;
		hidden_canvas.width = image.width;
		hidden_canvas.height = image.height;

		var Mouse = { x: 0, y: 0 };
		var lastMouse = { x: 0, y: 0 };
		// visible canvas
		context.fillStyle="white";
		context_hidden.fillStyle="white";
		context.fillRect(0,0,canvas.width,canvas.height);
		context_hidden.fillRect(0,0,hidden_canvas.width,hidden_canvas.height);
		context.drawImage(image, 0, 0,canvas.width,canvas.height);
		context.color = "black";
		context.lineWidth = 5;
		context_hidden.lineWidth = 5;
		context.lineJoin = context.lineCap = 'round';


		//debug();

		canvas.addEventListener( "mousemove", function( e )
		{
			lastMouse.x = Mouse.x;
			lastMouse.y = Mouse.y;

			Mouse.x = e.pageX - this.offsetLeft;
			Mouse.y = e.pageY - this.offsetTop;

		}, false );

		canvas.addEventListener( "mousedown", function( e )
		{
			canvas.addEventListener( "mousemove", onPaint, false );

		}, false );

		canvas.addEventListener( "mouseup", function()
		{
			console.log("In mouseEvent")
			canvas.removeEventListener( "mousemove", onPaint, false );

		}, false );
		
		var onPaint = function()
		{
			context.lineWidth = context.lineWidth;
			context.lineJoin = "round";
			context.lineCap = "round";
			context.strokeStyle = context.color;

			context.beginPath();
			context.moveTo( lastMouse.x, lastMouse.y );
			context.lineTo( Mouse.x, Mouse.y );
			context.closePath();
			context.stroke();

			context_hidden.beginPath();
			context_hidden.moveTo( lastMouse.x, lastMouse.y );
			context_hidden.lineTo( Mouse.x, Mouse.y );
			context_hidden.closePath();
			context_hidden.stroke();

			// hidden canvas
			// context_hidden.drawImage(canvas, 0, 0,canvas.width,canvas.height);

			var img = hidden_canvas.toDataURL("image/png");
			document.getElementById("payload").value = img;
			console.log(img)
			
		};
		URL.revokeObjectURL(output.src) // free memory
		// document.getElementById('canvas').style.backgroundImage = output.src
		

		/* CLEAR BUTTON */
		var clearButton = $( "#clear" );

		clearButton.on( "click", function()
		{

			context.clearRect( 0, 0,canvas.width,canvas.height );
			context.drawImage(image, 0, 0,canvas.width,canvas.height);
			context_hidden.clearRect(0,0,canvas.width,canvas.height)

		});

		// try btn
		var tryButton = $( "#try" );

		tryButton.on( "click", function()
		{

			context.clearRect( 0, 0,canvas.width,canvas.height );
			context.drawImage(image, 0, 0,canvas.width,canvas.height);
			context_hidden.clearRect(0,0,canvas.width,canvas.height)

			document.getElementById('inpaint-mask').style.visibility = 'hidden';
			document.getElementById('inpaint-uplaod').style.visibility = 'visible';
		

		});

		}

};

// // downlaod function
// function download(){
// 		// var download = document.getElementById("download");
// 		var image = document.getElementById("output_img");
// 		var imageURL = URL.createObjectURL(image)
// 		const link = document.createElement('a')
// 		link.href = imageURL
// 		link.download = 'Model_Output'
// 		document.body.appendChild(link)
// 		link.click()
// 		document.body.removeChild(link)

// }


// (function()
// {
// 	var canvas = document.querySelector("#canvas");
// 	var context = canvas.getContext("2d");
// 	canvas.width = 256;
// 	canvas.height = 256;

// 	var Mouse = { x: 0, y: 0 };
// 	var lastMouse = { x: 0, y: 0 };
// 	context.fillStyle="white";
// 	context.fillRect(0,0,canvas.width,canvas.height);
// 	context.color = "black";
// 	context.lineWidth = 5;
//     context.lineJoin = context.lineCap = 'round';

// 	//debug();

// 	canvas.addEventListener( "mousemove", function( e )
// 	{
// 		console.log("hjj")
// 		lastMouse.x = Mouse.x;
// 		lastMouse.y = Mouse.y;

// 		Mouse.x = e.pageX - this.offsetLeft;
// 		Mouse.y = e.pageY - this.offsetTop;

// 	}, false );

// 	canvas.addEventListener( "mousedown", function( e )
// 	{
// 		canvas.addEventListener( "mousemove", onPaint, false );

// 	}, false );

// 	canvas.addEventListener( "mouseup", function()
// 	{
// 		console.log("In mouseEvent")
// 		canvas.removeEventListener( "mousemove", onPaint, false );

// 	}, false );

// 	var onPaint = function()
// 	{
// 		console.log("OnPaint")
// 		context.lineWidth = context.lineWidth;
// 		context.lineJoin = "round";
// 		context.lineCap = "round";
// 		context.strokeStyle = context.color;

// 		context.beginPath();
// 		context.moveTo( lastMouse.x, lastMouse.y );
// 		context.lineTo( Mouse.x, Mouse.y );
// 		context.closePath();
// 		context.stroke();
// 	};

	// function debug()
	// {
	// 	/* CLEAR BUTTON */
	// 	var clearButton = $( "#clearButton" );

	// 	clearButton.on( "click", function()
	// 	{

	// 		document.getElementById("chartContainer").style.display = "none";
	// 		context.clearRect( 0, 0, 280, 280 );
	// 		context.fillStyle="white";
	// 		context.fillRect(0,0,canvas.width,canvas.height);


	// 	});

	// 	/* COLOR SELECTOR */

	// 	$( "#colors" ).change(function()
	// 	{
	// 		var color = $( "#colors" ).val();
	// 		context.color = color;
	// 	});

	// 	/* LINE WIDTH */

	// 	$( "#lineWidth" ).change(function()
	// 	{
	// 		context.lineWidth = $( this ).val();
	// 	});
	// }
// }());
