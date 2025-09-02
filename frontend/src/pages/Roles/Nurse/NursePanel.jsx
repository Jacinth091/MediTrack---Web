import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Bell,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Pill,
  Stethoscope,
  Users
} from 'lucide-react';
import { useState } from 'react';

const NurseDashboard = () => {
  const [timeRange, setTimeRange] = useState('today');

  // Mock data for dashboard
  const dashboardData = {
    stats: {
      totalPatients: 1247,
      todayAppointments: 18,
      waitingPatients: 6,
      availableStaff: 8
    },
    appointmentsToday: [
      { id: 1, patient: 'Jane Doe', time: '9:00 AM', doctor: 'Dr. Smith', status: 'completed' },
      { id: 2, patient: 'Robert Johnson', time: '10:30 AM', doctor: 'Dr. Lee', status: 'in-progress' },
      { id: 3, patient: 'Maria Rodriguez', time: '11:45 AM', doctor: 'Dr. Garcia', status: 'upcoming' },
      { id: 4, patient: 'John Wilson', time: '2:00 PM', doctor: 'Dr. Smith', status: 'upcoming' },
      { id: 5, patient: 'Sarah Williams', time: '3:30 PM', doctor: 'Dr. Johnson', status: 'upcoming' }
    ],
    recentPatients: [
      { id: 1, name: 'Jane Doe', lastVisit: '2 hours ago', condition: 'Hypertension', status: 'stable' },
      { id: 2, name: 'Robert Johnson', lastVisit: '3 hours ago', condition: 'Diabetes', status: 'improving' },
      { id: 3, name: 'Maria Rodriguez', lastVisit: 'Yesterday', condition: 'Arthritis', status: 'stable' },
      { id: 4, name: 'John Wilson', lastVisit: 'Yesterday', condition: 'Migraine', status: 'worsening' }
    ],
    alerts: [
      { id: 1, type: 'medication', message: 'Patient John Wilson missed medication', priority: 'high' },
      { id: 2, type: 'appointment', message: '3 appointments rescheduled for tomorrow', priority: 'medium' },
      { id: 3, type: 'resource', message: 'Low inventory of flu vaccines', priority: 'medium' }
    ],
    departmentStats: [
      { name: 'Cardiology', patients: 24, trend: 'up' },
      { name: 'Pediatrics', patients: 18, trend: 'down' },
      { name: 'Orthopedics', patients: 15, trend: 'up' },
      { name: 'General Medicine', patients: 32, trend: 'stable' }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, here's what's happening today</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Bell className="w-6 h-6 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                3
              </span>
            </div>
            <select
              className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                <p className="text-2xl font-bold text-gray-900">{dashboardData.stats.totalPatients}</p>
                <p className="text-xs text-green-600 flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  12% from last month
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                <p className="text-2xl font-bold text-amber-600">{dashboardData.stats.todayAppointments}</p>
                <p className="text-xs text-gray-500">6 completed</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Waiting Patients</p>
                <p className="text-2xl font-bold text-purple-600">{dashboardData.stats.waitingPatients}</p>
                <p className="text-xs text-gray-500">Avg wait: 15min</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Available Staff</p>
                <p className="text-2xl font-bold text-green-600">{dashboardData.stats.availableStaff}</p>
                <p className="text-xs text-gray-500">2 on break</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Appointments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Today's Appointments</h2>
                <button className="text-blue-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {dashboardData.appointmentsToday.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${
                        appointment.status === 'completed' ? 'bg-green-500' :
                        appointment.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                      }`} />
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patient}</p>
                        <p className="text-sm text-gray-500">{appointment.doctor}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{appointment.time}</p>
                      <p className="text-xs text-gray-500 capitalize">{appointment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Department Statistics</h2>
              <div className="space-y-4">
                {dashboardData.departmentStats.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-gray-700">{dept.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold">{dept.patients} patients</span>
                      {dept.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-500" />}
                      {dept.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Alerts & Notifications */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Alerts & Notifications</h2>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {dashboardData.alerts.map((alert) => (
                  <div key={alert.id} className={`p-4 rounded-xl border ${
                    alert.priority === 'high' ? 'bg-red-50 border-red-200' :
                    alert.priority === 'medium' ? 'bg-amber-50 border-amber-200' :
                    'bg-blue-50 border-blue-200'
                  }`}>
                    <div className="flex items-start space-x-3">
                      <AlertCircle className={`w-5 h-5 ${
                        alert.priority === 'high' ? 'text-red-500' :
                        alert.priority === 'medium' ? 'text-amber-500' : 'text-blue-500'
                      }`} />
                      <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Patients */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Patients</h2>
                <button className="text-blue-600 text-sm font-medium">View All</button>
              </div>
              <div className="space-y-4">
                {dashboardData.recentPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">{patient.lastVisit}</p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                        patient.status === 'stable' ? 'bg-green-100 text-green-800' :
                        patient.status === 'improving' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {patient.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-blue-50 transition-colors">
                  <FileText className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-sm font-medium">New Report</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-green-50 transition-colors">
                  <Calendar className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-sm font-medium">Schedule</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-purple-50 transition-colors">
                  <Pill className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-sm font-medium">Pharmacy</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-xl hover:bg-amber-50 transition-colors">
                  <MessageSquare className="w-6 h-6 text-amber-600 mb-2" />
                  <span className="text-sm font-medium">Messages</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NurseDashboard;