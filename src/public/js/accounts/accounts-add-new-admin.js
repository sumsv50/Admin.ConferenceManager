const txtUsername = document.getElementById('username');
const txtPassword = document.getElementById('password');
const txtPassword2 = document.getElementById('password2');
const username_feedback = document.getElementById('username-feedback');

//Check Form validation
txtUsername.addEventListener('change', ()=>{
    if(txtUsername.value.length < 6) {
        txtUsername.classList.add('is-invalid');
        username_feedback.innerHTML = 'Username must be at least 6 charactor';
    } else {
        isExist(txtUsername.value);
    } 
    
    //txtUsername.classList.remove('is-invalid');
})

txtPassword.addEventListener('input', ()=>{
    if(txtPassword.value.length < 6) txtPassword.classList.add('is-invalid');
    else
    {
        txtPassword.classList.remove('is-invalid');
        if(txtPassword2.value.length>0 && txtPassword.value != txtPassword2.value)
            txtPassword2.classList.add('is-invalid');
        else txtPassword2.classList.remove('is-invalid');
    }
})

txtPassword2.addEventListener('input', ()=>{
    if(txtPassword2.value.length>0 && txtPassword.value != txtPassword2.value) txtPassword2.classList.add('is-invalid');
    else txtPassword2.classList.remove('is-invalid');
})


// Check username is exist
isExist = (username) => {
    $.getJSON ('/api/accounts/is-exist', {username}, function(result) {
        if(result.isExist) {
            txtUsername.classList.add('is-invalid');
            username_feedback.innerHTML = 'Username is already taken!';
        } else {
            txtUsername.classList.remove('is-invalid');
        }
    })
}

// View không sử dụng button này
var btnSaveAvt = undefined;