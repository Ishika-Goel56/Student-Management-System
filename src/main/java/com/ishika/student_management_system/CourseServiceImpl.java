package com.ishika.student_management_system;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public String createCourse(CourseRequestDTO course) {

        CourseEntity courseEntity = new CourseEntity();

        BeanUtils.copyProperties(course, courseEntity);

        courseRepository.save(courseEntity);

        return "Course saved successfully!";
    }

    @Override
    public List<CourseResponseDTO> readCourses() {

        List<CourseEntity> courseList =
                courseRepository.findAll();

        List<CourseResponseDTO> response =
                new ArrayList<>();

        for (CourseEntity courseEntity : courseList) {

            CourseResponseDTO course =
                    new CourseResponseDTO();

            BeanUtils.copyProperties(courseEntity, course);

            response.add(course);
        }

        return response;
    }

    @Override
    public CourseResponseDTO readCourse(Long id) {

        CourseEntity courseEntity =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found with id: " + id
                                ));

        CourseResponseDTO course =
                new CourseResponseDTO();

        BeanUtils.copyProperties(courseEntity, course);

        return course;
    }

    @Override
    public String updateCourse(
            Long id,
            CourseRequestDTO course) {

        CourseEntity existingCourse =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found with id: " + id
                                ));

        existingCourse.setName(course.getName());
        existingCourse.setDuration(course.getDuration());
        existingCourse.setDescription(course.getDescription());

        courseRepository.save(existingCourse);

        return "Course updated successfully!";
    }

    @Override
    public boolean deleteCourse(Long id) {

        CourseEntity course =
                courseRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Course not found with id: " + id
                                ));

        courseRepository.delete(course);

        return true;
    }

    @Override
    public List<CourseResponseDTO> searchCourses(String name) {

        List<CourseEntity> courseList =
                courseRepository.findByNameContainingIgnoreCase(name);

        List<CourseResponseDTO> response =
                new ArrayList<>();

        for (CourseEntity courseEntity : courseList) {

            CourseResponseDTO course =
                    new CourseResponseDTO();

            BeanUtils.copyProperties(courseEntity, course);

            response.add(course);
        }

        return response;
    }

    @Override
    public List<CourseResponseDTO> readCourses(
            String sortBy,
            String direction) {

        List<String> allowedFields =
                List.of("id", "name", "duration", "description");

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

        List<CourseEntity> courseList =
                courseRepository.findAll(sort);

        List<CourseResponseDTO> response =
                new ArrayList<>();

        for (CourseEntity courseEntity : courseList) {

            CourseResponseDTO course =
                    new CourseResponseDTO();

            BeanUtils.copyProperties(courseEntity, course);

            response.add(course);
        }

        return response;
    }

    @Override
    public PageResponse<CourseResponseDTO> readCourses(
            int page,
            int size,
            String sortBy,
            String direction) {

        List<String> allowedFields =
                List.of("id", "name", "duration", "description");

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

        Page<CourseEntity> coursePage =
                courseRepository.findAll(pageRequest);

        List<CourseResponseDTO> courses =
                new ArrayList<>();

        for (CourseEntity courseEntity :
                coursePage.getContent()) {

            CourseResponseDTO course =
                    new CourseResponseDTO();

            BeanUtils.copyProperties(courseEntity, course);

            courses.add(course);
        }

        PageResponse<CourseResponseDTO> response =
                new PageResponse<>();

        response.setContent(courses);
        response.setCurrentPage(coursePage.getNumber());
        response.setPageSize(coursePage.getSize());
        response.setTotalElements(coursePage.getTotalElements());
        response.setTotalPages(coursePage.getTotalPages());

        return response;
    }
}
