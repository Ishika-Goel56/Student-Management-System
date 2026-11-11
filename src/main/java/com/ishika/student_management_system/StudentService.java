package com.ishika.student_management_system;

import java.util.List;

public interface StudentService {
  String createStudent(StudentRequestDTO student);
  List<StudentResponseDTO> readStudents();
  boolean deleteStudent(Long id);
  String updateStudent(Long id, Student student);

  StudentResponseDTO readStudent(Long id);
  List<StudentResponseDTO> searchStudents(String name);
  List<StudentResponseDTO> readStudents(String sortBy, String direction);
  PageResponse<StudentResponseDTO> readStudents(int page, int size, String sortBy, String direction);
}
