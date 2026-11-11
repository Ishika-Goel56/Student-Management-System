import React, { useState } from 'react';
import "./AddStudent.css";
import { useNavigate } from "react-router-dom";
import StudentService from '../service/StudentService';

const AddStudent = () => {
    const [student, setStudent] = useState({
        id: "",
        name: "",
        course: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setStudent({ ...student, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = {};

        if (!student.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!student.course.trim()) {
            newErrors.course = "Course is required";
        }

        if (!student.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
            newErrors.email = "Enter a valid email";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveStudent = async (e) => {
        e.preventDefault();

        if (isSaving || !validate()) {
            return;
        }

        setIsSaving(true);

        try {
            const response = await StudentService.saveStudent(student);

            console.log("Saved:", response);
            alert("Student added successfully!");
            navigate("/");

        } catch (error) {
            console.error("Error saving student:", error);

            const serverMessage = error.response?.data;

            let message = "Unable to save student. Please try again.";

            if (!error.response) {
                message = "Backend server is not available. Please try again later.";
            } else if (typeof serverMessage === "string" && serverMessage.trim()) {
                message = serverMessage;
            } else if (serverMessage?.message) {
                message = serverMessage.message;
            } else if (serverMessage?.error) {
                message = serverMessage.error;
            }

            alert(message);

        } finally {
            setIsSaving(false);
        }
    };

    const reset = (e) => {
        e.preventDefault();

        setStudent({
            id: "",
            name: "",
            course: "",
            email: "",
        });

        setErrors({});
    };

    return (
        <div className="student-container">

            <div className="student-title">
                <p>Add New Student</p>
            </div>

            <div className="student-form">

                <input
                    type="text"
                    name="name"
                    value={student.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="text"
                    name="course"
                    value={student.course}
                    onChange={handleChange}
                    placeholder="Course"
                />
                {errors.course && <p className="error">{errors.course}</p>}

                <input
                    type="email"
                    name="email"
                    value={student.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}

            </div>

            <div className="button-container">

                <button
                    type="button"
                    onClick={saveStudent}
                    className="save-btn"
                    disabled={isSaving}
                >
                    {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                    type="button"
                    onClick={reset}
                    className="clear-btn"
                    disabled={isSaving}
                >
                    Clear
                </button>

                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="cancel-btn"
                    disabled={isSaving}
                >
                    Cancel
                </button>

            </div>

        </div>
    );
};

export default AddStudent;

