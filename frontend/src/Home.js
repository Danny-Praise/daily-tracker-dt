import "./Home.css";

import { motion } from "framer-motion";

function Home({ darkMode }) {

  return (

    <div
      className={
        darkMode
          ? "home dark"
          : "home"
      }
    >

      {/* HERO SECTION */}

      <motion.div
        className="hero-section"

        initial={{
          opacity: 0,
          y: 40
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 1
        }}
      >

        <div className="hero-left">

          <h1>
            Transform Your Life With
            <span> DT AI 🚀</span>
          </h1>

          <p>
            Your intelligent productivity,
            fitness, finance and lifestyle
            ecosystem built to help you
            achieve goals faster.
          </p>

          {/* FLOATING CARD */}

          <motion.div
            className="floating-card"

            animate={{
              y: [0, -15, 0]
            }}

            transition={{
              duration: 4,
              repeat: Infinity
            }}
          >

            <h3>
              Productivity Score 🚀
            </h3>

            <p>
              +32% consistency this month
            </p>

          </motion.div>

        </div>

        {/* HERO RIGHT */}

        <motion.div
          className="hero-right"

          animate={{
            y: [0, -20, 0]
          }}

          transition={{
            duration: 5,
            repeat: Infinity
          }}
        >

          <div className="hero-image-card">

            <h2>AI Coaching</h2>

            <p>
              Personalized life guidance
              powered by smart analytics.
            </p>

          </div>

        </motion.div>

      </motion.div>

      {/* PARTNERS SECTION */}

      <div className="partners-section">

        <p className="partners-title">
          Trusted By Future-Focused Teams
        </p>

        <div className="partners-slider">

          <div className="partners-track">

  <img
    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968852.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png"
    alt=""
  />
  
 <img
    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/732/732221.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968705.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968852.png"
    alt=""
  />

  <img
    src="https://cdn-icons-png.flaticon.com/512/5968/5968672.png"
    alt=""
  />
</div>

        </div>

      </div>

      {/* TESTIMONIALS */}

   {/* TESTIMONIALS */}

<div className="testimonials-section">

  <h2>
    What Users Say 💬
  </h2>

  <p className="testimonial-subtitle">

    Trusted by ambitious people
    building better habits daily.

  </p>

  <div className="testimonials-grid">

    {/* CARD 1 */}

    <div className="testimonial-card">

      <div className="stars">

        ★★★★★

      </div>

      <p>

        “DT AI completely transformed
        how I manage my goals and
        daily productivity.”

      </p>

      <div className="testimonial-user">

        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
        />

        <div>

          <h4>
            Sarah M.
          </h4>

          <span>
            Fitness Coach
          </span>

        </div>

      </div>

    </div>

    {/* CARD 2 */}

    <div className="testimonial-card">

      <div className="stars">

        ★★★★★

      </div>

      <p>

        “The analytics and AI coaching
        system feels incredibly smart
        and motivating.”

      </p>

      <div className="testimonial-user">

        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt=""
        />

        <div>

          <h4>
            Daniel K.
          </h4>

          <span>
            Entrepreneur
          </span>

        </div>

      </div>

    </div>

    {/* CARD 3 */}

    <div className="testimonial-card">

      <div className="stars">

        ★★★★★

      </div>

      <p>

        “This feels like having a
        personal life strategist
        in my pocket.”

      </p>

      <div className="testimonial-user">

        <img
          src="https://randomuser.me/api/portraits/women/68.jpg"
          alt=""
        />

        <div>

          <h4>
            Rachel T.
          </h4>

          <span>
            Student
          </span>

        </div>

      </div>

    </div>

  </div>

</div>

      {/* FEATURES SECTION */}

      <div className="features-section">

        <h2>
          Everything You Need 🚀
        </h2>

        <p className="features-subtitle">
          Designed to optimize every
          sphere of your life.
        </p>

        <div className="features-grid">

          <div className="feature-card">

            <h3>🎯 Goal Management</h3>

            <p>
              Create, manage, complete
              and organize your goals
              intelligently.
            </p>

          </div>

          <div className="feature-card">

            <h3>📊 Smart Analytics</h3>

            <p>
              Visual insights, streaks,
              progress tracking and
              monthly summaries.
            </p>

          </div>

          <div className="feature-card">

            <h3>🤖 AI Coaching</h3>

            <p>
              Personalized recommendations,
              motivation and productivity
              assistance.
            </p>

          </div>

          <div className="feature-card">

            <h3>🧠 Journal & Diary</h3>

            <p>
              Write private thoughts,
              reflections and daily logs
              securely.
            </p>

          </div>

          <div className="feature-card">

            <h3>📅 Calendar & Reminders</h3>

            <p>
              Schedule tasks, milestones,
              deadlines and important
              life events.
            </p>

          </div>

          <div className="feature-card">

            <h3>🌍 Life Spheres</h3>

            <p>
              Dedicated ecosystems for
              fitness, finance, spirituality,
              academics and more.
            </p>

          </div>

        </div>

      </div>

      {/* PRICING SECTION */}

      <div className="pricing-section">

        <h2>
          Flexible Pricing 💎
        </h2>

        <p className="pricing-subtitle">
          Choose the plan that fits your
          productivity journey.
        </p>

        <div className="pricing-grid">

          {/* FREE */}

          <div className="pricing-card">

            <h3>Free</h3>

            <h1>$0</h1>

            <p>Perfect for starters</p>

            <ul>

              <li>✔ Goal Tracking</li>
              <li>✔ Daily Streaks</li>
              <li>✔ Basic Analytics</li>
              <li>✔ Life Spheres</li>

            </ul>

            <button>
              Start Free
            </button>

          </div>

          {/* PREMIUM */}

          <div className="pricing-card premium-card">

            <div className="popular-badge">
              MOST POPULAR
            </div>

            <h3>Premium</h3>

            <h1>$12/mo</h1>

            <p>For ambitious individuals</p>

            <ul>

              <li>✔ AI Coaching</li>
              <li>✔ Advanced Analytics</li>
              <li>✔ Calendar & Reminders</li>
              <li>✔ Journal & Diary</li>
              <li>✔ Themes & Widgets</li>
              <li>✔ Smart Recommendations</li>

            </ul>

            <button>
              Upgrade Now
            </button>

          </div>

          {/* ENTERPRISE */}

          <div className="pricing-card">

            <h3>Enterprise</h3>

            <h1>Custom</h1>

            <p>For teams & organizations</p>

            <ul>

              <li>✔ Team Dashboards</li>
              <li>✔ Community Challenges</li>
              <li>✔ Unlimited Integrations</li>
              <li>✔ Dedicated Support</li>

            </ul>

            <button>
              Contact Sales
            </button>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <footer className="footer">

        <div className="footer-top">

          <h2>DT AI 🚀</h2>

          <p>
            Transform your productivity, goals, and lifestyle with our AI-powered personal tracking ecosystem. Achieve your dreams with data-driven insights.
          </p>

          <div className="social-icons">
            <i className="fab fa-x-twitter"></i>
            <i className="fab fa-instagram"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-youtube"></i>
          </div>

        </div>

        <div className="footer-container">

          <div className="footer-grid">

            {/* Product Column */}
            <div className="footer-column">
              <h3>Product</h3>
              <ul>
                <li>Features</li>
                <li>Pricing Plans</li>
                <li>Security</li>
                <li>Roadmap</li>
                <li>Updates</li>
              </ul>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h3>Company</h3>
              <ul>
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Press Kit</li>
                <li>Contact</li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="footer-column">
              <h3>Resources</h3>
              <ul>
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Community</li>
                <li>Support Center</li>
                <li>FAQ</li>
              </ul>
            </div>

            {/* Legal Column */}
            <div className="footer-column">
              <h3>Legal</h3>
              <ul>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>GDPR</li>
                <li>Compliance</li>
              </ul>
            </div>

          </div>

        </div>

        <div className="footer-bottom">
          <div>© 2026 DT AI Ecosystem. All rights reserved.</div>
          <div className="footer-credits">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#cookies">Cookie Settings</a>
          </div>
        </div>

      </footer>
    </div>

  );
}

export default Home;