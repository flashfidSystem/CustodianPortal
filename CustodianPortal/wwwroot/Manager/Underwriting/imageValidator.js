
// Function to handle file upload and validation
function validate(input) {
    const file = input.files[0];

    // Check if a file is selected
    if (!file) {
        toastr.error('Please select a file.');
        input.value = "";
        return;
    }


    // Get the file extension from the MIME type and convert to lowercase
    const fileType = file.type.toLowerCase();
    const fileExtension = fileType.split('/').pop();

    // Check file format (only images (JPEG, PNG) and PDFs allowed) and convert extensions to lowercase
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
    if (!allowedExtensions.includes(fileExtension)) {
        toastr.error('Invalid file format. Only images (JPEG, PNG) and PDFs are allowed.');
        input.value = "";
        return;
    }

    // Check file size (limit to 4MB, adjust as needed)
    const maxSize = 2 * 1024 * 1024; // 2 MB
    if (file.size > maxSize) {
        toastr.error('File size exceeds the limit (2MB).');
        input.value = "";
        return;
    }



    // Read and render the file
    const reader = new FileReader();

    reader.onload = function (event) {
        if (fileType.startsWith('image/')) {
            Swal.fire({
                title: 'Uploaded Image',
                imageUrl: event.target.result,
                imageAlt: 'Uploaded Image',
            });
        } else if (fileType === 'application/pdf') {
            Swal.fire({
                title: 'Uploaded PDF',
                html: `<iframe src="${event.target.result}" width="100%" height="400px"></iframe>`,
            });
        } else {
            showAlert('Error', 'Unsupported file format.', 'error');
            input.value = "";
        }
    };

    // Read the file content
    reader.readAsDataURL(file);
}

// Helper function to show SweetAlert
function showAlert(title, message, icon) {
    Swal.fire({
        title,
        text: message,
        icon,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
    });
}
