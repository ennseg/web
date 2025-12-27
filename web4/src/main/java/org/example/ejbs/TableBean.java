package org.example.ejbs;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.example.auxiliaryServices.JwtUtill;
import org.example.dto.TableResponse;
import org.example.dto.TableRowResponse;
import org.example.dataBase.Points;

import java.util.List;
import java.util.stream.Collectors;

@Stateless
public class TableBean {

    @PersistenceContext(unitName = "lab4PU")
    private EntityManager em;

    public TableResponse getTable(String token) {
        int userId = JwtUtill.getUserIdFromToken(token);

        try {
            em.getTransaction().begin();

            TypedQuery<Points> query = em.createQuery(
                    "SELECT p FROM Points p WHERE p.user.id = :userId ORDER BY p.id DESC", Points.class);
            query.setParameter("userId", userId);

            List<Points> points = query.getResultList();

            List<TableRowResponse> rows = points.stream()
                    .map(p -> new TableRowResponse(
                            p.getId(),
                            p.getX(),
                            p.getY(),
                            p.getR(),
                            p.getSuccess()
                    ))
                    .collect(Collectors.toList());

            em.getTransaction().commit();

            return new TableResponse(rows);

        } catch (Exception e) {
            e.printStackTrace();
            if (em.getTransaction().isActive()) {
                try {
                    em.getTransaction().rollback();
                } catch (Exception rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            return new TableResponse(List.of());
        }
    }
}