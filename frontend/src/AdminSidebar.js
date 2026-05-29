// AdminSidebar.js

import "./AdminSidebar.css";

function AdminSidebar({

  activeSection,
  setActiveSection

}) {

  const menuItems = [

    "Dashboard",

    "Users",

    "Analytics",

    "Testimonials",

    "Reports",

    "Premium",

    "Settings"

  ];

  return (

    <div className="admin-sidebar">

      {/* LOGO */}

      <div className="admin-logo">

        <h2>
          DT ADMIN ⚡
        </h2>

        <p>
          Control Center
        </p>

      </div>

      {/* MENU */}

      <ul className="admin-menu">

        {menuItems.map((item) => (

          <li

            key={item}

            className={
              activeSection === item
                ? "active-admin-menu"
                : ""
            }

            onClick={() =>
              setActiveSection(item)
            }

          >

            {item}

          </li>

        ))}

      </ul>

      {/* BOTTOM */}

      <div className="admin-bottom">

        <button

          className="admin-logout-btn"

          onClick={() => {

            localStorage.removeItem(
              "dt-user"
            );

            window.location.href =
              "/";

          }}

        >

          Logout

        </button>

      </div>

    </div>

  );
}

export default AdminSidebar;