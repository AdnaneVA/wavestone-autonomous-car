var constants = require("./WavestoneCarConstants");
var rpio = require('rpio');
var statistics = require('math-statistics');
var usonic = require('mmm-usonic');


function WavestoneCar () {
	this.LeftMotorEngine = new MotorEngine(constants.LEFT_MOTOR_ENGINE_DIR_PIN, constants.LEFT_MOTOR_ENGINE_PWM_PIN);
	this.RightMotorEngine = new MotorEngine(constants.RIGHT_MOTOR_ENGINE_DIR_PIN, constants.RIGHT_MOTOR_ENGINE_PWM_PIN);
	
	this.FrontUltrasonicSensor = new UltrasonicSensor (constants.FRONT_ULTRASONIC_SENSOR_ECHO_PIN, constants.FRONT_ULTRASONIC_SENSOR_TRIG_PIN, constants.FRONT_ULTRASONIC_SENSOR_TIMEOUT, constants.FRONT_ULTRASONIC_SENSOR_DELAY, constants.FRONT_ULTRASONIC_SENSOR_RATE);
}

module.exports.WavestoneCar = WavestoneCar;


WavestoneCar.prototype.moveJoystick = function (degree, speed) {
	var PWM_Range = constants.PWM_RANGE_JOYSTICK;
	
	//console.log('Move Joystick degree:', degree);
	
	if ((degree >= 0 && degree <= 22.5) || (degree > 337.5 && degree <= 360)){
		//Move RIGHT
		//this.LeftMotorEngine.moveForward(speed, PWM_Range);
		//this.RightMotorEngine.moveBackward(speed, PWM_Range);
	
		//rpio.open(7, rpio.OUTPUT, rpio.LOW);
		//rpio.write(7, rpio.HIGH);
		console.log('Joystick : MOVE RIGHT');
		
	} 
	else if (degree > 22.5 && degree <= 67.5) {
		//Move UP RIGHT
		//this.LeftMotorEngine.moveForward(speed, PWM_Range);
		//this.RightMotorEngine.moveForward(speed/2, PWM_Range);
		
		console.log('Joystick : MOVE UP RIGHT');
		
	} else if (degree > 67.5 && degree <= 112.5) {
		//Move UP
		//this.LeftMotorEngine.moveForward(speed, PWM_Range);
		//this.RightMotorEngine.moveForward(speed, PWM_Range);
		
		console.log('Joystick : MOVE UP');
		
	} else if (degree > 112.5 && degree <= 157.5) {
		//Move UP LEFT
		//this.LeftMotorEngine.moveForward(speed/2, PWM_Range);
		//this.RightMotorEngine.moveForward(speed, PWM_Range);
		
		console.log('Joystick : MOVE UP LEFT');
		
	} else if (degree > 157.5 && degree <= 202.5) {
		// Move LEFT
		//this.LeftMotorEngine.moveBackward(speed, PWM_Range);
		//this.RightMotorEngine.moveForward(speed, PWM_Range);
		
		console.log('Joystick : MOVE LEFT');
		
	} else if (degree > 202.5 && degree <= 247.5) {
		// Move DOWN LEFT 
		//this.LeftMotorEngine.moveBackward(speed/2, PWM_Range);
		//this.RightMotorEngine.moveBackward(speed, PWM_Range);
		
		console.log('Joystick : MOVE DOWN LEFT');
		
	} else if (degree > 247.5 && degree <= 292.5) {
		// Move DOWN
		//this.LeftMotorEngine.moveBackward(speed, PWM_Range);
		//this.RightMotorEngine.moveBackward(speed, PWM_Range);
		
		console.log('Joystick : MOVE DOWN');
		
	} else if (degree > 292.5 && degree <= 337.5) {
		//Move DOWN RIGHT
		//this.LeftMotorEngine.moveBackward(speed, PWM_Range);
		//this.RightMotorEngine.moveBackward(speed/2, PWM_Range);

		console.log('Joystick : MOVE DOWN RIGHT');
		
	}
	
};



