import { Link } from "react-router-dom";
import "../styles/Home.css"; // Import the CSS file

function Home() {
  return (
    <div className="container">
      {/* 🔹 Welcome Message */}
      <h1 className="heading">Welcome to the School Notice Board</h1>
      <p className="subtitle">
        Stay informed with the latest school updates, events, and announcements.
      </p>

      {/* 🔹 Important Announcements */}
      <section className="section">
        <h2>Important Notices</h2>
        <ul className="list">
          <li>✅ School reopens on April 5, 2025.</li>
          <li>✅ Midterm exams start on April 15, 2025.</li>
          <li>✅ Science Fair Registration is now open!</li>
        </ul>
      </section>

      {/* 🔹 Upcoming Events */}
      <section className="section">
        <h2>📅 Upcoming Events</h2>
        <ul className="list">
          <li>🎭 Drama Club Showcase - April 8, 2025</li>
          <li>⚽ Inter-School Football Tournament - April 12, 2025</li>
          <li>🎨 Art Exhibition - April 18, 2025</li>
        </ul>
      </section>

      {/* 🔹 Login / Register Section */}
      <section className="authSection">
        <h2>Get Started</h2>
        <p>Login to access your dashboard for more information or register for an account.</p>
        <div className="buttonContainer">
          <Link to="/login" className="button">Login</Link>
          <Link to="/register" className="button">Register</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
