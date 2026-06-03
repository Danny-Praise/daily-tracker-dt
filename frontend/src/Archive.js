import "./Archive.css";
import { useEffect, useState } from "react";
import { FaLock, FaArchive, FaRegFolderOpen } from "react-icons/fa";

function Archive({ user }) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState("");
  const [archivedNotes, setArchivedNotes] = useState([]);

  const currentUser =
    user || JSON.parse(localStorage.getItem("dt-user") || "null");

  useEffect(() => {
    const archiveData =
      JSON.parse(
        localStorage.getItem("dt-journal-archive") || "[]"
      );
    setArchivedNotes(archiveData);
  }, []);

  const handleUnlock = () => {
    if (!currentUser?.archivePassword) {
      setError(
        "No archive password set. Please update your profile settings first."
      );
      return;
    }

    if (enteredPassword === currentUser.archivePassword) {
      setAccessGranted(true);
      setError("");
    } else {
      setError("Password incorrect. Try again.");
    }
  };

  return (
    <div className="archive-page">
      <div className="archive-hero">
        <div>
          <span className="hero-label">
            <FaLock /> Secure Archive
          </span>
          <h1>Private Vault</h1>
          <p>
            Archived journal entries and private notes are stored here behind a separate password.
          </p>
        </div>
      </div>

      {!accessGranted ? (
        <div className="archive-lock-panel">
          <h2>Unlock your archive</h2>
          <p>
            Enter the archive password you configured in your profile settings.
          </p>
          <input
            type="password"
            placeholder="Archive password"
            value={enteredPassword}
            onChange={(e) => setEnteredPassword(e.target.value)}
          />
          <button onClick={handleUnlock}>Unlock Archive</button>
          {error && <p className="archive-error">{error}</p>}
          {!currentUser?.archivePassword && (
            <p className="archive-note">
              No password set yet. Go to Profile and add an archive password.
            </p>
          )}
        </div>
      ) : (
        <div className="archive-content">
          <div className="archive-summary">
            <FaRegFolderOpen />
            <div>
              <h2>Archived Entries</h2>
              <p>{archivedNotes.length} journal items secured.</p>
            </div>
          </div>

          {archivedNotes.length === 0 ? (
            <div className="archive-empty">
              <FaArchive />
              <p>No archived notes yet.</p>
              <small>Use the journal archive button to protect a private entry.</small>
            </div>
          ) : (
            <div className="archive-grid">
              {archivedNotes.map((note) => (
                <div key={note.id} className="archive-card">
                  <div
                    className="archive-note-content"
                    dangerouslySetInnerHTML={{
                      __html: note.content
                    }}
                    style={{
                      fontSize: `${note.fontSize}px`,
                      fontFamily: note.fontFamily
                    }}
                  />
                  <p className="archive-note-date">{note.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Archive;
