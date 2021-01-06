const username = document.getElementById('username');
const txtPassword = document.getElementById('password');
const usernameFeedback = document.getElementById('username-feedback');
//check Form validation
username.addEventListener('change', () => {
    if(username.value.length < 6) {
        username.classList.add('is-invalid');
        usernameFeedback.innerHTML = 'Username must be at least 6 charactor';
    }
    else username.classList.remove('is-invalid');
})

txtPassword.addEventListener('change', ()=>{
    if(txtPassword.value.length < 6) txtPassword.classList.add('is-invalid');
    else txtPassword.classList.remove('is-invalid');
})
