import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import java.io.Serializable;
import java.util.List;

@SessionScoped
public class CheckX implements Serializable {
    private static final long serialVersionUID = 1L;

    @Inject
    private Bean bean;

    public boolean checkX(String x, String y, String r, Boolean success) {
        List<String> listX = bean.getX();
        List<String> listY = bean.getY();
        List<String> listR = bean.getR();
        List<Boolean> listSuccess = bean.getSuccess();

        if (listX.size() != listY.size() ||
                listX.size() != listR.size() ||
                listX.size() != listSuccess.size()) {
            return true;
        }

        for (int i = 0; i < listX.size(); i++) {
            if (listX.get(i).equals(x) &&
                    listY.get(i).equals(y) &&
                    listR.get(i).equals(r) &&
                    listSuccess.get(i).equals(success)) {
                return false;
            }
        }
        return true;
    }
}