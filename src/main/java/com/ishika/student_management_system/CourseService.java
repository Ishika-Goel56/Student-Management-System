package com.ishika.student_management_system;

import java.util.List;

public interface CourseService {

    String createCourse(CourseRequestDTO course);

    List<CourseResponseDTO> readCourses();

    CourseResponseDTO readCourse(Long id);

    String updateCourse(Long id, CourseRequestDTO course);

    boolean deleteCourse(Long id);

    List<CourseResponseDTO> searchCourses(String name);

    List<CourseResponseDTO> readCourses(String sortBy, String direction);

    PageResponse<CourseResponseDTO> readCourses(
            int page,
            int size,
            String sortBy,
            String direction);
}
