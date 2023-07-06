input.onButtonPressed(Button.A, function () {
    microIoT.microIoT_ServoRun(microIoT.aServos.S2, 0)
})
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
input.onButtonPressed(Button.B, function () {
    microIoT.microIoT_ServoRun(microIoT.aServos.S2, 20)
})
let Door = 0
let rainfall = 0
let light2 = 0
microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
microIoT.microIoT_initDisplay()
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_showUserText(1, "Ready!")
basic.forever(function () {
    serial.writeLine("")
    serial.writeNumber(pins.analogReadPin(AnalogPin.P0))
    light2 = pins.analogReadPin(AnalogPin.P0)
    rainfall = pins.analogReadPin(AnalogPin.P1)
    Door = pins.digitalReadPin(DigitalPin.P2)
    microIoT.microIoT_showUserText(1, "Light: " + convertToText(light2))
    microIoT.microIoT_showUserText(2, "Rainfall: " + convertToText(rainfall))
    microIoT.microIoT_showUserText(3, "Door Open" + Door)
    if (light2 > 500) {
        pins.analogWritePin(AnalogPin.P16, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    if (Door == 1) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 0)
        basic.pause(5000)
    } else {
        microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
    }
    if (rainfall > 400) {
        microIoT.microIoT_ServoRun(microIoT.aServos.S1, 90)
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
    basic.pause(1000)
})
