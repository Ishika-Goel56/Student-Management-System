import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import StudentList from "./components/StudentList";
import AddStudent from "./components/AddStudent";
import UpdateStudent from "./components/UpdateStudent";

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
    </Routes>
    </BrowserRouter>
      </>
  );
}

export default App;
