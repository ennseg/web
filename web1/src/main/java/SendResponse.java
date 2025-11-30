import com.fastcgi.FCGIInterface;
import org.json.simple.JSONObject;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Map;

public class SendResponse {
    public static void sendResponse() throws IOException {
        FCGIInterface fcgi = new FCGIInterface();
        while (fcgi.FCGIaccept() >= 0) {

            try {
                String lenStr = System.getProperty("CONTENT_LENGTH");
                if (lenStr == null || lenStr.isEmpty()) {
                    SendError.sendError(400, "Данные отсутствуют");
                    continue;
                }

                int len = Integer.parseInt(lenStr);
                byte[] buffer = System.in.readNBytes(len);
                String body = new String(buffer, StandardCharsets.UTF_8);
                Map<String, String> params = ParseForm.parseForm(body);

                BigDecimal x = new BigDecimal(params.get("X"));
                BigDecimal y = new BigDecimal(params.get("Y"));
                BigDecimal r = new BigDecimal(params.get("R"));

                Instant start = Instant.now();
                boolean success = Check.check(x, y, r);
                Instant end = Instant.now();
                long workTime = ChronoUnit.NANOS.between(start, end);

                JSONObject json = new JSONObject();
                json.put("X", params.get("X"));
                json.put("Y", params.get("Y"));
                json.put("R", params.get("R"));
                json.put("success", success);
                json.put("currentTime", LocalDateTime.now().toString());
                json.put("workTime", workTime);
                String response = json.toString();
                byte[] respBytes = response.getBytes(StandardCharsets.UTF_8);

                System.out.print("Status: 200 OK\r\n");
                System.out.print("Content-Type: application/json\r\n");
                System.out.print("Content-Length: " + respBytes.length + "\r\n");
                System.out.print("\r\n");
                System.out.write(respBytes);
                System.out.flush();
            } catch (Exception e) {
                SendError.sendError(400, e.getMessage() != null ? e.getMessage() : "unknown");
            }
        }
    }
}
