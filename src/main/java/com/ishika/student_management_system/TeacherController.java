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
public class TeacherController {

    @Autowired
    private TeacherService teacherService;

    @PostMapping("teachers")
    public String createTeacher(@Valid @RequestBody TeacherRequestDTO teacher) {
        return teacherService.createTeacher(teacher);
    }

    @GetMapping("teachers")
    public List<TeacherResponseDTO> getAllTeachers(
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return teacherService.readTeachers(sortBy, direction);
    }

    @GetMapping("teachers/{id}")
    public TeacherResponseDTO getTeacherById(@PathVariable Long id) {
        return teacherService.readTeacher(id);
    }

    @PutMapping("teachers/{id}")
    public String updateTeacher(
            @PathVariable Long id,
            @Valid @RequestBody TeacherRequestDTO teacher) {

        return teacherService.updateTeacher(id, teacher);
    }

    @DeleteMapping("teachers/{id}")
    public String deleteTeacher(@PathVariable Long id) {
        if (teacherService.deleteTeacher(id)) {
            return "Teacher deleted successfully!";
        }

        return "Not Found";
    }

    @GetMapping("teachers/search")
    public List<TeacherResponseDTO> searchTeachers(
            @RequestParam String name) {
        return teacherService.searchTeachers(name);
    }

    @GetMapping("teachers/page")
    public PageResponse<TeacherResponseDTO> getTeachersByPage(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        if (page < 0) {
            throw new IllegalArgumentException(
                    "Page number cannot be negative");
        }

        if (size <= 0) {
            throw new IllegalArgumentException(
                    "Page size must be greater than 0");
        }

        return teacherService.readTeachers(
                page, size, sortBy, direction);
    }
}
