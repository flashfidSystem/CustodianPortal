// Setup / editaccount js file


//document.getElementById("Qnext").disabled = true;
$(function () {

    // Show the loading indicator
    function showLoadingIndicator() {
        $('.loading-indicator').removeClass('d-none');
    }

    // Hide the loading indicator
    function hideLoadingIndicator() {
        $('.loading-indicator').addClass('d-none');
    }

    sanitizeInputToAcceptNumbers('#phone');

    sanitizeInputToAcceptNumbersAndAlphabetsWithSpace('#address');




    var Mcom = document.getElementById("Mcom");
    var comm = JSON.parse(Mcom.value);

    // communication mail
    $.fn.email_multiple = function (options) {

        let defaults = {
            reset: false,
            fill: false,
            data: null
        };

        let settings = $.extend(defaults, options);



        let email = "";

        return this.each(function () {
            $(this).after("<span class=\"to-input\"></span>\n" +
                "<div class=\"all-mail\"></div>\n" +
                "<input type=\"text\" name=\"email\" class=\"enter-mail-id form-control\"  style=\"width: 30%\" placeholder=\"Enter communication mail ...\" />");
            let $orig = $(this);
            let $element = $('.enter-mail-id');
            $element.keydown(function (e) {
                $element.css('border', '');
                if (e.keyCode === 13 || e.keyCode === 32) {
                    let getValue1 = $element.val().toLowerCase();
                    var getValue = getValue1.trim();
                    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(getValue)) {
                        $('.all-mail').append('<span class="email-ids">' + getValue + '<span class="cancel-email"><i class="fa fa-times" aria-hidden="true"></i></span></span>');

                        var v = "";
                        $element.val(v.trim());

                        email += getValue + ';'
                        console.log(email);


                        var string = email;
                        var emailArray = string.split(";").filter(Boolean);
                        console.log(emailArray)
                        comm = emailArray;
                        console.log(comm);
                    } else {
                        $element.css('border', '1px solid red')
                    }
                }

                $orig.val(email.slice(0, -1))
            });

            $(document).on('click', '.cancel-email', function () {
                var parentValue = $(this).parent().text().trim();
                $(this).parent().remove();

                console.log(parentValue);

                var elementToRemove = parentValue;

                var index = comm.indexOf(elementToRemove);
                if (index !== -1) {
                    comm.splice(index, 1);
                }

                //
                var emailToRemove = elementToRemove;

                // Split the string into an array of email addresses
                var emailArray = email.split(';');

                // Find the index of the email address to remove
                var index = emailArray.indexOf(emailToRemove);
                if (index !== -1) {
                    // Remove the email address from the array
                    emailArray.splice(index, 1);
                }

                // Join the remaining email addresses back into a string
                email = emailArray.join(';');
                console.log(comm);
                console.log(email);
            });

            if (settings.data) {
                $.each(settings.data, function (x, y) {
                    if (/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(y)) {
                        $('.all-mail').append('<span class="email-ids">' + y + '<span class="cancel-email">x</span></span>');
                        $element.val('');

                        email += y + ';'
                    } else {
                        $element.css('border', '1px solid red')
                    }
                })

                $orig.val(email.slice(0, -1))
            }

            if (settings.reset) {
                $('.email-ids').remove()
            }

            return $orig.hide()
        });
    };


    $("#communicationMails").email_multiple({
        data: comm
    })

    // trim communication mail input
    $('#communicationMails').focus(function () {
        var inputValue = $(this).val();
        var trimmedValue = inputValue.trim();
        $(this).val(trimmedValue);
    });

    $('#EditAccount-form').submit(function (event) {
        event.preventDefault();
        var isValid = true;

        $('#ValidateInput input, #ValidateInput select').not('#communicationMails').each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();

            

            if ($(this).attr('id') === 'address') {
                if (fieldValue === '') {
                    field.addClass('is-invalid');
                    isValid = false;
                } else {
                    field.removeClass('is-invalid');
                }
            }

            if ($(this).attr('type') === 'email') {
                var isValidEmail = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(fieldValue);
                if (!isValidEmail) {
                    isValid = false;
                    field.addClass('is-invalid');
                } else {
                    field.removeClass('is-invalid');
                }
            }

            if ($(this).attr('id') === 'phone') {
                if (fieldValue.length !== 11) {
                    isValid = false;
                    field.addClass('is-invalid');
                } else {
                    field.removeClass('is-invalid');
                }
            }


        });


        // Attach event listeners for change events on fields
        $('#ValidateInput input, #ValidateInput select').not('#communicationMails').on('change', function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                $(this).addClass('is-invalid');
                isValid = false;
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        if (comm.length === 0) {
            $('#communicationMails').addClass('is-invalid');
            isValid = false;
            toastr?.info("Please add at least one communication mail.");
        }
        if (isValid) {
            const form = document.getElementById('EditAccount-form');
            const values2 = comm;
            const hiddenInput2 = document.createElement('input');
            hiddenInput2.type = 'hidden';
            hiddenInput2.name = 'commData';
            hiddenInput2.value = JSON.stringify(values2);
            form.appendChild(hiddenInput2);

            // Disable input fields and select elements
            const inputs = form.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].readOnly = true;
            }
            const select = form.getElementsByTagName('select');
            for (let i = 0; i < select.length; i++) {
                select[i].readOnly = true;
            }

            var button = document.getElementById('sub');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';
            form.submit();
        }
    });

});












