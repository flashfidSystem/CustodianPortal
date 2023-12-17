$(document).ready(function () {

    $('#view-form').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        var isValid = true;

        $('#certCheck input').not('#debitCreditNoteNo').each(function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('#certCheck input').not('#debitCreditNoteNo').each(function () {
            var field = $(this);

            field.on('change', function () {
                var fieldValue = field.val().trim();

                if (fieldValue === '') {
                    isValid = false;
                    field.addClass('is-invalid');
                } else {
                    field.removeClass('is-invalid');
                }
            });
        });


        if (isValid) {

            const form = document.getElementById('view-form');

            // Loop through all input fields and disable them
            const inputs = form.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].readOnly = true;
            }

            var button = document.getElementById('sub');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';


            form.submit();

        }
    });


    var base64PDF = document.getElementById('certificate').textContent.trim(); 

    if (base64PDF !== "") {
        Swal.fire({
            title: `Certificate`,
            html: `
                                    <div>
                                        <iframe src="data:application/pdf;base64,${base64PDF}" width="100%" height="380px"></iframe>
                                    </div>
                                    <div style="text-align: center; margin-top: 20px;">
                                        <a href="data:application/pdf;base64,${base64PDF}" download="document.pdf" class="btn btn-primary">Download</a>
                                    </div>
                                    `,
            width: 500,
            showCloseButton: true,
            showConfirmButton: false,
            allowOutsideClick: false,
            allowEscapeKey: false,
        });
    }

});
