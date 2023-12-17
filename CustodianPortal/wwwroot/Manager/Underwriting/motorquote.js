
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
                            userName: customer.userName,
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
        minimumInputLength: 2,
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

        $('#userName').val(repo.userName);
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
                $(".CustomerTypeByDOB").show();
                $('.LName').text('First Name:');
                $('#insuredType').attr('readonly', 'readonly');
            }
            if (repo.insuredType == "Corporate") {
                $(".CustomerTypeByLastName").hide();
                $('#lastName').val("");
                $(".CustomerTypeByFirstName").show();
                $(".CustomerTypeByDOB").hide();
                $('#firstName').val(repo.firstName + ' ' + repo.lastName);
                $('.LName').text('Name:');
                $('#insuredType').val("A");
                $('#insuredType').attr('readonly', 'readonly');

            }

        }


        return repo.full_name || repo.text;
    }
});



$(document).ready(function () {
    var stepper = new Stepper(document.querySelector('.bs-stepper'));
    //$(".CNextA").hide();
    //$(".CNextB").hide();
    //$(".CNextC").hide();
    $("#divBuy").hide();
    $("#divExtension").hide();
    $("#extentionCheckbox").hide();

    $(".CustomerTypeByLastName").hide();
    $(".CustomerTypeByFirstName").hide();
    $(".CustomerTypeByDOB").hide();

    $("#DivTable").hide();

    //
    $(document).on('click', '#previous', function () {
        stepper.previous();
    });

    // Define an array to store the added vehicles
    var vehicles = [];




    // Show the loading indicator
    function showLoadingIndicator() {
        $('.loading-indicator').removeClass('d-none');
    }

    // Hide the loading indicator
    function hideLoadingIndicator() {
        $('.loading-indicator').addClass('d-none');
    }

    document.getElementById('startDate').valueAsDate = new Date();

    $('#extension').on('change', function () {
        if ($('#extension').is(":checked")) {

            $("#divExtension").show();
        }
        else {
            $("#divExtension").hide('fade');
            //$('#motorPremium_srcc').prop('checked', false);
            $('#motorPremium_flood').prop('checked', false);
            $('#motorPremium_excess').prop('checked', false);
            //$('#motorPremium_tracking').prop('checked', false);
        }
    });

    $('#buy').on('change', function () {
        if ($('#buy').is(":checked")) {

            $("#divBuy").show();
        }
        else {
            $("#divBuy").hide();
        }
    });

    //$('#attachment').on('change', function () {
    //    if (document.getElementById("attachment").value != "" || document.getElementById("creditNoteNo").value != "") {
    //        $(".CNextC").show('fade');
    //    } else {
    //        $(".CNextC").hide('fade');
    //    }
    //});



    $('.customerType').on('change', function () {
        var customerType = $(this).val();
        if (customerType == 'A') {
            $(".CustomerTypeByFirstName").show();
            $('.LName').text('Name:');
            $('#lastName').val('');
            $(".CustomerTypeByLastName").hide();
            $(".CustomerTypeByDOB").hide();

            //$('#firstName').prop('readonly', false);
            //$('#lastName').prop('readonly', false);

        } else if (customerType == 'B') {
            $(".CustomerTypeByFirstName").show();
            $('.LName').text('First Name:');
            $(".CustomerTypeByLastName").show();
            $(".CustomerTypeByDOB").show();
        } else {
            $(".CustomerTypeByDOB").hide();
            $(".CustomerTypeByLastName").hide();
            $(".CustomerTypeByFirstName").hide();
            $('.LName').text('First Name:');
            $('#lastName').val('');
        }
    });

    const yearOfMakeValueInput = document.getElementById('yearOfMake');
    yearOfMakeValueInput.addEventListener('input', function () {
        let yearOfMakeValue = yearOfMakeValueInput.value.trim();
        if (yearOfMakeValue.length > 90) {
            yearOfMakeValue = yearOfMakeValue.slice(0, 90);
        }
        yearOfMakeValueInput.value = yearOfMakeValue.replace(/\D/g, '');
    });
    const sumInsuredValueInput = document.getElementById('sumInsured');
    sumInsuredValueInput.addEventListener('input', function () {
        let sumInsuredValue = sumInsuredValueInput.value.trim();
        if (sumInsuredValue.length > 90) {
            sumInsuredValue = sumInsuredValue.slice(0, 90);
        }
        sumInsuredValueInput.value = sumInsuredValue.replace(/\D/g, '');
    });
    const phoneNumberValueInput = document.getElementById('phoneNumber');
    phoneNumberValueInput.addEventListener('input', function () {
        let phoneNumberValue = phoneNumberValueInput.value.trim();
        if (phoneNumberValue.length > 90) {
            phoneNumberValue = phoneNumberValue.slice(0, 90);
        }
        phoneNumberValueInput.value = phoneNumberValue.replace(/\D/g, '');
    });
    ////Rate
    let premiumRate = document.getElementById('motorPremium_premRate');
    premiumRate.addEventListener('input', function () {
        const n = premiumRate.value.replace('', '');
        if (n >= 0 && n <= 100) {
            premiumRate.value = premiumRate.value.replace('%', '') + ''
        } else {
            premiumRate.value = n.slice(0, -1) + ''
        }
    })

    // Function to format the input value with commas
    function formatNumber(input) {
        var value = input.value.replace(/\D/g, '');
        var formattedValue = new Intl.NumberFormat('en-US').format(value);
        input.value = formattedValue;
    }

    // Add an event listener to the input field for formatting
    var sumInsuredInput = document.getElementById('sumInsured');
    sumInsuredInput.addEventListener('input', function () {
        formatNumber(this);
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

    //$(document).on('input change', '#insuredType, #firstName, #email, #phoneNumber, #address, #birthDate, #businessSector, #subClass, #motorPremium_typeOfUsage, #startDate,#endDate ,#branch', function () {
    //    var insuredType = $('#insuredType').val();
    //    var firstName = $('#firstName').val();
    //    var email = $('#email').val();
    //    var phoneNumber = $('#phoneNumber').val();
    //    var address = $('#address').val();
    //    var birthDate = $('#birthDate').val();
    //    var businessSector = $('#businessSector').val();
    //    var subClass = $('#subClass').val();
    //    var motorPremium_typeOfUsage = $('#motorPremium_typeOfUsage').val();
    //    var startDate = $('#startDate').val();
    //    var endDate = $('#endDate').val();
    //    var branch = $('#branch').val();

    //    $(".CNextB").hide('fade');
    //    $('input[id=\'premium\']').val('')

    //    if (IsEmail(email) == false) {
    //        document.getElementById("email").style.borderColor = "red";
    //    } else {
    //        document.getElementById("email").style.borderColor = "#80bdff";
    //    }

    //    if (insuredType == '' || firstName == '' || email == '' || IsEmail(email) == false || phoneNumber == '' || address == '' || birthDate == '' || businessSector == '' || subClass == '' || motorPremium_typeOfUsage == '' || startDate == '' || endDate == '' || branch == '') {

    //        $(".CNextA").hide('fade');
    //    }
    //    else {

    //        $(".CNextA").show('fade');
    //    }
    //});
    // bs steper previous


    $('#userInfo').click(function () {
        var isValid = true;

        var insuredType = $("#insuredType");
        var birthDate = $("#birthDate");
        if (insuredType.val() === "B" && birthDate.val() === "") {
            Swal.fire('DOB is required.')
            isValid = false;
        }

        $('#CNextA input, #CNextA select').not('#birthDate, .CIT, #lastName').each(function () {
            var fieldValue = $.trim($(this).val());

            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        $('#CNextA input, #CNextA select').not('#birthDate, .CIT, #lastName').each(function () {
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
            var subclass = $("#subClass");
            if (subclass.val() === "59") {
                $("#extentionCheckbox").show();
                $('input[id=\'premium\']').val('')
                stepper.next();
            } else {
                $("#extentionCheckbox").hide();
                $('#motorPremium_flood').prop('checked', false);
                $('#motorPremium_excess').prop('checked', false);
                $('input[id=\'premium\']').val('')
                stepper.next();
            }
        }

    });

    // Function to add a new vehicle to the array and table
    function addVehicle() {

        var isValid = true;

        $('#CNextB input, #CNextB select, #premium').each(function () {
            var fieldValue = $.trim($(this).val());

            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('#CNextB input, #CNextB select, #premium').each(function () {
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
            var coverType = $("#coverType option:selected").text();
            var coverTypeVal = $("#coverType").val();
            var registrationNo = $('#registrationNo').val();
            var vehicleMake = $('#vehicleMake').val();
            var vehicleType = $('#vehicleType').val();
            var chasisNo = $("#chasisNo").val();
            var engineNo = $("#engineNo").val();
            var yearOfMake = $("#yearOfMake").val();
            var typeOfUsage = $("#motorPremium_typeOfUsage").val();
            var sumInsured = parseInt($('#sumInsured').val().replace(/,/g, ''));
            var premium = parseInt($('#premium').val().replace(/,/g, ''))


            // Check if the registration number already exists in the array
            var existingRegistrationNo = false;
            for (var i = 0; i < vehicles.length; i++) {
                if (vehicles[i].registrationNo === registrationNo) {
                    existingRegistrationNo = true;
                    break;
                }
            }

            if (!existingRegistrationNo) {
                var vehicle = {
                    coverType: coverTypeVal,
                    registrationNo: registrationNo,
                    vehicleMake: vehicleMake,
                    typeOfUsage: typeOfUsage,
                    vehicleType: vehicleType,
                    chasisNo: chasisNo,
                    engineNo: engineNo,
                    yearOfMake: yearOfMake,
                    sumInsured: sumInsured,
                    premium: premium
                };

                vehicles.push(vehicle);

                var newRow = '<tr>' +
                    '<td class="text-left">' + coverType + '</td>' +
                    '<td class="text-left">' + registrationNo + '</td>' +
                    '<td class="text-left">' + vehicleMake + ' ' + vehicleType + '</td>' +
                    '<td class="text-left">' + sumInsured + '</td>' +
                    '<td class="text-left">' + premium + '</td>' +
                    '<td class="text-left"><a class="btn btn-sm delete-btn" style="color:#900000"><i class="fa-solid fa-trash-can"></i></a></td>' +
                    '</tr>';


                $('#TbAddVehicle tbody').append(newRow);
                $("#DivTable").show();
                // Clear the input fields
                $('#coverType').val('');
                $('#registrationNo').val('');
                $('#vehicleMake').val('');
                $('#vehicleType').val('');
                $("#chasisNo").val("");
                $("#engineNo").val("");
                $("#yearOfMake").val("");
                $('#sumInsured').val('');
                $('#premium').val('');
                console.log(vehicles);
            } else {
                toastr.info('Registration number already exists.');
            }
        }
    }

    // Function to remove a vehicle from the array and table
    function removeVehicle() {
        var rowIndex = $(this).closest('tr').index();

        vehicles.splice(rowIndex, 1);

        $(this).closest('tr').remove();
    }

    $('#BtnAdd').click(function () {
        addVehicle();
    });

    $(document).on('click', '.delete-btn', removeVehicle);


    $(document).on('input change', '#coverType, #motorPremium_excess, #motorPremium_flood, #sumInsured, #motorPremium_premRate, #startDate,#endDate, #vehicleMake, #chasisNo, #engineNo, #registrationNo, #yearOfMake', function () {
        $(".CNextB").hide('fade');
        $('input[id=\'premium\']').val('')
    });

    // Listen for changes in the subClass select element    
    function subClass() {
        var options = [];

        var subclass = $("#subClass");

        if (subclass.val() === "31" || subclass.val() === "29") {
            options.push("");
            options.push("Private");
            options.push("Commercial");
        }
        //if (subclass.val() === "29") {   
        //    options.push("PRIVATE");
        //}
        if (subclass.val() === "60" || subclass.val() === "30" || subclass.val() === "61" || subclass.val() === "59") {
            options.push("");
            options.push("Commercial");
        }

        var selectElement = $(".typeOfUsage");

        // Clear existing options (if any)
        selectElement.empty();

        $.each(options, function (index, value) {
            selectElement.append($('<option>', {
                value: value,
                text: value
            }));
        });
    }

    if ($("#subClass").val()) {
        subClass();
    }
    $("#subClass").change(subClass);




    //get the no of days
    function calculateNoOfDays() {
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);

        var timeDiff = endDate.getTime() - startDate.getTime();

        var noOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        var varNoOfDays = noOfDays + 1;

        // Set the value of the "Noofdays" input field
        document.getElementById("Noofdays").innerHTML = varNoOfDays + " day's";
        document.getElementById("tdNoofDays").innerHTML = varNoOfDays;
    }
    if ($("#endDate").val()) {
        calculateNoOfDays();
    }

    $("#startDate ,#endDate").change(calculateNoOfDays);
    //End



    // Get premium for motor
    document.getElementById("getPremium").addEventListener("click", GetPremium, false);
    function GetPremium() {
        var insuredType = $('#insuredType').val();
        var registrationNo = $('#registrationNo').val();
        var vehicleMake = $('#vehicleMake').val();
        var vehicleType = $('#vehicleType').val();
        var chasisNo = $('#chasisNo').val();
        var engineNo = $('#engineNo').val();
        var yearOfMake = $('#yearOfMake').val();

        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var email = $('#email').val();
        var phoneNumber = $('#phoneNumber').val();
        var address = $('#address').val();
        var businessSector = $('#businessSector').val();
        var birthDate = $('#birthDate').val();
        var sumInsured = $('#sumInsured').val();
        var coverType = $('#coverType').val();
        var subClass = $('#subClass').val();
        var branch = $('#branch').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var motorPremium_typeOfUsage = $('#motorPremium_typeOfUsage').val();
        var motorPremium_premRate = $('#motorPremium_premRate').val();


        //const _tracking = document.getElementById("motorPremium_tracking");
        //const _srcc = document.getElementById("motorPremium_srcc");
        const _flood = document.getElementById("motorPremium_flood");
        const _excess = document.getElementById("motorPremium_excess");

        //const motorPremium_tracking = _tracking.checked;
        //const motorPremium_srcc = _srcc.checked;
        const motorPremium_flood = _flood.checked;
        const motorPremium_excess = _excess.checked;

        var currentYear = new Date().getFullYear();


        var enteredYear = parseInt(yearOfMake);


        if (firstName == '') {
            Swal.fire('First Name is required.')
        } else if (engineNo == '') {
            Swal.fire('Engine No is required.')
        } else if (insuredType == '') {
            Swal.fire('Insured Type is required.')
        } else if (registrationNo == '') {
            Swal.fire('Registration No is required.')
        } else if (chasisNo == '') {
            Swal.fire('Chasis No is required.')
        } else if (vehicleMake == '') {
            Swal.fire('Vehicle Make is required.')
        } else if (vehicleType == '') {
            Swal.fire('Vehicle Model is required.')
        } else if (yearOfMake == '') {
            Swal.fire('Year Of Make is required.')
        } else if (enteredYear > currentYear + 1) {
            Swal.fire('Year of make is invalid.')
        } else if (email == '') {
            Swal.fire('Email is required.')
        } else if (phoneNumber == '') {
            Swal.fire('Phone Number is required.')
        } else if (address == '') {
            Swal.fire('Address is required.')
        } else if (businessSector == '') {
            Swal.fire('BusinessSector is required.')
        } else if (coverType == '') {
            Swal.fire('CoverType is required.')
        } else if (subClass == '') {
            Swal.fire('Sub Class is required.')
        } else if (branch == '') {
            Swal.fire('Branch is required.')
        } else if (startDate == '') {
            Swal.fire('Start Date is required.')
        } else if (endDate == '') {
            Swal.fire('End Date is required.')
        } else if (motorPremium_typeOfUsage == '') {
            Swal.fire('Usage Type is required.')
        } else if (motorPremium_premRate == '') {
            Swal.fire('Premium Rate is required.')
        } else if (sumInsured == '') {
            Swal.fire('Sum Insured is required.')
        } else {
            if (insuredType === "A") {
                var str = firstName;
                var words = str.split(' ');
                lastName = words[words.length - 1];
                firstName = words.slice(0, words.length - 1).join(' ');
                if (firstName === "") firstName = ".";
            }
            else {
                lastName = lastName;
                firstName = firstName;
            }

            var button = document.getElementById('getPremium');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';

            $.ajax({
                url: '/Underwriting/motorpremium',
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                data: { insuredType: insuredType, firstName: firstName, lastName: lastName, email: email, branch: branch, phoneNumber: phoneNumber, address: address, businessSector: businessSector, birthDate: birthDate, sumInsured: sumInsured, coverType: coverType, subClass: subClass, startDate: startDate, endDate: endDate, motorPremium_typeOfUsage: motorPremium_typeOfUsage, vehicleValue: sumInsured, motorPremium_premRate: motorPremium_premRate, motorPremium_flood: motorPremium_flood, motorPremium_excess: motorPremium_excess },
                type: 'POST',
                success: function (result) {
                    const res = result;
                    const message = res.message;
                    //console.log(res.data);
                    if (message == 'Operation Successful') {
                        const obj = res.data;
                        const premiumValue = obj.premium;
                        const quoteNum = obj.quoteNum;
                        button.disabled = false;
                        button.innerHTML = 'Get Quote';
                        $(".CNextB").show('fade');

                        $('input[id=\'premium\']').val(parseFloat(premiumValue).toLocaleString('en'))
                        $('input[id=\'quoteNum\']').val(quoteNum)
                        //$("#DivTable").hide();
                        //Swal.fire('Quote No: ' + quoteNum)

                        //var coverTypeT = $("#coverType option:selected");

                        //Fill Table with Value
                        $('#tdOrderId').html(obj.quoteNum);

                        if (insuredType === "A") {
                            $('#tdFirstName').html(firstName + ' ' + lastName);
                            $("#trLN").hide();
                        }
                        else {
                            $('#tdFirstName').html(firstName);
                            $('#tdLastName').html(lastName);
                        }

                        $('#tdInsuranceType').html('Motor Insurance');
                        var DS = formattedDate(new Date(startDate));
                        var DE = formattedDate(new Date(endDate));
                        $('#tdStartDate').html(DS);
                        $('#tdEndDate').html(DE);

                    } else {
                        button.disabled = false;
                        button.innerHTML = 'Get Quote';
                        $(".CNext").hide();
                        toastr?.error(message);
                    }
                },
                error: function (xhr, status, error) {
                    button.disabled = false;
                    button.innerHTML = 'Get Quote';
                    console.log(xhr.responseText);
                }
            });
        }
    }

    $('#premiumA').click(function () {
        var isValid = true;

        const VehiclesList = vehicles;

        if (VehiclesList.length === 0) {
            isValid = false;
            toastr.info('Please add more than one vehicle.')
        }

        if (isValid) {

            var sumInsuredTotal = 0;
            var premiumTotal = 0;

            for (var i = 0; i < VehiclesList.length; i++) {
                sumInsuredTotal += VehiclesList[i].sumInsured;
                premiumTotal += VehiclesList[i].premium;
            }

            $('#tdVehicleValue').html(parseFloat(sumInsuredTotal).toLocaleString('en'));
            $('#tdPremium').html(parseFloat(premiumTotal).toLocaleString('en'));

            var uniqueCoverType = [...new Set(VehiclesList.map(vehicle => vehicle.coverType))];
            var coverTypeLabels = {
                "1": "Comprehensive",
                "2": "Third Party Only",
                "3": "Third Party Fire and Theft"
            };

            if (uniqueCoverType.length === 1) {
                var coverTypeValue = uniqueCoverType[0];
                var coverTypeLabel = coverTypeLabels[coverTypeValue] || "Unknown";
                $('#tdCoverType').html(coverTypeLabel);
            } else {
                $('#tdCoverType').html("Multiple");
            }

            stepper.next();
        }

    });

    $('#BtnKYC').click(function () {
        var isValid = true;

        var Doctype = $('#Doctype').val();
        var DocFile = $('#DocFile').val();

        if (Doctype == '' && DocFile != '') {
            toastr.info('Document Type is required')
            isValid = false;
        }
        if (DocFile == '' && Doctype != '') {
            toastr.info('Document File is required')
            isValid = false;
        }

        if (isValid) {
            stepper.next();
        }

    });

    $('#motorquote-form').submit(function (event) {
        event.preventDefault();

        const form = document.getElementById('motorquote-form');
        //var registrationNo = $('#registrationNo').val();
        //var vehicleMake = $('#vehicleMake').val();
        //var vehicleType = $('#vehicleType').val();
        //var chasisNo = $('#chasisNo').val();
        //var engineNo = $('#engineNo').val();
        //var yearOfMake = $('#yearOfMake').val();
        //var coverType = $('#coverType').val();
        //var premium = $('#premium').val();
        //var sumInsured = $('#sumInsured').val();

        var lastName = $('#lastName').val();
        var birthDate = $('#birthDate').val();
        var insuredType = $('#insuredType').val();
        var firstName = $('#firstName').val();
        var email = $('#email').val();
        var phoneNumber = $('#phoneNumber').val();
        var address = $('#address').val();
        var businessSector = $('#businessSector').val();
        var subClass = $('#subClass').val();
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        var motorPremium_typeOfUsage = $('#motorPremium_typeOfUsage').val();
        var motorPremium_premRate = $('#motorPremium_premRate').val();

        var quoteNum = $('#quoteNum').val();
        var attachment = $('#attachment').val();
        var creditNoteNo = $('#creditNoteNo').val();

        var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {
            keyboard: false
        })

        var buyCheckbox = document.getElementById('buy'); 
        if (!buyCheckbox.checked) {
            // Display the Bootstrap modal to confirm buy
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
            if (firstName == '') {
                Swal.fire('First Name is required.')
            } else if (insuredType == '') {
                Swal.fire('Insured Type is required.')
            } else if (email == '') {
                Swal.fire('Email is required.')
            } else if (phoneNumber == '') {
                Swal.fire('Phone Number is required.')
            } else if (address == '') {
                Swal.fire('Address is required.')
            } else if (businessSector == '') {
                Swal.fire('BusinessSector is required.')
            } else if (subClass == '') {
                Swal.fire('Sub Class is required.')
            } else if (startDate == '') {
                Swal.fire('Start Date is required.')
            } else if (endDate == '') {
                Swal.fire('End Date is required.')
            } else if (motorPremium_typeOfUsage == '') {
                Swal.fire('Usage Type is required.')
            } else if (motorPremium_premRate == '') {
                Swal.fire('Premium Rate is required.')
            } else if (quoteNum == '') {
                Swal.fire('Quote No is required.')
            } else if (creditNoteNo == '') {
                Swal.fire('CreditNote No is required.')
            } else if (attachment == '') {
                Swal.fire('Attachment is required.')
            } else {
                const vehiclesvalues = vehicles;
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'tableData';
                hiddenInput.value = JSON.stringify(vehiclesvalues);
                form.appendChild(hiddenInput);

                // Loop through all input fields and disable them
                const inputs = document.getElementById('motorquote-form').getElementsByTagName('input');
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].readOnly = true;
                }
                const select = document.getElementById('motorquote-form').getElementsByTagName('select');
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

    function formattedDate(date) {
        var today = date;
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
        return today;
    }


    $('#vehicleMake').change(function () {
        var selectedMake = $(this).val();
        showLoadingIndicator();
        $.ajax({
            url: '/Underwriting/GetCarModels',
            data: { carName: selectedMake },
            type: 'POST',
            success: function (result) {

                const res = result;
                const message = res.message;
                if (message == 'retrieved successfully') {
                    const obj = res.data;
                    var options = '<option value="">Vehicle Model</option>';
                    for (var i = 0; i < obj.length; i++) {
                        options += '<option value="' + obj[i].value + '">' + obj[i].value + '</option>';
                    }
                    $('#vehicleType').html(options);
                    hideLoadingIndicator();
                } else {
                    toastr.info(message);
                    hideLoadingIndicator();
                }
            },
            error: function (xhr, status, error) {
                toastr.info("Something went wrong.");
                hideLoadingIndicator();
            }
        });
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


