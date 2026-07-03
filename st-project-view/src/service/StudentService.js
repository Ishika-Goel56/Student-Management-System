import axios from 'axios'

const STUDENT_S_API_BASE_URL = "https://student-management-system-production-31a0.up.railway.app/students"
class StudentService{
    saveStudent(student){
        return axios.post(STUDENT_S_API_BASE_URL, student)
    }

    getStudents(){
        return axios.get(STUDENT_S_API_BASE_URL)
    }

    getStudentById(id){
        return axios.get(STUDENT_S_API_BASE_URL+"/"+id)
    }

    deleteStudentById(id){
        return axios.delete(STUDENT_S_API_BASE_URL+"/"+id)
    }

    updateStudent(student, id){
        return axios.put(STUDENT_S_API_BASE_URL+"/"+id, student)
    }
}

const studentService = new StudentService()
export default studentService;