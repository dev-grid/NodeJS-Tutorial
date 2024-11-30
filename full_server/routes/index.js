import AppController from '../controllers/AppController';
import StudentController from '../controllers/StudentsController';



const mapRoutes = (app) => {
    app.get('/', AppController.getHomepage);
    app.get('/students', StudentController.getAllStudents);
    app.get('/students/:major', StudentController.getAllStudentsByMajor);
}

export default mapRoutes;
module.exports = mapRoutes;