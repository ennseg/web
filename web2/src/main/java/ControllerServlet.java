import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebServlet("/lab2")
public class ControllerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        String x = req.getParameter("X");
        String y = req.getParameter("Y");
        String r = req.getParameter("R");

        if (x != null && y != null && r != null &&
                !x.isEmpty() && !y.isEmpty() && !r.isEmpty()) {
            getServletContext().getRequestDispatcher("/AreaCheck").forward(req, resp);
        } else {
            getServletContext().getRequestDispatcher("/index.jsp").forward(req, resp);
        }
    }
}
