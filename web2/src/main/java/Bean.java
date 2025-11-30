import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("bean")
@SessionScoped
public class Bean implements Serializable {
    private static final long serialVersionUID = 1L;

    private List<String> X = new ArrayList<>();
    private List<String> Y = new ArrayList<>();
    private List<String> R = new ArrayList<>();
    private List<Boolean> Success = new ArrayList<>();

    public List<String> getX() {
        return X;
    }
    public void addX(String newX) {
        X.add(newX);
    }

    public List<String> getY() {
        return Y;
    }
    public void addY(String newY) {
        Y.add(newY);
    }

    public List<String> getR() {
        return R;
    }
    public void addR(String newR) {
        R.add(newR);
    }

    public List<Boolean> getSuccess() {
        return Success;
    }
    public void addSuccess(Boolean newSuccess) {
        Success.add(newSuccess);
    }

    public void clear() {
        X.clear();
        Y.clear();
        R.clear();
        Success.clear();
    }
}
