package com.ishika.student_management_system;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="student_db")
public class StudentEntity {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String course;
}
