package com.example.demo.api;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.api.repository.StudentRepository;
import com.example.demo.model.Student;

@RestController
public class TestController {

	@Autowired
	private StudentRepository studentRepository;

	@GetMapping("/api/students")
	public ResponseEntity<Student> getStudents() {
		Student a = new Student();
		return ResponseEntity.ok(a);
	}

	@PostMapping("/api/students")
	public ResponseEntity addStudent(@RequestBody Student student) {
//		try {
		studentRepository.save(student);
		return new ResponseEntity<>(student, HttpStatus.CREATED);
//	} catch (Exception e) {
//		return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//	}

	}
}
