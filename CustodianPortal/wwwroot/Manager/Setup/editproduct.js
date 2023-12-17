// Setup / EditProduct js file


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



    // allow ony Rate
    let premiumRate = document.getElementById('premiumRate');
    premiumRate.addEventListener('input', function () {
        const n = premiumRate.value.replace('', '');
        if (n >= 0 && n <= 100) {
            premiumRate.value = premiumRate.value.replace('%', '') + ''
        } else {
            premiumRate.value = n.slice(0, -1) + ''
        }
    })



    // add product to product table
    const tablediv = document.getElementById('divTB');
    $(tablediv).hide();


    var products = []; // An array to store the table data

    var Uproduct = JSON.parse(document.getElementById("Userproducts").value);

    function addProductToTable(productid, productName, premiumAmount, productRate) {
        // Create a new table row with the values
        var newRow = $('<tr><td class="text-left" data-product-id="' + productid + '">' +
            productName + '</td> <td class="text-left" data-product-amount="' + premiumAmount + '">' +
            premiumAmount + '</td> <td class="text-left" data-product-rate="' + productRate + '">' +
            productRate + '</td> <td>' +
            '<a class="btn btn-sm removeDateFieldButton" style="color:#900000"><i class="fa-solid fa-trash-can"></i></a>' + '</td>' +
            '</tr>');

        // Append the new row to the table
        $('#tb tbody').append(newRow);
        $(tablediv).show();
        // Disable the selected option in the productid select field
        $('#productId option[value="' + productid + '"]').prop('disabled', true);
    }

    $('#addBtn').click(function () {
        var productid = $('#productId').val();
        var productRate = $('#premiumRate').val();
        var premiumAmount = $('#premiumAmount').val();

        var productName = $("#productId option:selected").text();

        if (productid && productRate) {
            // Add the row data to the products array
            products.push({
                productId: productid,
                premiumAmount: premiumAmount,
                premiumRate: productRate
            });

            // Call the function to add the product to the table
            addProductToTable(productid, productName, premiumAmount, productRate);

            // Reset the input fields
            $('#productId').val('');
            $('#premiumRate').val('');
            $('#premiumAmount').val('');
        } else {
            toastr.error('Product and Premium Rate required');
        }
        console.log(products);
    });

    // Check if Uproduct array is not empty
    if (Uproduct && Uproduct.length > 0) {
        // Loop through the Uproduct array and populate the previous products into the table
        Uproduct.forEach(function (product) {
            var productid = product.id;
            var productRate = product.rate;
            var premiumAmount = product.amount;

            // Get the product name based on the productid
            var productName = $("#productId option[value='" + productid + "']").text();

            // Call the function to add the product to the table
            addProductToTable(productid, productName, premiumAmount, productRate);

            // Disable the selected option in the productid select field
            $('#productId option[value="' + productid + '"]').prop('disabled', true);

            // Add the product to the products array
            products.push({
                productId: productid,
                premiumAmount: premiumAmount,
                premiumRate: productRate
            });
        });
        //console.log(products);
        //console.log(Uproduct);
    }


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
    $('#EditProduct-form').submit(function (event) {
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

            const form = document.getElementById('EditProduct-form');

            var productid = $('#productId').val();
            var productRate = $('#premiumRate').val();
            var premiumAmount = $('#premiumAmount').val();
            if (productid == '' && productRate == '' && premiumAmount == '') {
                const values = products;
                const hiddenInput = document.createElement('input');
                hiddenInput.type = 'hidden';
                hiddenInput.name = 'productData';
                hiddenInput.value = JSON.stringify(values);
                form.appendChild(hiddenInput);



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
                toastr.info('Only products in the table will be submitted.')
            }
        }
    });

});












