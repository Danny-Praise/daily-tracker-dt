import "./About.css";

function About() {
  return (
    <div className="about-page">

      <div className="about-hero">

        <h1>About DT AI 🚀</h1>

        <p>
          Daily Tracker AI (DT AI) is an intelligent
          personal productivity ecosystem designed
          to help individuals manage goals, habits,
          finances, wellness, academics and daily
          activities from one centralized platform.
        </p>

      </div>

      <div className="about-section">

        <h2>Project Problem</h2>

        <p>
          Many individuals struggle to consistently
          manage goals, monitor progress, maintain
          healthy habits and organize daily activities.
          Existing solutions often focus on only one
          aspect of personal development.
        </p>

      </div>

      <div className="about-section">

        <h2>Project Solution</h2>

        <p>
          DT AI combines productivity management,
          analytics, journaling, wellness tracking,
          finance monitoring and AI-powered guidance
          into one integrated platform.
        </p>

      </div>

      <div className="about-section">

        <h2>Technologies Used</h2>

        <ul>
          <li>React.js Frontend</li>
          <li>Node.js Backend</li>
          <li>Express.js API</li>
          <li>PostgreSQL Database</li>
          <li>JWT Authentication</li>
          <li>AI Recommendation Engine</li>
        </ul>

      </div>

      <div className="about-section">

        <h2>Project Objectives</h2>

        <ul>
          <li>Improve productivity</li>
          <li>Increase goal completion rate</li>
          <li>Enhance habit consistency</li>
          <li>Provide intelligent insights</li>
          <li>Encourage self-development</li>
        </ul>

      </div>

    </div>
  );
}

export default About;