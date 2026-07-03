package com.ishika.student_management_system;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins="https://vercel.com/ishika-goel/student-management-system")
public class stController {

//   StudentService studentService = new StudentServiceImpl();
    //Dependency Injection
    @Autowired
    StudentService studentService;

    @GetMapping("students")
        public List<Student> getAllStudents(){

        return studentService.readStudents();
    }
    @GetMapping("students/{id}")
    public Student getStudentsById(@PathVariable Long id){
        System.out.println("Yes");
        return studentService.readStudent(id);
    }

    @PostMapping("students")
        public String createStudent(@RequestBody Student student){
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
    public String putMethodName(@PathVariable Long id, @RequestBody Student student) {
        return studentService.updateStudent(id, student);
    }
}
