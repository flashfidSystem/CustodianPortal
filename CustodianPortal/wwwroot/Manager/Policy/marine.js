
// BS-Stepper Init
document.addEventListener('DOMContentLoaded', function () {
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
})

const acceptTerms = document.getElementById('acceptTerms');
const loadingCheck = document.getElementById('isLoading');
const loadingInput = document.getElementById('loading');
const buyPolicy = document.getElementById('buyPolicy');

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
        $('#transDate').attr('min', maxDate);
        $('#startDate').attr('min', maxDate);
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


    function handlecertificateNum() {
        var certificateNum = $("#certificateNum").val();
        showLoadingIndicator();
        $.ajax({
            url: '/Policy/getMarineDetails',
            data: { certificateNum: certificateNum },
            type: 'POST',
            success: function (result) {
                if (result.message === "Operation Successful") {
                    // Populate form fields with data from the response
                    $('#certificateNum').val(result.data.certificateNum);
                    $('#policyNum').val(result.data.policyNo);
                    //$('#insuredType').val(result.data.occupation);
                    $('#occupation').val(result.data.occupation);
                    $('#taxIdNo').val(result.data.taxId);
                    $('#branch').val(result.data.branch);
                    $('#conveyance').val(result.data.conveyance);
                    handleconveyance();
                    $('#clauseType').val(result.data.clauseType);
                    $('#from').val(result.data.from);
                    $('#to').val(result.data.to);
                    $('#excess').val(result.data.excess);
                    $('#natureOfCargo').val(result.data.natureOfCargo);
                    //$('#performaInv').val(result.data.invoiceNum);
                    //$('#goodsPackage').val(result.data.goodsPackage);
                    $('#description').val(result.data.description);
                    $('#currency').val(result.data.currency);
                    $('#exchangeRate').val(result.data.exchangeRate);
                    $('#invoiceValue').val(result.data.invoiceVal);
                    $('#premiumRate').val(result.data.premRate);
                    //$('#isLoading').prop('checked', result.data.isLoading);
                    //$('#loading').val(result.data.loading);
                    $('#insuredValue').val(result.data.insuredValue);
                    $('#premium').val(result.data.premium);
                    $('#transDate').val(result.data.transDate);
                    $('#startDate').val(result.data.startDate);

                    hideLoadingIndicator();
                } else {
                    toastr.info("Certificate Number not valid");
                    hideLoadingIndicator();
                }

            },
            error: function (xhr, status, error) {
                toastr.info("Something went wrong.");
                hideLoadingIndicator();
            }
        });
    }
    $("#certificateNum").change(handlecertificateNum);



    //End


    //Get clause Type

    function handleconveyance() {
        var conveyance = $("#conveyance").val();
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
                    var options = '';
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
    }

    if ($("#conveyance").val()) {
        handleconveyance();
    }

    $("#conveyance").change(handleconveyance);




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

        $('.one input, .one select').not('#policyNo').each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('.one input, .one select').not('#policyNo').each(function () {
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

    $('#twoNext').click(function () {

        var isValid = true;

        $('.two input, .two select, .two textarea').each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

        });

        $('.two input, .two select, .two textarea').each(function () {
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


    $('#marine-form').submit(function (event) {
        event.preventDefault();

        const form = document.getElementById('marine-form');
        var isValid = true;

        $('.three input, .three select').not('#loading, #exchangeRate').each(function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }
        });

        $('.three input, .three select').not('#loading, #exchangeRate').each(function () {
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


});
