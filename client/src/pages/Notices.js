import { useEffect, useState } from "react";
import { getNotices } from "../api/api";
import NoticeCard from "../components/NoticeCard";
import NoticeForm from "../components/NoticeForm";

function Notices() {
  const [notices, setNotices] = useState([]);

  // Fetch notices from backend
  const fetchNotices = async () => {
    const data = await getNotices();
    setNotices(data);
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Latest Notices</h1>
      <NoticeForm onNoticeAdded={fetchNotices} />
      {notices.length === 0 ? (
        <p>No notices available.</p>
      ) : (
        notices.map((notice) => <NoticeCard key={notice._id} notice={notice} />)
      )}
    </div>
  );
}

export default Notices;
