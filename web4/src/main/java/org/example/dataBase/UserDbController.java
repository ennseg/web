package org.example.dataBase;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.example.auxiliaryServices.JwtUtill;
import org.example.auxiliaryServices.PasswordHasher;
import org.example.dto.LoginRequest;


public class UserDbController {
    private final EntityManagerFactory emf;

    public UserDbController(String persistenceUnitName) {
        this.emf = Persistence.createEntityManagerFactory(persistenceUnitName);
    }

    public String checkUser(LoginRequest loginRequest) {
        EntityManager em = emf.createEntityManager();
        Users user = em.createQuery(
                        "SELECT u FROM Users u WHERE u.username = :username", Users.class)
                .setParameter("username", loginRequest.getUsername())
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (user == null) {return null;}

        if (!PasswordHasher.verifyPassword(loginRequest.getPassword(), user.password_hash, user.salt)) {return null;};

        JwtUtill jwtUtill = new JwtUtill();
        String token = jwtUtill.generateToken(user.username, user.id);

        return token;
    }
}