WavestoneCar.prototype.moveAccelerometer = function (x, y) {
	var PWM_Range = constants.PWM_RANGE_ACCELEROMETER;
	
	//console.log('Move Accelerometer x:', x);
	
	if (x > 1 && y > - 1 && y < 1){
		//Move RIGHT
		//this.LeftMotorEngine.moveForward(x, PWM_Range);
		//this.RightMotorEngine.moveBackward(x, PWM_Range);
		
		console.log('Accelerometer : MOVE RIGHT');
		
	} else if (x > 1 && y > 1) {
		//Move UP RIGHT
		//this.LeftMotorEngine.moveForward(speed, PWM_Range);
		//this.RightMotorEngine.moveForward(speed/2, PWM_Range);
		
		console.log('Accelerometer : MOVE UP RIGHT');
		
	} else if (x > - 1 && x < 1 && y > 1) {
		//Move UP
		//this.LeftMotorEngine.moveForward(y, PWM_Range);
		//this.RightMotorEngine.moveForward(y, PWM_Range);
		
		console.log('Accelerometer : MOVE UP');
		
	} else if (x < -1 && y > 1) {
		//Move UP LEFT
		//this.LeftMotorEngine.moveForward(speed/2, PWM_Range);
		//this.RightMotorEngine.moveForward(speed, PWM_Range);
		
		console.log('Accelerometer : MOVE UP LEFT');
		
	} else if (x < -1 && y > -1 && y < 1) {
		// Move LEFT
		//this.LeftMotorEngine.moveBackward(x * -1, PWM_Range);
		//this.RightMotorEngine.moveForward(x * -1, PWM_Range);
		
		console.log('Accelerometer : MOVE LEFT');
	} else if (x < - 1 && y < - 1) {
		// Move DOWN LEFT 
		//this.LeftMotorEngine.moveBackward(speed/2, PWM_Range);
		//this.RightMotorEngine.moveBackward(speed, PWM_Range);
		
		console.log('Accelerometer : MOVE DOWN LEFT');
		
	} else if (x > -1 && x < 1 && y < -1) {
		// Move DOWN
		//this.LeftMotorEngine.moveBackward(y * -1, PWM_Range);
		//this.RightMotorEngine.moveBackward(y * -1, PWM_Range);
		
		console.log('Accelerometer : MOVE DOWN');
		
	} else if (x > 1 && y < - 1) {
		//Move DOWN RIGHT
		//this.LeftMotorEngine.moveBackward(speed, PWM_Range);
		//this.RightMotorEngine.moveBackward(speed/2, PWM_Range);
		
		console.log('Accelerometer : MOVE DOWN RIGHT');
		
	}
};


WavestoneCar.prototype.stop = function () {
	//this.RightMotorEngine.stop();
	//this.LeftMotorEngine.stop();
	
	//rpio.write(7, rpio.LOW);
	console.log('stop');
};



///////////////////////////////////////////////////////////////////


function MotorEngine(dirPin, pwmPin){
	this.dirPin = dirPin;
	this.pwmPin = pwmPin;
}


MotorEngine.prototype.moveForward = function (speed, PWM_Range) {
	rpio.open(this.dirPin, rpio.OUTPUT);
	rpio.open(this.pwmPin, rpio.PMW);
	
	rpio.write(this.dirPin, rpio.HIGH);
	
	rpio.pwmSetClockDivider(constants.PWM_CLOCK_DIV);
	rpio.pwmSetRange(PWM_Range);
	rpio.pwmSetData(this.pwmPin, speed);
		
};
	
MotorEngine.prototype.moveBackward = function (speed, PWM_Range) {
	rpio.open(this.dirPin, rpio.OUTPUT);
	rpio.open(this.pwmPin, rpio.PMW);	
	
	rpio.write(this.dirPin, rpio.LOW);
	
	rpio.pwmSetClockDivider(constants.PWM_CLOCK_DIV);
	rpio.pwmSetRange(PWM_Range);
	rpio.pwmSetData(this.pwmPin, speed); 
	
};

MotorEngine.prototype.stop = function () {
	rpio.open(this.dirPin, rpio.OUTPUT);
	rpio.open(this.pwmPin, rpio.OUTPUT);	
	
	rpio.write(this.dirPin, rpio.LOW);
	rpio.write(this.pwmPin, rpio.LOW);
};


module.exports.MotorEngine = MotorEngine;

//////////////////////////////////////////////////////////////////

function UltrasonicSensor (echoPin, trigPin, timeout, delay, rate){
	this.echoPin = echoPin;
	this.trigPin = trigPin;
	this.timeout = timeout;
	this.delay = delay;
	this.rate = rate;
}

UltrasonicSensor.prototype.measureDistance = function (){
    var sensor = usonic.sensor(this.echoPin, this.trigPin, this.timeout);
    //console.log(config);
    var distances;
 
    (function measure() {
        if (!distances || distances.length === this.rate) {
            if (distances) {
                print(distances);
            }
 
            distances = [];
        }
 
        setTimeout(function() {
            distances.push(sensor());
 
            measure();
        }, this.delay);
    }());
	this.distance = statistics.median(distances);
};


module.exports.UltrasonicSensor = UltrasonicSensor;

////////////////////////////////////////////////////////////////


