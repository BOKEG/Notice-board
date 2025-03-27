import { useEffect, useState } from "react";
import { getNotices } from "../api/notices";
import { getTimetables } from "../api/timetables"; // ✅ Import API function
import "./Dashboard.css"; // ✅ Import styles
import moment from "moment"; // ✅ Import moment.js for date formatting

const Dashboard = () => {
  const [notices, setNotices] = useState([]);
  const [timetables, setTimetables] = useState([]); // ✅ State for timetables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resNotices = await getNotices();
        const sortedNotices = resNotices.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // ✅ Sort by date (newest first)
        setNotices(sortedNotices);

        // ✅ Fetch uploaded timetables
        const resTimetables = await getTimetables();
        setTimetables(resTimetables.data);
      } catch (err) {
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 🔹 Group notices by category
  const categorizedNotices = notices.reduce((acc, notice) => {
    const category = notice.category || "Other"; // Default to "Other" if no category
    if (!acc[category]) acc[category] = [];
    acc[category].push(notice);
    return acc;
  }, {});

  return (
    <div className="dashboard">
      <h2>📢 School Notices</h2>

      {loading && <p className="loading">Loading data...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          {/* ✅ Categorized Notices */}
          <div className="categorized-notices">
            {Object.keys(categorizedNotices).map((category) => (
              <div key={category} className="category-section">
                <h3 className="category-title">📌 {category}</h3>
                <ul className="notice-list">
                  {categorizedNotices[category].map((notice) => (
                    <li key={notice._id} className="notice-item">
                      <h4>{notice.title}</h4>
                      <p>{notice.description}</p>
                      <p className="date">
                        📅 {moment(notice.createdAt).format("MMMM Do YYYY, h:mm A")}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* ✅ Timetable Section */}
          <div className="timetable-section">
            <h3>📅 Download Timetable</h3>
            {timetables.length > 0 ? (
              <ul className="timetable-list">
                {timetables.map((timetable) => (
                  <li key={timetable.filename} className="timetable-item">
                    <a
                      href={`http://localhost:5000${timetable.fileUrl}`} // ✅ Corrected URL
                      download
                      className="download-link"
                    >
                      📥 {timetable.filename}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No timetables available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
