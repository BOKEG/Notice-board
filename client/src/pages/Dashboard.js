import { useEffect, useState } from "react";
import { getNotices } from "../api/notices";
import "./Dashboard.css"; // ✅ Import styles
import moment from "moment"; // ✅ Import moment.js for date formatting

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const res = await getNotices();
        const sortedNotices = res.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // ✅ Sort by date (newest first)
        setNotices(sortedNotices);
      } catch (err) {
        setError("Failed to load notices. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchNotices();
  }, []);

  return (
    <div className="dashboard">
      <h2>📢 School Notices</h2>

      {loading && <p className="loading">Loading notices...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="notice-list">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <li key={notice._id} className="notice-item">
                <h3>{notice.title}</h3>
                <p>{notice.description}</p>
                <span className="category">{notice.category}</span>
                <p className="date">
                  📅 {moment(notice.createdAt).format("MMMM Do YYYY, h:mm A")}
                </p>
              </li>
            ))
          ) : (
            <p>No notices available.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
