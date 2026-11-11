package com.ishika.student_management_system;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;
//    List<Student> students=new ArrayList<>();

    @Override
    public String createStudent(StudentRequestDTO student) {
        StudentEntity studentEntity = new StudentEntity();
        BeanUtils.copyProperties(student, studentEntity);

        studentRepository.save(studentEntity);
//        students.add(student);
        return "saved successfully!";
    }

    @Override
    public StudentResponseDTO
    readStudent(Long id) {
        StudentEntity studentEntity =studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id
                        ));
        StudentResponseDTO student = new StudentResponseDTO();
        BeanUtils.copyProperties(studentEntity, student);
        return student;
    }

    @Override
    public List<StudentResponseDTO> readStudents() {
        List<StudentEntity> studentList=studentRepository.findAll();
        List<StudentResponseDTO> students=new ArrayList<>();

        for(StudentEntity studentEntity : studentList){

            StudentResponseDTO student = new StudentResponseDTO();
            BeanUtils.copyProperties(studentEntity, student);
            students.add(student);

        }
        return students;
    }

    @Override
    public boolean deleteStudent(Long id) {
        StudentEntity st =studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id
                        ));
        studentRepository.delete(st);
//        students.remove(id);
        return true;
    }

    @Override
    public String updateStudent(Long id, Student student) {
        StudentEntity existingStudent = studentRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Student not found with id: " + id
                        ));
        existingStudent.setEmail(student.getEmail());
        existingStudent.setName(student.getName());
        existingStudent.setCourse(student.getCourse());

        studentRepository.save(existingStudent);
        return "Update Successfully!";
    }
    @Override
    public List<StudentResponseDTO> searchStudents(String name) {

        List<StudentEntity> studentList =
                studentRepository.findByNameContainingIgnoreCase(name);
        List<StudentResponseDTO> students = new ArrayList<>();
        for (StudentEntity studentEntity : studentList) {
            StudentResponseDTO student = new StudentResponseDTO();
            BeanUtils.copyProperties(studentEntity, student);
            students.add(student);
        }

        return students;
    }
    @Override
    public List<StudentResponseDTO> readStudents(String sortBy, String direction) {

        List<String> allowedFields = List.of("id", "name", "email", "course");
        if (!allowedFields.contains(sortBy)) {
            throw new IllegalArgumentException(
                    "Invalid sort field: " + sortBy
            );
        }

        Sort sort;
        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }
        List<StudentEntity> studentList = studentRepository.findAll(sort);
        List<StudentResponseDTO> students = new ArrayList<>();
        for (StudentEntity studentEntity : studentList) {
            StudentResponseDTO student = new StudentResponseDTO();
            BeanUtils.copyProperties(studentEntity, student);
            students.add(student);
        }

        return students;
    }
    @Override
    public PageResponse<StudentResponseDTO> readStudents(
            int page,
            int size,
            String sortBy,
            String direction) {

        List<String> allowedFields =
                List.of("id", "name", "email", "course");

        if (!allowedFields.contains(sortBy)) {
            throw new IllegalArgumentException(
                    "Invalid sort field: " + sortBy
            );
        }

        Sort sort;
        if (direction.equalsIgnoreCase("desc")) {
            sort = Sort.by(sortBy).descending();
        } else {
            sort = Sort.by(sortBy).ascending();
        }

        PageRequest pageRequest =
                PageRequest.of(page, size, sort);

        Page<StudentEntity> studentPage =
                studentRepository.findAll(pageRequest);

        List<StudentResponseDTO> students = new ArrayList<>();
        for (StudentEntity studentEntity : studentPage.getContent()) {
            StudentResponseDTO student = new StudentResponseDTO();
            BeanUtils.copyProperties(studentEntity, student);
            students.add(student);
        }
        PageResponse<StudentResponseDTO> response = new PageResponse<>();

        response.setContent(students);
        response.setCurrentPage(studentPage.getNumber());
        response.setPageSize(studentPage.getSize());
        response.setTotalElements(studentPage.getTotalElements());
        response.setTotalPages(studentPage.getTotalPages());

        return response;
    }
}
