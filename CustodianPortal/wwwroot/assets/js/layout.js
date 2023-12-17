
var myModal = new bootstrap.Modal(document.getElementById('inactivityModal'), {
    keyboard: false
})

var inactivityTimeout;
var inactivityDuration = 10 * 60 * 1000; // 10 minutes (in milliseconds)
var logoutTimeout;
var countdownInterval;

function resetInactivityTimer() {
    clearTimeout(inactivityTimeout);
    clearTimeout(logoutTimeout);
    clearInterval(countdownInterval);

    inactivityTimeout = setTimeout(showConfirmationPopup, inactivityDuration);
}

function showConfirmationPopup() {

    myModal.show()
    //$('#inactivityModal').modal('show');

    var countdownDuration = 10 * 60; // 10 minutes (in seconds)
    var countdownDisplay = $('#modalCountdown');

    countdownInterval = setInterval(function () {
        var minutes = Math.floor(countdownDuration / 60);
        var seconds = countdownDuration % 60;
        countdownDisplay.text(minutes + 'm ' + seconds + 's');

        countdownDuration--;

        if (countdownDuration < 0) {
            clearInterval(countdownInterval);
            logoutUser();
        }
    }, 1000);

    $('#modalContinueBtn').on('click', function () {
        //$('#inactivityModal').modal('hide');
        myModal.hide()

        resetInactivityTimer();
    });

    $('#modalLogoutBtn').on('click', function () {
        logoutUser();
    });
}

function logoutUser() {
    myModal.hide()
    window.location.href = '/Account/LogOut';
}

$(document).ready(function () {
    resetInactivityTimer();
});

$(document).on('click keydown', function () {
    resetInactivityTimer();
});

//Offline status check
function checkInternetConnection() {
    // Create an element to check the internet connection
    var connectionElement = document.createElement("div");
    connectionElement.classList.add("online-check");

    // Add event listeners to check the connection status
    window.addEventListener("online", updateConnectionStatus);
    window.addEventListener("offline", updateConnectionStatus);

    // Function to update the connection status based on the online/offline events
    function updateConnectionStatus() {
        var isOnline = navigator.onLine;

        if (isOnline) {
            // Online - Remove the connection check element if it exists
            toastr.clear();
            if (connectionElement.parentNode) {
                connectionElement.parentNode.removeChild(connectionElement);
            }
        } else {
            // Offline - Show the toast message
            if (!connectionElement.parentNode) {
                document.body.appendChild(connectionElement);
                toastr.options = {
                    closeButton: true,
                    closeDuration: 0,
                    timeOut: 0,
                    extendedTimeOut: 0,
                    tapToDismiss: false,
                    preventDuplicates: true,
                    preventOpenDuplicates: true,
                    positionClass: "toast-top-right",
                    progressBar: false,
                    newestOnTop: false,
                };
                toastr.error("No internet connection", "Offline");
            }
        }
    }

    // Initial check on page load
    updateConnectionStatus();
}

// Call the checkInternetConnection function to start checking the internet connection
checkInternetConnection();


function sanitizeInputToAcceptNumbers(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let value = this.value.trim();
            if (value.length > 90) {
                value = value.slice(0, 90);
            }
            this.value = value.replace(/\D/g, '');
        });
    });
}



function sanitizeInputToTaxID(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        let constantValueAdded = false; // Track if constant value has been added
        input.addEventListener('input', function (event) {
            let value = this.value.trim();

            // Check if constant value is present
            const constantIndex = value.indexOf('-0001');
            if (constantIndex !== -1) {
                // Remove any characters after the constant value
                value = value.slice(0, constantIndex + 5);
            } else {
                // If constant value is not present, add it
                value += "-0001";
            }

            // Apply regex pattern
            const regex = /^[0-9\-]{0,90}-0001$/;
            if (!regex.test(value) || (event.inputType === 'insertText' && event.data === ' ')) {
                // Value does not match the pattern or spacebar is pressed, reset to previous valid value
                this.value = this.previousValue || '';
            } else {
                // Value matches the pattern, update previous valid value
                this.previousValue = value;
                this.value = value;
            }
        });
    });
}
 


function sanitizeInputToAcceptNumbersAndAlphabetsWithSpace(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let value = this.value;
            if (value.length > 90) {
                value = value.slice(0, 90);
            }
            this.value = value.replace(/[^a-zA-Z0-9 ]/g, '');
        });
    });
}
function sanitizeInputToAcceptNumbersAndAlphabetsWithSpace(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let value = this.value;
            if (value.length > 90) {
                value = value.slice(0, 90);
            }
            this.value = value.replace(/[^a-zA-Z0-9 ]/g, '');
        });
    });
}
function sanitizeInputToAcceptNumbersAndAlphabets(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let value = this.value.trim();
            if (value.length > 90) {
                value = value.slice(0, 90);
            }
            this.value = value.replace(/[^a-zA-Z0-9 ]/g, '');
        });
    });
}


function sanitizeInputToAcceptAlphabets(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let value = this.value.trim();
            if (value.length > 90) {
                value = value.slice(0, 90);
            }
            this.value = value.replace(/[^a-zA-Z\s]+/g, '');
        });
    });
}
function sanitizeInputToAcceptAlphabetsWithSpace(inputSelector) {
    const inputs = document.querySelectorAll(inputSelector);
    inputs.forEach(function (input) {
        input.addEventListener('input', function () {
            let value = this.value;
            if (value.length > 90) {
                value = value.slice(0, 90);
            }
            this.value = value.replace(/[^a-zA-Z\s]+/g, '');
        });
    });
}

 
function sanitizeInputToAcceptPercentage(inputId) {
    const inputElement = document.getElementById(inputId);
    inputElement.addEventListener('input', function () {
        const value = inputElement.value.replace('', '');
        if (value >= 0 && value <= 100) {
            inputElement.value = value.replace('%', '') + '';
        } else {
            inputElement.value = value.slice(0, -1) + '';
        }
    });
}