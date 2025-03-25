function NoticeCard({ notice }) {
    return (
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          marginBottom: "10px",
          borderRadius: "5px",
          background: "#f9f9f9",
        }}
      >
        <h3>{notice.title}</h3>
        <p>{notice.description}</p>
        <small>Category: {notice.category}</small>
      </div>
    );
  }
  
  export default NoticeCard;
  