// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function showSpinner(buttonId) {
    var button = document.getElementById(buttonId);
    if (button) {
        button.disabled = true;
        button.innerHTML = '<i class="fas fa-spinner fa-pulse fa-5x"></i>';
    }
}

function hideSpinner(buttonId,label) {
    var button = document.getElementById(buttonId);
    if (button) {
        button.disabled = false;
        button.innerHTML = label;
    }
}