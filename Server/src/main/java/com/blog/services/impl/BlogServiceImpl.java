package com.blog.services.impl;

import java.time.LocalDate;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.blog.exception.AuthorizationException;
import com.blog.exception.BlogNotFoundException;
import com.blog.models.Blog;
import com.blog.models.MessageResponse;
import com.blog.models.User;
import com.blog.repository.BlogRespository;
import com.blog.repository.UserRepository;
import com.blog.service.BlogService;

@Service
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogRespository blogRepository;

	@Autowired
	private UserRepository userRepository;

	public List<Blog> findAll() {
		return blogRepository.findAll();
	}

	public MessageResponse save(String username, Blog blog) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
		blog.setUser(user);
		blog.setCreatedDate(LocalDate.now());
		blogRepository.save(blog);
		return new MessageResponse("Blog posted successfully");
	}

	public List<Blog> findAllBlogsByUserId(Long userId) {
		userRepository.findById(userId)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: " + userId));
		return blogRepository.findByUserId(userId);
	}

	@Override
	public MessageResponse delete(Long id) throws BlogNotFoundException {
		blogRepository.findById(id).orElseThrow(() -> new BlogNotFoundException("Blog Not Found with id: " + id));
		blogRepository.deleteById(id);
		return new MessageResponse("Blog deleted successfully");
	}

	@Override
	public MessageResponse update(Long userId, Long blogId, @Valid Blog blog)
			throws BlogNotFoundException, AuthorizationException {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with userId: " + userId));
		blog.setUser(user);
		Blog oldBlog = blogRepository.findById(blogId)
				.orElseThrow(() -> new BlogNotFoundException("Blog Not Found with id: " + blogId));
		if (!oldBlog.getUser().getId().equals(userId)) {
			throw new AuthorizationException("You're not authorize to edit this blog.");
		}
		blog.setCreatedDate(LocalDate.now());
		blogRepository.save(blog);
		return new MessageResponse("Blog updated successfully");
	}

	@Override
	public Blog findByBlogId(Long blogId) throws BlogNotFoundException {
		return blogRepository.findById(blogId)
				.orElseThrow(() -> new BlogNotFoundException("Blog Not Found with id: " + blogId));
	}

}
