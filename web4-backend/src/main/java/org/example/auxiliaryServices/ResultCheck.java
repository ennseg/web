package org.example.auxiliaryServices;

import java.math.BigDecimal;

public class ResultCheck {

    public static boolean resultCheck(String xStr, String yStr, String rStr) {
        BigDecimal x = new BigDecimal(xStr);
        BigDecimal y = new BigDecimal(yStr);
        BigDecimal r = new BigDecimal(rStr);

        if (r == null || x == null || y == null) return false;
        if (r.compareTo(BigDecimal.ZERO) <= 0 || r.compareTo(BigDecimal.valueOf(5)) > 0) return false;
        if (x.compareTo(BigDecimal.valueOf(-3)) < 0 || x.compareTo(BigDecimal.valueOf(5)) > 0) return false;
        if (y.compareTo(BigDecimal.valueOf(-5)) < 0 || y.compareTo(BigDecimal.valueOf(5)) > 0) return false;

        if (x.compareTo(BigDecimal.ZERO) > 0 && y.compareTo(BigDecimal.ZERO) > 0) {
            if (y.compareTo(r) <= 0 && x.compareTo(r.divide(BigDecimal.valueOf(2))) <= 0) {
                return true;
            }
        }

        if (x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) > 0) {
            return false;
        }

        if (x.compareTo(BigDecimal.ZERO) < 0 && y.compareTo(BigDecimal.ZERO) < 0) {
            if (x.add(y).compareTo(r.negate()) >= 0) {
                return true;
            }
        }

        if (x.compareTo(BigDecimal.ZERO) > 0 && y.compareTo(BigDecimal.ZERO) < 0) {
            BigDecimal x2y2 = x.multiply(x).add(y.multiply(y));
            if (x2y2.compareTo(r.multiply(r)) <= 0) {
                return true;
            }
        }

        return false;
    }
}
