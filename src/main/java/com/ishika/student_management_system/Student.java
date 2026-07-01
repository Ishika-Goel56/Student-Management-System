package com.ishika.student_management_system;

import lombok.Data;

@Data
public class Student {
    private Long id;
    private String name;
    private String email;
    private String course;
}
