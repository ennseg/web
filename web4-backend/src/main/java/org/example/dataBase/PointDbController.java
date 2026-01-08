package org.example.dataBase;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.EntityTransaction;
import jakarta.persistence.Persistence;

public class PointDbController {
    private final EntityManagerFactory emf;

    public PointDbController(String persistenceUnitName) {
        this.emf = Persistence.createEntityManagerFactory(persistenceUnitName);
    }

    public void addPoint(Double x, Double y, Double r, Boolean success, Users user) {
        EntityManager em = emf.createEntityManager();
        EntityTransaction transaction = em.getTransaction();

        try {
            transaction.begin();

            Points p = new Points();

            p.setX(x);
            p.setY(y);
            p.setR(r);
            p.setSuccess(success);
            p.setUser(user);

            em.persist(p);

            transaction.commit();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }  finally {
            em.close();
        }
    }
}
