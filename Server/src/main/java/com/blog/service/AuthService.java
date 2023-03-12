package com.blog.service;

import com.blog.models.JwtResponse;
import com.blog.models.LoginRequest;
import com.blog.models.MessageResponse;
import com.blog.models.SignUpRequest;

public interface AuthService {

	JwtResponse authenticateUser(LoginRequest loginRequest);

	MessageResponse registerUser(SignUpRequest signUpRequest);
}
