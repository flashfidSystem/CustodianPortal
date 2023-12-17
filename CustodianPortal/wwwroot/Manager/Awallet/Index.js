//function Submit(event) {
//    event.preventDefault();
//    var description = $('#description').val();

//    if (description == '') {
//        Swal.fire('Comment is required.')
//    }   else {
//        $("#process").show();
//        document.getElementById('approve-form').submit();
//    }
//}






// Check if there's a previously active tab in local storage
const activeTab = localStorage.getItem('activeTab');
if (activeTab) {
    // Activate the previously active tab
    const tab = document.querySelector(activeTab);
    if (tab) {
        tab.classList.add('active');
        const tabContent = document.querySelector(tab.dataset.bsTarget);
        if (tabContent) {
            tabContent.classList.add('show', 'active');
        }
    }
}

// Save the currently active tab to local storage when a tab is clicked
const tabs = document.querySelectorAll('[data-bs-toggle="pill"]');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        localStorage.setItem('activeTab', `#${tab.id}`);
    });
});