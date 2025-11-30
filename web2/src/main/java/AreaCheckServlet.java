import jakarta.inject.Inject;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.eclipse.microprofile.metrics.Counter;
import org.eclipse.microprofile.metrics.MetricRegistry;
import org.eclipse.microprofile.metrics.annotation.RegistryType;

@WebServlet("/AreaCheck")
public class AreaCheckServlet extends HttpServlet {

    @Inject
    private Bean bean;

    @Inject
    private CheckX checkX;

    private Counter totalRequests;
    private Counter errorRequests;

    @Inject
    public void initCounters(@RegistryType(type = MetricRegistry.Type.APPLICATION) MetricRegistry registry) {
        totalRequests = registry.counter("area_check_requests_total");
        errorRequests = registry.counter("area_check_errors_total");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        totalRequests.inc();

        try {
            String[] xValues = req.getParameterValues("X");
            String yVal = req.getParameter("Y");
            String rVal = req.getParameter("R");

            if (xValues == null || yVal == null || rVal == null || yVal.isEmpty() || rVal.isEmpty()) {
                errorRequests.inc();
                req.getRequestDispatcher("/index.jsp").forward(req, resp);
                return;
            }

            BigDecimal y, r;
            try {
                y = new BigDecimal(yVal);
                r = new BigDecimal(rVal);
            } catch (NumberFormatException e) {
                errorRequests.inc();
                req.getRequestDispatcher("/index.jsp").forward(req, resp);
                return;
            }

            List<String> xList = new ArrayList<>();
            List<String> yList = new ArrayList<>();
            List<String> rList = new ArrayList<>();
            List<Boolean> successList = new ArrayList<>();

            List<String> uniqXValues = Arrays.stream(xValues).distinct().collect(Collectors.toList());
            String[] xVal = uniqXValues.toArray(new String[0]);

            for (String xStr : xVal) {
                try {
                    BigDecimal x = new BigDecimal(xStr);
                    boolean success = Check.check(x, y, r);

                    if (checkX.checkX(xStr, yVal, rVal, success)) {
                        bean.addX(xStr);
                        bean.addY(yVal);
                        bean.addR(rVal);
                        bean.addSuccess(success);

                        xList.add(xStr);
                        yList.add(yVal);
                        rList.add(rVal);
                        successList.add(success);
                    }
                } catch (NumberFormatException ignored) {
                }
            }

            req.setAttribute("xList", xList);
            req.setAttribute("yList", yList);
            req.setAttribute("rList", rList);
            req.setAttribute("successList", successList);

            req.getRequestDispatcher("/result.jsp").forward(req, resp);

        } catch (Exception e) {
            errorRequests.inc();
            throw e;
        }
    }
}
