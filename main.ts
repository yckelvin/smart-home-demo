input.onButtonPressed(Button.AB, function () {
    control.reset()
})
let rainfall = 0
let light2 = 0
let wifi_name = "izowifi"
let password = "izo1234@"
let iot_id = "UxrkoGs4R"
let iot_pwd = "Ux9koGy4Rz"
let topic_0 = "wxqzTMyVR"
microIoT.microIoT_initDisplay()
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_showUserText(1, "SETUP WIFI")
microIoT.microIoT_WIFI(wifi_name, password)
microIoT.microIoT_showUserText(2, "DEFINE MQTT")
microIoT.microIoT_MQTT(
iot_id,
iot_pwd,
topic_0,
microIoT.SERVERS.English
)
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_1, "Y0mmTGsVR")
microIoT.microIoT_add_topic(microIoT.TOPIC.topic_2, "XRMmoMs4R")
microIoT.microIoT_clear()
microIoT.microIoT_showUserText(0, "Ready!")
basic.forever(function () {
    light2 = pins.analogReadPin(AnalogPin.P0)
    microIoT.microIoT_SendMessage(convertToText(light2), microIoT.TOPIC.topic_1)
    microIoT.microIoT_showUserText(1, "Light: " + convertToText(light2))
    if (light2 < 128) {
        pins.analogWritePin(AnalogPin.P16, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    basic.pause(5000)
    rainfall = pins.analogReadPin(AnalogPin.P1)
    microIoT.microIoT_SendMessage(convertToText(rainfall), microIoT.TOPIC.topic_2)
    microIoT.microIoT_showUserText(2, "Rainfall: " + convertToText(rainfall))
    if (rainfall < 300) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 30)
    } else {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
    }
})
