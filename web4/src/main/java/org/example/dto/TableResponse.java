package org.example.dto;

import java.util.List;

public class TableResponse {
    private List<TableRowResponse> rows;

    public TableResponse() {}

    public TableResponse(List<TableRowResponse> rows) {
        this.rows = rows;
    }

    public List<TableRowResponse> getRows() { return rows; }
    public void setRows(List<TableRowResponse> rows) { this.rows = rows; }
}
