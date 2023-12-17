//function Submit(event) {
//    event.preventDefault();
//    var oldPassword = $('#oldPassword').val();
//    var newPassword = $('#newPassword').val();
//    var confirmPassword = $('#confirmPassword').val();

//    if (oldPassword == '') {
//        document.querySelector('span[data-valmsg-for="oldPassword"]').classList.add('text-danger');
//    } else if (newPassword == '') {
//        Swal.fire('New Password is required.')
//    } else if (confirmPassword == '') {
//        Swal.fire('Confirm Password is required.')
//    } else if (newPassword != confirmPassword) {
//        Swal.fire('New password and confirm password must be the same')
//    } else {
//        document.getElementById('Password-form').submit();
//    }
//}
const phoneValueInput = document.getElementById('phone');
phoneValueInput.addEventListener('input', function () {
    let phoneValue = phoneValueInput.value.trim();
    if (phoneValue.length > 90) {
        phoneValue = phoneValue.slice(0, 90);
    }
    phoneValueInput.value = phoneValue.replace(/\D/g, '');
});