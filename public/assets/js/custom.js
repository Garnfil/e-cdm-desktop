let logoutBtn = document.querySelector('#logout-btn');

logoutBtn?.addEventListener('click', function (e) {
    localStorage.removeItem('session');

    location.href = "index.html";
})