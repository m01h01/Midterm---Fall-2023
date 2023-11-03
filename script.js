const notesArray = []; //create array for the noteText
let editIndex = -1; // Initialize as -1 to indicate no note is being edited initially(index of array start from 0)
const contentLimitWord = 500; //limit word for up to 500 

function addNote() {
    const noteInput = document.getElementById('note');
    const noteText = noteInput.value.trim();

    // Split the note text into words using space as the delimiter
    const words = noteText.split(' ');

    // Count the number of words
    const wordCount = words.length;

    if (noteText !== "") {
        if(wordCount > contentLimitWord){
            window.alert('Make sure your note are below 500 words .');
        }
        else{
            notesArray.push(noteText);
            noteInput.value = ""; // Clear the input field
            sortNote(); // Sort and display the notes
        }
    }
    else{
        window.alert('Enter your note');
    }
    
}

function sortNote() {
    notesArray.sort();

    //get the notelist element which is in html
    const noteList = document.getElementById("noteList");

    //clear the current list
    noteList.innerHTML = "";

    //add the noteText to the noteArray with forEach looping
    notesArray.forEach((noteText) => {
        //creat a list element
        const newNote = document.createElement("li");
        //insert the list to document HTML
        newNote.innerHTML = `
            <textarea class="content">${noteText}</textarea>
            <div class="button-container"> 
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            </div>`;

        //adding the child(newNote) into the parent(noteList)
        noteList.appendChild(newNote);
    });

    EventFuntion(); // Add event listeners 
}

function EventFuntion() {
    // get all the edit-button elements in the document(html)
    const editButtons = document.querySelectorAll(".edit-button");
    
    //loop through all the edit buttons, track which edit button was clicked and which note is being edited by storing it as currentIndex
    editButtons.forEach((editButton, currentIndex) => {
        // Add click event listener to the edit button
        editButton.addEventListener('click', function () {
             // get the parent <li> element of the "Edit" button within your DOM structure
             //parent of edit-button is div(button-container) and parent of that div is "li" which is the created element
              const newNote = editButton.parentElement.parentElement; 

             // Find the span within the current 'newNote'
             //simply whatever pass in the span is equal to noteText
             const span = newNote.querySelector(".content");

             // Create an input field as Textarea and set its value to the span's text content
             const inputField = document.createElement("textarea");
             inputField.value = span.textContent;

             // Replace the span with the input field
            newNote.replaceChild(inputField, span);

             // Find the button container
             const buttonContainer = newNote.querySelector(".button-container");

              // Create a save button
             const saveButton = document.createElement("button");
             saveButton.textContent = "Save";
             saveButton.classList.add("save-button");

              // Replace the edit button with the save button
             buttonContainer.replaceChild(saveButton, editButton);

              // Add a click event listener to the save button
             saveButton.addEventListener("click", function () {
                 // Update the span with the input field's value
                 //Remember that span is noteText?
                 span.textContent = inputField.value;

                  // Replace the input field with the span
                 newNote.replaceChild(span, inputField);

                 // Replace the save button with the edit button
                 buttonContainer.replaceChild(editButton, saveButton);

                // Set the editIndex to the current index
                editIndex = currentIndex;

                // Update the note in the array
                notesArray[editIndex] = span.textContent;

                // Reset the editIndex
                editIndex = -1;

                sortNote();//sort the note after edit and save
            });
        });
    });

    const deleteButtons = document.querySelectorAll(".delete-button");

    //same logical happen to edit-button
    deleteButtons.forEach((deleteButton, currentIndex) => {
    deleteButton.addEventListener("click", function () {
        let popUp = window.confirm('Do you want to DELETE?');
        if(popUp){
             const noteList = document.getElementById("noteList");
        const newNote = deleteButton.parentElement.parentElement; // Get the parent <li> element
        noteList.removeChild(newNote); // Remove the note from the list
        notesArray.splice(currentIndex, 1); // Remove the note from the array
        }
        
    });
});

}

// Add a click event listener to the "addNote" button
const addNoteButton = document.getElementById("addNote");
addNoteButton.addEventListener("click", addNote);

