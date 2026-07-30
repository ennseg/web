package org.example.service;

import org.example.auxiliaryServices.JwtUtill;
import org.example.auxiliaryServices.ResultCheck;
import org.example.dataBase.Points;
import org.example.dataBase.Users;
import org.example.dto.PointRequest;
import org.example.dto.PointResponse;
import org.example.dto.TableResponse;
import org.example.dto.TableRowResponse;
import org.example.repository.PointRepository;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PointService {

    private final PointRepository pointRepository;
    private final UserRepository userRepository;

    public PointService(PointRepository pointRepository, UserRepository userRepository) {
        this.pointRepository = pointRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public PointResponse addPoint(PointRequest request, String token) {
        int userId = JwtUtill.getUserIdFromToken(token);
        Users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));

        boolean success = ResultCheck.resultCheck(request.getX(), request.getY(), request.getR());

        Points p = new Points();
        p.setX(Double.valueOf(request.getX()));
        p.setY(Double.valueOf(request.getY()));
        p.setR(Double.valueOf(request.getR()));
        p.setSuccess(success);
        p.setUser(user);

        pointRepository.save(p);

        return new PointResponse(request.getX(), request.getY(), request.getR(), success);
    }

    public TableResponse getTable(String token) {
        int userId = JwtUtill.getUserIdFromToken(token);

        List<TableRowResponse> rows = pointRepository.findByUserId(userId).stream()
                .map(p -> new TableRowResponse(p.getId(), p.getX(), p.getY(), p.getR(), p.getSuccess()))
                .collect(Collectors.toList());

        return new TableResponse(rows);
    }
}
