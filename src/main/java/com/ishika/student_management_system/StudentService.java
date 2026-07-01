package com.ishika.student_management_system;

import java.util.List;

public interface StudentService {
  String createStudent(Student student);
  List<Student> readStudents();
  boolean deleteStudent(Long id);
  String updateStudent(Long id, Student student);

  Student readStudent(Long id);
}
