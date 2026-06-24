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

import { journalAPI } from "./api/apiClient";

function Journal({ user }) {
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
    if (user?.id) {
      loadJournalEntries();
    }
  }, [user?.id]);

  const loadJournalEntries = async () => {
    try {
      const response = await journalAPI.getAll(user.id);
      setSavedNotes(response.data.filter(note => !note.archived));
    } catch (error) {
      console.log(error);
    }
  };

  // SAVE NOTE

  const saveNote = async () => {
    if (!text.trim()) return;

    try {
      const response = await journalAPI.create(text);
      setSavedNotes([response.data.entry, ...savedNotes]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE NOTE

  const deleteNote = async (id) => {
    try {
      // We'll archive it instead of deleting
      await journalAPI.archive(id, true);
      setSavedNotes(savedNotes.filter(note => note.id !== id));
    } catch (error) {
      console.log(error);
    }
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

  const archiveNote = async (note) => {
    try {
      await journalAPI.archive(note.id, true);
      setSavedNotes(savedNotes.filter(n => n.id !== note.id));
    } catch (error) {
      console.log(error);
    }
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
                    `${fontSize}px`,

                  fontFamily:
                    fontFamily
                }}
              />

              <p className="note-date">

                {new Date(note.created_at).toLocaleString()}

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