
// BS-Stepper Init
document.addEventListener('DOMContentLoaded', function () {
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
})
$(document).ready(function () {
    $(".customerSearch").select2({
        ajax: {
            url: '/Underwriting/customerSearch',
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, // search term
                    page: params.page
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;

                if (data.status === "Failure") {
                    for (var i = 0; i < data.errors.length; i++) {
                        toastr?.info(data.errors[i]);
                    }
                }

                if (data.data != null) {

                    var results = data.data.map(function (customer) {
                        return {
                            id: customer.id,
                            text: customer.firstName + ' ' + customer.lastName + ' | ' + customer.userName,
                            firstName: customer.firstName,
                            lastName: customer.lastName,
                            address: customer.address,
                            insuredType: customer.customerType,
                            email: customer.email,
                            phoneNumber: customer.phone,
                            birthDate: customer.dateOfBirth,
                        };
                    });

                    return {
                        results: results,
                        pagination: {
                            more: (params.page * 30) < data.data.length
                        }
                    };
                }
            },
            cache: true
        },
        placeholder: 'Search for a customer',
        minimumInputLength: 3,
        templateResult: formatRepo,
        dropdownCssClass: "select2-search-with-icon",
        templateSelection: formatRepoSelection
    });

    function formatRepo(repo) {
        if (repo.loading) {
            return repo.text;
        }

        var $container = $(
            "<div class='select2-result-repository clearfix'>" +
            "<div class='select2-result-repository__meta'>" +
            "<div class='select2-result-repository__title'></div>" +
            "</div>" +
            "</div>"
        );

        $container.find(".select2-result-repository__title").text(repo.text);

        return $container;
    }

    function formatRepoSelection(repo) {

        if (repo.firstName != null) {
            $('#firstName').val(repo.firstName);
            $('#firstName').prop('readonly', true);
        }
        if (repo.lastName != null) {
            $('#lastName').val(repo.lastName);
            $('#lastName').prop('readonly', true);
        }
        if (repo.email != null) {
            $('#email').val(repo.email);
            $('#email').prop('readonly', true);
        }
        if (repo.phoneNumber != null) {
            $('#phoneNumber').val(repo.phoneNumber);
            $('#phoneNumber').prop('readonly', true);
        }
        if (repo.address != null) {
            $('#address').val(repo.address);
            $('#address').prop('readonly', true);
        }
        if (repo.birthDate != null) {
            var dateString = repo.birthDate;
            var date = new Date(dateString);

            var year = date.getFullYear();
            var month = (date.getMonth() + 1).toString().padStart(2, '0');
            var day = date.getDate().toString().padStart(2, '0');

            var formattedDate = year + '-' + month + '-' + day;

            $('#birthDate').val(formattedDate);
            $('#birthDate').prop('readonly', true);
        }
        if (repo.insuredType != null) {
            if (repo.insuredType == "Individual") {
                $('#insuredType').val("B");
                $(".CustomerTypeByLastName").show();
                $(".CustomerTypeByFirstName").show();
                $('.LName').text('First Name:');
                $('#insuredType').attr('readonly', 'readonly');
            }
            if (repo.insuredType == "Corporate") {
                $(".CustomerTypeByLastName").hide();
                $(".CustomerTypeByFirstName").show();
                $('#firstName').val(repo.firstName + ' ' + repo.lastName);
                $('.LName').text('Name:');
                $('#insuredType').val("A");
                $('#insuredType').attr('readonly', 'readonly');

            }

        }


        return repo.full_name || repo.text;
    }


    var stepper = new Stepper(document.querySelector('.bs-stepper'));
    
    $("#divBuy").hide();
     
    // Show the loading indicator
    function showLoadingIndicator() {
        $('.loading-indicator').removeClass('d-none');
    }

    // Hide the loading indicator
    function hideLoadingIndicator() {
        $('.loading-indicator').addClass('d-none');
    }

    document.getElementById('startDate').valueAsDate = new Date();
     
    $('#buy').on('change', function () {
        if ($('#buy').is(":checked")) {

            $("#divBuy").show('fade');
        }
        else {
            $("#divBuy").hide('fade');
        }
    });

     

    $(".CustomerTypeByLastName").hide();
    $(".CustomerTypeByFirstName").hide();

    $('.customerType').on('change', function () {
        var customerType = $(this).val();
        if (customerType == 'A') {
            $(".CustomerTypeByFirstName").show();
            $('.LName').text('Name:');
            $('#lastName').val('');
            $(".CustomerTypeByLastName").hide();

            $('#firstName').prop('readonly', false);
            $('#lastName').prop('readonly', false);

        } else if (customerType == 'B') {
            $(".CustomerTypeByFirstName").show();
            $('.LName').text('First Name:');
            $(".CustomerTypeByLastName").show();
        } else {
            $(".CustomerTypeByLastName").hide();
            $(".CustomerTypeByFirstName").hide();
            $('.LName').text('First Name:');
            $('#lastName').val('');
        }
    });
 
   
    const phoneNumberValueInput = document.getElementById('phoneNumber');
    phoneNumberValueInput.addEventListener('input', function () {
        let phoneNumberValue = phoneNumberValueInput.value.trim();
        if (phoneNumberValue.length > 90) {
            phoneNumberValue = phoneNumberValue.slice(0, 90);
        }
        phoneNumberValueInput.value = phoneNumberValue.replace(/\D/g, '');
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
        $('#birthDate').attr('max', maxDate);
    });


    //get the no of days
    //function calculateNoOfDays() {
    //    var startDate = new Date(document.getElementById("startDate").value);
    //    var endDate = new Date(document.getElementById("endDate").value);

    //    // Calculate the difference in milliseconds between the two dates
    //    var timeDiff = endDate.getTime() - startDate.getTime();

    //    // Calculate the number of days by dividing the time difference by the number of milliseconds in a day
    //    var noOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    //    // Set the value of the "Noofdays" input field
    //    document.getElementById("Noofdays").value = noOfDays + 1;
    //    document.getElementById("tdNoofDays").innerHTML = noOfDays + 1;
    //}

    //if ($("#startDate ,#endDate").val()) {
    //    calculateNoOfDays();
    //}

    //$("#startDate ,#endDate").change(calculateNoOfDays);
    //End


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

        $('#startDate').attr('min', maxDate);
        $('#endDate').attr('min', maxDate);


        var startDate = new Date($('#startDate').val());
        var endDate = new Date(startDate);
        endDate.setFullYear(startDate.getFullYear() + 1);

        // Subtract one day from endDate
        endDate.setDate(endDate.getDate() - 1);

        var endDateString = endDate.toISOString().split('T')[0];

        $('#endDate').attr('max', endDateString);
    });

    $(document).on('input change', '#startDate', function () {
        var startDate = $('#startDate').val();
        var dtToday = new Date(startDate);
        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();
        var maxDate = year + '-' + month + '-' + day;
        $('#endDate').attr('min', maxDate);

        var startDate2 = new Date($('#startDate').val());
        var endDate = new Date(startDate2);
        endDate.setFullYear(startDate2.getFullYear() + 1);

        // Subtract one day from endDate
        endDate.setDate(endDate.getDate() - 1);

        var endDateString = endDate.toISOString().split('T')[0];

        $('#endDate').attr('max', endDateString);
    });
 
    // bs steper previous
    $(document).on('click', '#previous', function () {
        stepper.previous();
    });

    $('#userInfo').click(function () {
        var isValid = true;

        $('#CNextA input, #CNextA select').each(function () {
            var fieldValue = $.trim($(this).val());

            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('#CNextA input, #CNextA select').each(function () {
            var field = $(this);

            field.on('change', function () {
                var fieldValue = field.val().trim();

                if (fieldValue === '') {
                    field.addClass('is-invalid');
                } else {
                    field.removeClass('is-invalid');
                }
            });
        });

        if (isValid) {
            stepper.next();
        }

    });


    $('#premiumA').click(function () {
        var isValid = true;

        $('#CNextB input, #CNextB select').each(function () {
            var fieldValue = $.trim($(this).val());

            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('#CNextB input, #CNextB select').each(function () {
            var field = $(this);

            field.on('change', function () {
                var fieldValue = field.val().trim();

                if (fieldValue === '') {
                    field.addClass('is-invalid');
                } else {
                    field.removeClass('is-invalid');
                }
            });
        });

        if (isValid) {
            stepper.next();
        }

    });

});
 
