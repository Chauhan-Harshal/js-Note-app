let notes = JSON.parse(localStorage.getItem('keepNotes')) || [];

function displayNotes() {
  const container = document.getElementById('notesContainer');
  container.innerHTML = '';
  notes.forEach((note, index) => {
    const noteEl = document.createElement('div');
    noteEl.className = 'note';
    noteEl.style.background = note.color || '#fff59d';
    noteEl.innerHTML = `
      <div>${note.text}</div>
      <div class="note-buttons">
        <button onclick="editNote(${index})">Edit</button>
        <button onclick="deleteNote(${index})">delete</button>
      </div>
    `;
    container.appendChild(noteEl);
  });
}

function addNote() {
  const input = document.getElementById('noteInput');
  const text = input.value.trim();
  if (text !== '') {
    notes.unshift({ text, color: randomColor() });
    input.value = '';
    saveNotes();
    displayNotes();
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  displayNotes();
}

function editNote(index) {
  const updated = prompt('Edit your note:', notes[index].text);
  if (updated !== null && updated.trim() !== '') {
    notes[index].text = updated.trim();
    saveNotes();
    displayNotes();
  }
}

function saveNotes() {
  localStorage.setItem('keepNotes', JSON.stringify(notes));
}

function randomColor() {
  const colors = ['#fff59d', '#c8e6c9', '#ffe0b2', '#d1c4e9', '#b3e5fc', '#f8bbd0'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Handle Enter key press
document.getElementById('noteInput').addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    addNote();
  }
});

displayNotes();