package org.example.ejbs;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.example.auxiliaryServices.JwtUtill;
import org.example.auxiliaryServices.PasswordHasher;
import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.dataBase.Users;


@Stateless
public class UserBean {

    @PersistenceContext(unitName = "lab4PU")
    EntityManager em;

    public LoginResponse login(LoginRequest loginRequest) {

        Users user = em.createQuery(
                        "SELECT u FROM Users u WHERE u.username = :username", Users.class)
                .setParameter("username", loginRequest.getUsername())
                .getResultStream()
                .findFirst()
                .orElse(null);

        if (user == null) return new LoginResponse(null);

        if (!PasswordHasher.verifyPassword(
                loginRequest.getPassword(),
                user.getPassword_hash(),
                user.getSalt())) return new LoginResponse(null);

        String token = JwtUtill.generateToken(user.getUsername(), user.getId());

        return new LoginResponse(token);
    }
}

