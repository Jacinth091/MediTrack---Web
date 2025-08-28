const NavItemsConfig = () => {
  return {
    admin: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "User Management", icon: "fas fa-users-cog", path: "user-management" },
      { text: "Role Management", icon: "fas fa-user-shield", path: "role-management" },
      { text: "Logs", icon: "fas fa-clipboard-list", path: "logs" },
      { text: "Reports & Analytics", icon: "fas fa-chart-line", path: "reports-analytics" },
      { text: "Settings", icon: "fas fa-cog", path: "settings" },
    ],

    doctor: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patients", icon: "fas fa-user-injured", path: "patients" },
      { text: "Records", icon: "fas fa-notes-medical", path: "records" },
      { text: "Appointments", icon: "fas fa-calendar-check", path: "appointments" },
      { text: "Prescriptions", icon: "fas fa-file-prescription", path: "prescriptions" },
    ],

    nurse: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patients", icon: "fas fa-user-injured", path: "patients" },
      { text: "Records", icon: "fas fa-notes-medical", path: "records" },
      { text: "Appointments", icon: "fas fa-calendar-alt", path: "appointments" },
    ],

    staff: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patients", icon: "fas fa-user-injured", path: "patients" },
      { text: "Records", icon: "fas fa-notes-medical", path: "records" },
      { text: "Inventory", icon: "fas fa-boxes", path: "inventory" },
    ],

    receptionist: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patients", icon: "fas fa-user-injured", path: "patients" },
      { text: "Records", icon: "fas fa-notes-medical", path: "records" },
      { text: "Add Patient", icon: "fas fa-user-plus", path: "add-patient" },
    ],

    // Public routes (for unauthenticated users)
    public: [
      { text: "Home", icon: "fas fa-home", path: "/" },
      { text: "Login", icon: "fas fa-sign-in-alt", path: "/login" },
      { text: "Sign Up", icon: "fas fa-user-plus", path: "/signup" },
    ]
  }
}

export default NavItemsConfig;