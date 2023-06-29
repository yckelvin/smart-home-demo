input.onButtonPressed(Button.AB, function () {
    control.reset()
})
let light2 = 0
basic.showNumber(0)
microIoT.microIoT_initDisplay()
basic.showNumber(1)
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_clear()
basic.showNumber(2)
microIoT.microIoT_showUserText(0, "Ready!")
microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
basic.forever(function () {
    light2 = pins.analogReadPin(AnalogPin.P0)
    microIoT.microIoT_showUserText(1, "Light: " + convertToText(light2))
    if (light2 < 200) {
        pins.analogWritePin(AnalogPin.P1, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P1, 0)
    }
})
