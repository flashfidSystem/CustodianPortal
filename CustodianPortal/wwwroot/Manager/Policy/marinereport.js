$(document).ready(function () {

    //hide loading icon when the page has finished loading
    $(window).on('load', function () {
        $('#loading-icon').hide();
        $('table').removeClass('loading');
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

        $('#startDate').attr('max', maxDate);
        $('#endDate').attr('max', maxDate);


        var startDate2 = $('#startDate').val();
        var dtToday2 = new Date(startDate2);
        var month2 = dtToday2.getMonth() + 1;
        var day2 = dtToday2.getDate();
        var year2 = dtToday2.getFullYear();
        if (month2 < 10)
            month2 = '0' + month2.toString();
        if (day2 < 10)
            day2 = '0' + day2.toString();
        var maxDate2 = year2 + '-' + month2 + '-' + day2;
        $('#endDate').attr('min', maxDate2);
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
    });

    $('#marine-form').submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        var isValid = true;
        var policyNo = $('#policyNo').val().trim();
        var certNum = $('#certNum').val().trim();
        var userName = $('#userName').val().trim();

        if (policyNo !== '' && certNum !== '' && userName !== '') {
            toastr.info('You can either search with policyNo or CertNo or Username.');
            isValid = false;
        } else if (policyNo !== '' && certNum !== '' && userName === '') {
            toastr.info('You can either search with policyNo or CertNo or Username.');
            isValid = false;
        } else if (policyNo !== '' && certNum === '' && userName !== '') {
            toastr.info('You can either search with policyNo or CertNo or Username.');
            isValid = false;
        } else if (policyNo === '' && certNum !== '' && userName !== '') {
            toastr.info('You can either search with policyNo or CertNo or Username.');
            isValid = false;
        }  

        $('#searchform input').not('#policyNo,#certNum,#userName').each(function () {
            var fieldValue = $(this).val().trim();
            if (fieldValue === '') {
                isValid = false;
                $(this).addClass('is-invalid');
            } else {
                $(this).removeClass('is-invalid');
            }

            //// Username length check
            //if ($(this).attr('id') === 'policyNo') {
            //    if (fieldValue.length < 6) {
            //        isValid = false;
            //        $(this).addClass('is-invalid');
            //    }
            //}

        });

        $('#searchform input').not('#policyNo,#certNum,#userName').each(function () {
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

            const form = document.getElementById('marine-form');

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

            $('#loading-icon').show();
            $('table').addClass('loading');

            form.submit();

        }
    });
});
