input.onButtonPressed(Button.AB, function () {
    control.reset()
})
let rainfall = 0
let light2 = 0
let wifi_name = "izowifi"
let password = "izo1234@"
microIoT.microIoT_initDisplay()
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_showUserText(1, "SETUP WIFI")
microIoT.microIoT_WIFI(wifi_name, password)
microIoT.microIoT_clear()
microIoT.microIoT_showUserText(0, "Ready!")
basic.forever(function () {
    light2 = pins.analogReadPin(AnalogPin.P0)
    microIoT.microIoT_showUserText(1, "Light: " + convertToText(light2))
    if (light2 < 128) {
        pins.analogWritePin(AnalogPin.P16, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    rainfall = pins.analogReadPin(AnalogPin.P1)
    microIoT.microIoT_showUserText(2, "Rainfall: " + convertToText(rainfall))
    if (rainfall > 400) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 30)
        basic.showLeds(`
            # # # # #
            # . # . #
            . . . . .
            # . # . #
            . . . . .
            `)
    } else {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
        basic.clearScreen()
    }
    basic.pause(5000)
})
