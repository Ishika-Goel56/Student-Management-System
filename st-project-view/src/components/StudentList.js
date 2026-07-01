import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import StudentService from "../service/StudentService";

const StudentList = () => {
    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            setLoading(true);
            try{
                const response = await StudentService.getStudents();
                setStudents(response.data);
            }catch(error){
                console.log(error);
            }
            setLoading(false)
        };
        fetchData();
    }, []);

    const deleteStudent=(e, id) => {
        e.preventDefault();
        StudentService.deleteStudentById(id)
            .then(() => {
                if(students) {
                    setStudents((prevElement) => {
                        return prevElement.filter((student) => student.id !== id);
                    })
                }
            })
    };

    const editStudent = (e, id) => {
        e.preventDefault();
        navigate(`/editStudent/${id}`)
    };

    const navigate=useNavigate();
    return (
        <div>
            <div className="container">

                <button onClick={
                    ()=>navigate("/addStudent")} className="add-btn">
                    Add Student 👤
                </button>

                <table>
                    <thead>
                    <tr>
                        <th>NAME</th>
                        <th>COURSE</th>
                        <th>EMAIL ID</th>
                        <th>ACTIONS</th>
                    </tr>
                    </thead>
                    {!loading && (

                    <tbody>
                    {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.name}</td>
                        <td>{student.course}</td>
                        <td>{student.email}</td>
                        <td>
                            <button onClick={(e) => editStudent (e, student.id)} className="edit-btn">Edit</button>
                            <button onClick={(e) => deleteStudent (e, student.id)} className="delete-btn">Delete</button>
                        </td>
                    </tr>
                     ))}

                    </tbody>
                    )}
                </table>

            </div>
        </div>
    )
}

export default StudentList
