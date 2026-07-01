package com.ishika.student_management_system;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;
//    List<Student> students=new ArrayList<>();

    @Override
    public String createStudent(Student student) {
        StudentEntity studentEntity = new StudentEntity();
        BeanUtils.copyProperties(student, studentEntity);

        studentRepository.save(studentEntity);
//        students.add(student);
        return "saved successfully!";
    }

    @Override
    public Student readStudent(Long id) {
        StudentEntity studentEntity =studentRepository.findById(id).get();
        Student student = new Student();
        BeanUtils.copyProperties(studentEntity, student);
        return student;
    }

    @Override
    public List<Student> readStudents() {
        List<StudentEntity> studentList=studentRepository.findAll();
        List<Student> students=new ArrayList<>();

        for(StudentEntity studentEntity : studentList){

            Student st = new Student();
            st.setId(studentEntity.getId());
            st.setName(studentEntity.getName());
            st.setEmail(studentEntity.getEmail());
            st.setCourse(studentEntity.getCourse());

            students.add(st);

        }
        return students;
    }

    @Override
    public boolean deleteStudent(Long id) {
        StudentEntity st =studentRepository.findById(id).get();
        studentRepository.delete(st);
//        students.remove(id);
        return true;
    }

    @Override
    public String updateStudent(Long id, Student student) {
        StudentEntity existingStudent = studentRepository.findById(id).get();
        existingStudent.setEmail(student.getEmail());
        existingStudent.setName(student.getName());
        existingStudent.setCourse(student.getCourse());

        studentRepository.save(existingStudent);
        return "Update Successfully!";
    }
}
