import org.json.simple.JSONObject;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class SendError {
    public static void sendError(int status, String reason) throws IOException {
        String msg = new JSONObject().put("reason", reason).toString();
        byte[] errBytes = msg.getBytes(StandardCharsets.UTF_8);
        System.out.print("Status: " + status + " Bad Request\r\n");
        System.out.print("Content-Type: application/json\r\n");
        System.out.print("Content-Length: " + errBytes.length + "\r\n");
        System.out.print("\r\n");
        System.out.write(errBytes);
        System.out.flush();
    }
}
