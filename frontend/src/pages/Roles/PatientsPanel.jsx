import { AlertCircle, Calendar, Clock, Eye, Heart, Mail, Phone, Plus, Search, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';

// Enhanced mock patient data
const mockPatients = [
  { 
    id: 1, 
    firstName: 'Jane', 
    lastName: 'Doe', 
    dob: '1990-01-01', 
    gender: 'F', 
    lastVisit: '2023-10-26', 
    status: 'Waiting',
    phone: '+1-555-0123',
    email: 'jane.doe@email.com',
    conditions: ['Diabetes', 'Hypertension'],
    vitals: { bp: '120/80', temp: '98.6°F', hr: '72' },
    nextAppointment: '2023-11-15',
    insurance: 'BlueCross',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 2, 
    firstName: 'Jan Lorenz', 
    lastName: 'Laroco', 
    dob: '2005-08-06', 
    gender: 'M', 
    lastVisit: '2023-09-12', 
    status: 'Discharged',
    phone: '+1-555-0124',
    email: 'janlorenzlaroco@gmail.com',
    conditions: ['Mahal si Crush - Ner'],
    vitals: { bp: '118/75', temp: '98.2°F', hr: '68' },
    nextAppointment: '2023-12-01',
    insurance: 'Aetna',
    avatar: 'https://scontent.fceb8-1.fna.fbcdn.net/v/t39.30808-1/527092876_2245600532553588_2509378458588534274_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=105&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeEivjfqG31Q9r6bwJTvmq2wx6PvY-IbiafHo-9j4huJp6JhVLxDV6vOCMWGYDwf978m8wgYRwC3AC-PqzobbW8O&_nc_ohc=H_ZIUucJE3kQ7kNvwHCrn8R&_nc_oc=AdmaOBJ_G026hIL-ufvu5qbsgsBeQcva7rdDr3ShatJ7Z3j_Wa6FF6e6NTnTlCU1AEI&_nc_zt=24&_nc_ht=scontent.fceb8-1.fna&_nc_gid=BCjRiTwJ8C0KsJDE3Sg8pQ&oh=00_AfWqmVuWvrET4_5kZOxVQtLjUJUH-9fHzpIBqWFFE8s5fQ&oe=68BA2D01'
  },
  { 
    id: 3, 
    firstName: 'Maria', 
    lastName: 'Rodriguez', 
    dob: '1977-11-30', 
    gender: 'F', 
    lastVisit: '2023-10-27', 
    status: 'In-Appointment',
    phone: '+1-555-0125',
    email: 'maria.rodriguez@email.com',
    conditions: ['Arthritis', 'High Cholesterol'],
    vitals: { bp: '130/85', temp: '98.8°F', hr: '75' },
    nextAppointment: '2023-11-08',
    insurance: 'Medicare',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 4, 
    firstName: 'Robert', 
    lastName: 'Johnson', 
    dob: '1965-03-22', 
    gender: 'M', 
    lastVisit: '2023-10-20', 
    status: 'Waiting',
    phone: '+1-555-0126',
    email: 'robert.johnson@email.com',
    conditions: ['Heart Disease'],
    vitals: { bp: '140/90', temp: '99.1°F', hr: '80' },
    nextAppointment: '2023-11-20',
    insurance: 'Kaiser',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  { 
    id: 5, 
    firstName: 'Sarah', 
    lastName: 'Williams', 
    dob: '1995-08-14', 
    gender: 'F', 
    lastVisit: '2023-10-25', 
    status: 'Discharged',
    phone: '+1-555-0127',
    email: 'sarah.williams@email.com',
    conditions: [],
    vitals: { bp: '115/70', temp: '98.4°F', hr: '65' },
    nextAppointment: '2023-12-15',
    insurance: 'UnitedHealth',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
  },
];

const PatientsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [genderFilter, setGenderFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'
  const [selectedPatients, setSelectedPatients] = useState([]);

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Filter patients based on search and filters
  const filteredPatients = mockPatients.filter(patient => {
    const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    const matchesGender = genderFilter === 'All' || patient.gender === genderFilter;
    
    return matchesSearch && matchesStatus && matchesGender;
  });

  // Get status badge color and icon
  const getStatusInfo = (status) => {
    switch(status) {
      case 'Waiting': return { 
        color: 'bg-amber-100 text-amber-800 border-amber-200', 
        icon: <Clock className="w-3 h-3" />
      };
      case 'In-Appointment': return { 
        color: 'bg-blue-100 text-blue-800 border-blue-200', 
        icon: <Users className="w-3 h-3" />
      };
      case 'Discharged': return { 
        color: 'bg-emerald-100 text-emerald-800 border-emerald-200', 
        icon: <TrendingUp className="w-3 h-3" />
      };
      default: return { 
        color: 'bg-gray-100 text-gray-800 border-gray-200', 
        icon: <AlertCircle className="w-3 h-3" />
      };
    }
  };

  // Toggle patient selection
  const togglePatientSelection = (patientId) => {
    setSelectedPatients(prev => 
      prev.includes(patientId) 
        ? prev.filter(id => id !== patientId)
        : [...prev, patientId]
    );
  };

  // Statistics
  const stats = {
    total: mockPatients.length,
    waiting: mockPatients.filter(p => p.status === 'Waiting').length,
    inAppointment: mockPatients.filter(p => p.status === 'In-Appointment').length,
    avgAge: Math.round(mockPatients.reduce((sum, p) => sum + calculateAge(p.dob), 0) / mockPatients.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Directory</h1>
              <p className="text-gray-600">Manage and monitor patient information</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <Plus className="w-5 h-5" />
              <span>New Patient</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Patients</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Waiting</p>
                  <p className="text-2xl font-bold text-amber-600">{stats.waiting}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Appointment</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inAppointment}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Avg Age</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgAge}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
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
                  placeholder="Search by name, phone, or ID..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center space-x-3">
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Statuses</option>
                <option value="Waiting">Waiting</option>
                <option value="In-Appointment">In Appointment</option>
                <option value="Discharged">Discharged</option>
              </select>
              
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="All">All Genders</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
              
              <div className="flex items-center space-x-2 border border-gray-200 rounded-xl p-1 bg-gray-50">
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'table' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'cards' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedPatients.length > 0 && (
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 font-medium">
                {selectedPatients.length} patient{selectedPatients.length > 1 ? 's' : ''} selected
              </span>
              <div className="space-x-2">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                  Schedule Appointments
                </button>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                  Send Reminders
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm">
                  Export
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        {viewMode === 'table' ? (
          /* Table View */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="w-12 px-6 py-4">
                      <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPatients(filteredPatients.map(p => p.id));
                          } else {
                            setSelectedPatients([]);
                          }
                        }}
                      />
                    </th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Age/Gender</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Conditions</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Next Visit</th>
                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.map((patient) => {
                    const statusInfo = getStatusInfo(patient.status);
                    return (
                      <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedPatients.includes(patient.id)}
                            onChange={() => togglePatientSelection(patient.id)}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <img 
                              className="w-10 h-10 rounded-full object-cover border-2 border-gray-200" 
                              src={patient.avatar} 
                              alt={`${patient.firstName} ${patient.lastName}`}
                            />
                            <div>
                              <div className="font-semibold text-gray-900">
                                {patient.firstName} {patient.lastName}
                              </div>
                              <div className="text-sm text-gray-500">ID: {patient.id.toString().padStart(4, '0')}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{calculateAge(patient.dob)} years</div>
                            <div className="text-gray-500">{patient.gender === 'M' ? 'Male' : 'Female'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <Phone className="w-3 h-3 mr-2" />
                              {patient.phone}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Mail className="w-3 h-3 mr-2" />
                              {patient.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {patient.conditions.length > 0 ? (
                              patient.conditions.slice(0, 2).map((condition, idx) => (
                                <div key={idx} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full mr-1">
                                  {condition}
                                </div>
                              ))
                            ) : (
                              <span className="text-gray-400 text-sm">None</span>
                            )}
                            {patient.conditions.length > 2 && (
                              <div className="text-xs text-gray-500">+{patient.conditions.length - 2} more</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                            {statusInfo.icon}
                            <span>{patient.status}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{patient.nextAppointment}</div>
                          <div className="text-xs text-gray-500">in 19 days</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors">
                              <Calendar className="w-4 h-4" />
                            </button>
                            <button className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Card View */
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => {
              const statusInfo = getStatusInfo(patient.status);
              return (
                <div key={patient.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img 
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
                        src={patient.avatar} 
                        alt={`${patient.firstName} ${patient.lastName}`}
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">ID: {patient.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedPatients.includes(patient.id)}
                      onChange={() => togglePatientSelection(patient.id)}
                    />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium">{calculateAge(patient.dob)} years ({patient.gender === 'M' ? 'Male' : 'Female'})</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Phone:</span>
                      <span className="font-medium">{patient.phone}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Insurance:</span>
                      <span className="font-medium">{patient.insurance}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Next Visit:</span>
                      <span className="font-medium">{patient.nextAppointment}</span>
                    </div>
                  </div>

                  {/* Vitals */}
                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Latest Vitals</h4>
                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{patient.vitals.bp}</div>
                        <div className="text-xs text-gray-500">BP</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{patient.vitals.temp}</div>
                        <div className="text-xs text-gray-500">Temp</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{patient.vitals.hr}</div>
                        <div className="text-xs text-gray-500">HR</div>
                      </div>
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Conditions</h4>
                    <div className="flex flex-wrap gap-1">
                      {patient.conditions.length > 0 ? (
                        patient.conditions.map((condition, idx) => (
                          <span key={idx} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            {condition}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400 text-xs">No known conditions</span>
                      )}
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex items-center justify-between">
                    <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                      {statusInfo.icon}
                      <span>{patient.status}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="text-purple-600 hover:text-purple-800 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* No Results */}
        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientsPanel;