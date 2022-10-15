import RPi.GPIO as GPIO
from time import sleep


class ServoPin:
    '''
        Controller for PWM pins connected to servo motors
    '''

    def __init__(self, number: int):
        # Public attributes
        self.number = number
        ''' GPIO pin header (referring to BOARD layout)'''

        self.should_spin_clockwise: bool = False
        ''' Flag for whether servo should be spinning clockwise (lowering 
        degree '''

        self.should_spin_counter_clockwise: bool = False
        ''' Flag for whether servo should be spinning counter-clockwise 
        (rising degree '''

        self.activated: bool = False
        ''' Whether or not the pin is active'''

        # Private attributes
        pin = self.__create_pin()
        self.__pin = pin
        ''' RPi pin object '''
        return

    def __create_pin(self):
        ''' Create GPIO pin '''
        GPIO.setup(self.number, GPIO.OUT)
        pin = GPIO.PWM(self.number, 50)
        return pin

    def set_pin_angle(self, angle: float) -> bool:
        ''' Set pin to specific angle between 0 and 180 '''
        self.__pin.ChangeDutyCycle(2 + (angle / 18))

        return

    def start(self):
        ''' Start the pin '''
        self.__pin.start(0)
        return

    def stop(self):
        ''' Stop the pin '''
        self.__pin.stop()
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
        self.__pin.start(0)
        duty = 2
        while duty <= 12:
            self.__pin.ChangeDutyCycle(duty)
            sleep(0.5)
            duty += 1

        sleep(2)
        print("Now it should start turning the other way")
        sleep(0.3)
        self.__pin.ChangeDutyCycle(7)

        sleep(2)
        print("It should turn again")
        self.__pin.ChangeDutyCycle(2)
        sleep(0.3)
        self.__pin.ChangeDutyCycle(0)

        print("Test over")
        self.__pin.stop()
        return
