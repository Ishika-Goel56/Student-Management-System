import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
    const [loading, setLoading] = useState(true);
    const [teachers, setTeachers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const response = await fetch("http://localhost:8080/teachers");

                if (!response.ok) {
                    throw new Error("Failed to fetch teachers");
                }

                const data = await response.json();
                setTeachers(data);
            } catch (error) {
                console.error("Error fetching teachers:", error);
            }

            setLoading(false);
        };

        fetchData();
    }, []);

    const deleteTeacher = async (e, id) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:8080/teachers/${id}`,
                { method: "DELETE" }
            );

            if (!response.ok) {
                throw new Error("Failed to delete teacher");
            }

            setTeachers((previousTeachers) =>
                previousTeachers.filter((teacher) => teacher.id !== id)
            );
        } catch (error) {
            console.error("Error deleting teacher:", error);
            alert("Unable to delete teacher.");
        }
    };

    const editTeacher = (e, id) => {
        e.preventDefault();
        navigate(`/editTeacher/${id}`);
    };

    return (
        <div>
            <div className="container">
                <button
                    onClick={() => navigate("/addTeacher")}
                    className="add-btn"
                >
                    Add Teacher 👤
                </button>

                <table>
                    <thead>
                    <tr>
                        <th>NAME</th>
                        <th>SUBJECT</th>
                        <th>EMAIL ID</th>
                        <th>ACTIONS</th>
                    </tr>
                    </thead>

                    {!loading && (
                        <tbody>
                        {teachers.map((teacher) => (
                            <tr key={teacher.id}>
                                <td>{teacher.name}</td>
                                <td>{teacher.subject}</td>
                                <td>{teacher.email}</td>
                                <td>
                                    <button
                                        onClick={(e) =>
                                            editTeacher(e, teacher.id)
                                        }
                                        className="edit-btn"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={(e) =>
                                            deleteTeacher(e, teacher.id)
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
            </div>
        </div>
    );
};

export default Teacher;
