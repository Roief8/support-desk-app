import { useSelector } from "react-redux"

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth)

  return (
    <div
      className="note border rounded-top text-start p-3 mb-2 position-relative  "
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h5>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h5>
      <p className="p-2">{note.text}</p>
      <div className="note-date position-absolute top-0 end-0 p-2">
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  )
}

export default NoteItem
