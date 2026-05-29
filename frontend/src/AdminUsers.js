// AdminUsers.js

import "./AdminUsers.css";

import { useState } from "react";

function AdminUsers() {

  const [users, setUsers] =
    useState([

      {
        id: 1,
        name: "Danny",
        email: "danny@gmail.com",
        status: "Active",
        plan: "Premium"
      },

      {
        id: 2,
        name: "Sarah",
        email: "sarah@gmail.com",
        status: "Active",
        plan: "Free"
      },

      {
        id: 3,
        name: "Rachel",
        email: "rachel@gmail.com",
        status: "Suspended",
        plan: "Premium"
      },

      {
        id: 4,
        name: "Michael",
        email: "michael@gmail.com",
        status: "Active",
        plan: "Enterprise"
      }

    ]);

  const [search,
    setSearch] =
    useState("");

  // DELETE USER

  const deleteUser = (id) => {

    const updatedUsers =
      users.filter(
        (user) =>
          user.id !== id
      );

    setUsers(updatedUsers);
  };

  // TOGGLE STATUS

  const toggleStatus = (id) => {

    const updatedUsers =
      users.map((user) => {

        if (user.id === id) {

          return {

            ...user,

            status:
              user.status === "Active"
                ? "Suspended"
                : "Active"

          };

        }

        return user;
      });

    setUsers(updatedUsers);
  };

  // FILTER USERS

  const filteredUsers =
    users.filter((user) =>

      user.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )

    );

  return (

    <div className="admin-users">

      {/* TOP */}

      <div className="admin-users-top">

        <h2>
          User Management
        </h2>

        <input

          type="text"

          placeholder="Search users..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

        />

      </div>

      {/* TABLE */}

      <div className="admin-users-table">

        <table>

          <thead>

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Status</th>

              <th>Plan</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user.id}>

                <td>
                  {user.name}
                </td>

                <td>
                  {user.email}
                </td>

                <td>

                  <span

                    className={
                      user.status === "Active"
                        ? "active-status"
                        : "suspended-status"
                    }

                  >

                    {user.status}

                  </span>

                </td>

                <td>

                  <span

                    className={`plan-badge ${

                      user.plan ===
                      "Premium"

                        ? "premium-plan"

                        : user.plan ===
                          "Enterprise"

                        ? "enterprise-plan"

                        : "free-plan"

                    }`}

                  >

                    {user.plan}

                  </span>

                </td>

                <td>

                  <div className="action-buttons">

                    <button

                      className="suspend-btn"

                      onClick={() =>
                        toggleStatus(
                          user.id
                        )
                      }

                    >

                      {user.status ===
                      "Active"

                        ? "Suspend"

                        : "Activate"}

                    </button>

                    <button

                      className="delete-user-btn"

                      onClick={() =>
                        deleteUser(
                          user.id
                        )
                      }

                    >

                      Delete

                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default AdminUsers;