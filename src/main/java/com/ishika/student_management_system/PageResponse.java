package com.ishika.student_management_system;

import lombok.Data;
import java.util.List;

@Data
public class PageResponse<T> {

    private List<T> content;
    private int currentPage;
    private int pageSize;
    private long totalElements;
    private int totalPages;
}