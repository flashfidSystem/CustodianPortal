
// BS-Stepper Init
document.addEventListener('DOMContentLoaded', function () {
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
})

const acceptTerms = document.getElementById('acceptTerms');
const loadingCheck = document.getElementById('isLoading');
const loadingInput = document.getElementById('loading');
const buyPolicy = document.getElementById('buyPolicy');
const transDate = document.getElementById('transDate');
const startDate = document.getElementById('startDate');
const taxIdNo = document.getElementById('taxIdNo');


// Get today's date
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const currentDate = `${year}-${month}-${day}`;

// Set the inputs' values to today's date and make them readonly
transDate.value = currentDate;
transDate.setAttribute('readonly', true);
startDate.value = currentDate;
startDate.setAttribute('readonly', true);




// Add an event listener to the checkbox for changes
loadingCheck.addEventListener('change', function () {
    $('input[id=\'loading\']').val('')
    loadingInput.readOnly = !loadingCheck.checked;
});

$('#currency').on('change', function () {
    var currencyVal = $('#currency').val();
    if (currencyVal === "1") {
        $('#exchangeRate').prop('readonly', true);
        $('input[id=\'exchangeRate\']').val('')
    } else {
        $('#exchangeRate').prop('readonly', false);
        $('input[id=\'exchangeRate\']').val('')
    }
});


// Ensure the loading input is read-only by default
loadingInput.readOnly = true;
buyPolicy.disabled = true;

acceptTerms.addEventListener('change', function () {
    buyPolicy.disabled = !acceptTerms.checked;
});


