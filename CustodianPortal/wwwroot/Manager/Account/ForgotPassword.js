$(document).ready(function () {

    const OTPValueInput = document.getElementById('otpToken');
    OTPValueInput.addEventListener('input', function () {
        let OTPValue = OTPValueInput.value.trim();
        if (OTPValue.length > 90) {
            OTPValue = OTPValue.slice(0, 90);
        }
        OTPValueInput.value = OTPValue.replace(/\D/g, '');
    });


    $('#Send_OTP').click(function () {
        var isValid = true;

        var UserNameInput = $('#UserName');

        var UserName = UserNameInput.val();
        console.log(UserName)
        if (UserName === '') {
            toastr.info('Please input your username');
            isValid = false;
        }
        if (isValid) {
            var button = document.getElementById('Send_OTP');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';


            $.ajax({
                url: '/Account/SendMail',
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                data: { UserName: UserName },
                type: 'POST',
                success: function (result) {

                    console.log(result);

                    if (result.status == 'Success') {
                        Swal.fire(
                            'Custodian Portal',
                            'Please check your mail for OTP.',
                        )

                        var button = document.getElementById('Send_OTP');
                        button.disabled = false;
                        button.innerHTML = 'Resend OTP';
                    } else { 
                        toastr.error(result.message);
                        var button = document.getElementById('Send_OTP');
                        button.disabled = false;
                        button.innerHTML = 'Resend OTP';
                    }




                },
                error: function (xhr, status, error) {
                    toastr.info("Something went wrong.");
                    var button = document.getElementById('Send_OTP');
                    button.disabled = false;
                    button.innerHTML = 'Resend OTP';

                }
            });
        }

    });

    $('#forgotpassword-form').submit(function (event) {
        event.preventDefault();

        const form = document.getElementById('forgotpassword-form');
        var isValid = true;


        if (isValid) {
            var button = document.getElementById('forgotpassword-btn');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';
            form.submit();
        }
    });
});