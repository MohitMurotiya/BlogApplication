package com.blog.exception;

public class AuthorizationException extends Exception {

	private static final long serialVersionUID = -9185252707089561953L;

	public AuthorizationException(String message) {
		super(message);
	}
}