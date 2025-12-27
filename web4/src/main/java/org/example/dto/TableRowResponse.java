package org.example.dto;

public class TableRowResponse {
    private int id;
    private Double x;
    private Double y;
    private Double r;
    private Boolean success;

    public TableRowResponse(int id, Double x, Double y, Double r, Boolean success) {
        this.id = id;
        this.y = y;
        this.x = x;
        this.r = r;
        this.success = success;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public Double getX() { return x; }
    public void setX(Double x) { this.x = x; }

    public Double getY() { return y; }
    public void setY(Double y) { this.y = y; }

    public Double getR() { return r; }
    public void setR(Double r) { this.r = r; }

    public Boolean getSuccess() { return success; }
    public void setSuccess(Boolean success) { this.success = success; }
}

