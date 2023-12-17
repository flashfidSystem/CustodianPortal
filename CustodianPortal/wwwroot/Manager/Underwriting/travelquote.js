// BS-Stepper Init
document.addEventListener('DOMContentLoaded', function () {
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
})

$("#divBuy").hide();
$('#buy').on('change', function () {
    if ($('#buy').is(":checked")) {

        $("#divBuy").show();
    }
    else {
        $("#divBuy").hide();
    }
});

$(document).ready(function () {

    // Show the loading indicator
    function showLoadingIndicator() {
        $('.loading-indicator').removeClass('d-none');
    }

    // Hide the loading indicator
    function hideLoadingIndicator() {
        $('.loading-indicator').addClass('d-none');
    }

    $('.destinations').select2({
        placeholder: 'Select destination',
        allowClear: true
    });
    var dateFieldCounter = 1;
    var dateList = [];

    var newDateField1 = $('<div class="mb-3 col-md-4">' +
        '<label class="">Traveller DOB ' + dateFieldCounter + ':</label>' +
        '<span class="text-danger sm-text" id="spanlistOfDateOfBirth"></span>' +
        '<input type="date" class="form-control" placeholder="Enter traveller DOB" id="listOfDateOfBirth' + dateFieldCounter + '" />' +
        '</div>');
    $('#dateFieldsContainer').append(newDateField1);
    dateList.push(newDateField1.find('input').val());

    $('#addDateFieldButton').click(function () {
        dateFieldCounter++;
        var newDateField = $('<div class="mb-3 col-md-4">' +
            '<label class="">Traveller DOB ' + dateFieldCounter + ':</label>' +
            '<span class="text-danger sm-text"></span>' +
            '<input type="date" class="form-control" placeholder="Enter traveller DOB" id="listOfDateOfBirth' + dateFieldCounter + '" />' +
            '<a class="btn btn-sm removeDateFieldButton" style="color:#900000"><i class="fa-solid fa-trash-can"></i></a>' +
            '</div>');

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
            $('#listOfDateOfBirth' + dateFieldCounter).attr('max', maxDate);
        });


        newDateField.find('.removeDateFieldButton').click(function () {
            var index = $(this).closest('.col-md-4').index();
            dateList.splice(index, 1);
            $(this).closest('.col-md-4').remove();
        });

        $('#dateFieldsContainer').append(newDateField);
        dateList.push(newDateField.find('input').val());
    });

    $('.bs-stepper-content input, .bs-stepper-content select').each(function () {
        var field = $(this);

        field.on('change', function () {
            var fieldValue = field.val();

            if (fieldValue === '') {
                field.addClass('is-invalid');
            } else {
                field.removeClass('is-invalid');
            }
        });
    });


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
        $('#listOfDateOfBirth1').attr('max', maxDate);
    });
    // Get the travellers DOB
    function getDateValuesAsList() {
        var dateValues = [];
        $('#dateFieldsContainer').find('input[type="date"]').each(function () {
            dateValues.push($(this).val());
        });
        return dateValues;
    }

    $(function () {
        var dtToday = new Date();

        // Add 1 day (24 hours) to the current date
        dtToday.setDate(dtToday.getDate() + 1);

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();

        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();

        var minDate = year + '-' + month + '-' + day;

        $('#departureDate').attr('min', minDate);
        $('#returnDate').attr('min', minDate);
    });



    $(document).on('input change', '#departureDate', function () {

        var startDate = $('#departureDate').val();
        var dtToday = new Date(startDate);

        // Add 1 day (24 hours) to the current date
        dtToday.setDate(dtToday.getDate() + 1);

        var month = dtToday.getMonth() + 1;
        var day = dtToday.getDate();
        var year = dtToday.getFullYear();
        if (month < 10)
            month = '0' + month.toString();
        if (day < 10)
            day = '0' + day.toString();
        var maxDate = year + '-' + month + '-' + day;
        $('#returnDate').attr('min', maxDate);
    });


    function formatDate(dateString) {
        var dateObj = new Date(dateString);

        var options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        var formattedDate = dateObj.toLocaleDateString('en-US', options);

        return formattedDate;
    }



    var stepper = new Stepper(document.querySelector('.bs-stepper'));

    // bs steper previous
    $(document).on('click', '.previous', function () {
        stepper.previous();
    });

    $(document).on('click', '#selectPlan', function () {
        var plan = $(this).closest('tr').find('td:first-child').text();
        var premiumTotal = $(this).closest('tr').find('td:nth-child(2)').text();
        var travelerCount = $(this).closest('tr').find('td:nth-child(3)').text();

        var departureDate = $('#departureDate').val();
        var returnDate = $("#returnDate").val();

        // Convert the date strings to JavaScript Date objects
        var departureDateObj = new Date(departureDate);
        var returnDateObj = new Date(returnDate);

        // Calculate the time difference in milliseconds
        var timeDifference = returnDateObj - departureDateObj;

        // Convert the time difference to the desired format (e.g., days)
        // The result will be a float, you may want to round or format it as needed
        var NoOfDays = timeDifference / (1000 * 3600 * 24);


        console.log(departureDate);
        console.log(returnDate);
        console.log(NoOfDays);

        var formatteddepartureDate = formatDate(departureDate);
        var formattedreturnDate = formatDate(returnDate);

        var destination = JSON.stringify($("#destinations").val());
        var arrdestination = JSON.parse(destination);
        var strdestination = arrdestination.join(", ");

        $('#card-destination').text(strdestination);
        var cardPremium = "&#8358;" + premiumTotal;

        $('#card-plan').text(plan);
        $('#card-depature').text(departureDate);
        $('#card-return').text(returnDate);
        $('#card-premium').html(cardPremium);
        $('#card-days').text((NoOfDays + 1) + ' days');

        var detailsField1 = $('<div class="pb-2 "><b> Package:</b> ' + plan + '</div>' +
            '<div class="pb-2 "><b>Traveller(s): </b> ' + travelerCount + '</div>' +
            '<div class="pb-2 "><b>Duration: </b> ' + formatteddepartureDate + ' - ' + formattedreturnDate + '</div>' +
            '<div class="pb-2 "><b>Destination: </b> ' + strdestination + '</div>' +
            '<div class="pb-2 "><b>No of days: </b>  (' + (NoOfDays + 1) + ')</div>' +
            '<input type="text" hidden class="form-control premiumTotal" value="' + premiumTotal + '">' +
            '<input type="text" hidden class="form-control plan" value="' + plan + '">' +
            '<div class="pb-2 "><b>Total premium: </b> ' + premiumTotal + '</div>');

        // Add checkbox label for group insurance and set checked attribute based on travelerCount
        if (travelerCount > 1) {
            var groupInsuranceCheckbox = $('<div class="row mb-3 mt-3"> <div class="col-12"> <div class="mdc-switch mdc-switch--checked" data-mdc-auto-init="MDCSwitch"> <div class="mdc-switch__track"></div><div class="mdc-switch__thumb-underlay"> <div class="mdc-switch__thumb">    <input type="checkbox" class="mdc-switch__native-control" id="gi" role="switch" checked> </div></div> </div> <label class="custom-control-label" for="gi" >Group Insurance</label></div> </div>');
            detailsField1 = detailsField1.add(groupInsuranceCheckbox);
        } else {
            var groupInsuranceCheckbox = $('<div class="row mb-1 mt-3"> <div class="col-12"> <div class="mdc-switch" data-mdc-auto-init="MDCSwitch"> <div class="mdc-switch__track"></div><div class="mdc-switch__thumb-underlay"> <div class="mdc-switch__thumb">    <input type="checkbox" class="mdc-switch__native-control" id="gi" role="switch"> </div></div> </div> <label class="custom-control-label" for="gi">Buy Now</label></div> </div>');
            detailsField1 = detailsField1.add(groupInsuranceCheckbox);
        }
        $('#details').html(detailsField1);

        var Dob = getDateValuesAsList();



        //console.log(Dob)
        // Multiply HTML code block by travelerCount
        var htmlCodeBlock = '';
        for (var i = 1; i <= travelerCount; i++) {
            console.log(travelerCount);
            var extensionChecked = (i === 1);
            var dob = Dob[i - 1] || '';
            var dobField = $('<span class="badge badge-pill badge-danger p-2 spDob"></span>');
            dobField.text('DOB: ' + dob);


            htmlCodeBlock += '<div class="row className">' +
                '<div class="col-md-12  pb-2">' +
                dobField.prop('outerHTML') +
                '</div>' +
                '<input type="text" hidden class="form-control birthDate"  name="travelerDetails[' + (i - 1) + '].birthDate" value="' + dob + '">' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Intl. Passport No:</label>' +
                '<span class="text-danger sm-text"></span>' +
                '<input type="text" placeholder="Enter intl. passport no"   name="travelerDetails[' + (i - 1) + '].internationalPassportNum" maxlength="14"  class="form-control internationalPassportNum">' +
                ' <span class="loading-indicator d-none"> <i class="fas fa-spinner fa-pulse fa-5" style="color:#900000"></i>  </span>' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">FirstName:</label>' +
                '<span class="text-danger sm-text"></span>' +
                '<input type="text" placeholder="Enter firstName"  name="travelerDetails[' + (i - 1) + '].firstName" class="form-control firstName">' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">LastName:</label>' +
                '<span class="text-danger sm-text"></span>' +
                '<input type="text"  placeholder="Enter lastName"   name="travelerDetails[' + (i - 1) + '].lastName" class="form-control lastName">' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Gender:</label>' +
                '<span class="text-danger"></span>' +
                '<select class="form-control select2 select2-danger gender"  name="travelerDetails[' + (i - 1) + '].gender" data-dropdown-css-class="select2-danger" style="width: 100%;">' +
                '<option selected value="">Please Select</option>' +
                '<option value="M">Male</option>' +
                '<option value="F">Female</option>' +
                '</select>' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Occupation:</label>' +
                '<span class="text-danger"></span>' +
                '<select class="form-control select2 select2-danger occupation"  name="travelerDetails[' + (i - 1) + '].occupation" data-dropdown-css-class="select2-danger" style="width: 100%;">' +
                '<option selected value="">Please Select</option>' +
                '<option value="Architecture & Construction">Architecture & Construction</option>' +
                '<option value="Arts & Communication">Arts & Communication</option>' +
                '<option value="Agriculture, Food & Natural Resources">Agriculture, Food & Natural Resources</option>' +
                '<option value="Education">Education</option>' +
                '<option value="Information Technology">Information Technology</option>' +
                '<option value="Self-Employed">Self-Employed</option>' +
                '<option value="Finance">Finance</option>' +
                '<option value="Law">Law</option>' +
                '<option value="Retiree">Retiree</option>' +
                '<option value="Manufacturing">Manufacturing</option>' +
                '<option value="Transportation & Logistics">Transportation & Logistics</option>' +
                '<option value="Hospitality & Tourism">Hospitality & Tourism</option>' +
                '<option value="Telecommunications">Telecommunications</option>' +
                '<option value="Oil & Gas">Oil & Gas</option>' +
                '<option value="Marketing & Sales">Marketing & Sales</option>' +
                '<option value="Government & Public Administration">Government & Public Administration</option>' +
                '<option value="Others">Others</option>' +
                '</select>' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Email:</label>' +
                '<span class="text-danger sm-text"></span>' +
                '<input type="email"  placeholder="Enter email" name="travelerDetails[' + (i - 1) + '].email" class="form-control email">' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Home Address:</label>' +
                '<span class="text-danger sm-text"></span>' +
                '<input type="text"  placeholder="Enter address" name="travelerDetails[' + (i - 1) + '].address" class="form-control address">' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">PhoneNumber:</label>' +
                '<span class="text-danger sm-text"></span>' +
                '<input type="text" minlength="11" maxlength="11"  placeholder="Enter phone no"  name="travelerDetails[' + (i - 1) + '].mobileNumber" class="form-control phoneno">' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Purpose Of Trip:</label>' +
                '<span class="text-danger"></span>' +
                '<select class="form-control select2 select2-danger purposeOfTrip"  name="travelerDetails[' + (i - 1) + '].purposeOfTrip" data-dropdown-css-class="select2-danger" style="width: 100%;">' +
                '<option selected value="">Please Select</option>' +
                '<option value="General Travel">General Travel</option>' +
                '<option value="Business Trip">Business Trip</option>' +
                '<option value="Vacation Trip">Vacation Trip</option>' +
                '<option value="Tourism">Tourism</option>' +
                '</select>' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<label class="">Country Of Origin:</label>' +
                '<span class="text-danger"></span>' +
                '<select class="form-control select2 select2-danger countryOfOrigin"  name="travelerDetails[' + (i - 1) + '].countryOfOrigin" data-dropdown-css-class="select2-danger" style="width: 100%;">' +
                '<option selected value="">Please Select</option>' +
                '</select>' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<div class="form-group">' +
                '<label  class="">Upload Intl. Passport</label>' +
                '<input type="file" class="form-control AttachmentPassport" onchange="validate(this)" name="travelerDetails[' + (i - 1) + '].internationalPassportDocF">' +
                '</div>' +
                '</div>' +
                '<div class="mb-3 col-md-3">' +
                '<div class="mdc-form-field">' +
                '<div class="mdc-checkbox">' +
                '<div class="custom-control custom-switch ">' +
                '<input type="checkbox" class="extension-checkbox mdc-checkbox__native-control"' + ((travelerCount == 1) ? 'disabled ' : ' ') + 'id="travelerDetails[' + (i - 1) + '].primaryTraveler" name="travelerDetails[' + (i - 1) + '].primaryTraveler" value="' + (extensionChecked ? 'true' : 'false') + '"' + (extensionChecked ? ' checked' : '') + ' data-checkbox-index="' + i + '">' +
                ' <div class="mdc-checkbox__background"> <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24"> <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59" /></svg> <div class="mdc-checkbox__mixedmark"></div> </div>' +
                '</div>' +
                '</div>' +
                '<label class="custom-control-label " for="travelerDetails[' + (i - 1) + '].primaryTraveler">Set as Primary Insured</label>' +
                '</div>' +
                '</div>' +
                '</div>';
        }

        // Append the multiplied HTML code block
        $('#multipliedBlock').html(htmlCodeBlock);

        $('#multipliedBlock input, #multipliedBlock select').each(function () {
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

        //Validate file upload
        // Iterate over each multiplied block
        $('.className').each(function () {
            var attachmentPassportInput = $(this).find('.AttachmentPassport');

            attachmentPassportInput.on('change', function () {
                var file = this.files[0];

                // Check file size
                if (file && file.size > 2 * 1024 * 1024) {
                    $(this).val(''); // Clear the selected file
                    toastr.error('Please select a file below 2MB in size.');
                    return; // Exit the event handler
                }

                // Check file type
                //var allowedExtensions = /(\.pdf|\.png|\.jpeg)$/i;
                //var fileExtension = file.name.split('.').pop();

                //if (!allowedExtensions.exec(fileExtension)) {
                //    $(this).val(''); // Clear the selected file
                //    toastr.error('Please select a PDF, PNG, or JPEG file.');
                //    return; // Exit the event handler
                //}

                // Check file content type
                if (file.type.includes('video') || file.type.includes('audio')) {
                    $(this).val(''); // Clear the selected file
                    toastr.error('Please select a file that is not a video or audio.');
                }
            });
        });



        // Validate phone and email
        $('.className').each(function () {
            var phoneNumberInput = $(this).find('.phoneno');
            var emailInput = $(this).find('.email');

            // Add validation rules for phone number
            phoneNumberInput.on('input', function () {
                var sanitizedValue = $(this).val().replace(/[^0-9]/g, ''); // Remove non-numeric characters
                $(this).val(sanitizedValue);
            });

            // Add validation rules for email
            emailInput.on('input', function () {
                var email = $(this).val();
                var isValidEmail = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

                if (!isValidEmail) {
                    $(this).addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid');
                }
            });
        });

        // AJAX call to fetch country data
        $("#process").show();
        $.ajax({
            url: '/Underwriting/getcountry',
            headers: {
                'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
            },
            type: 'POST',
            success: function (response) {
                const res = response;
                const statusCode = res.statusCode;

                if (statusCode === 200) {
                    var countries = res.data;
                    // Iterate over each multiplied block
                    $('.className').each(function (index) {
                        var countrySelect = $(this).find('.countryOfOrigin');

                        // Clear existing options
                        //countrySelect.empty();
                        // Populate options from the AJAX response
                        countries.forEach(function (country) {
                            var option = $('<option></option>')
                                .val(country.en_short_name) // Assuming each country object has a 'code' property
                                .text(country.en_short_name); // Assuming each country object has a 'name' property

                            countrySelect.append(option);
                            $("#process").hide();
                        });
                    });
                } else {
                    $("#process").hide();
                    Swal.fire(
                        'Broker details',
                        res.message,
                        'error'
                    )
                }


            },
            error: function (error) {
                console.log('Error fetching country data:', error);
            }
        });

        // AJAX call to validate passport no 
        $('.className').each(function () {
            var internationalPassportNumInput = $(this).find('.internationalPassportNum');
            var firstName = $(this).find('.firstName');
            var lastName = $(this).find('.lastName');
            var email = $(this).find('.email');
            var phoneno = $(this).find('.phoneno');
            var address = $(this).find('.address');
            var countryOfOrigin = $(this).find('.countryOfOrigin');
            var gender = $(this).find('.gender');
            var occupation = $(this).find('.occupation');


            internationalPassportNumInput.on('blur', function () {
                var passportNum = $(this).val().trim();
                if (passportNum === '') {
                    $(this).addClass('is-invalid');
                } else {
                    // Perform AJAX call to validate the passport number
                    showLoadingIndicator();
                    $.ajax({
                        url: '/Underwriting/validatePassport',
                        headers: {
                            'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                        },
                        type: 'POST',
                        data: { passportNum: passportNum },
                        success: function (response) {
                            console.log(response);
                            // Handle the response from the server
                            if (response.statusCode === 200) {
                                $(this).removeClass('is-invalid');
                                var data = response.data;

                                if (data.firstName != null) {
                                    firstName.val(data.firstName);
                                    firstName.prop('readonly', true);
                                }
                                if (data.lastName != null) {
                                    lastName.val(data.lastName);
                                    lastName.prop('readonly', true);
                                }
                                if (data.emailAddress != null) {
                                    email.val(data.emailAddress);
                                    email.prop('readonly', true);
                                }
                                if (data.phoneNumber != null) {
                                    phoneno.val(data.phoneNumber);
                                    phoneno.prop('readonly', true);
                                }
                                if (data.homeAddress != null) {
                                    address.val(data.homeAddress);
                                    address.prop('readonly', true);
                                }
                                if (data.nationality != null) {
                                    countryOfOrigin.val(data.nationality);
                                    countryOfOrigin.attr('readonly', 'readonly');
                                }
                                if (data.gender != null) {
                                    gender.val(data.gender);
                                    gender.attr('readonly', 'readonly');
                                }
                                if (data.occupation != null) {
                                    occupation.val(data.occupation);
                                    occupation.attr('readonly', 'readonly');
                                }
                                hideLoadingIndicator();
                            } else {
                                firstName.val('');
                                firstName.prop('readonly', false);

                                lastName.val('');
                                lastName.prop('readonly', false);

                                email.val('');
                                email.prop('readonly', false);

                                phoneno.val('');
                                phoneno.prop('readonly', false);

                                address.val('');
                                address.prop('readonly', false);

                                countryOfOrigin.val('');
                                countryOfOrigin.removeAttr('readonly');

                                gender.val('');
                                gender.removeAttr('readonly');

                                occupation.val('');
                                occupation.removeAttr('readonly');

                                hideLoadingIndicator();
                            }
                        },
                        error: function (error) {
                            console.log('Error validating passport number:', error);
                            hideLoadingIndicator();
                        }
                    });
                }
            });
        });

        $('.extension-checkbox').on('change', function () {
            var isChecked = $(this).is(':checked');
            var checkboxIndex = $(this).data('checkbox-index');

            $('.extension-checkbox').not(this).prop('checked', false);
            $('.extension-checkbox').val('false');

            var primaryTravelerValue = isChecked ? 'true' : 'false';

            // Set the value attribute of the checkbox element
            $(this).val(primaryTravelerValue);



            // Uncheck other checkboxes and set their primaryTraveler values to 'false'
            $('.extension-checkbox[data-checkbox-index="' + checkboxIndex + '"]').not(this).prop('checked', false).attr('value', 'false');
        });





        stepper.next();

    });

    // third step
    $(document).on('click', '#proceed', function () {
        var isValid = true;

        $('#multipliedBlock input, #multipliedBlock select').each(function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

            if ($(this).hasClass('phoneno')) {
                if (fieldValue.length !== 11) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                }
            }
        });

        $('.className').each(function () {
            var emailInput = $(this).find('.email');


            // Add validation rules for email
            emailInput.on('input', function () {
                var email = $(this).val();
                var isValidEmail = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email);

                if (!isValidEmail) {
                    isValid = false;
                    $(this).addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid');
                }
            });
        });


        if (isValid) {

            var fieldValues = [];

            // Iterate over each multiplied block
            $('.className').each(function (index) {
                var item = {};

                // Get the values of each field within the multiplied block
                item.firstName = $(this).find('.firstName').val();
                item.lastName = $(this).find('.lastName').val();
                item.email = $(this).find('.email').val();
                item.phoneNumber = $(this).find('.phoneno').val();
                item.address = $(this).find('.address').val();
                item.birthDate = $(this).find('.birthDate').val();
                item.primaryTraveler = $(this).find('.extension-checkbox').val();

                fieldValues.push(item);
            });


            var departureDate = $('#departureDate').val();
            var returnDate = $("#returnDate").val();
            //var branch = $("#branch").val();
            //var businessSector = $("#businessSector").val();
            var premRate = $("#premRate").val();
            var sumInsured = $(".premiumTotal").val();
            var category = $("#region").val();
            if (category == "WorldWide") {
                var coverType = $(".plan").val();
            } else {
                var coverType = '';
            }

            var travelerDetails = JSON.stringify(fieldValues);

            var button = document.getElementById('proceed');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';

            $.ajax({
                url: '/Underwriting/gettravelquote',
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                data: { travelerDetails: travelerDetails, premRate: premRate, category: category, coverType: coverType, departureDate: departureDate, returnDate: returnDate, sumInsured: sumInsured },
                type: 'POST',
                success: function (result) {
                    const res = result;
                    const statusCode = res.statusCode;

                    if (statusCode === 200) {
                        // Call the function to load the table data
                        var tableBody = document.querySelector('#plansfourTable tbody');
                        tableBody.innerHTML = '';

                        var destination = JSON.stringify($("#destinations").val());
                        var arrdestination = JSON.parse(destination);
                        var strdestination = arrdestination.join(", ");

                        res.data.travelers.forEach(function (traveler) {
                            var row = document.createElement('tr');

                            var plan = '';
                            if (res.data.travelPlan == null || res.data.travelPlan == '') {
                                plan = res.data.travelRegion;
                            } else {
                                plan = res.data.travelPlan;
                            }
                            row.innerHTML =
                                '<td class="text-left">' + traveler.name + '</td>' +
                                '<td class="text-left">' + traveler.birthDate + '</td>' +
                                '<td class="text-left">' + traveler.premium + '</td>';

                            tableBody.appendChild(row);
                        });
                        $('input[id=\'premium\']').val(res.data.totalPremium)
                        $('input[id=\'quoteNum\']').val(res.data.quoteNum)

                        button.disabled = false;
                        button.innerHTML = 'Get Quote';
                        //Swal.fire(
                        //    'Broker details',
                        //    'Quote No: ' + res.data.quoteNum,
                        //    'success'
                        //)
                        stepper.next();
                    } else {
                        button.disabled = false;
                        button.innerHTML = 'Get Quote';
                        Swal.fire(res.message);
                    }
                },
                error: function (xhr, status, error) {
                    button.disabled = false;
                    button.innerHTML = 'Get Quote';
                    console.log(xhr.responseText);
                }
            });
        }
    });



    $('#getQuote').click(function () {
        var Dob = JSON.stringify(getDateValuesAsList());
        var destination = JSON.stringify($("#destinations").val());
        var departureDate = $('#departureDate').val();
        var returnDate = $("#returnDate").val();

        var destinationParse = JSON.parse(destination);

        var isValid = true;

        $('.one input, .one select, #dateFieldsContainer input, #dateFieldsContainer select ').each(function () {
            var fieldValue = $.trim($(this).val());
            if (destinationParse.length === 0) {
                isValid = false;
                var validationSpan = document.querySelector('span[data-valmsg-for="destinations"]');
                validationSpan.innerText = "This field is required.";
                $('#destinations').addClass('is-invalid');
            } else {
                $('#destinations').removeClass('is-invalid');
                var validationSpan = document.querySelector('span[data-valmsg-for="destinations"]');
                validationSpan.innerText = "";
            }

            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        if (isValid) {

            $("#process").show();
            $.ajax({
                url: '/Underwriting/travelpremium',
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                data: { Dob: Dob, departureDate: departureDate, destination: destination, returnDate: returnDate },
                type: 'POST',
                success: function (result) {
                    const res = result;
                    //console.log(res);
                    const statusCode = res.statusCode;

                    if (statusCode === 200) {
                        // Call the function to load the table data
                        var region = res.data.region;

                        var plans = res.data.plans;
                        $('input[id=\'region\']').val(region);
                        var tableBody = document.querySelector('#plansTable tbody');
                        tableBody.innerHTML = '';

                        for (var plan in plans) {
                            if (plans.hasOwnProperty(plan)) {
                                var planData = plans[plan];
                                if (planData != null) {
                                    var premiumTotal = 0;
                                    var travelerCount = planData.length;

                                    for (var i = 0; i < planData.length; i++) {
                                        premiumTotal += planData[i].premium;
                                    }

                                    var row = document.createElement('tr');
                                    row.innerHTML = '<td class="text-left">' + ((plan === "middleAndAsia") ? 'Middle East And Asia' : plan) + '</td>' +
                                        '<td class="text-left">' + parseFloat(premiumTotal).toLocaleString('en') + '</td>' +
                                        '<td class="text-left">' + travelerCount + '</td>' +
                                        '<td class="text-left"><a  class="mdc-button mdc-button--raised mdc-button--dense" id="selectPlan">Select</a> </td>';


                                    tableBody.appendChild(row);
                                }

                            }
                        }
                        $("#process").hide();
                        stepper.next();

                    } else {
                        $("#process").hide();
                        toastr.error(res.message);
                    }
                },
                error: function (xhr, status, error) {
                    $("#process").hide();
                    console.log(xhr.responseText);
                }
            });
        }

    });


    $('#travelquote-form').submit(function (event) {
        event.preventDefault();

        const form = document.getElementById('travelquote-form');
        var isValid = true;

        var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {
            keyboard: false
        })


        var buyCheckbox = document.getElementById('buy');
        if (!buyCheckbox.checked) {
            // Display the Bootstrap modal
            myModal.show()

            // Handle the Buy button click inside the modal
            document.getElementById('buyButton').addEventListener('click', function () {
                // Check the checkbox and submit the form
                myModal.hide()
                buyCheckbox.checked = true;
                $('#msc').addClass('mdc-switch--checked'); 
                $("#divBuy").show();
            });
        } else {
            $('#creditNoteNo, #attachment').each(function () {
                var fieldValue = $(this).val().trim();
                if (fieldValue === '') {
                    isValid = false;
                    $(this).addClass('is-invalid');
                } else {
                    $(this).removeClass('is-invalid');
                }
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

                $("#process").show();
                form.submit();
            }
        }

    });

    var base64PDF = document.getElementById('certificate').textContent.trim();
    var message = document.getElementById('messagetrigger').textContent.trim();

    if (message !== "" && base64PDF !== "") {
        Swal.fire({
            title: `${message}`,
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
