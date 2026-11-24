import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddStudent.css";

const UpdateCourse = () => {
    const [course, setCourse] = useState({
        name: "",
        duration: "",
        description: "",
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await fetch(
                    `https://student-management-system-api-mwmx.onrender.com/courses/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch course");
                }

                const data = await response.json();

                setCourse({
                    name: data.name || "",
                    duration: data.duration || "",
                    description: data.description || "",
                });
            } catch (error) {
                console.error("Error fetching course:", error);
                alert("Unable to load course details.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setCourse((previousCourse) => ({
            ...previousCourse,
            [name]: value,
        }));
    };

    const updateCourse = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://student-management-system-api-mwmx.onrender.com/courses/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(course),
                }
            );

            if (!response.ok) {
                const message = await response.text();
                throw new Error(message || "Failed to update course");
            }

            alert("Course updated successfully!");
            navigate("/courses");
        } catch (error) {
            console.error("Error updating course:", error);
            alert("Unable to update course. Please check the entered details.");
        }
    };

    if (loading) {
        return <p>Loading course details...</p>;
    }

    return (
        <div className="student-container">
            <div className="student-title">
                <p>Update Course</p>
            </div>

            <form onSubmit={updateCourse}>
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

                    <input
                        type="text"
                        name="duration"
                        value={course.duration}
                        onChange={handleChange}
                        placeholder="Duration"
                        required
                    />

                    <textarea
                        name="description"
                        value={course.description}
                        onChange={handleChange}
                        placeholder="Course Description"
                        required
                    />
                </div>

                <div className="button-container">
                    <button type="submit" className="save-btn">
                        Update
                    </button>

                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={() => navigate("/courses")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCourse;
