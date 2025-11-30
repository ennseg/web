import java.math.BigDecimal;
import java.math.RoundingMode;

public class Check {

    private static final BigDecimal SEVEN = BigDecimal.valueOf(7);

    public static boolean check(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal xn = x.multiply(SEVEN).divide(r, 10, RoundingMode.HALF_UP);
        BigDecimal yn = y.multiply(SEVEN).divide(r, 10, RoundingMode.HALF_UP);

        double X = xn.doubleValue();
        double Y = yn.doubleValue();

        if (Math.abs(X) > 7 || Math.abs(Y) > 3) {
            return false;
        }

        double y1 = eq1(X);
        double y2 = eq2(X);
        double y3 = eq3(X);
        double y4 = eq4(X);
        double y5 = eq5(X);
        double y6 = eq6(X);

        double yTop = Double.NEGATIVE_INFINITY;
        double yBot = Double.POSITIVE_INFINITY;

        double[] candidates = {y1, y2, y3, y4, y5, y6, -y1, -y2, -y3, -y4, -y5, -y6};
        for (double val : candidates) {
            if (!Double.isNaN(val)) {
                yTop = Math.max(yTop, val);
                yBot = Math.min(yBot, val);
            }
        }

        return Y < yTop && Y > yBot;
    }

    private static double eq1(double x) {
        if (Math.abs(x) <= 3 || Math.abs(x) > 7) return Double.NaN;
        double v = 1 - (x / 7.0) * (x / 7.0);
        return v >= 0 ? 3 * Math.sqrt(v) : Double.NaN;
    }

    private static double eq2(double x) {
        double inner = Math.abs(Math.abs(x) - 2) - 1;
        double sarg = 1 - inner * inner;
        if (sarg < 0) return Double.NaN;
        double A = Math.abs(x / 2.0);
        double B = ((3 * Math.sqrt(33) - 7) / 112.0) * x * x;
        return A - B - 3 + Math.sqrt(sarg);
    }

    private static double eq3(double x) {
        double ax = Math.abs(x);
        if (!(ax > 0.75 && ax < 1)) return Double.NaN;
        double num = Math.abs((ax - 1) * (ax - 0.75));
        double den = (1 - ax) * (ax - 0.75);
        if (den == 0) return Double.NaN;
        return 9 * Math.sqrt(num / den) - 8 * ax;
    }

    private static double eq4(double x) {
        double ax = Math.abs(x);
        if (!(ax > 0.5 && ax < 0.75)) return Double.NaN;
        double num = Math.abs((ax - 0.75) * (ax - 0.5));
        double den = (0.75 - ax) * (ax - 0.5);
        if (den == 0) return Double.NaN;
        return 3 * ax + 0.75 * Math.sqrt(num / den);
    }

    private static double eq5(double x) {
        if (x > -0.5 && x < 0.5) return 2.25;
        return Double.NaN;
    }

    private static double eq6(double x) {
        double ax = Math.abs(x);
        if (!(ax > 1 && ax < 3)) return Double.NaN;
        double term1 = (6 * Math.sqrt(10)) / 7;
        double term2 = (1.5 - 0.5 * ax);
        double sq = 4 - Math.pow(ax - 1, 2);
        if (sq < 0) return Double.NaN;
        double term3 = (6 * Math.sqrt(10) / 14) * Math.sqrt(sq);
        return term1 + term2 - term3;
    }
}

