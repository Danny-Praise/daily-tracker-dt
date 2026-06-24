// Profile.js

import "./Profile.css";

import {
  useState, useEffect
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
  FaMedal,
  FaCog
} from "react-icons/fa";

import { userAPI } from "./api/apiClient";

function Profile({ user, setLoggedInUser }) {
  // STATES

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.full_name || user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
  const [archivePassword, setArchivePassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadProfile();
    }
  }, [user?.id]);

  const loadProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      const profileData = response.data.user;
      setName(profileData.full_name);
      setEmail(profileData.email);
    } catch (error) {
      console.log(error);
    }
  };

  // SAVE PROFILE
  const saveProfile = async () => {
    try {
      setLoading(true);
      const updateData: any = { full_name: name };
      if (archivePassword) {
        updateData.archive_password = archivePassword;
      }

      const response = await userAPI.updateProfile(updateData);

      const updatedUser = {
        ...user,
        ...response.data.user
      };

      localStorage.setItem(
        "dt-user",
        JSON.stringify(updatedUser)
      );

      if (typeof setLoggedInUser === "function") {
        setLoggedInUser(updatedUser);
      }

      alert(
        "Profile Updated Successfully 🚀"
      );

      setEditing(false);
      setArchivePassword("");
    } catch (error) {
      console.log(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
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

      <section id="overview" className="profile-section">
            <motion.div
              className="profile-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="profile-avatar">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" />
                ) : (
                  <FaUser />
                )}
              </div>

              <div className="profile-info">
                {editing ? (
                  <>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="profile-file-label">
                      Upload your profile picture
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = () => {
                            setProfilePicture(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <h1>{name}</h1>
                    <p>
                      <FaEnvelope />
                      {email}
                    </p>
                  </>
                )}
              </div>

              <div className="profile-actions">
                {editing ? (
                  <button onClick={saveProfile}>Save Changes</button>
                ) : (
                  <button onClick={() => setEditing(true)}>Edit Profile</button>
                )}
              </div>
            </motion.div>
          </section>

          <section id="stats" className="profile-section">
            <div className="profile-stats">
              <motion.div
                className="profile-stat"
                whileHover={{ y: -8 }}
              >
                <FaBullseye />
                <h2>24</h2>
                <p>Goals Completed</p>
              </motion.div>

              <motion.div
                className="profile-stat"
                whileHover={{ y: -8 }}
              >
                <FaFire />
                <h2>16</h2>
                <p>Day Streak</p>
              </motion.div>

              <motion.div
                className="profile-stat"
                whileHover={{ y: -8 }}
              >
                <FaBrain />
                <h2>89%</h2>
                <p>Productivity Score</p>
              </motion.div>
            </div>
          </section>

          <section id="achievements" className="profile-section">
            <div className="badges-section">
              <h2>Achievements 🏆</h2>
              <div className="badges-grid">
                <div className="badge-card">
                  <FaMedal />
                  <h3>Goal Crusher</h3>
                  <p>Completed 20 goals</p>
                </div>
                <div className="badge-card">
                  <FaFire />
                  <h3>Consistency King</h3>
                  <p>15+ day streak</p>
                </div>
                <div className="badge-card">
                  <FaBrain />
                  <h3>AI Master</h3>
                  <p>High productivity score</p>
                </div>
              </div>
            </div>
          </section>

          <section id="settings" className="profile-section">
            <motion.div
              className="profile-settings"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="settings-header">
                <FaCog />
                <div>
                  <h2>System Settings</h2>
                  <p>Protect archives and keep your profile clean.</p>
                </div>
              </div>

              <div className="settings-grid">
                <div className="settings-card">
                  <h3>Archive Password</h3>
                  <p>
                    Create a separate password to protect archived notes in your private vault.
                  </p>
                  <input
                    type="password"
                    placeholder="Set archive password"
                    value={archivePassword}
                    onChange={(e) => setArchivePassword(e.target.value)}
                  />
                </div>
                <div className="settings-card">
                  <h3>Profile Picture</h3>
                  <p>
                    Upload a personal image so your profile avatar feels premium and unique.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setProfilePicture(reader.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </section>

          <section id="insight" className="profile-section">
            <motion.div
              className="profile-ai"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <h2>AI Insight 🤖</h2>
              <p>
                Your consistency has improved significantly this month. Keep maintaining your focus level to unlock elite productivity achievements.
              </p>
            </motion.div>
          </section>
    </div>

  );
}

export default Profile;