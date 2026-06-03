// Journal.js

import "./Journal.css";

import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  FaBold,
  FaUnderline,
  FaSave,
  FaTrash,
  FaArchive
} from "react-icons/fa";

function Journal() {

  const [text, setText] =
    useState("");

  const [savedNotes, setSavedNotes] =
    useState([]);

  const [fontSize, setFontSize] =
    useState("20");

  const [fontFamily, setFontFamily] =
    useState("Poppins");

  const textAreaRef = useRef(null);

  // LOAD SAVED NOTES

  useEffect(() => {

    const storedNotes =
      JSON.parse(
        localStorage.getItem(
          "dt-journal"
        )
      ) || [];

    setSavedNotes(storedNotes);

  }, []);

  // SAVE NOTE

  const saveNote = () => {
    if (!text.trim()) return;

    const newNote = {
      id: Date.now(),
      content: text,
      date: new Date().toLocaleString(),
      fontSize,
      fontFamily
    };

    const updatedNotes = [
      newNote,
      ...savedNotes
    ];

    setSavedNotes(updatedNotes);

    localStorage.setItem(
      "dt-journal",
      JSON.stringify(updatedNotes)
    );

    setText("");
  };

  // DELETE NOTE

  const deleteNote = (id) => {

    const filtered =
      savedNotes.filter(
        (note) => note.id !== id
      );

    setSavedNotes(filtered);

    localStorage.setItem(
      "dt-journal",
      JSON.stringify(filtered)
    );
  };

  // EDIT NOTE

  const editNote = (note) => {
    setText(note.content);
    deleteNote(note.id);
  };

  const wrapSelection = (startTag, endTag) => {
    const textarea = textAreaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const before = value.slice(0, selectionStart);
    const selected = value.slice(selectionStart, selectionEnd) || "Your text";
    const after = value.slice(selectionEnd);

    const updated = `${before}${startTag}${selected}${endTag}${after}`;
    setText(updated);

    const cursorPos = selectionEnd + startTag.length + endTag.length;
    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    });
  };

  const addBold = () => {
    wrapSelection("<strong>", "</strong>");
  };

  const addUnderline = () => {
    wrapSelection("<u>", "</u>");
  };

  const archiveNote = (note) => {
    const archived =
      JSON.parse(
        localStorage.getItem(
          "dt-journal-archive"
        ) || "[]"
      );

    localStorage.setItem(
      "dt-journal-archive",
      JSON.stringify([note, ...archived])
    );

    deleteNote(note.id);
  };

  return (

    <div className="journal-page">

      {/* HEADER */}

      <div className="journal-header">

        <h1>
          Smart Journal ✍️
        </h1>

        <p>
          Capture your thoughts,
          ideas and reflections
          beautifully.
        </p>

      </div>

      {/* EDITOR */}

      <div className="journal-editor">

        {/* TOOLBAR */}

        <div className="toolbar">

          <button
            onClick={addBold}
          >

            <FaBold />

          </button>

          <button
            onClick={addUnderline}
          >

            <FaUnderline />

          </button>

          {/* FONT SIZE */}

          <select
            value={fontSize}
            onChange={(e) =>
              setFontSize(
                e.target.value
              )
            }
          >

            <option value="16">
              16px
            </option>

            <option value="18">
              18px
            </option>

            <option value="20">
              20px
            </option>

            <option value="24">
              24px
            </option>

          </select>

          {/* FONT FAMILY */}

          <select
            value={fontFamily}
            onChange={(e) =>
              setFontFamily(
                e.target.value
              )
            }
          >

            <option value="Poppins">
              Poppins
            </option>

            <option value="Arial">
              Arial
            </option>

            <option value="Georgia">
              Georgia
            </option>

            <option value="Verdana">
              Verdana
            </option>

          </select>

        </div>

        {/* TEXTAREA */}

        <textarea
          id="journal-textarea"
          ref={textAreaRef}
          placeholder="Write something amazing today..."
          value={text}
          onChange={(e) =>
            setText(
              e.target.value
            )
          }
          style={{
            fontSize:
              `${fontSize}px`,
            fontFamily
          }}
        />

        {/* SAVE */}

        <button
          className="save-btn"

          onClick={saveNote}
        >

          <FaSave />

          Save Entry

        </button>

      </div>

      {/* SAVED NOTES */}

      <div className="notes-section">

        <h2>
          Saved Entries 📚
        </h2>

        <div className="notes-grid">

          {savedNotes.map(
            (note) => (

            <div
              className="note-card"

              key={note.id}
            >

              <div
                className="note-content"

                dangerouslySetInnerHTML={{
                  __html:
                    note.content
                }}

                style={{
                  fontSize:
                    `${note.fontSize}px`,

                  fontFamily:
                    note.fontFamily
                }}
              />

              <p className="note-date">

                {note.date}

              </p>

              <div className="note-actions">

                  <button
                  onClick={() =>
                    editNote(note)
                  }
                >
                  Edit
                </button>
                <button
                  className="archive-note"
                  onClick={() =>
                    archiveNote(note)
                  }
                >
                  <FaArchive /> Archive
                </button>
                <button
                  className="delete-note"
                  onClick={() =>
                    deleteNote(note.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}

export default Journal;