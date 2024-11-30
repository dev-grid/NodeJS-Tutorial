import readDatabase from "../utils";

/**
 * List of all supported majors
 */

const VALID_MAJORS = ['CS', 'SWE'];


/**
 * Controller for handling student data
 * @author
 */

class StudentController{
    static getAllstudents(request, response){
        const dataPath = process.argv.length > 2 ? process.argv[2]: '';

        readDatabase(dataPath)
         .then((studentGroups)=>{
            const responseParts = ['This is the list of our students:'];
            const cmpFxn = (a, b) => {
                if (a[0].toLowerCase() < b[0].toLowerCase()){
                    return -1;
                }
                if (a[0].toLowerCase() > b[0].toLowerCase()){
                    return 1;
                }
                return 0;
            };
            for (const [field, group] of Object.entries(studentGroups).sort(cmpFxn)){
                resposeParts.push([
                    'Number of students in ${field} is ${group.length}.',
                    'List:',
                    group.map((student) => student.firstname).join(', '),
                ].join(' '));
            }
            response.status(200).send(responseParts.join('\n'));
         })
         .catch((err) => {
            response
                .status(500)
                .send(err instanceof Error ? err.message : err.toString());
         });
    }
    static getAllStudentsByMajor(request, response){
        const dataPath = process.argv.length > 2 ? process.argv[2]: '';
        const {major} = request.params;


        if(!VALID_MAJORS.includes(major)){
            response.status(500).send('major parameters must be one of CS or SWE');
            return;
        }

        readDatabase(dataPath)
            .then((studentGroups) => {
                const group = studentGroups[major] || [];
                const responseText = `List: ${group.map((student) => student.firstname).join(', ')}`;
                response.status(200).send(responseText);
            })
            .catch((err) => {
                response
                    .status(500)
                    .send(err instanceof Error ? err.message : err.toString());
            });
    }
}

export default StudentController;
module.exports = StudentController;