// Setup / newBroker js file

// BS-Stepper Init
document.addEventListener('DOMContentLoaded', function () {
    window.stepper = new Stepper(document.querySelector('.bs-stepper'))
})
//document.getElementById("Qnext").disabled = true;
$(function () {
    var stepper = new Stepper(document.querySelector('.bs-stepper'));
    // Show the loading indicator
    function showLoadingIndicator() {
        $('.loading-indicator').removeClass('d-none');
    }

    // Hide the loading indicator
    function hideLoadingIndicator() {
        $('.loading-indicator').addClass('d-none');
    }

    // get products to determine amount and rate 
    $(document).on('input change', '#productId', function () {
        var productId = $('#productId').val();
        var data = JSON.parse(document.getElementById("Vproducts").value);

        data.forEach(myFunction);

        function myFunction(item) {
            if (item.id == productId) {
                $('input[id=\'premiumRate\']').val(item.rate)
                $('input[id=\'premiumAmount\']').val(item.amount)

                if (item.updateOption == "RateOnly") {
                    document.getElementById("premiumAmount").readOnly = true;
                    document.getElementById("premiumRate").readOnly = false;
                }
                if (item.updateOption == "AmountOnly") {
                    document.getElementById("premiumAmount").readOnly = false;
                    document.getElementById("premiumRate").readOnly = true;
                }
                if (item.updateOption == "None") {
                    document.getElementById("premiumAmount").readOnly = true;
                    document.getElementById("premiumRate").readOnly = true;
                }
            }
        }
    });



    sanitizeInputToAcceptNumbers('#phone');
    sanitizeInputToAcceptNumbers('#initialWalletAmount');
     
    sanitizeInputToAcceptNumbersAndAlphabetsWithSpace('#address');  
     
    sanitizeInputToAcceptPercentage('premiumRate');
     

    // get broker details by brokerId
    var brokerId = document.getElementById("brokerId");
    brokerId.addEventListener("blur", function () {
        makeAjaxRequest();
    });
    function makeAjaxRequest() {
        // Your AJAX request code here
        var brokerId = $('#brokerId');
        if (brokerId.val() == '') {
            //var validationSpan = document.querySelector('span[data-valmsg-for="brokerId"]');
            //validationSpan.innerText = "The broker code field is required.";
            brokerId.addClass('is-invalid');
        } else {
            brokerId.removeClass('is-invalid');
            showLoadingIndicator();
            $.ajax({
                url: '/Setup/brokerInfo',
                headers: {
                    'RequestVerificationToken': $('input[name="__RequestVerificationToken"]').val()
                },
                data: {
                    brokerId: brokerId.val()
                },
                type: 'POST',
                success: function (result) {
                    const res = result;
                    const status = res.status;
                    const message = res.message;

                    if (status == 'Success') {
                        const obj = res.data;

                        hideLoadingIndicator();

                        $('input[id=\'name\']').val(obj.name)
                        $('input[id=\'phone\']').val(obj.mobileNo)
                        $('input[id=\'email\']').val(obj.email)
                        $('input[id=\'address\']').val(obj.address + " " + obj.address2)

                    } else {
                        hideLoadingIndicator();
                        res.errors.forEach(function (error) {
                            toastr.info(error)
                        });
                    }
                },
                error: function (xhr, status, error) {
                    $("#process").hide();
                    console.log(xhr.responseText);
                }
            });
        }
    }


    // add product to product table
    const tablediv = document.getElementById('divTB');
    $(tablediv).hide();


    var products = []; // An array to store the table data
    var comm = [];

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



    $(document).on('click', '#Qnext', function () {
        var isValid = true;
       

        $('#ValidateInputPre input, #ValidateInputPre select').each(function () {
            var field = $(this);
            var fieldValue = field.val().trim();

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

            if (fieldValue === '') {
                field.addClass('is-invalid');
                isValid = false;
            } else {
                field.removeClass('is-invalid');
            }
        });
         
        // Attach event listeners for change events on fields
        $('#ValidateInputPre input, #ValidateInputPre select').on('change', function () {
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
            stepper.next();
        }
    });



    $("#communicationMails").email_multiple({

    })

    // trim communication mail input
    $('#communicationMails').focus(function () {
        var inputValue = $(this).val();
        var trimmedValue = inputValue.trim();
        $(this).val(trimmedValue);
    });

    $('#addBtn').click(function () {
        var productid = $('#productId').val();
        var productRate = $('#premiumRate').val();
        var premiumAmount = $('#premiumAmount').val();

        var productName = $("#productId option:selected").text();

        if (productid && productRate) {
            // Create a new table row with the values
            var newRow = $('<tr><td class="text-left" data-product-id="' + productid + '">' +
                productName + '</td> <td class="text-left" data-product-amount="' + premiumAmount + '">' +
                premiumAmount + '</td> <td class="text-left" data-product-rate="' + productRate + '">' +
                productRate + '</td> <td>' +
                '<a class="btn btn-sm removeDateFieldButton" style="color:#900000"><i class="fa-solid fa-trash-can"></i></a>' + '</td>' +
                '</tr>');

            // Append the new row to the table
            $('#tb tbody').append(newRow);

            //Show the table
            $(tablediv).show('fade');

            // Disable the selected option in the productid select field
            $('#productId option:selected').prop('disabled', true);

            // Reset the productRate input field
            $('#productId').val('');
            $('#premiumRate').val('');
            $('#premiumAmount').val('');

            // Add the row data to the products array
            products.push({
                productId: productid,
                premiumAmount: premiumAmount,
                premiumRate: productRate
            });
            console.log("add " + JSON.stringify(products));



        } else {
            toastr.error('Product and Premium Rate required');
        }
    });
    $(document).on('click', '.removeDateFieldButton', function () {
        // Get the product ID of the row to be removed
        var productId = $(this).closest('tr').find('td[data-product-id]').data('product-id');
        var productAmount = $(this).closest('tr').find('td[data-product-amount]').data('product-amount');
        var productRate = $(this).closest('tr').find('td[data-product-rate]').data('product-rate');

        products = $.grep(products, function (e) {
            console.log("Product ID " + productId);
            //console.log("Product.... ID " + product.productId);
            return e.productId != productId;
        });

        // Remove the row from the table
        $(this).closest('tr').remove();

        // Enable the corresponding option in the productid select field
        $('#productId option[value="' + productId + '"]').prop('disabled', false);

    });
    $('#NewBroker-form').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        var isValid = true;

        $('#ValidateProduct input, #ValidateProduct select').each(function () {
            var field = $(this);

            if (products.length === 0) {
                isValid = false;

                //$('#productId').addClass('is-invalid');
                //$('#premiumAmount').addClass('is-invalid');
                //$('#premiumRate').addClass('is-invalid');
            } else {
                //$('#productId').removeClass('is-invalid');
                //$('#premiumAmount').removeClass('is-invalid');
                //$('#premiumRate').removeClass('is-invalid');
            }
        });

        $('#ValidateProduct input, #ValidateProduct select').on('change', function () {
            if (products.length === 0) {
                isValid = false;
                
                //$('#productId').addClass('is-invalid');
                //$('#premiumAmount').addClass('is-invalid');
                //$('#premiumRate').addClass('is-invalid');
            } else {
                isValid = true;
                //$('#productId').removeClass('is-invalid');
                //$('#premiumAmount').removeClass('is-invalid');
                //$('#premiumRate').removeClass('is-invalid');
            }
        });

        if (isValid) {
         
            const form = document.getElementById('NewBroker-form');

            var productid = $('#productId').val();
            var productRate = $('#premiumRate').val();
            var premiumAmount = $('#premiumAmount').val();
            if (productid == '' && productRate == '' && premiumAmount == '') {
                const values = products;
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'tableData';
                hiddenInput.value = JSON.stringify(values);
                form.appendChild(hiddenInput);

                const values2 = comm;
                const hiddenInput2 = document.createElement('input');
                hiddenInput2.type = 'hidden';
                hiddenInput2.name = 'commData';
                hiddenInput2.value = JSON.stringify(values2);
                form.appendChild(hiddenInput2);

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
            } else {
                Swal.fire('Only products in the table will be submitted.')
            }
        }
    });



    //Datatables
    $(document).ready(function () {
        $('#tbbrokers').DataTable();
    });
});












