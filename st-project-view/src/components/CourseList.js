import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const response = await fetch("https://student-management-system-api-mwmx.onrender.com/courses");

            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }

            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error("Error fetching courses:", error);
            alert("Unable to load courses. Please check the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const deleteCourse = async (e, id) => {
        e.preventDefault();

        const confirmed = window.confirm(
            "Are you sure you want to delete this course?"
        );

        if (!confirmed) return;

        try {
            const response = await fetch(
                `https://student-management-system-api-mwmx.onrender.com/courses/${id}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to delete course");
            }

            setCourses((previousCourses) =>
                previousCourses.filter((course) => course.id !== id)
            );
        } catch (error) {
            console.error("Error deleting course:", error);
            alert("Unable to delete course.");
        }
    };

    return (
        <div>
            <div className="container">
                <button
                    onClick={() => navigate("/addCourse")}
                    className="add-btn"
                >
                    Add Course 📚
                </button>

                <table>
                    <thead>
                    <tr>
                        <th>COURSE NAME</th>
                        <th>DURATION</th>
                        <th>DESCRIPTION</th>
                        <th>ACTIONS</th>
                    </tr>
                    </thead>

                    {!loading && (
                        <tbody>
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.name}</td>
                                <td>{course.duration}</td>
                                <td>{course.description}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/editCourse/${course.id}`
                                            )
                                        }
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={(e) =>
                                            deleteCourse(e, course.id)
                                        }
                                        className="delete-btn"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    )}
                </table>

                {loading && <p>Loading courses...</p>}

                {!loading && courses.length === 0 && (
                    <p>No courses found. Add your first course!</p>
                )}
            </div>
        </div>
    );
};

export default CourseList;
