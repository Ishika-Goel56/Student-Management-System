import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AddStudent.css";

const UpdateTeacher = () => {
    const [teacher, setTeacher] = useState({
        name: "",
        email: "",
        subject: "",
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch existing teacher details
    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await fetch(
                    `https://student-management-system-api-mwmx.onrender.com/teachers/${id}`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch teacher");
                }

                const data = await response.json();

                setTeacher({
                    name: data.name || "",
                    email: data.email || "",
                    subject: data.subject || "",
                });
            } catch (error) {
                console.error("Error fetching teacher:", error);
                alert("Unable to load teacher details.");
            } finally {
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setTeacher((previousTeacher) => ({
            ...previousTeacher,
            [name]: value,
        }));
    };

    // Update teacher details
    const updateTeacher = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `https://student-management-system-api-mwmx.onrender.com/teachers/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(teacher),
                }
            );

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to update teacher");
            }

            alert("Teacher updated successfully!");
            navigate("/teachers");
        } catch (error) {
            console.error("Error updating teacher:", error);
            alert("Unable to update teacher. Please check the entered details.");
        }
    };

    if (loading) {
        return <p>Loading teacher details...</p>;
    }

    return (
        <div className="student-container">
            <div className="student-title">
                <p>Update Teacher</p>
            </div>

            <form onSubmit={updateTeacher}>
                <div className="student-form">
                    <input
                        type="text"
                        name="name"
                        value={teacher.name}
                        onChange={handleChange}
                        placeholder="Name"
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        value={teacher.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />

                    <input
                        type="text"
                        name="subject"
                        value={teacher.subject}
                        onChange={handleChange}
                        placeholder="Subject"
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
                        onClick={() => navigate("/teachers")}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTeacher;