from flask import Flask, Response, abort, jsonify, request
from flask_cors import CORS, cross_origin
from flask_socketio import SocketIO, send, emit
from time import sleep
from dotenv import load_dotenv, dotenv_values
import sqlite3
import os

from gpio.GPIOController import GPIOController


'''
    Setup
'''

# Set up config
load_dotenv()
global config
config = dotenv_values(".env")

# Configure Flask app
global app
app = Flask(__name__)
app.config['SECRET_KEY'] = config['SECRET_KEY']
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure websocket
global socketio
socketio = SocketIO(app, cors_allowed_origins='*')

# Set up GPIO Controller
global gpio_controller
gpio_controller = GPIOController(socketio)


'''
    Websocket routes
'''


@socketio.on("get-gpio")
@cross_origin()
def get_gpio():
    global gpio_controller
    print("Get GPIO hit")
    data = (gpio_controller.jsonify())

    #     send(jsonify(data), json=True)
    return emit("gpio-update", {"data": jsonify(data)})


@socketio.on("gpio-update")
@cross_origin()
def gpio_update():
    print('gpio update')
    global gpio_controller
    data = (gpio_controller.jsonify())
    return emit("gpio-update", data, json=True)


@socketio.on("message")
@cross_origin()
def message(incData):
    print("Message received!", incData)
    global gpio_controller
    data = (gpio_controller.jsonify())
    return send(data, json=True)


@socketio.on('toggle-pin')
@cross_origin()
def toggle_pin(incData):
    global gpio_controller
    gpio_controller.toggle_pin(incData['number'])
    return 200


if __name__ == "__main__":

    try:
        # Validate environment variables
        if not config['SECRET_KEY']:
            print("No secret key")
            raise
        elif not config['WS_PORT']:
            print("No ws port")
            raise
        elif not config['HTTP_PORT']:
            print("No http port")
            raise

        # Run
        socketio.run(app=app, host='0.0.0.0',
                     port=config['WS_PORT'])
        #app.run(debug=True, port=config['HTTP_PORT'], host="0.0.0.0")

    except:
        print("Something went wrong")
