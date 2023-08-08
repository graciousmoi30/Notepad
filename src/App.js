import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

function getItemsFromLocalStorage() {
  const displayNote = localStorage.getItem("displayNote");
  if (displayNote) {
    return JSON.parse(localStorage.getItem("displayNote"));
  } else {
    return [];
  }
}

const Notepad = () => {
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [displayNote, setDisplayNote] = useState(getItemsFromLocalStorage);
  const [editIndex, setEditIndex] = useState(null);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !notes.trim()) {
      alert("Please put a note and/or a title");
      return;
    }
    const newItem = { title, notes };

    if (editIndex !== null) {
      // Edit existing item
      const updatedNote = { ...displayNote[editIndex], ...newItem };
      const updatedDisplayNote = [...displayNote];
      updatedDisplayNote[editIndex] = updatedNote;
      setDisplayNote(updatedDisplayNote);
      setEditIndex(null); // Reset editIndex after editing is done
    } else {
      // Add new item
      setDisplayNote([...displayNote, newItem]);
    }

    setNotes("");
    setTitle("");
  };

  useEffect(() => {
    localStorage.setItem("displayNote", JSON.stringify(displayNote));
  }, [displayNote]);

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(displayNote[index].title);
    setNotes(displayNote[index].notes);
  };
  const handleDelete = (index) => {
    setDisplayNote(
      displayNote.filter((item, itemIndex) => itemIndex !== index)
    );
  };

  const handleClear = () => {
    setDisplayNote([]);
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit} className="Title">
          <div>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter the title..."
            />
          </div>
          <div>
            <textarea
              id="notes"
              rows={10}
              cols={50}
              value={notes}
              onChange={handleNotesChange}
              placeholder="Type your notes here..."
            />
          </div>
          <button
            type="submit"
            className="Submit-btn"
            disabled={!title.trim() || !notes.trim()}
          >
            {editIndex !== null ? "Done" : "Add Note"}
          </button>
        </form>
      </div>

      {displayNote.map((item, index) => {
        return (
          <div key={index} className="display">
            <h2>{item.title}</h2>
            <p>
              <br />
              {item.notes.slice(0, 50)} <br /> <br />
              <div className="btn-container">
                <button
                  type="button"
                  className="Edit-btn"
                  onClick={() => handleEdit(index)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className="Delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </p>
            <br /> <br />
          </div>
        );
      })}

      <button className="Clear-btn" onClick={handleClear}>
        Clear Notes
      </button>
    </div>
  );
};

export default Notepad;
