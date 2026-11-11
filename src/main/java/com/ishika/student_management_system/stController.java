package com.ishika.student_management_system;


import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins={"http://localhost:3000",
        "https://student-management-system-lime-eta.vercel.app"
})
public class stController {

//   StudentService studentService = new StudentServiceImpl();
    //Dependency Injection
    @Autowired
    StudentService studentService;

    @GetMapping("students/page")
    public PageResponse getStudentsByPage(
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
        return studentService.readStudents(
                page, size, sortBy, direction);
    }

    @GetMapping("students")
    public List<StudentResponseDTO> getAllStudents(
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        return studentService.readStudents(sortBy, direction);
    }

    @GetMapping("students/{id}")
    public StudentResponseDTO getStudentsById(@PathVariable Long id){
        System.out.println("Yes");
        return studentService.readStudent(id);
    }

    @PostMapping("students")
        public String createStudent(@Valid @RequestBody StudentRequestDTO student){
//        students.add(student);
       return studentService.createStudent(student);
    }
    @DeleteMapping("students/{id}")
    public String deleteStudent(@PathVariable Long id){
        if(studentService.deleteStudent(id))
            return "Delete Successfully!";
        return "Not Found";
    }
    @PutMapping("students/{id}")
    public String putMethodName(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }
    @GetMapping("students/search")
    public List<StudentResponseDTO> searchStudents(@RequestParam String name) {
        return studentService.searchStudents(name);
    }
}
