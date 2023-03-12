package com.blog.service;

import java.util.List;

import javax.validation.Valid;

import com.blog.exception.AuthorizationException;
import com.blog.exception.BlogNotFoundException;
import com.blog.models.Blog;
import com.blog.models.MessageResponse;

public interface BlogService {

	List<Blog> findAll();

	MessageResponse save(String username, Blog blog);

	List<Blog> findAllBlogsByUserId(Long userId);

	Blog findByBlogId(Long blogId) throws BlogNotFoundException;

	MessageResponse delete(Long id) throws BlogNotFoundException;

	MessageResponse update(Long userId, Long blogId, @Valid Blog blog)
			throws BlogNotFoundException, AuthorizationException;
}
