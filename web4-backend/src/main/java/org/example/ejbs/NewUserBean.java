package org.example.ejbs;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.example.auxiliaryServices.JwtUtill;
import org.example.auxiliaryServices.PasswordHasher;
import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.dataBase.Users;

import jakarta.ejb.Stateless;

@Stateless
public class NewUserBean {

    @PersistenceContext(unitName = "lab4PU")
    private EntityManager em;

    public LoginResponse register(LoginRequest loginRequest) {
        TypedQuery<Users> query = em.createQuery(
                "SELECT u FROM Users u WHERE u.username = :username", Users.class);
        query.setParameter("username", loginRequest.getUsername());

        if (!query.getResultList().isEmpty()) {
            return new LoginResponse(null);
        }

        try {

            em.getTransaction().begin();

            PasswordHasher.HashedPassword hashed = PasswordHasher.hashPassword(loginRequest.getPassword());

            Users user = new Users();
            user.setUsername(loginRequest.getUsername());
            user.setPassword_hash(hashed.getHash());
            user.setSalt(hashed.getSalt());

            em.persist(user);
            em.flush();

            String token = JwtUtill.generateToken(user.getUsername(), user.getId());

            em.getTransaction().commit();

            return new LoginResponse(token);

        } catch (Exception e) {
            e.printStackTrace();
            if (em.getTransaction().isActive()) {
                try {
                    em.getTransaction().rollback();
                } catch (Exception rollbackEx) {
                    rollbackEx.printStackTrace();
                }
            }
            return new LoginResponse(null);
        }
    }
}