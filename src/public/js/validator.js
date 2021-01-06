var selectorRules = {};

function Validator(options) {
    // Get Element form
    var formElement = document.querySelector(options.form);

    if(formElement) {
        formElement.onsubmit = function (e) {
            e.preventDefault();
        }

        options.rules.forEach(rule => {

            //Lưu lại các rules cho mỗi input.
            var inputElement = formElement.querySelector(rule.selector);

            if (Array.isArray(selectorRules[inputElement.name])) {
                selectorRules[inputElement.name].push(rule.test);
            } else {
                selectorRules[inputElement.name] = [rule.test];
            }
        });
    }
    
};

function validate (inputElement) {
    //var errorMessage = rule.test(inputElement.value);
    var errorMessage = '';
    var tests = selectorRules[inputElement.name]
    
    for(var i=0; i<tests.length; i++) {
        errorMessage = tests[i](inputElement.value);
        if(errorMessage) break;
    };

    return errorMessage;
   
}


// Define Rules
// Nguyên tắc Rules:
// 1.  Khi có lỗi thì trả ra message lỗi
// 2.  Khi hợp lệ thì trả ra 'undefine'
Validator.isRequired = function(selector, errMess) {
    return {
        selector,
        test: function (value) {
            return value.trim() ? undefined : errMess
        }
    }
}

Validator.isEmail = function(selector, errMess) {
     return {
        selector,
        test: function (value) {
           var regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
           return regex.test(value) ? undefined : errMess;
        }
    }
}

Validator.isPhone = function(selector, errMess) {
    return {
       selector,
       test: function (value) {
          var regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
          return regex.test(value) ? undefined : errMess;
       }
   }
}

Validator.minLength = function(selector, length, errMess) {
    return {
        selector,
        test: function (value) {
            return value.length >= length || value.length == 0 ? undefined : errMess;
        }
    }
}

Validator.match = function(selector, matchSelector, errMess) {
    return {
        selector,
        test: function (value) {
            var matchValue = document.querySelector(matchSelector).value;
            return value == matchValue ? undefined : errMess;
        }
    }
}

Validator.notSame = function(selector, notSameSelector, errMess) {
    return {
        selector,
        test: function (value) {
            var notSameValue = document.querySelector(notSameSelector).value;
            return value != notSameValue ? undefined : errMess;
        }
    }
}