$(document).ready(function () {
    var stepper = new Stepper(document.querySelector('.bs-stepper'));

    // bs steper previous
    $(document).on('click', '.previous', function () {
        stepper.previous();
    });

    // Show the loading indicator
    function showLoadingIndicator() {
        $('.loading-indicator').removeClass('d-none');
    }

    // Hide the loading indicator
    function hideLoadingIndicator() {
        $('.loading-indicator').addClass('d-none');
    }

    ////Rate
    let premiumRate = document.getElementById('premiumRate');
    premiumRate.addEventListener('input', function () {
        const n = premiumRate.value.replace('', '');
        if (n >= 0 && n <= 100) {
            premiumRate.value = premiumRate.value.replace('%', '') + ''
        } else {
            premiumRate.value = n.slice(0, -1) + ''
        }
    })


    const taxIdInput = document.getElementById('taxIdNo');

    taxIdInput.addEventListener('input', function () {
        const value = this.value;
        const pattern = /^(\d{8}-0001)$/;

        if (!pattern.test(value)) {
            this.setCustomValidity('Invalid tax ID format. Please use the format 23232323-0001.');
            $('#taxIdNo').addClass('is-invalid'); 
        } else {
            this.setCustomValidity('');
        }
    });

    const exchangeRateInput = document.getElementById('exchangeRate');
    exchangeRateInput.addEventListener('input', function () {
        let exchangeRateValue = exchangeRateInput.value.trim();
        if (exchangeRateValue.length > 90) {
            exchangeRateValue = exchangeRateValue.slice(0, 90);
        }
        exchangeRateInput.value = exchangeRateValue.replace(/\D/g, '');
    });
    const premiumInput = document.getElementById('premium');
    premiumInput.addEventListener('input', function () {
        let premiumValue = premiumInput.value.trim();
        if (premiumValue.length > 90) {
            premiumValue = premiumValue.slice(0, 90);
        }
        premiumInput.value = premiumValue.replace(/\D/g, '');
    });
    const invoiceInput = document.getElementById('invoiceValue');
    invoiceInput.addEventListener('input', function () {
        let invoiceValue = invoiceInput.value.trim();
        if (invoiceValue.length > 90) {
            invoiceValue = invoiceValue.slice(0, 90);
        }
        invoiceInput.value = invoiceValue.replace(/\D/g, '');
    });
    const loadingInput = document.getElementById('loading');
    loadingInput.addEventListener('input', function () {
        let loadingValue = loadingInput.value.trim();
        if (loadingValue.length > 90) {
            loadingValue = loadingValue.slice(0, 90);
        }
        loadingInput.value = loadingValue.replace(/\D/g, '');
    });

    const insuredValueInput = document.getElementById('insuredValue');
    insuredValueInput.addEventListener('input', function () {
        let insuredValue = insuredValueInput.value.trim();
        if (insuredValue.length > 90) {
            insuredValue = insuredValue.slice(0, 90);
        }
        insuredValueInput.value = insuredValue.replace(/\D/g, '');
    });
    const phoneNumberValueInput = document.getElementById('phoneNumber');
    phoneNumberValueInput.addEventListener('input', function () {
        let phoneNumberValue = phoneNumberValueInput.value.trim();
        if (phoneNumberValue.length > 90) {
            phoneNumberValue = phoneNumberValue.slice(0, 90);
        }
        phoneNumberValueInput.value = phoneNumberValue.replace(/\D/g, '');
    });


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
                            policyNumber: customer.policyNumber,
                            taxId: customer.taxId,
                            userName: customer.userName,
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
        if (repo.userName != null) {
            $('#userName').val(repo.userName);
            $('#userName').prop('readonly', true);
        }
        if (repo.policyNumber != null) {
            $('#policyNo').val(repo.policyNumber);
            $('#policyNo').prop('readonly', true);
        }
        if (repo.taxId != null) {
            $('#taxIdNo').val(repo.taxId);
            $('#taxIdNo').prop('readonly', true);
        }

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

    //Get clause Type
    $(document).ready(function () {
        $('#conveyance').change(function () {
            var conveyance = $(this).val();
            showLoadingIndicator();
            $.ajax({
                url: '/Underwriting/GetModeOfConveyance',
                data: { conveyance: conveyance },
                type: 'POST',
                success: function (result) {

                    const res = result;
                    const message = res.message;
                    if (message == 'Success') {
                        const obj = res.data;
                        var options = '<option value="">Please Select</option>';;
                        for (var i = 0; i < obj.length; i++) {
                            options += '<option value="' + obj[i] + '">' + obj[i] + '</option>';
                        }
                        $('#clauseType').html(options);
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
    });

    $('#isLoading').on('change', function () {
        var isChecked = $(this).is(':checked');

        $('#isLoading').not(this).prop('checked', false);
        $('#isLoading').val('false');

        var v = isChecked ? 'true' : 'false';

        // Set the value attribute of the checkbox element
        $(this).val(v);
    });

    // Get premium for motor
    document.getElementById("getPremium").addEventListener("click", GetPremium, false);
    function GetPremium() {

        var isValid = true;

        var exchangeRate = $('#exchangeRate').val();
        var premiumRate = $('#premiumRate').val();
        var invoiceValue = $('#invoiceValue').val();
        var currency = $('#currency').val();
        var loading = $('#loading').val();
        var isLoading = $('#isLoading').val();;
        console.log(loading);
        console.log(isLoading);
        if (invoiceValue === '') {
            isValid = false;
            toastr?.info("Invoice Value is required");
        }
        if (premiumRate === '') {
            isValid = false;
            toastr?.info("Premium Rate is required");
        }
        if (currency === '') {
            isValid = false;
            toastr?.info("Currency Type is required.");
        }

        if (currency !== "1") {
            if (exchangeRate === '') {
                isValid = false;
                toastr?.info("Exchange Rate is required.");
            }
        }
        if (isLoading === "true" && (loading === '' || loading === 0)) {
            isValid = false;
            toastr?.info("Loading is required.");
        }
        if (isLoading === "true" && loading < 10) {
            isValid = false;
            toastr?.info("Loading must be greater than 10");
        }
        if (isValid) {

            var button = document.getElementById('getPremium');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';

            $.ajax({
                url: '/Underwriting/marinepremium',
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                data: { exchangeRate: exchangeRate, premiumRate: premiumRate, invoiceValue: invoiceValue, currency: currency, isLoading: isLoading, loading: loading },
                type: 'POST',
                success: function (result) {
                    const res = result;
                    const message = res.message;

                    if (message == 'Operation Successful') {
                        const obj = res.data;

                        $('input[id=\'premium\']').val(parseFloat(obj.premium).toLocaleString('en'))
                        $('input[id=\'insuredValue\']').val(parseFloat(obj.insuredValue).toLocaleString('en'))

                        button.disabled = false;
                        button.innerHTML = 'Calculate';

                    } else {
                        button.disabled = false;
                        button.innerHTML = 'Calculate';
                        $(".CNext").hide();
                        toastr?.error(message);
                    }
                },
                error: function (xhr, status, error) {
                    button.disabled = false;
                    button.innerHTML = 'Calculate';
                    console.log(xhr.responseText);
                }
            });
        }

    }

    $('.three input, .three select').not('#transDate, #startDate').each(function () {
        var field = $(this);

        field.on('change', function () {
            $('input[id=\'premium\']').val('')
            $('input[id=\'insuredValue\']').val('')
        });
    });

    $('#oneNext').click(function () {

        var isValid = true;
        $('.one input, .one select').not('#policyNo, .CIT').each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }



        });

        $('.one input, .one select').not('#policyNo, .CIT').each(function () {
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

        const taxIdInput = document.getElementById('taxIdNo');
        const value = taxIdInput.value;
        const pattern = /^(\d{8}-0001)$/;

        if (!pattern.test(value)) {
            this.setCustomValidity('Invalid tax ID format. Please use the format 23232323-0001.');
            $('#taxIdNo').addClass('is-invalid');
            isValid = false;
        } else {
            this.setCustomValidity('');
        }

        if (isValid) {
            $("#process").show();
            stepper.next();
            $("#process").hide();
        }

    });

    $('#twoNext').click(function () {

        var isValid = true;

        $('.two input, .two select, .two textarea').not('#firstLossPayeeBank').each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('.two input, .two select, .two textarea').not('#firstLossPayeeBank').each(function () {
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
            $("#process").show();
            stepper.next();
            $("#process").hide();
        }

    });


    $('#marinequote-form').submit(function (event) {
        event.preventDefault();

        const form = document.getElementById('marinequote-form');
        var isValid = true;

        $('.three input, .three select').not('#loading,#exchangeRate,#firstLossPayeeBank').each(function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        $('.three input, .three select').not('#loading,#exchangeRate,#firstLossPayeeBank').each(function () {
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
            // Loop through all input fields and disable them
            const inputs = form.getElementsByTagName('input');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].readOnly = true;
            }
            const select = form.getElementsByTagName('select');
            for (let i = 0; i < select.length; i++) {
                select[i].readOnly = true;
            }
            var button = document.getElementById('buyPolicy');
            button.disabled = true;
            button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';

            $("#process").show();
            form.submit();
        }
    });

    // Function to format the input value with commas
    function formatNumber(input) {
        var value = input.value.replace(/\D/g, '');
        var formattedValue = new Intl.NumberFormat('en-US').format(value);
        input.value = formattedValue;
    }

    // Add an event listener to the input field for formatting
    var sumInsuredInput = document.getElementById('invoiceValue');
    sumInsuredInput.addEventListener('input', function () {
        formatNumber(this);
    });


    var base64PDF = document.getElementById('certificate').textContent.trim();
    var message = document.getElementById('messagetrigger').textContent.trim();
    var certNo = document.getElementById('certificateNumber').textContent.trim();

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



//$(function () {
//    var dtToday = new Date();

//    var month = dtToday.getMonth() + 1;
//    var day = dtToday.getDate();
//    var year = dtToday.getFullYear();

//    if (month < 10)
//        month = '0' + month.toString();
//    if (day < 10)
//        day = '0' + day.toString();

//    var maxDate = year + '-' + month + '-' + day;
//    transDate.attr('min', maxDate);
//    startDate.attr('min', maxDate);
//});
