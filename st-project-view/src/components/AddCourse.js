import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddStudent.css";

const AddCourse = () => {
    const [course, setCourse] = useState({
        name: "",
        duration: "",
        description: "",
    });

    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCourse((previousCourse) => ({
            ...previousCourse,
            [name]: value,
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!course.name.trim()) {
            newErrors.name = "Course name is required";
        } else if (course.name.trim().length < 2) {
            newErrors.name = "Course name must have at least 2 characters";
        }

        if (!course.duration.trim()) {
            newErrors.duration = "Duration is required";
        }

        if (!course.description.trim()) {
            newErrors.description = "Description is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveCourse = async (e) => {
        e.preventDefault();

        if (isSaving || !validate()) {
            return;
        }

        setIsSaving(true);

        try {
            const response = await fetch("https://student-management-system-api-mwmx.onrender.com/courses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(course),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Failed to save course");
            }

            alert("Course added successfully!");
            navigate("/courses");

        } catch (error) {
            console.error("Error saving course:", error);

            const message = error.message === "Failed to fetch"
                ? "Backend server is not available. Please try again later."
                : error.message || "Unable to add course.";

            alert(message);

        } finally {
            setIsSaving(false);
        }
    };

    const clearForm = () => {
        setCourse({
            name: "",
            duration: "",
            description: "",
        });

        setErrors({});
    };

    return (
        <div className="student-container">

            <div className="student-title">
                <p>Add New Course</p>
            </div>

            <form onSubmit={saveCourse}>

                <div className="student-form">

                    <input
                        type="text"
                        name="name"
                        value={course.name}
                        onChange={handleChange}
                        placeholder="Course Name"
                        minLength={2}
                        maxLength={100}
                        required
                    />

                    {errors.name && (
                        <p className="error">{errors.name}</p>
                    )}

                    <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g. 6 Months)"
                        required
                    />

                    {errors.duration && (
                        <p className="error">{errors.duration}</p>
                    )}

                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Course Description"
                        required
                    />

                    {errors.description && (
                        <p className="error">{errors.description}</p>
                    )}

                </div>

                <div className="button-container">

                    <button
                        type="submit"
                        className="save-btn"
                        disabled={isSaving}
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={clearForm}
                        className="clear-btn"
                        disabled={isSaving}
                    >
                        Clear
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/courses")}
                        className="cancel-btn"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>

                </div>
            </form>
        </div>
    );
};

export default AddCourse;
