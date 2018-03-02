var DriveController = require ('./../DriveFunctions/DriveController.js');
var cars = require ('./../DriveFunctions/WavestoneCar.js');
var rpio = require('rpio');

const io = require('socket.io')();

var WavestoneCar = cars.WavestoneCar;
var myCar = new WavestoneCar();


io.on('connection', (client) => {
    console.log('a user connected'); 
		
	client.on('MOVE UP', (speed) => {
		speed = parseFloat(speed.toFixed(0));
		myCar.moveUp(speed);
		console.log ("speed", speed);
		client.emit('forward distance', 15);
    });
		
	client.on('MOVE DOWN', (speed) => {
		myCar.moveDown(speed);
    });
	
	client.on('MOVE RIGHT', (speed) => {
		myCar.moveRight(speed);
    });
		
	client.on('MOVE LEFT', (speed) => {
		myCar.moveLeft(speed);
    });
		
	client.on('MOVE UP RIGHT', (speed) => {
		myCar.moveUpRight(speed);
    });
		
	client.on('MOVE UP LEFT', (speed) => {
		myCar.moveUpLeft(speed);
    });
		
	client.on('MOVE DOWN RIGHT', (speed) => {
		myCar.moveDownRight(speed);
    });
		
	client.on('MOVE DOWN LEFT', (speed) => {
		myCar.moveDownLeft(speed);
    });
		
	client.on('STOP', () => {
		console.log("STOP");
		myCar.stop();
		if (myCar.autoPilotOn) {
			console.log("STOP AUTOPILOT");
			
			clearInterval(myCar.intervalUltrasonicSensorObj);
			clearInterval(myCar.intervalAutoPilotObj);
		}
	});
	
	client.on('AUTO PILOT', () => {
		myCar.intervalUltrasonicSensorObj = setInterval(function(){myCar.measureDistances();}, 100);
		myCar.intervalAutoPilotObj = setInterval(function(){myCar.autoPilot();}, 300);
    });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);