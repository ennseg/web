package org.example.restServices;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import org.example.dto.LoginRequest;
import org.example.dto.LoginResponse;
import org.example.ejbs.NewUserBean;
import org.example.ejbs.UserBean;


@Path("/auth")
@Consumes("application/json")
@Produces("application/json")
public class AuthService {
    @Inject
    NewUserBean newUserBean;

    @Inject
    UserBean userBean;

    @POST
    @Path("/register")
    public LoginResponse register(LoginRequest request) {
        return newUserBean.register(request);
    }


    @POST
    @Path("/login")
    public LoginResponse authenticate(LoginRequest request) {
        return userBean.login(request);
    }
}
