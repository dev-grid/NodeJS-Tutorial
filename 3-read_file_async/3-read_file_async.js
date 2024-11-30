const {readFile} = require('fs');

function countStudents(fileName){
    const students = {};
    const fields = {};
    let length = 0; //var, let, const

    return new Promise((resolve, reject) => {
        readFile(fileName, (error, data) => {
            if (error){
                reject(Error('Cannot load the database'));
            } else{
                const lines  = data.toString().split('\n');
                for (let i = 0; i < lines.length; i += 1){
                    if (lines[i]){
                        length += 1;
                        const field = lines[i].toString().split(',');
                        if (Object.prototype.hasOwnProperty.call(students, field[3])){
                            students[field[3]].push(field[0]);
                        }else {
                            students[field[3]] = [field[0]];
                        }
                        if(Object.prototype.hasOwnProperty.call(fields, field[3])){
                            fields[field[3]] += 1;
                        } else {
                            fields[field[3]] = 1;
                        }
                    } 
                }
                const l = length - 1;
                console.log(`Number of students: ${l}`);
                for (const [key, value] of Object.entries(fields) ){
                    if (key !== 'field'){
                        console.log(`Number of students in ${key}: ${value}. List: ${students[key].join(', ')}`);
                    }
                }
                resolve(data);
            }
        })
    });
    // try{
    //     const content = fs.readFileSync(fileName, 'utf-8');
    //     const lines = content.toString().split('\n');
    //     for (let i = 0; i < lines.length; i += 1){
    //         if (lines[i]){
    //             length += 1;
    //             const field = lines[i].toString().split(',');
    //             if (Object.prototype.hasOwnProperty.call(students, field[3])){
    //                 students[field[3]].push(field[0]);
    //             }else {
    //                 students[field[3]] = [field[0]];
    //             }
    //             if(Object.prototype.hasOwnProperty.call(fields, field[3])){
    //                 fields[field[3]] += 1;
    //             } else {
    //                 fields[field[3]] = 1;
    //             }
    //         } 
    //     }
    //     const l = length - 1;
    //     console.log(`Number of students: ${l}`);
    //     for (const [key, value] of Object.entries(fields) ){
    //         if (key !== 'field'){
    //             console.log(`Number of students in ${key}: ${value}. List: ${students[key].join(', ')}`);
    //         }
    //     }
        
    // } catch (error){
    //     throw new Error('Cannot load the database');
    // }
}

module.exports = countStudents;