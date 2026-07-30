package org.example.controller;

import org.example.dto.PointRequest;
import org.example.dto.PointResponse;
import org.example.dto.TableResponse;
import org.example.service.PointService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/points")
public class PointController {

    private final PointService pointService;

    public PointController(PointService pointService) {
        this.pointService = pointService;
    }

    @PostMapping("/new")
    public PointResponse addPoint(@RequestBody PointRequest request,
                                  @RequestHeader("Authorization") String authHeader) {
        return pointService.addPoint(request, authHeader.substring(7));
    }

    @GetMapping
    public TableResponse getPoints(@RequestHeader("Authorization") String authHeader) {
        return pointService.getTable(authHeader.substring(7));
    }
}
