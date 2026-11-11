package com.ishika.student_management_system;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherServiceImpl implements TeacherService {

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public String createTeacher(TeacherRequestDTO teacher) {

        TeacherEntity teacherEntity = new TeacherEntity();

        BeanUtils.copyProperties(teacher, teacherEntity);

        teacherRepository.save(teacherEntity);

        return "Teacher saved successfully!";
    }

    @Override
    public List<TeacherResponseDTO> readTeachers(String sortBy, String direction) {

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        List<TeacherEntity> teachers = teacherRepository.findAll(sort);

        List<TeacherResponseDTO> response = new ArrayList<>();

        for (TeacherEntity teacher : teachers) {

            TeacherResponseDTO dto = new TeacherResponseDTO();

            BeanUtils.copyProperties(teacher, dto);

            response.add(dto);
        }

        return response;
    }

    @Override
    public TeacherResponseDTO readTeacher(Long id) {

        TeacherEntity teacherEntity = teacherRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Teacher not found with id: " + id
                        ));

        TeacherResponseDTO teacher = new TeacherResponseDTO();

        BeanUtils.copyProperties(teacherEntity, teacher);

        return teacher;
    }

    @Override
    public String updateTeacher(Long id, TeacherRequestDTO teacher) {

        TeacherEntity existingTeacher =
                teacherRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Teacher not found with id: " + id
                                ));

        existingTeacher.setName(teacher.getName());
        existingTeacher.setEmail(teacher.getEmail());
        existingTeacher.setSubject(teacher.getSubject());

        teacherRepository.save(existingTeacher);

        return "Teacher updated successfully!";
    }

    @Override
    public boolean deleteTeacher(Long id) {

        TeacherEntity teacher =
                teacherRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Teacher not found with id: " + id
                                ));

        teacherRepository.delete(teacher);

        return true;
    }

        @Override
        public List<TeacherResponseDTO> searchTeachers(String name) {

            List<TeacherEntity> teachers =
                    teacherRepository.findByNameContainingIgnoreCase(name);

            List<TeacherResponseDTO> response = new ArrayList<>();

            for (TeacherEntity teacher : teachers) {

                TeacherResponseDTO dto = new TeacherResponseDTO();

                BeanUtils.copyProperties(teacher, dto);

                response.add(dto);
            }

            return response;
        }

            @Override
            public PageResponse<TeacherResponseDTO> readTeachers(
            int page, int size, String sortBy, String direction) {

                Sort sort = direction.equalsIgnoreCase("desc")
                        ? Sort.by(sortBy).descending()
                        : Sort.by(sortBy).ascending();

                Pageable pageable = PageRequest.of(page, size, sort);

                Page<TeacherEntity> teacherPage =
                        teacherRepository.findAll(pageable);

                List<TeacherResponseDTO> response = new ArrayList<>();

                for (TeacherEntity teacher : teacherPage.getContent()) {

                    TeacherResponseDTO dto = new TeacherResponseDTO();

                    BeanUtils.copyProperties(teacher, dto);

                    response.add(dto);
                }

                PageResponse<TeacherResponseDTO> pageResponse = new PageResponse<>();

                pageResponse.setContent(response);
                pageResponse.setCurrentPage(teacherPage.getNumber());
                pageResponse.setPageSize(teacherPage.getSize());
                pageResponse.setTotalElements(teacherPage.getTotalElements());
                pageResponse.setTotalPages(teacherPage.getTotalPages());

                return pageResponse;
            }
    }

