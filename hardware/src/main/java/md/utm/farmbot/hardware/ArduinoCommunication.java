package md.utm.farmbot.hardware;

import gnu.io.CommPortIdentifier;
import gnu.io.NoSuchPortException;
import gnu.io.PortInUseException;
import gnu.io.SerialPort;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.io.OutputStream;

@Slf4j
@Component
public class ArduinoCommunication {
    private SerialPort serialPort;
    private OutputStream outputStream;

    public ArduinoCommunication() {
        initializeSerialPort();
    }

    private void initializeSerialPort() {
        try {
            // TODO: config ports
            CommPortIdentifier portId = CommPortIdentifier.getPortIdentifier("/dev/ttyUSB0"); // Replace with actual port
            serialPort = (SerialPort) portId.open("ArduinoCommunication", 2000);
            outputStream = serialPort.getOutputStream();
        } catch (NoSuchPortException | PortInUseException | IOException e) {
            log.error("ERR", e.getStackTrace());
        }
    }

    public void sendCommand(String command) {
        try {
            if (outputStream != null) {
                outputStream.write(command.getBytes());
            } else {
                log.error("Output stream is not initialized.");
            }
        } catch (IOException e) {
            log.error("ERR", e.getStackTrace());
        }
    }

    public void closeSerialPort() {
        if (serialPort != null) {
            serialPort.close();
        }
    }
}
