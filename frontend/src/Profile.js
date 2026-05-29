// Profile.js

import "./Profile.css";

import {
  useState
} from "react";

import {
  motion
} from "framer-motion";

import {
  FaUser,
  FaEnvelope,
  FaBullseye,
  FaFire,
  FaBrain,
  FaMedal
} from "react-icons/fa";

function Profile({ user }) {

  // STATES

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(
      user?.name || ""
    );

  const [email, setEmail] =
    useState(
      user?.email || ""
    );

  // SAVE PROFILE

  const saveProfile = () => {

    const updatedUser = {

      ...user,

      name,

      email
    };

    localStorage.setItem(
      "dt-user",
      JSON.stringify(updatedUser)
    );

    alert(
      "Profile Updated Successfully 🚀"
    );

    setEditing(false);
  };

  // IF USER NOT FOUND

  if (!user) {

    return (

      <div className="profile-empty">

        <h1>
          Please Login First
        </h1>

      </div>

    );
  }

  return (

    <div className="profile-page">

      {/* PROFILE CARD */}

      <motion.div
        className="profile-card"

        initial={{
          opacity: 0,
          y: 30
        }}

        animate={{
          opacity: 1,
          y: 0
        }}

        transition={{
          duration: 0.7
        }}
      >

        {/* AVATAR */}

        <div className="profile-avatar">

          <FaUser />

        </div>

        {/* USER INFO */}

        <div className="profile-info">

          {editing ? (

            <>

              <input
                type="text"

                value={name}

                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                type="email"

                value={email}

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
              />

            </>

          ) : (

            <>

              <h1>
                {name}
              </h1>

              <p>

                <FaEnvelope />

                {email}

              </p>

            </>

          )}

        </div>

        {/* BUTTONS */}

        <div className="profile-actions">

          {editing ? (

            <button
              onClick={saveProfile}
            >

              Save Changes

            </button>

          ) : (

            <button
              onClick={() =>
                setEditing(true)
              }
            >

              Edit Profile

            </button>

          )}

        </div>

      </motion.div>

      {/* STATS */}

      <div className="profile-stats">

        <motion.div
          className="profile-stat"

          whileHover={{
            y: -8
          }}
        >

          <FaBullseye />

          <h2>24</h2>

          <p>
            Goals Completed
          </p>

        </motion.div>

        <motion.div
          className="profile-stat"

          whileHover={{
            y: -8
          }}
        >

          <FaFire />

          <h2>16</h2>

          <p>
            Day Streak
          </p>

        </motion.div>

        <motion.div
          className="profile-stat"

          whileHover={{
            y: -8
          }}
        >

          <FaBrain />

          <h2>89%</h2>

          <p>
            Productivity Score
          </p>

        </motion.div>

      </div>

      {/* BADGES */}

      <div className="badges-section">

        <h2>
          Achievements 🏆
        </h2>

        <div className="badges-grid">

          <div className="badge-card">

            <FaMedal />

            <h3>
              Goal Crusher
            </h3>

            <p>
              Completed 20 goals
            </p>

          </div>

          <div className="badge-card">

            <FaFire />

            <h3>
              Consistency King
            </h3>

            <p>
              15+ day streak
            </p>

          </div>

          <div className="badge-card">

            <FaBrain />

            <h3>
              AI Master
            </h3>

            <p>
              High productivity score
            </p>

          </div>

        </div>

      </div>

      {/* AI INSIGHT */}

      <motion.div
        className="profile-ai"

        initial={{
          opacity: 0
        }}

        animate={{
          opacity: 1
        }}

        transition={{
          delay: 1
        }}
      >

        <h2>
          AI Insight 🤖
        </h2>

        <p>

          Your consistency has
          improved significantly this
          month. Keep maintaining your
          current focus level to unlock
          elite productivity achievements.

        </p>

      </motion.div>

    </div>

  );
}

export default Profile;