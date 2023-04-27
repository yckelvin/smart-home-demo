def on_microiot_mqtt_topic_0(message):
    global Mode
    Mode = message
    microIoT.microIoT_showUserText(7, message)
microIoT.microIoT_MQTT_Event(microIoT.TOPIC.TOPIC_0, on_microiot_mqtt_topic_0)

def on_button_pressed_ab():
    control.reset()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

rainfall = 0
light2 = 0
Mode = ""
wifi_name = "izowifi"
password = "izo1234@"
iot_id = "UxrkoGs4R"
iot_pwd = "Ux9koGy4Rz"
topic_0 = "wxqzTMyVR"
microIoT.microIoT_initDisplay()
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_showUserText(1, "SETUP WIFI")
microIoT.microIoT_WIFI(wifi_name, password)
microIoT.microIoT_showUserText(2, "DEFINE MQTT")
microIoT.microIoT_MQTT(iot_id, iot_pwd, topic_0, microIoT.SERVERS.ENGLISH)
microIoT.microIoT_add_topic(microIoT.TOPIC.TOPIC_1, "Y0mmTGsVR")
microIoT.microIoT_add_topic(microIoT.TOPIC.TOPIC_2, "XRMmoMs4R")
microIoT.microIoT_clear()
microIoT.microIoT_showUserText(0, "Ready!")

def on_forever():
    global light2, rainfall
    light2 = pins.analog_read_pin(AnalogPin.P0)
    microIoT.microIoT_SendMessage(convert_to_text(light2), microIoT.TOPIC.TOPIC_1)
    microIoT.microIoT_showUserText(1, "Light: " + convert_to_text(light2))
    if light2 < 128:
        pins.analog_write_pin(AnalogPin.P16, 1023)
    else:
        pins.analog_write_pin(AnalogPin.P16, 0)
    basic.pause(5000)
    rainfall = pins.analog_read_pin(AnalogPin.P1)
    microIoT.microIoT_SendMessage(convert_to_text(rainfall), microIoT.TOPIC.TOPIC_2)
    microIoT.microIoT_showUserText(2, "Rainfall: " + convert_to_text(rainfall))
    if rainfall < 300:
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 30)
    else:
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
basic.forever(on_forever)
