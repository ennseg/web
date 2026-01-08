package org.example.restServices;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Context;
import jakarta.ws.rs.core.HttpHeaders;
import org.example.dto.PointRequest;
import org.example.dto.PointResponse;
import org.example.dto.TableResponse;
import org.example.ejbs.DotBean;
import org.example.ejbs.TableBean;

@Path("/points")
@Consumes("application/json")
@Produces("application/json")
public class PointService {
    @Inject
    private DotBean dotBean;

    @Context
    private HttpHeaders headers;


    @Inject
    private TableBean tableBean;

    @POST
    @Path("/new")
    public PointResponse addPoint(PointRequest request) {
        String authHeader = headers.getHeaderString("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new WebApplicationException("Неверный token", 401);
        }

        String token = authHeader.substring("Bearer ".length());

        return dotBean.processPoint(request, token);
    }

    @GET
    @Path("")
    public TableResponse getPointsTable() {
        String authHeader = headers.getHeaderString("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new WebApplicationException("Неверный token", 401);
        }

        String token = authHeader.substring("Bearer ".length());

        return tableBean.getTable(token);
    }
}


