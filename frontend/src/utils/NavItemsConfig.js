export default function NavItemsConfig() {
  return {
      admin: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "User Management", icon: "fas fa-users-cog", path: "user-management" },
      // { text: "Role Management", icon: "fas fa-user-shield", path: "role-management" },
      { text: "Logs", icon: "fas fa-clipboard-list", path: "logs" },
      { text: "Reports & Analytics", icon: "fas fa-chart-line", path: "reports-analytics" },
      { text: "Settings", icon: "fas fa-cog", path: "settings" },
    ],

    doctor: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patients", icon: "fas fa-user-injured", path: "patients" },
      { text: "Appointments", icon: "fas fa-calendar-check", path: "appointments" },
      { text: "Prescriptions", icon: "fas fa-file-prescription", path: "prescriptions" },
    ],

    nurse: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patient Records", icon: "fas fa-notes-medical", path: "patients/records" },
      { text: "Appointments", icon: "fas fa-calendar-alt", path: "appointments" },
    ],

    staff: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patient Records", icon: "fas fa-user-injured", path: "patients/records" },
      { text: "Inventory", icon: "fas fa-boxes", path: "inventory" },
    ],

    receptionist: [
      { text: "Dashboard", icon: "fas fa-tachometer-alt", path: "dashboard" },
      { text: "Patient Records", icon: "fas fa-user-injured", path: "patients/records" },
    ],

  }
}