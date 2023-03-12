package com.blog.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.blog.models.Blog;

public interface BlogRespository extends JpaRepository<Blog, Long> {

	List<Blog> findByUserId(Long user);
}