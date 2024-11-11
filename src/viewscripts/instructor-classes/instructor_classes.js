const fetchInstructorClasses = async (session) => {
    try {
        const response = await fetch(`https://e-learn.godesqsites.com/api/instructors/${session?.user?.id}/classes`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session?.token}`,
            }
        });

        // Check if response is ok (status 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        displayClasses(data.classes);

        console.log(data);
    } catch (error) {
        toastr.error("Oops! There's an error when fetching classes.");
    }

}

const displayClasses = (classes) => {
    const classesContainer = document.querySelector('.classes-container');
    let output = "";
    classes.forEach(classRoom => {
        output += `<div class="col-lg-4 mt-3" >
                    <a href="classroom-details.html?id=${classRoom.id}">
                        <div class="card classroom-card" style="min-height: 170px;">
                            <div class="card-body">
                                <h5 class="text-start">${classRoom.title}</h5>
                                <h6><span class="fw-bold">Class Code:</span> ${classRoom.class_code}</h6>
                                <h6><span class="fw-bold">Semester:</span> ${classRoom.semester} Sem</h6>
                            </div>
                        </div>
                    </a>
                </div>`;
    })

    classesContainer.innerHTML = output;
}

const session = JSON.parse(localStorage.getItem('session'));
fetchInstructorClasses(session);