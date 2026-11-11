package com.ishika.student_management_system;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CourseRequestDTO {

    @NotBlank(message = "Course name is required")
    @Size(min = 2, max = 100,
            message = "Course name must be between 2 and 100 characters")
    private String name;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotBlank(message = "Description is required")
    private String description;
}