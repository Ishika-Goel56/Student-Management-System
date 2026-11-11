package com.ishika.student_management_system;

import lombok.Data;

@Data
public class CourseResponseDTO {

    private Long id;
    private String name;
    private String duration;
    private String description;
}