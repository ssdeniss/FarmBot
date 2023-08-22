package md.utm.farmbot.hardware.services;

import lombok.RequiredArgsConstructor;
import md.utm.farmbot.hardware.ArduinoCommunication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MotorService {

    private final ArduinoCommunication arduinoCommunication;

    public void startMotor() {
        arduinoCommunication.sendCommand("1");
        arduinoCommunication.closeSerialPort();
    }

    public void stopMotor() {
        arduinoCommunication.sendCommand("0");
        arduinoCommunication.closeSerialPort();
    }
}
