import json
from socket import SocketIO
from time import sleep
from flask_socketio import send, emit
import RPi.GPIO as GPIO

from gpio.ServoPin import ServoPin
from gpio.utils.setup_gpio import setup_gpio


global socketio


class Controller:
    ''' Controller object for GPIO pins '''

    def __init__(self, socketio: SocketIO) -> None:

        # Setup
        self.__setup_gpio()

        self.socketio = socketio
        self.servo1 = ServoPin(32)
        self.servo2 = ServoPin(33)
        pass

    def __setup_gpio(self):
        ''' Configure GPIO board '''
        GPIO.setmode(GPIO.BOARD)
        return

    def emit(self):
        ''' Emit changes through websocket '''
        emit("gpio-update", {"data": self.jsonify()}, broadcast=True)
        return

    def jsonify(self):
        ''' Returns self in json format '''
        pin_data = {}
        for pin in self.pins:
            pin_data[self.pins[pin].number] = self.pins[pin].jsonify()
        return json.dumps(pin_data)

    def toggle_pin(self, pin_number) -> bool:
        ''' Toggle a pin on the GPIO board '''
        if (pin_number > 40 or pin_number < 1):
            print(pin_number, "is outside of GPIO pin array")
            return False

        self.pins[pin_number].toggle()
        self.emit()
        return True

    def reset(self):
        ''' Reset all GPIO '''
        for pin in self.pins:
            self.pins[pin].reset()

        self.emit()
        return

    def test_servo(self):
        self.servo1.test()
        sleep(5)
        self.servo2.test()
        sleep(5)
        print("Hope it worked")
