let domElements = {};

function cacheDomElements() {
    domElements.Username = document.getElementById('Username');
    domElements.Password = document.getElementById('Password');
    domElements.BtnLogin = document.getElementById('signin-btn');
}

function configureEventHandlers() {
    domElements.BtnLogin.addEventListener('click', onLoginButtonClickHandle);
}

async function onLoginButtonClickHandle(e) {
    e.preventDefault();

    domElements.BtnLogin.disabled = true;
    domElements.BtnLogin.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';

    const validationResult = executeClientSideValidation();

    if (!validationResult.isSuccess) {
        toastr.error(validationResult.errorMsg);
        domElements.BtnLogin.disabled = false;
        domElements.BtnLogin.innerHTML = 'Login';

        return false;
    }

    try {
        const resp = await executeServerSideValidation(validationResult.formData);

        if (resp.isSuccess) {
            const newLogin = await submitFormData(resp.formData);
            console.log(newLogin);

            if (newLogin.isSuccess) {
                if (newLogin.formData.IsPasswordUpdate == false) {
                    toastr.success("Login successful, Change your password.");
                    window.location.href = '/Profile/changepassword';
                } else {
                    toastr.success("Login successful");
                    window.location.href = '/Dashboard/dashboard_Index';
                }
            } else {
                toastr.error(newLogin.errorMsg);
                domElements.BtnLogin.disabled = false;
                domElements.BtnLogin.innerHTML = 'Login';

                return;
            }
        } else {
            console.log(resp);
            toastr.error(resp.errorMsg);
            domElements.BtnLogin.disabled = false;
            domElements.BtnLogin.innerHTML = 'Login';
        }
    } catch (error) {
        console.error(error.responseJSON.errorMsg);
        toastr.error("An error occurred while processing the request");
        domElements.BtnLogin.disabled = false;
        domElements.BtnLogin.innerHTML = 'Login';
    }
}

function executeClientSideValidation() {
    const returnData = {
        isSuccess: true,
        errorMsg: '',
        formData: {}
    };

    const usernameElement = domElements.Username;
    const passwordElement = domElements.Password;

    const inputedUsername = getInputElementValue(usernameElement);
    const inputedPassword = getInputElementValue(passwordElement);

    if (inputElementIsEmpty(inputedUsername)) {
        returnData.isSuccess = false;
        returnData.errorMsg = "Username field cannot be empty";
        returnData.formData = {};

        return returnData;
    }

    if (inputElementIsEmpty(inputedPassword)) {
        returnData.isSuccess = false;
        returnData.errorMsg = "Password field cannot be empty";
        returnData.formData = {};
        return returnData;
    }

    returnData.formData.userName = inputedUsername;
    returnData.formData.password = inputedPassword;
    return returnData;
}

async function executeServerSideValidation(formData) {
    const returnData = {
        isSuccess: true,
        errorMsg: '',
        formData: {}
    };

    const inputedUsername = formData.userName;
    const inputedPassword = formData.password;
    const formData64 = {
        Username: inputedUsername + ":" + inputedPassword
    };
    const payloadBase64 = btoa(JSON.stringify(formData64));

    try {
        const response = await $.ajax({
            url: '/Validation/LoginPost',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'payloadBase64': payloadBase64
            },
            data: JSON.stringify({ username: inputedUsername })
        });

        if (response.isSuccess) {
            returnData.isSuccess = true;
            returnData.formData = response.formData;
            return returnData;
        } else {
            returnData.isSuccess = false;
            returnData.errorMsg = response.errorMsg;
            return returnData;
        }
    } catch (error) {
        returnData.isSuccess = false;
        returnData.errorMsg = error.responseJSON.errorMsg;
        return returnData;
    }
}

async function submitFormData(data) {
    const formData = {
        Username: data.userName
    };


    const returnData = {
        isSuccess: true,
        errorMsg: '',
        formData: {}
    };

    const token = data.token;

    try {
        const response = await $.ajax({
            url: data.url,
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'HToken': token
            },
            data: JSON.stringify({ Username: formData.Username })
        });

        if (response.isSuccess) {
            returnData.isSuccess = true;
            returnData.formData = response.formData;
            return returnData;
        } else {
            returnData.isSuccess = false;
            returnData.errorMsg = response.errorMsg;
            return returnData;
        }
    } catch (error) {
        returnData.isSuccess = false;
        returnData.errorMsg = error.responseJSON.errorMsg;
        return returnData;
    }
}

function inputElementIsEmpty(value) {
    return value.trim() === '';
}

function getInputElementValue(elem) {
    return elem.value.trim();
}

$(document).ready(function () {
    cacheDomElements();
    configureEventHandlers();
});
