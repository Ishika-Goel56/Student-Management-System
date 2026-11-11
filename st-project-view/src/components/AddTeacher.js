import React, { useState } from "react";
import "./AddStudent.css";
import { useNavigate } from "react-router-dom";

const AddTeacher = () => {
    const [teacher, setTeacher] = useState({
        name: "",
        email: "",
        subject: "",
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTeacher({ ...teacher, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const validate = () => {
        const newErrors = {};

        if (!teacher.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!teacher.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacher.email)) {
            newErrors.email = "Enter a valid email";
        }

        if (!teacher.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveTeacher = async (e) => {
        e.preventDefault();

        if (isSaving || !validate()) {
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch("http://localhost:8080/teachers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(teacher),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Failed to save teacher");
            }

            alert("Teacher saved successfully!");
            navigate("/teachers");

        } catch (error) {
            console.error("Error saving teacher:", error);

            const message = error.message === "Failed to fetch"
                ? "Backend server is not available. Please try again later."
                : error.message || "Unable to save teacher.";

            alert(message);

        } finally {
            setIsSaving(false);
        }
    };

    const reset = () => {
        setTeacher({
            name: "",
            email: "",
            subject: "",
        });

        setErrors({});
    };

    return (
        <div className="student-container">

            <div className="student-title">
                <p>Add New Teacher</p>
            </div>

            <div className="student-form">

                <input
                    type="text"
                    name="name"
                    value={teacher.name}
                    onChange={handleChange}
                    placeholder="Name"
                />
                {errors.name && <p className="error">{errors.name}</p>}

                <input
                    type="email"
                    name="email"
                    value={teacher.email}
                    onChange={handleChange}
                    placeholder="Email"
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <input
                    type="text"
                    name="subject"
                    value={teacher.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                />
                {errors.subject && <p className="error">{errors.subject}</p>}

            </div>

            <div className="button-container">

                <button
                    type="button"
                    onClick={saveTeacher}
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
                    onClick={() => navigate("/teachers")}
                    className="cancel-btn"
                    disabled={isSaving}
                >
                    Cancel
                </button>

            </div>
        </div>
    );
};

export default AddTeacher;


