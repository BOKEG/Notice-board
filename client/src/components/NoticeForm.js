import { useState } from "react";
import { addNotice } from "../api/api";

function NoticeForm({ onNoticeAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category) {
      setError("All fields are required!");
      return;
    }

    const newNotice = { title, description, category };
    const result = await addNotice(newNotice);
    
    if (result) {
      alert("Notice added successfully!");
      onNoticeAdded(); // Refresh the notices list
      setTitle("");
      setDescription("");
      setCategory("");
      setError("");
    } else {
      setError("Failed to add notice. Try again.");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px" }}>
      <h2>Add Notice</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ display: "block", marginBottom: "10px", width: "100%", padding: "8px" }}
        />
        <button type="submit" style={{ background: "#007bff", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
          Post Notice
        </button>
      </form>
    </div>
  );
}

export default NoticeForm;
