package com.ishika.student_management_system;

import java.util.List;

public interface TeacherService {

    String createTeacher(TeacherRequestDTO teacher);

    List<TeacherResponseDTO> readTeachers(String sortBy, String direction);

    PageResponse<TeacherResponseDTO> readTeachers(int page, int size, String sortBy, String direction);

    TeacherResponseDTO readTeacher(Long id);

    String updateTeacher(Long id, TeacherRequestDTO teacher);

    boolean deleteTeacher(Long id);

    List<TeacherResponseDTO> searchTeachers(String name);
}
