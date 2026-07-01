import React, {useState} from 'react'
import"./AddStudent.css"
import {useNavigate} from "react-router-dom";
import StudentService from '../service/StudentService'

const AddStudent = () => {
    const [student, setStudent] = useState({
        id:"",
        name:"",
        course:"",
        email:"",
    });

    const handleChange = (e) =>{
        const value = e.target.value;
        setStudent({...student, [e.target.name]: value})
    }

    const saveStudent = (e) => {
        e.preventDefault();
        StudentService.saveStudent(student)
            .then((response) => {
                console.log("saved", response);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const reset = (e) => {
        e.preventDefault();
        setStudent({
            id:"",
            name:"",
            course:"",
            email:"",
        })
    }
    const navigate = useNavigate();
    return (
        <div className="student-container">
            <div className="student-title">
                <p>Add New Student</p>
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
                <button onClick={saveStudent} className="save-btn">Save</button>
                <button onClick={reset} className="clear-btn">Clear</button>
                <button onClick={()=> navigate("/") } className="cancel-btn">Cancel</button>
            </div>
        </div>
    );
};

export default AddStudent