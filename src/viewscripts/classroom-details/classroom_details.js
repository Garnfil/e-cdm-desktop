const fetchClassRoomDetails = async (class_id) => {
    try {
        const session = JSON.parse(localStorage.getItem('session'));
        const response = await fetch(`https://e-learn.godesqsites.com/api/classes/${class_id}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session?.token}`,
            }
        });

        const data = await response.json();

        displayClassRoomDetails(data.class);
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

const fetchClassStudents = async (class_id) => {
    const session = JSON.parse(localStorage.getItem('session'));
    const response = await fetch(`https://e-learn.godesqsites.com/api/classes/${class_id}/students`, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${session?.token}`,
        }
    });

    const data = await response.json();
    displayListOfStudents(data.students, class_id);
    console.log(data);
}

const displayClassRoomDetails = (classRoom) => {
    const titleText = document.querySelector('#class-title-text');
    const classCodeText = document.querySelector('#class-code-text');
    const currentAssessmentText = document.querySelector('#class-current-assessment-text');
    const semesterText = document.querySelector('#class-semester-text');
    const subjectText = document.querySelector('#class-subject-text');
    const sectionText = document.querySelector('#class-section-text');

    titleText.innerHTML = classRoom.title;
    classCodeText.innerHTML = classRoom.class_code;
    currentAssessmentText.innerHTML = classRoom.current_assessment_category;
    semesterText.innerHTML = classRoom.semester;
    subjectText.innerHTML = classRoom.subject?.title;
    sectionText.innerHTML = classRoom.section?.name;
}

const displayListOfStudents = (students = [], class_id) => {
    const studentsTableTBody = document.querySelector('#students-table tbody');
    let output = "";
    if (students.length > 0) {
        students.forEach(student => {
            output += `<tr>
                            <td>${student.firstname} ${student.lastname}</td>
                            <td>85.3%</td>
                            <td><a href="student-school-work-grade.html?class_id=${class_id}&student_id=${student.id}" 
                                    class="btn btn-primary btn-sm">
                                    View Grade
                                </a>
                            </td>
                        </tr>`;
        })
        studentsTableTBody.innerHTML = output;
    }
}


const url = new URL(window.location.href);  // or a specific URL
const params = new URLSearchParams(url.search);

let class_id = 0;

// Iterate through all parameters
params.forEach((value, key) => {
    if (key == 'id') {
        class_id = value;
    }
});
console.log(class_id);
fetchClassRoomDetails(class_id);
fetchClassStudents(class_id);
