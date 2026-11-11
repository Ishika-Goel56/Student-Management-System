import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";
import Teacher from "./components/Teacher";
import AddTeacher from "./components/AddTeacher";
import UpdateTeacher from "./components/UpdateTeacher";
import CourseList from "./components/CourseList";
import AddCourse from "./components/AddCourse";
import UpdateCourse from "./components/UpdateCourse";

function App() {
  return (
      <>
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route index element={<StudentList/>} />
      <Route path="/" element={<StudentList/>} />
      <Route path="/addStudent" element={<AddStudent/>} />
      <Route path="/editStudent/:id" element={<UpdateStudent/>} />

      <Route path="/teachers" element={<Teacher />} />
      <Route path="/addTeacher" element={<AddTeacher />} />
      <Route path="/editTeacher/:id" element={<UpdateTeacher />} />

      <Route path="/courses" element={<CourseList />} />
      <Route path="/addCourse" element={<AddCourse />} />
      <Route path="/editCourse/:id" element={<UpdateCourse />} />
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
