import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  Edit,
  Filter,
  Mail,
  Phone,
  Plus,
  Search,
  Trash2
} from 'lucide-react';
import { useState } from 'react';

const AppointmentsPanel = () => {
  const [dateFilter, setDateFilter] = useState('today');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedAppointment, setExpandedAppointment] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'

  // Mock appointments data
  const mockAppointments = [
    {
      id: 1,
      patientName: 'Jane Doe',
      patientId: 'P-001',
      date: '2023-11-15',
      time: '10:00 AM',
      duration: 30,
      doctor: 'Dr. Smith',
      department: 'Cardiology',
      status: 'confirmed',
      reason: 'Follow-up consultation',
      notes: 'Patient reported mild chest discomfort',
      contact: '+1-555-0123',
      email: 'jane.doe@email.com',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      patientName: 'Jan Lorenz Laroco',
      patientId: 'P-002',
      date: '2023-11-15',
      time: '11:30 AM',
      duration: 45,
      doctor: 'Dr. Johnson',
      department: 'General Medicine',
      status: 'confirmed',
      reason: 'Annual physical examination',
      notes: 'Routine check-up, no specific concerns',
      contact: '+1-555-0124',
      email: 'janlorenzlaroco@gmail.com',
      avatar: 'https://scontent.fceb8-1.fna.fbcdn.net/v/t39.30808-1/527092876_2245600532553588_2509378458588534274_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEivjfqG31Q9r6bwJTvmq2wx6PvY-IbiafHo-9j4huJp6JhVLxDV6vOCMWGYDwf978m8wgYRwC3AC-PqzobbW8O&_nc_ohc=H_ZIUucJE3kQ7kNvwHCrn8R&_nc_oc=AdmaOBJ_G026hIL-ufvu5qbsgsBeQcva7rdDr3ShatJ7Z3j_Wa6FF6e6NTnTlCU1AEI&_nc_zt=24&_nc_ht=scontent.fceb8-1.fna&_nc_gid=BCjRiTwJ8C0KsJDE3Sg8pQ&oh=00_AfWqmVuWvrET4_5kZOxVQtLjUJUH-9fHzpIBqWFFE8s5fQ&oe=68BA2D01'
    },
    {
      id: 3,
      patientName: 'Maria Rodriguez',
      patientId: 'P-003',
      date: '2023-11-15',
      time: '2:00 PM',
      duration: 60,
      doctor: 'Dr. Lee',
      department: 'Orthopedics',
      status: 'pending',
      reason: 'Knee pain evaluation',
      notes: 'Patient has history of sports injury',
      contact: '+1-555-0125',
      email: 'maria.rodriguez@email.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      patientName: 'Robert Johnson',
      patientId: 'P-004',
      date: '2023-11-16',
      time: '9:00 AM',
      duration: 30,
      doctor: 'Dr. Smith',
      department: 'Cardiology',
      status: 'confirmed',
      reason: 'Post-operation check',
      notes: 'Monitor recovery from bypass surgery',
      contact: '+1-555-0126',
      email: 'robert.johnson@email.com',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      patientName: 'Sarah Williams',
      patientId: 'P-005',
      date: '2023-11-16',
      time: '1:30 PM',
      duration: 45,
      doctor: 'Dr. Garcia',
      department: 'Pediatrics',
      status: 'cancelled',
      reason: 'Vaccination',
      notes: 'Annual flu shot',
      contact: '+1-555-0127',
      email: 'sarah.williams@email.com',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  // Filter appointments based on selected filters
  const filteredAppointments = mockAppointments.filter(appointment => {
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && appointment.date === '2023-11-15') ||
                       (dateFilter === 'tomorrow' && appointment.date === '2023-11-16');
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    
    return matchesDate && matchesStatus;
  });

  // Get status badge styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Toggle appointment details expansion
  const toggleAppointmentDetails = (id) => {
    if (expandedAppointment === id) {
      setExpandedAppointment(null);
    } else {
      setExpandedAppointment(id);
    }
  };

  // Stats for the header
  const stats = {
    total: mockAppointments.length,
    today: mockAppointments.filter(a => a.date === '2023-11-15').length,
    confirmed: mockAppointments.filter(a => a.status === 'confirmed').length,
    cancelled: mockAppointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Appointment Management</h1>
              <p className="text-gray-600">Schedule and track patient appointments</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <Plus className="w-5 h-5" />
              <span>New Appointment</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Today's Appointments</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.today}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Confirmed</p>
                  <p className="text-2xl font-bold text-green-600">{stats.confirmed}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Cancelled</p>
                  <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient name, doctor, or department..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center space-x-3">
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="week">This Week</option>
              </select>
              
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              <button className="flex items-center space-x-2 border border-gray-200 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>More Filters</span>
              </button>

              <div className="flex items-center space-x-2 border border-gray-200 rounded-xl p-1 bg-gray-50">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  List
                </button>
                <button
                  onClick={() => setViewMode('calendar')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'calendar' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Department</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((appointment) => (
                  <>
                    <tr key={appointment.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleAppointmentDetails(appointment.id)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" 
                            src={appointment.avatar} 
                            alt={appointment.patientName}
                          />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {appointment.patientName}
                            </div>
                            <div className="text-sm text-gray-500">ID: {appointment.patientId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{appointment.date}</div>
                          <div className="text-gray-500">{appointment.time} ({appointment.duration} mins)</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{appointment.doctor}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{appointment.department}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate">{appointment.reason}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(appointment.status)}`}>
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                          {expandedAppointment === appointment.id ? (
                            <ChevronUp className="w-5 h-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </td>
                    </tr>
                    {expandedAppointment === appointment.id && (
                      <tr className="bg-blue-50">
                        <td colSpan="7" className="px-6 py-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Patient Details</h4>
                              <div className="space-y-2">
                                <div className="flex items-center text-sm text-gray-600">
                                  <Phone className="w-4 h-4 mr-2" />
                                  {appointment.contact}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <Mail className="w-4 h-4 mr-2" />
                                  {appointment.email}
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Appointment Notes</h4>
                              <p className="text-sm text-gray-600">{appointment.notes}</p>
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-gray-700 mb-2">Actions</h4>
                              <div className="flex space-x-2">
                                <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 px-3 py-1 bg-blue-100 rounded-lg">
                                  <Phone className="w-4 h-4 mr-1" />
                                  Call
                                </button>
                                <button className="flex items-center text-sm text-green-600 hover:text-green-800 px-3 py-1 bg-green-100 rounded-lg">
                                  <Mail className="w-4 h-4 mr-1" />
                                  Message
                                </button>
                                <button className="flex items-center text-sm text-purple-600 hover:text-purple-800 px-3 py-1 bg-purple-100 rounded-lg">
                                  <Edit className="w-4 h-4 mr-1" />
                                  Reschedule
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredAppointments.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters or schedule a new appointment</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Schedule New Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentsPanel;