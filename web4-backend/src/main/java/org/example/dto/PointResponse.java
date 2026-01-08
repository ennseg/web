package org.example.dto;

public class PointResponse {
    private String x, y, r;
    private boolean success;

    public PointResponse(String x, String y, String r, boolean success) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.success = success;
    }

    public String getX() {
        return x;
    }
    public void setX(String x) {
        this.x = x;
    }

    public String getY() {
        return y;
    }
    public void setY(String y) {
        this.y = y;
    }

    public String getR() {
        return r;
    }
    public void setR(String r) {
        this.r = r;
    }

    public boolean isSuccess() {
        return success;
    }
    public void setSuccess(boolean success) {
        this.success = success;
    }
}

