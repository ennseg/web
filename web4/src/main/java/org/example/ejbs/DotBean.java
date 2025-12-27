package org.example.ejbs;

import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Claims;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.WebApplicationException;
import org.example.auxiliaryServices.JwtUtill;
import org.example.auxiliaryServices.ResultCheck;
import org.example.dto.PointRequest;
import org.example.dto.PointResponse;
import org.example.dataBase.Points;
import org.example.dataBase.Users;

@Stateless
public class DotBean {

    @PersistenceContext(unitName = "lab4PU")
    private EntityManager em;

    public PointResponse processPoint(PointRequest request, String token) {

        Jws<Claims> claims = JwtUtill.verifyToken(token);
        int userId = claims.getBody().get("userId", Integer.class);

        Users user = em.find(Users.class, userId);
        if (user == null) {
            throw new WebApplicationException("Пользователь не найден", 401);
        }

        Double x = Double.valueOf(request.getX());
        Double y = Double.valueOf(request.getY());
        Double r = Double.valueOf(request.getR());

        boolean success = ResultCheck.resultCheck(request.getX(), request.getY(), request.getR());

        try {
            em.getTransaction().begin();

            Points p = new Points();
            p.setX(x);
            p.setY(y);
            p.setR(r);
            p.setSuccess(success);
            p.setUser(user);

            em.persist(p);

            em.getTransaction().commit();

            return new PointResponse(request.getX(), request.getY(), request.getR(), success);

        } catch (Exception e) {
            e.printStackTrace();
            if (em.getTransaction().isActive()) {
                try {
                    em.getTransaction().rollback();
                } catch (Exception rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            throw new WebApplicationException("Ошибка сохранения точки", 500);
        }
    }
}