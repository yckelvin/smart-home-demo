input.onButtonPressed(Button.AB, function () {
    control.reset()
})
let distance = 0
let light_level = 0
basic.showNumber(0)
microIoT.microIoT_initDisplay()
basic.showNumber(1)
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_clear()
basic.showNumber(2)
microIoT.microIoT_showUserText(0, "Ready!")
basic.pause(2000)
microIoT.microIoT_clear()
basic.forever(function () {
    light_level = pins.analogReadPin(AnalogPin.P0)
    distance = sonar.ping(
    DigitalPin.P13,
    DigitalPin.P14,
    PingUnit.Centimeters
    )
    microIoT.microIoT_showUserText(0, "Light:      " + convertToText(light_level))
    microIoT.microIoT_showUserText(1, "Distance:   " + distance)
    if (light_level > 300) {
        pins.analogWritePin(AnalogPin.P1, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P1, 0)
    }
    if (distance < 5) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 180)
    } else {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
    }
    basic.pause(1000)
})
