// var canvas, ctx, flag = false,
//         prevX = 0,
//         currX = 0,
//         prevY = 0,
//         currY = 0,
//         dot_flag = false;

//     var x = "white",y = 500;
    
//     function init() {
//         canvas = document.getElementById('can');
//         ctx = canvas.getContext("2d");
//         w = canvas.width;
//         h = canvas.height;
    
//         canvas.addEventListener("mousemove", function (e) {
//             findxy('move', e)
//         }, false);
//         canvas.addEventListener("mousedown", function (e) {
//             findxy('down', e)
//         }, false);
//         canvas.addEventListener("mouseup", function (e) {
//             findxy('up', e)
//         }, false);
//         canvas.addEventListener("mouseout", function (e) {
//             findxy('out', e)
//         }, false);
//     }
    
    
    
//     function draw() {
//         ctx.beginPath();
//         ctx.moveTo(prevX, prevY);
//         ctx.lineTo(currX, currY);
//         ctx.strokeStyle = x;
//         ctx.lineWidth = y;
//         ctx.stroke();
//         ctx.closePath();
//     }
    
//     function erase() {
//         var m = confirm("Want to clear");
//         if (m) {
//             ctx.clearRect(0, 0, w, h);
//             document.getElementById("canvasimg").style.display = "none";
//         }
//     }
    
//     function save() {
//         document.getElementById("canvasimg").style.border = "2px solid";
//         var dataURL = canvas.toDataURL();
//         document.getElementById("canvasimg").src = dataURL;
//         document.getElementById("canvasimg").style.display = "inline";
//     }
    
//     function findxy(res, e) {
//         if (res == 'down') {
//             prevX = currX;
//             prevY = currY;
//             currX = e.clientX - canvas.offsetLeft;
//             currY = e.clientY - canvas.offsetTop;
    
//             flag = true;
//             dot_flag = true;
//             if (dot_flag) {
//                 ctx.beginPath();
//                 ctx.fillStyle = x;
//                 ctx.fillRect(currX, currY, 2, 2);
//                 ctx.closePath();
//                 dot_flag = false;
//             }
//         }
//         if (res == 'up' || res == "out") {
//             flag = false;
//         }
//         if (res == 'move') {
//             if (flag) {
//                 prevX = currX;
//                 prevY = currY;
//                 currX = e.clientX - canvas.offsetLeft;
//                 currY = e.clientY - canvas.offsetTop;
//                 draw();
//             }
//         }
//     }

(function()
{
	var canvas = document.querySelector("#canvas");
	var context = canvas.getContext("2d");
	canvas.width = 280;
	canvas.height = 280;

	var Mouse = { x: 0, y: 0 };
	var lastMouse = { x: 0, y: 0 };
	context.fillStyle="white";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.color = "black";
	context.lineWidth = 5;
    context.lineJoin = context.lineCap = 'round';

	debug();

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

		console.log("mousemove func")
	}, false );

	canvas.addEventListener( "mouseup", function()
	{
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
	};

	function debug()
	{
		/* CLEAR BUTTON */
		var clearButton = $( "#clearButton" );

		clearButton.on( "click", function()
		{

			document.getElementById("chartContainer").style.display = "none";
			context.clearRect( 0, 0, 280, 280 );
			context.fillStyle="white";
			context.fillRect(0,0,canvas.width,canvas.height);


		});

		/* COLOR SELECTOR */

		$( "#colors" ).change(function()
		{
			var color = $( "#colors" ).val();
			context.color = color;
		});

		/* LINE WIDTH */

		$( "#lineWidth" ).change(function()
		{
			context.lineWidth = $( this ).val();
		});
	}
}());