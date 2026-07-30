package org.example.service;

import org.example.auxiliaryServices.JwtUtill;
import org.example.auxiliaryServices.PasswordHasher;
import org.example.dataBase.Users;
import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {
        Optional<Users> userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) return new LoginResponse(null);

        Users user = userOpt.get();
        if (!PasswordHasher.verifyPassword(request.getPassword(), user.getPassword_hash(), user.getSalt())) {
            return new LoginResponse(null);
        }

        return new LoginResponse(JwtUtill.generateToken(user.getUsername(), user.getId()));
    }

    @Transactional
    public LoginResponse register(LoginRequest request) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            return new LoginResponse(null);
        }

        PasswordHasher.HashedPassword hashed = PasswordHasher.hashPassword(request.getPassword());

        Users user = new Users();
        user.setUsername(request.getUsername());
        user.setPassword_hash(hashed.getHash());
        user.setSalt(hashed.getSalt());

        userRepository.save(user);

        return new LoginResponse(JwtUtill.generateToken(user.getUsername(), user.getId()));
    }
}
