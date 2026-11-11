package com.ishika.student_management_system;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(
        origins = {
                "http://localhost:3000",
                "https://student-management-system-lime-eta.vercel.app"
        }
)

@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("courses")
    public String createCourse(
            @Valid @RequestBody CourseRequestDTO course) {

        return courseService.createCourse(course);
    }

    @GetMapping("courses")
    public List<CourseResponseDTO> getAllCourses(
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return courseService.readCourses(sortBy, direction);
    }

    @GetMapping("courses/page")
    public PageResponse<CourseResponseDTO> getCoursesPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        if (page < 0) {
            throw new IllegalArgumentException(
                    "Page number cannot be negative"
            );
        }

        if (size <= 0) {
            throw new IllegalArgumentException(
                    "Page size must be greater than 0"
            );
        }

        return courseService.readCourses(
                page, size, sortBy, direction
        );
    }

    @GetMapping("courses/search")
    public List<CourseResponseDTO> searchCourses(
            @RequestParam String name) {

        return courseService.searchCourses(name);
    }

    @GetMapping("courses/{id}")
    public CourseResponseDTO getCourseById(
            @PathVariable Long id) {

        return courseService.readCourse(id);
    }

    @PutMapping("courses/{id}")
    public String updateCourse(
            @PathVariable Long id,
            @Valid @RequestBody CourseRequestDTO course) {

        return courseService.updateCourse(id, course);
    }

    @DeleteMapping("courses/{id}")
    public String deleteCourse(
            @PathVariable Long id) {

        if (courseService.deleteCourse(id)) {
            return "Course deleted successfully!";
        }

        return "Not Found";
    }
}