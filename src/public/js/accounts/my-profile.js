
//Function
 getParent = function(element, selector){
    while(element.parentElement) {
        if(element.parentElement.matches(selector)) {
            return element.parentElement
        }
        element = element.parentElement;
    }
}




var oldValue = {};
var txtName = document.querySelector('#name');
var txtEmail = document.querySelector('#email');
var txtPhone = document.querySelector('#phone');
var inputElements = [txtName, txtEmail, txtPhone];

inputElements.forEach(inputElement => {
    oldValue[inputElement.name] = inputElement.value;
    var btns_input = getParent(inputElement, '.form-group').querySelector('.btns-input');
    var errElement = inputElement.parentElement.querySelector('.form-error-message');

    inputElement.oninput = function () {
        errElement.innerHTML = '';
        if (inputElement.value != oldValue[inputElement.name]) {
            btns_input.removeAttribute("hidden");
      
        } else {
            btns_input.setAttribute("hidden", "hidden");
        }
    }

 

    // Set on listener for cancel button
    btns_input.querySelector('.btn-cancel').onclick = function () {
        inputElement.value = oldValue[inputElement.name];
        btns_input.setAttribute("hidden", "hidden");
        errElement.innerHTML = '';
    }

    // Set on listener for save button
    btns_input.querySelector('.btn-save').onclick = function () {
        
        var errMess =  validate(inputElement);
        if(errMess) {
            errElement.innerHTML = errMess;
            return;
        }

        var data = {};
        data[inputElement['name']] = inputElement['value'];
    
        $.getJSON ('/api/accounts/edit-my-profile',
        {
            [inputElement['name']] : inputElement['value'],            
        },
        function(result) {
            inputElement['value'] = result[inputElement['name']];
            if(result[inputElement['name']] != "Error") {

                oldValue[inputElement.name] = inputElement.value;
                btns_input.setAttribute("hidden", "hidden");
            }
        })
    }
})

// Function change password.
var notificaton = document.querySelector('#notification-pass');
var txtPassword = document.querySelector('#current-password');
var txtNewPassword = document.querySelector('#new-password');
var txtPasswordConfirm = document.querySelector('#confirm-new-password');
var passwordElements = [txtPassword, txtNewPassword, txtPasswordConfirm];

passwordElements.forEach(passwordElement => {
    var errElement = passwordElement.parentElement.querySelector('.form-error-message');

    passwordElement.onblur = function() {
        if(passwordElement.value == '') {
            return;
        }
        var errMess = validate(passwordElement);
        if (errMess) {
            errElement.innerHTML = errMess;
        } else {
            errElement.innerHTML = '';
        }
    } 
    passwordElement.oninput = function() {
        errElement.innerHTML = '';
    } 
    passwordElement.onfocus = function() {
        notificaton.classList.remove('success');
        notificaton.classList.remove('fail');
        notificaton.innerHTML = '';
    }                 
})




document.querySelector('#btn-change-password').onclick = function () {
    var isValid = true;

    passwordElements.forEach(passwordElement => {
        var errMess = validate(passwordElement);
        var errElement = passwordElement.parentElement.querySelector('.form-error-message');

        if (errMess) {
            errElement.innerHTML = errMess;
            isValid = false;
        } else {
            errElement.innerHTML = '';
        }
                    
    })

    if(isValid) {
        var formValues = passwordElements.reduce(function (values, input) {
            values[input.name] = input.value;
            return values;
        }, {});
        
        $.getJSON ('/api/accounts/edit-my-password',
        {
            formValues,            
        },
        function(result) {
            if(result.isSuccess) {
                notificaton.classList.remove('fail');
                notificaton.classList.add('success');
                notificaton.innerHTML = 'Success! Your Password has been changed!';
            } else {
                notificaton.classList.remove('success');
                notificaton.classList.add('fail');
                notificaton.innerHTML = result.message;
            }
        })
    }
}

// Function change avater.
var btnSaveAvt = document.querySelector('.btn-save-avt');
var formData = new FormData();
var spinnerSave = document.querySelector('.spinner-border');
const logo_avt = document.getElementById('logo-avt');

btnSaveAvt.onclick = function() {
    spinnerSave.removeAttribute("hidden");
    btnDeleteImg.setAttribute("hidden", "hidden");
    imgPreview.style.opacity = "0.6";

    formData.set("avt_img", files[0]);
    console.log(formData);  
    $.ajax({
        method: "POST",
        type: "POST",
        data: formData,
        url: "/api/accounts/edit-my-avatar",
        contentType: false,
        processData: false,
        headers: { "X-CSRF-Token": $("meta[name='csrf-token']").attr("content") },
        success: function (data) {
            if(data.isSuccess) {
                completeSaveAvt(true);
            } else {
                completeSaveAvt(false);
            }
        },
        error: function (data) {
            completeSaveAvt(false);
        }
      });
}

completeSaveAvt = (isSuccess) => {
    btnDeleteImg.removeAttribute("hidden");
    imgPreview.style.opacity = "1";
    spinnerSave.setAttribute("hidden", "hidden");
    if(!isSuccess) {
        imgPreview.src = currentImg;
        fileInput.value = '';
    } else {
        currentImg = srcImgTemp;
        logo_avt.src = currentImg;
    }
    btnSaveAvt.setAttribute("hidden", "hidden");
}

