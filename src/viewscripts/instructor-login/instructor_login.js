
// Login for Instructor
document.querySelector('#instructor-login-btn').addEventListener('click', handleInstructorLogin);

async function handleInstructorLogin(e) {
    let username = document.querySelector('#username').value;
    let password = document.querySelector("#password").value;

    try {
        e.disabled = true;

        const body = {
            login: username,
            password: password,
        }

        const response = await fetch('https://e-learn.godesqsites.com/api/instructor/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: "POST",
            body: JSON.stringify(body),
        });

        console.log(response);

        // Check if response is ok (status 200–299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        localStorage.setItem('session', JSON.stringify(data));

        e.disabled = false;

        return location.href = "instructor-dashboard.html";

    } catch (error) {
        toastr.error("Oops! There's an error in login. Please check all the fields.");
        e.disabled = false;
    }
}
