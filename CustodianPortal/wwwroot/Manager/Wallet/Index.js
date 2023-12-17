const amountValueInput = document.getElementById('amount');
amountValueInput.addEventListener('input', function () {
    let amountValue = amountValueInput.value.trim();
    if (amountValue.length > 90) {
        amountValue = amountValue.slice(0, 90);
    }
    amountValueInput.value = amountValue.replace(/\D/g, '');
});

function Submit(event) {
    event.preventDefault();
    var amount = $('#amount').val();

    if (amount == '') {
        toastr.info("Amount is required."); 
    } else {
        // Loop through all input fields and disable them
        const inputs = document.getElementById('found-form').getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].readOnly = true;
        }
      
        var button = document.getElementById('sub');
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5"></i>';
        document.getElementById('found-form').submit();
    }
}

$(document).ready(function () {
    $('#tbpending').DataTable();
    $('#tbapproved').DataTable();
});