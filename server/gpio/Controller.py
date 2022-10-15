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
        # TODO
        return

    def test_servo(self):
        self.servo1.test()
        sleep(5)
        self.servo2.test()
        sleep(5)
        print("Hope it worked")
