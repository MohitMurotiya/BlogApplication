package com.blog.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.blog.exception.AuthorizationException;
import com.blog.exception.BlogNotFoundException;
import com.blog.models.Blog;
import com.blog.models.MessageResponse;
import com.blog.service.BlogService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class BlogController {

	@Autowired
	BlogService service;

	@GetMapping("/blogs")
	public ResponseEntity<List<Blog>> findAll() {
		return new ResponseEntity<>(service.findAll(), HttpStatus.OK);
	}

	@GetMapping("/auth/user/{userId}/blogs")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<List<Blog>> findAllBlogsByUserId(@PathVariable(value = "userId") Long userId) {
		return new ResponseEntity<>(service.findAllBlogsByUserId(userId), HttpStatus.OK);
	}

	@GetMapping("/auth/blog/{blogId}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<Blog> findByBlogId(@PathVariable(value = "blogId") Long blogId) throws BlogNotFoundException {
		return new ResponseEntity<>(service.findByBlogId(blogId), HttpStatus.OK);
	}

	@PostMapping("/auth/user/{username}/blog")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<MessageResponse> save(@PathVariable(value = "username") String username,
			@Valid @RequestBody Blog blog) {
		return new ResponseEntity<>(service.save(username, blog), HttpStatus.CREATED);
	}

	@PutMapping("/auth/user/{userId}/blog/{blogId}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<MessageResponse> update(@PathVariable(value = "userId") Long userId,
			@PathVariable(value = "blogId") Long blogId, @Valid @RequestBody Blog blog)
			throws BlogNotFoundException, AuthorizationException {

		return new ResponseEntity<>(service.update(userId, blogId, blog), HttpStatus.OK);
	}

	@DeleteMapping("/auth/blog/{id}")
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> delete(@PathVariable Long id) throws BlogNotFoundException {
		return new ResponseEntity<>(service.delete(id), HttpStatus.OK);
	}
}
