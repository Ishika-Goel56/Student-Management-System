import React, {useEffect, useState} from 'react'
import"./AddStudent.css"
import {useNavigate, useParams} from "react-router-dom";
import StudentService from '../service/StudentService'

const UpdateStudent = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        id: id,
        name:"",
        course:"",
        email:"",
    });

    const handleChange = (e) =>{
        const value = e.target.value;
        setStudent({...student, [e.target.name]: value})
    }

    useEffect(() => {
        const fetchData = async () =>{
            try{
                const response = await StudentService.getStudentById(student.id);
                setStudent(response.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchData();
    }, [id]);

    const updateStudent = (e) => {
        e.preventDefault();
        StudentService.updateStudent(student, id)
            .then((response) => {
                console.log("saved", response);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div className="student-container">
            <div className="student-title">
                <p>Update Student</p>
            </div>
            <div className="student-form">
                <input type='text' name="name" value={student.name}
                       onChange={(e)=> handleChange(e)} placeholder="Name"></input>
                <input type='text' name="course" value={student.course}
                       onChange={(e)=> handleChange(e)} placeholder="Course"></input>
                <input type='email' name='email' value={student.email}
                       onChange={(e)=> handleChange(e)} placeholder="Email"></input>
            </div>

            <div className="button-container">
                <button onClick={updateStudent} className="save-btn">Update</button>
                <button onClick={()=> navigate("/") } className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default UpdateStudent