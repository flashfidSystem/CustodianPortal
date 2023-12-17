$(document).ready(function () {


    $('#tbbroker').DataTable();


    
    sanitizeInputToAcceptAlphabets('.lastName'); 
    sanitizeInputToAcceptNumbersAndAlphabetsWithSpace('.firstName'); 
    sanitizeInputToAcceptNumbers('.phoneNumber'); 
    sanitizeInputToAcceptNumbersAndAlphabetsWithSpace('.address'); 
    sanitizeInputToAcceptNumbersAndAlphabets('.userName');
    sanitizeInputToTaxID('.taxId');



    $(".CustomerTypeByLastName").hide();
    $(".CustomerTypeByFirstName").hide();
    $(".CustomerTypeByDOB").hide();

    function handleCustomerType() {
        var customerType = $(".customerType").val();
        var fn = $(".firstName").val(); // Select elements with class "firstName"
        var ln = $(".lastName").val(); // Select elements with class "lastName"

        if (customerType == 'Corporate') {
            $(".CustomerTypeByFirstName").show();
            $('.LName').text('Company Name:');
            $(".firstName").val('');
            $(".firstName").val(fn); // Update all elements with class "firstName"
            $(".lastName").val(''); // Clear all elements with class "lastName"
            $(".CustomerTypeByLastName").hide();
            $(".CustomerTypeByDOB").hide();
        } else if (customerType == 'Individual') {
            $(".CustomerTypeByFirstName").show();
            $('.LName').text('First Name:');
            $(".firstName").val('');
            $(".firstName").val(fn);
            $(".lastName").val(ln);
            $(".CustomerTypeByLastName").show();
            $(".CustomerTypeByDOB").show();
        } else {
            $(".CustomerTypeByDOB").hide();
            $(".CustomerTypeByLastName").hide();
            $(".CustomerTypeByFirstName").hide();
            $('.LName').text('First Name:');
            $(".lastName").val(''); // Clear all elements with class "lastName"
        }
    }

    // Call the function when the customerType field has a value on load
    if ($(".customerType").val()) {
        handleCustomerType();
    }

    // Bind the function to the change event of the customerType field
    $(".customerType").change(handleCustomerType);

     
    $(function () {
        var dtToday = new Date();

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        $('.dateOfBirth').attr('max', maxDate);
        $('.dateOfBirth2').attr('max', maxDate);
    });

    $(function () {
        var dtToday = new Date();
        dtToday.setFullYear(dtToday.getFullYear() - 18); // Subtract 18 years from the current date

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var maxDate = year + '-' + month + '-' + day;
        $('#dateOfBirth').attr('max', maxDate);
    });

    $('#NewBroker-form').submit(function (event) {
        event.preventDefault();    
        const form = document.getElementById('NewBroker-form');
        var isValid = true;

        var customerType = $(".customerType");
        var dateOfBirth = $(".dateOfBirth2");
        if (customerType.val() === "Individual" && dateOfBirth.val() === "") {
            toastr.info('DOB is required');
            isValid = false;
        } 
         
        $('#NewBroker input, #NewBroker select').not('#lastName,#dateOfBirth,#taxId').each(function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

            // Email validation
            if ($(this).attr('type') === 'email') {
                var isValidEmail = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(fieldValue);
                
                if (!isValidEmail) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                }
            }

            // Phone number length check
            if ($(this).attr('id') === 'phoneNumber') {
                if (fieldValue.length !== 11) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                }
            }

            // Username length check
            if ($(this).attr('id') === 'userName') {
                if (fieldValue.length < 6) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                }
            }
        });

        $('#NewBroker input, #NewBroker select').not('#lastName,#dateOfBirth,#taxId').each(function () {
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
            // Loop through all input fields and disable them
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
