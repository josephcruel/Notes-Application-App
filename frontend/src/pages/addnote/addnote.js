document.addEventListener('DOMContentLoaded', (event) => {
    const saveBtn = document.getElementById("saveBtn")
    const modal = document.getElementById("myModal");
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
    const noteTitle = document.getElementById('noteTitle')
    const noteBody = document.getElementById('noteBody')
    const toast = document.getElementById('toast');

    // Toast notification function
    function showToast(message, color) {
        toast.textContent = message;
        toast.style.backgroundColor = color;
        toast.className = 'toast show';

        // Hide after 3 seconds
        setTimeout(() => {
            toast.className = 'toast';
        }, 3000);
    }

    // Function to validate the form
    function validateForm() {
        // To see if the title or body are empty
        if (noteTitle.value.trim() === '' || noteBody.value.trim() === '') {
            // Shows toast notification
            showToast('Title or Body require text', '#FF0000');
            return false; // Prevent form submission
        }
        return true; // Allow form submission
    }

    // When the user click the button, save the note
    saveBtn.onclick = function () {
        // Validate the form before proceeding
        if (!validateForm()) {
            return; // Exit function if form is invalid
        }
        // Create a note with title, content, and date
        const note = {
            title: noteTitle.value,
            content: noteBody.value,
            updatedAt: new Date()
        };

        // Post request to save the note
        fetch('/api/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(note),
        })
            .then(response => response.json())
            .then(data => {
                // Logs the save function
                console.log('Note saved:', data);
                // Shows toast notification
                showToast('Note Saved', '#6411da');
                // Redirect user back to the home page
                setTimeout(() => {
                    window.location.href = '/home/home.html';
                }, 2000);
            })
            .catch((error) => {
                console.error('Error:', error);
                showToast('Failed to Save Note', '#FF0000');
            });
    }

    // When the user clicks the button, open the modal
    openModalBtn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on x, close the modal
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks on the No button, close the modal
    cancelDeleteBtn.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // When the user clicks on the Yes button, perform delete action and close the modal
    confirmDeleteBtn.onclick = function () {
        // Logs the delete function
        console.log('Note deleted');
        // Shows toast notification
        showToast('Note Discarded', '#FF0000');
        modal.style.display = "none";

        // Redirect user back to the home page
        setTimeout(() => {
            window.location.href = '/home/home.html';
        }, 1500);
    }
});



