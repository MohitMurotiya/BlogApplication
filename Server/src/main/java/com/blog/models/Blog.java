package com.blog.models;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import org.springframework.lang.NonNull;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

@Entity
@Table(name = "blog_table")
@Data
@RequiredArgsConstructor
@NoArgsConstructor
public class Blog {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@NotBlank
	private String title;

	private String cover;

	@NotBlank
	private String description;

	@NonNull
	private String content;

	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;

	private LocalDate createdDate;
}
