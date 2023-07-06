input.onButtonPressed(Button.AB, function () {
    control.reset()
})
let distance = 0
let door_press = 0
let rainfall = 0
let light_level = 0
microIoT.microIoT_initDisplay()
microIoT.microIoT_ServoRun(microIoT.aServos.S1, 0)
microIoT.microIoT_ServoRun(microIoT.aServos.S2, 90)
microIoT.microIoT_showUserText(0, "INIT DEVICE")
microIoT.microIoT_showUserText(1, "READY!")
basic.pause(2000)
microIoT.microIoT_clear()
basic.forever(function () {
    light_level = pins.analogReadPin(AnalogPin.P0)
    rainfall = pins.analogReadPin(AnalogPin.P1)
    door_press = pins.digitalReadPin(DigitalPin.P2)
    distance = sonar.ping(
    DigitalPin.P13,
    DigitalPin.P14,
    PingUnit.Centimeters
    )
    microIoT.microIoT_showUserText(0, "Light:      " + convertToText(light_level))
    microIoT.microIoT_showUserText(1, "Rainfall:   " + convertToText(rainfall))
    microIoT.microIoT_showUserText(2, "Door Press: " + door_press)
    microIoT.microIoT_showUserText(3, "Distance:   " + distance)
    if (light_level > 200) {
        pins.analogWritePin(AnalogPin.P16, 1023)
    } else {
        pins.analogWritePin(AnalogPin.P16, 0)
    }
    if (door_press == 1) {
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
    if (distance < 5) {
        microIoT.microIoT_setIndexColor(PIN.P15, 0, 5, 0xff0000)
    } else {
        microIoT.microIoT_ledBlank(PIN.P15)
    }
    basic.pause(1000)
})
