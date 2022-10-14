import RPi.GPIO as GPIO
from time import sleep


class ServoPin:
    '''
        Controller for PWM pins connected to servo motors
    '''

    def __init__(self, number: int):
        self.number = number
        ''' GPIO pin header (referring to BOARD layout)'''

        # Set up pin
        GPIO.setup(self.number, GPIO.OUT)
        self.pin = GPIO.PWM(self.number, 50)
        return

    def start(self):
        ''' Start the pin '''
        self.pin.start()
        return

    def stop(self):
        ''' Stop the pin '''
        self.pin.stop()
        return

    def spin_clockwise(self):
        ''' Spin servo 5 degrees clockwise'''
        return

    def spin_counter_clockwise(self):
        ''' Spin servo 4 degrees counter-clockwise '''
        return

    def test(self):
        print("Testing servo")

        # Copied from youtube lol
        self.pin.start()
        duty = 2
        while duty <= 12:
            self.pin.ChangeDutyCycle(duty)
            sleep(0.5)
            duty += 1

        sleep(2)
        print("Now it should start turning the other way")
        sleep(0.3)
        self.pin.ChangeDutyCycle(7)

        sleep(2)
        print("It should turn again")
        self.pin.ChangeDutyCycle(2)
        sleep(0.3)
        self.pin.ChangeDutyCycle(0)

        print("Test over")
        self.pin.stop()
