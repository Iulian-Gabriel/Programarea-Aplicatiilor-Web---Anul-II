let noteContent;
let selectedNoteIdElement;
let notesList;
let isNoteSelected;

document.addEventListener('DOMContentLoaded', function () {
    noteContent = document.getElementById('noteContent');
    selectedNoteIdElement = document.getElementById('selectedNoteID');
    notesList = document.getElementById('notes');
    isNoteSelected = false;
    updateButtonState();
    loadNotes();
});

function updateButtonState() {
    const modifyButton = document.getElementById('modifyButton');
    const deleteButton = document.getElementById('deleteButton');
    const deselectButton = document.getElementById('deselectButton');
    const createButton = document.getElementById('createButton');

    if (isNoteSelected) {
        modifyButton.disabled = false;
        deleteButton.disabled = false;
        deselectButton.disabled = false;
        createButton.disabled = true;
    } else {
        modifyButton.disabled = true;
        deleteButton.disabled = true;
        deselectButton.disabled = true;
        createButton.disabled = false;
    }
}

function loadNotes() {
    fetch('/notes')
        .then(response => response.json())
        .then(data => {
            if (notesList) {
                notesList.innerHTML = '';
            }

            data.notes.forEach(note => {
                const li = document.createElement('li');
                li.textContent = `${note.id}: ${note.content.substring(0, 20)}...`;

                li.onclick = () => {
                    loadNoteDetails(note.id);
                };
                notesList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching notes:', error));
}

function createNote() {
    const noteContentValue = noteContent.value.trim();
    if (noteContentValue === '') {
        alert('Enter text to create a note.');
        return;
    } else {
        fetch('/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContentValue }),
        })
        .then(response => response.json())
        .then(data => {
            loadNotes();

            noteContent.value = '';
            selectedNoteIdElement.textContent = '';
        })
        .catch(error => console.error('Error creating note:', error));
    }
}

function modifyNote() {
    const noteId = selectedNoteIdElement.textContent.replace('Selected Note ID: ', '');
    const noteContentValue = noteContent.value.trim();
    if (noteId.trim() !== '' && noteContentValue !== '') {
        fetch(`/notes/${noteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: noteContentValue }),
        })
        .then(response => response.json())
        .then(data => {
            loadNotes();
            loadNoteDetails(data.note.id);
        })
        .catch(error => console.error('Error modifying note:', error));
    }
}

function deleteNote() {
    const noteId = selectedNoteIdElement.textContent.replace('Selected Note ID: ', '');
    if (noteId.trim() === '') {
        alert('Select a note to delete.');
        return;
    }


    fetch(`/notes/${noteId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            loadNotes();
            noteContent.value = '';
            selectedNoteIdElement.textContent = '';


            isNoteSelected = false;


            updateButtonState();
        } else {
            console.error('Error deleting note:', response.statusText);
        }
    })
    .catch(error => console.error('Error deleting note:', error));
}

function loadNoteDetails(noteId) {
    if (!noteId) {
        return;
    }

    fetch(`/notes/${noteId}`)
        .then(response => response.json())
        .then(data => {
            noteContent.value = data.content;
            selectedNoteIdElement.textContent = `Selected Note ID: ${noteId}`;
            isNoteSelected = true;
            updateButtonState();


            document.getElementById('createButton').disabled = true;
        })
        .catch(error => console.error('Error fetching note details:', error));
}

function deselectAndClear() {
    noteContent.value = '';
    selectedNoteIdElement.textContent = '';

    isNoteSelected = false;
    updateButtonState();
    document.getElementById('createButton').disabled = false;
}