import java.math.BigDecimal;
import java.math.RoundingMode;

public class Check {
    public static boolean check(BigDecimal x, BigDecimal y, BigDecimal r) {
        BigDecimal two = BigDecimal.valueOf(2);

        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            return false;
        }

        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) <= 0) {
            BigDecimal a = x.multiply(x).add(y.multiply(y));
            BigDecimal b = r.divide(two, RoundingMode.HALF_UP).pow(2);
            if (a.compareTo(b) >= 0) {
                return false;
            }
        }

        if (x.compareTo(BigDecimal.ZERO) >= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            BigDecimal a = y.divide(two, RoundingMode.HALF_UP).add(x);
            BigDecimal b = r.divide(two, RoundingMode.HALF_UP);
            if (a.compareTo(b) >= 0) {
                return false;
            }
        }

        if (x.compareTo(BigDecimal.ZERO) <= 0 && y.compareTo(BigDecimal.ZERO) >= 0) {
            if (x.compareTo(r.divide(two, RoundingMode.HALF_UP).negate()) <= 0 || y.compareTo(r) >= 0) {
                return false;
            }
        }
        return true;
    }
}
