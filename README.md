# 🎓 Student Management System

A full-stack Student Management System built using **Java, Spring Boot, React, and MySQL**.
This application allows users to perform CRUD (Create, Read, Update, Delete) operations on student records through a responsive and 
user-friendly interface.

## 📌 Features

- ➕ Add a new student
- 📋 View all students
- ✏️ Update student details
- 🗑️ Delete student records
- 🔍 Search and manage student information
- 🌐 RESTful API integration
- 💻 Responsive user interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios
- Bootstrap

### Backend
- Java 17
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven

### Database
- MySQL

### Tools & Technologies
- Git
- GitHub
- IntelliJ IDEA
- Postman

## 📂 Project Structure

```
student-management-system/
│
├── src/                    # Spring Boot Backend
├── st-project-view/        # React Frontend
├── pom.xml
├── mvnw
├── mvnw.cmd
├── test.http
└── README.md
```

## ⚙️ Installation & Setup

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/student-management-system.git
```

### Backend Setup

1. Open the project in IntelliJ IDEA or Eclipse.
2. Configure MySQL in `application.properties`.

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/studentdb
spring.datasource.username=YOUR-USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

3. Run the Spring Boot application.

---

### Frontend Setup

Navigate to the React project:

```bash
cd st-project-view
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm start
```

Frontend URL:

```
http://localhost:3000
```

Backend URL:

```
http://localhost:8080
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get student by ID |
| POST | `/students` | Add a new student |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

---

## 🎯 Learning Outcomes

- Developed a full-stack web application using Spring Boot and React.
- Implemented REST APIs for CRUD operations.
- Integrated MySQL with Spring Data JPA.
- Connected frontend and backend using Axios.
- Practiced version control using Git and GitHub.

---

## 🚀 Future Enhancements

- User authentication and authorization
- Role-based access control
- Student search and filtering
- Pagination
- File upload for student profile pictures
- Email notifications
- Dashboard with analytics

---

## 👩‍💻 Author

**Ishika Goel**

GitHub: https://github.com/Ishika-Goel56

---

⭐ If you found this project helpful, consider giving it a star!
