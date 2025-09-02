import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  ChevronDown,
  Download,
  Edit3,
  Eye,
  FileText,
  Heart,
  Mail,
  MapPin,
  Phone,
  Pill,
  Plus,
  Scissors,
  Search,
  Shield,
  User,
  UserCheck,
  Users,
  Zap
} from 'lucide-react';
import { useState } from 'react';

const Patients = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPatients, setSelectedPatients] = useState([]);

  // Mock data following your MongoDB schema structure
  const patients = [
    {
      _id: '66f1234567890abcdef12345',
      patientId: 'PAT-2024-000001',
      personalInfo: {
        firstName: 'Maria',
        middleName: 'Santos',
        lastName: 'Rodriguez',
        dateOfBirth: new Date('1990-05-15'),
        gender: 'F'
      },
      contactInfo: {
        primaryPhone: '+63-917-123-4567',
        alternatePhone: '+63-32-123-4567',
        email: 'maria.rodriguez@gmail.com',
        address: {
          street: '123 Colon Street',
          city: 'Cebu City',
          province: 'Cebu',
          zipCode: '6000',
          country: 'Philippines'
        }
      },
      emergencyContact: {
        name: 'Juan Rodriguez',
        relationship: 'Spouse',
        phone: '+63-917-765-4321',
        email: 'juan.rodriguez@gmail.com'
      },
      demographics: {
        religion: 'Roman Catholic',
        nationality: 'Filipino',
        maritalStatus: 'Married'
      },
      medicalHistory: {
        allergies: [
          {
            allergen: 'Penicillin',
            reaction: 'Skin rash',
            severity: 'Moderate',
            dateDiscovered: new Date('2015-03-10')
          }
        ],
        chronicConditions: [
          {
            condition: 'Hypertension',
            diagnosedDate: new Date('2020-01-15'),
            status: 'Controlled'
          },
          {
            condition: 'Type 2 Diabetes',
            diagnosedDate: new Date('2021-06-20'),
            status: 'Active'
          }
        ],
        currentMedications: [
          {
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'Twice daily',
            startDate: new Date('2021-06-20'),
            prescribedBy: 'Dr. Smith',
            purpose: 'Diabetes management'
          },
          {
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            startDate: new Date('2020-01-15'),
            prescribedBy: 'Dr. Johnson',
            purpose: 'Blood pressure control'
          }
        ],
        pastSurgeries: [
          {
            procedure: 'Appendectomy',
            date: new Date('2018-09-12'),
            hospital: 'Cebu Doctors Hospital',
            surgeon: 'Dr. Garcia',
            outcome: 'Successful recovery'
          }
        ],
        socialHistory: {
          smoking: 'Never',
          alcohol: 'Occasional',
          occupation: 'Teacher',
          exerciseFrequency: 'Weekly'
        }
      },
      insurance: {
        provider: 'PhilHealth',
        policyNumber: 'PH-2024-001234',
        memberName: 'Maria Santos Rodriguez',
        expirationDate: new Date('2025-12-31')
      },
      status: 'Active',
      notes: 'Patient is compliant with medication regimen. Regular follow-ups recommended.',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-08-30')
    },
    {
      _id: '66f1234567890abcdef12346',
      patientId: 'PAT-2024-000002',
      personalInfo: {
        firstName: 'Juan',
        middleName: 'Carlos',
        lastName: 'Dela Cruz',
        dateOfBirth: new Date('1985-11-22'),
        gender: 'M'
      },
      contactInfo: {
        primaryPhone: '+63-920-987-6543',
        email: 'juan.delacruz@yahoo.com',
        address: {
          street: '456 Ramos Street',
          city: 'Mandaue City',
          province: 'Cebu',
          zipCode: '6014',
          country: 'Philippines'
        }
      },
      emergencyContact: {
        name: 'Ana Dela Cruz',
        relationship: 'Spouse',
        phone: '+63-920-123-7890'
      },
      demographics: {
        religion: 'Protestant',
        nationality: 'Filipino',
        maritalStatus: 'Married'
      },
      medicalHistory: {
        allergies: [],
        chronicConditions: [
          {
            condition: 'Asthma',
            diagnosedDate: new Date('2010-05-30'),
            status: 'Active'
          }
        ],
        currentMedications: [
          {
            name: 'Salbutamol',
            dosage: '100mcg',
            frequency: 'As needed',
            startDate: new Date('2010-05-30'),
            prescribedBy: 'Dr. Wilson',
            purpose: 'Asthma control'
          }
        ],
        pastSurgeries: [],
        socialHistory: {
          smoking: 'Former',
          alcohol: 'Never',
          occupation: 'Construction Worker',
          exerciseFrequency: 'Daily'
        }
      },
      insurance: {
        provider: 'SSS',
        policyNumber: 'SSS-2024-005678',
        memberName: 'Juan Carlos Dela Cruz'
      },
      status: 'Active',
      createdAt: new Date('2024-02-10'),
      updatedAt: new Date('2024-08-25')
    },
    {
      _id: '66f1234567890abcdef12347',
      patientId: 'PAT-2024-000003',
      personalInfo: {
        firstName: 'Ana',
        lastName: 'Reyes',
        dateOfBirth: new Date('2000-03-08'),
        gender: 'F'
      },
      contactInfo: {
        primaryPhone: '+63-915-555-1234',
        email: 'ana.reyes@gmail.com',
        address: {
          street: '789 Lahug Road',
          city: 'Cebu City',
          province: 'Cebu',
          zipCode: '6000',
          country: 'Philippines'
        }
      },
      emergencyContact: {
        name: 'Roberto Reyes',
        relationship: 'Parent',
        phone: '+63-915-555-5678'
      },
      demographics: {
        religion: 'Roman Catholic',
        nationality: 'Filipino',
        maritalStatus: 'Single'
      },
      medicalHistory: {
        allergies: [
          {
            allergen: 'Shellfish',
            reaction: 'Swelling, difficulty breathing',
            severity: 'Severe',
            dateDiscovered: new Date('2018-07-15')
          }
        ],
        chronicConditions: [],
        currentMedications: [],
        pastSurgeries: [],
        socialHistory: {
          smoking: 'Never',
          alcohol: 'Never',
          occupation: 'Student',
          exerciseFrequency: 'Weekly'
        }
      },
      insurance: {
        provider: 'Maxicare',
        policyNumber: 'MAX-2024-009876'
      },
      status: 'Active',
      createdAt: new Date('2024-03-20'),
      updatedAt: new Date('2024-08-20')
    }
  ];

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const formatAddress = (address) => {
    return `${address.street}, ${address.city}, ${address.province} ${address.zipCode}`;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Severe': return 'bg-red-100 text-red-800 border-red-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Mild': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getConditionStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-red-100 text-red-800';
      case 'Controlled': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPatients = patients.filter(patient => {
    const fullName = `${patient.personalInfo.firstName} ${patient.personalInfo.middleName || ''} ${patient.personalInfo.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || 
                         patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.contactInfo.primaryPhone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">MediTrack</h1>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <h2 className="text-lg text-gray-600">Patient Records</h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-800" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Nurse Johnson</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {/* <aside className="w-64 bg-white shadow-sm h-screen">
          <nav className="p-4 space-y-2">
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Activity className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Users className="w-5 h-5" />
              <span>Patients</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg">
              <FileText className="w-5 h-5" />
              <span>Patient Records</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </a>
            <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </a>
            
            <div className="pt-4 border-t border-gray-200 mt-4">
              <a href="#" className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </a>
            </div>
          </nav>
        </aside> */}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Patient Records</h2>
              <p className="text-gray-600">Manage comprehensive patient medical records</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, ID, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Patient</span>
              </button>
            </div>
          </div>

          {/* Patient Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPatients.map((patient) => (
              <div
                key={patient._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                {/* Patient Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">
                          {patient.personalInfo.firstName} {patient.personalInfo.middleName && patient.personalInfo.middleName + ' '}{patient.personalInfo.lastName}
                        </h3>
                        <p className="text-sm text-gray-600">{patient.patientId}</p>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Age</p>
                      <p className="font-medium">{calculateAge(patient.personalInfo.dateOfBirth)} years</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Gender</p>
                      <p className="font-medium">{patient.personalInfo.gender === 'M' ? 'Male' : 'Female'}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Marital Status</p>
                      <p className="font-medium">{patient.demographics.maritalStatus}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Nationality</p>
                      <p className="font-medium">{patient.demographics.nationality}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-4 bg-gray-50 border-b border-gray-100">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Phone className="w-4 h-4 mr-1" />
                    Contact Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span>{patient.contactInfo.primaryPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3 text-gray-400" />
                      <span className="truncate">{patient.contactInfo.email}</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                      <span className="text-xs">{formatAddress(patient.contactInfo.address)}</span>
                    </div>
                  </div>
                </div>

                {/* Medical Summary */}
                <div className="p-4">
                  <div className="space-y-4">
                    {/* Chronic Conditions */}
                    {patient.medicalHistory.chronicConditions.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <AlertTriangle className="w-4 h-4 mr-1 text-orange-500" />
                          Chronic Conditions
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.medicalHistory.chronicConditions.slice(0, 2).map((condition, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionStatusColor(condition.status)}`}
                            >
                              {condition.condition}
                            </span>
                          ))}
                          {patient.medicalHistory.chronicConditions.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{patient.medicalHistory.chronicConditions.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Allergies */}
                    {patient.medicalHistory.allergies.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Zap className="w-4 h-4 mr-1 text-red-500" />
                          Allergies
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {patient.medicalHistory.allergies.slice(0, 2).map((allergy, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(allergy.severity)}`}
                            >
                              {allergy.allergen}
                            </span>
                          ))}
                          {patient.medicalHistory.allergies.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                              +{patient.medicalHistory.allergies.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Current Medications */}
                    {patient.medicalHistory.currentMedications.length > 0 && (
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                          <Pill className="w-4 h-4 mr-1 text-blue-500" />
                          Current Medications
                        </h4>
                        <div className="space-y-1">
                          {patient.medicalHistory.currentMedications.slice(0, 2).map((med, index) => (
                            <div key={index} className="text-xs bg-blue-50 p-2 rounded">
                              <span className="font-medium">{med.name}</span> - {med.dosage} ({med.frequency})
                            </div>
                          ))}
                          {patient.medicalHistory.currentMedications.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{patient.medicalHistory.currentMedications.length - 2} more medications
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Insurance */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-green-500" />
                        Insurance
                      </h4>
                      <div className="text-sm">
                        <p className="font-medium">{patient.insurance.provider}</p>
                        <p className="text-gray-600 text-xs">{patient.insurance.policyNumber}</p>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        <UserCheck className="w-4 h-4 mr-1 text-purple-500" />
                        Emergency Contact
                      </h4>
                      <div className="text-sm">
                        <p className="font-medium">{patient.emergencyContact.name}</p>
                        <p className="text-gray-600 text-xs">{patient.emergencyContact.relationship} • {patient.emergencyContact.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      Updated: {new Date(patient.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:text-green-800 hover:bg-green-100 rounded-lg transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-100 rounded-lg transition-colors">
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results State */}
          {filteredPatients.length === 0 && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your search criteria or add a new patient</p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2 mx-auto">
                  <Plus className="w-4 h-4" />
                  <span>Add New Patient</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-xl font-bold text-gray-900">{patients.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">With Allergies</p>
                  <p className="text-xl font-bold text-red-600">
                    {patients.filter(p => p.medicalHistory.allergies.length > 0).length}
                  </p>
                </div>
                <Zap className="w-8 h-8 text-red-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Chronic Conditions</p>
                  <p className="text-xl font-bold text-orange-600">
                    {patients.filter(p => p.medicalHistory.chronicConditions.length > 0).length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">On Medication</p>
                  <p className="text-xl font-bold text-green-600">
                    {patients.filter(p => p.medicalHistory.currentMedications.length > 0).length}
                  </p>
                </div>
                <Pill className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedPatient.personalInfo.firstName} {selectedPatient.personalInfo.middleName && selectedPatient.personalInfo.middleName + ' '}{selectedPatient.personalInfo.lastName}
                    </h2>
                    <p className="text-gray-600">{selectedPatient.patientId} • {calculateAge(selectedPatient.personalInfo.dateOfBirth)} years old</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedPatient(null)}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6 space-y-6">
                {/* Personal & Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <User className="w-5 h-5 mr-2 text-blue-600" />
                      Personal Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date of Birth:</span>
                        <span className="font-medium">{new Date(selectedPatient.personalInfo.dateOfBirth).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">{selectedPatient.personalInfo.gender === 'M' ? 'Male' : 'Female'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Religion:</span>
                        <span className="font-medium">{selectedPatient.demographics.religion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Marital Status:</span>
                        <span className="font-medium">{selectedPatient.demographics.maritalStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Occupation:</span>
                        <span className="font-medium">{selectedPatient.medicalHistory.socialHistory.occupation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-green-600" />
                      Contact Details
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Primary Phone:</span>
                        <p className="font-medium">{selectedPatient.contactInfo.primaryPhone}</p>
                      </div>
                      {selectedPatient.contactInfo.alternatePhone && (
                        <div>
                          <span className="text-gray-600">Alternate Phone:</span>
                          <p className="font-medium">{selectedPatient.contactInfo.alternatePhone}</p>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <p className="font-medium">{selectedPatient.contactInfo.email}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Address:</span>
                        <p className="font-medium">{formatAddress(selectedPatient.contactInfo.address)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact & Insurance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <UserCheck className="w-5 h-5 mr-2 text-red-600" />
                      Emergency Contact
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <p className="font-medium">{selectedPatient.emergencyContact.name}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Relationship:</span>
                        <p className="font-medium">{selectedPatient.emergencyContact.relationship}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <p className="font-medium">{selectedPatient.emergencyContact.phone}</p>
                      </div>
                      {selectedPatient.emergencyContact.email && (
                        <div>
                          <span className="text-gray-600">Email:</span>
                          <p className="font-medium">{selectedPatient.emergencyContact.email}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Shield className="w-5 h-5 mr-2 text-blue-600" />
                      Insurance Information
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Provider:</span>
                        <p className="font-medium">{selectedPatient.insurance.provider}</p>
                      </div>
                      <div>
                        <span className="text-gray-600">Policy Number:</span>
                        <p className="font-medium">{selectedPatient.insurance.policyNumber}</p>
                      </div>
                      {selectedPatient.insurance.memberName && (
                        <div>
                          <span className="text-gray-600">Member Name:</span>
                          <p className="font-medium">{selectedPatient.insurance.memberName}</p>
                        </div>
                      )}
                      {selectedPatient.insurance.expirationDate && (
                        <div>
                          <span className="text-gray-600">Expires:</span>
                          <p className="font-medium">{new Date(selectedPatient.insurance.expirationDate).toLocaleDateString()}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Medical History Sections */}
                <div className="space-y-6">
                  {/* Allergies */}
                  {selectedPatient.medicalHistory.allergies.length > 0 && (
                    <div className="bg-white border border-red-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Zap className="w-5 h-5 mr-2 text-red-600" />
                        Allergies
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPatient.medicalHistory.allergies.map((allergy, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{allergy.allergen}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(allergy.severity)}`}>
                                {allergy.severity}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">Reaction: {allergy.reaction}</p>
                            <p className="text-xs text-gray-500">Discovered: {new Date(allergy.dateDiscovered).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Chronic Conditions */}
                  {selectedPatient.medicalHistory.chronicConditions.length > 0 && (
                    <div className="bg-white border border-orange-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
                        Chronic Conditions
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPatient.medicalHistory.chronicConditions.map((condition, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{condition.condition}</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionStatusColor(condition.status)}`}>
                                {condition.status}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString()}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Current Medications */}
                  {selectedPatient.medicalHistory.currentMedications.length > 0 && (
                    <div className="bg-white border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Pill className="w-5 h-5 mr-2 text-blue-600" />
                        Current Medications
                      </h3>
                      <div className="space-y-3">
                        {selectedPatient.medicalHistory.currentMedications.map((med, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{med.name}</span>
                              <span className="text-sm text-gray-600">{med.dosage}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                              <div>Frequency: {med.frequency}</div>
                              <div>Prescribed by: {med.prescribedBy}</div>
                              <div>Purpose: {med.purpose}</div>
                              <div>Started: {new Date(med.startDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Past Surgeries */}
                  {selectedPatient.medicalHistory.pastSurgeries.length > 0 && (
                    <div className="bg-white border border-purple-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <Scissors className="w-5 h-5 mr-2 text-purple-600" />
                        Past Surgeries
                      </h3>
                      <div className="space-y-3">
                        {selectedPatient.medicalHistory.pastSurgeries.map((surgery, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{surgery.procedure}</span>
                              <span className="text-sm text-gray-600">{new Date(surgery.date).toLocaleDateString()}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                              <div>Hospital: {surgery.hospital}</div>
                              <div>Surgeon: {surgery.surgeon}</div>
                              <div className="col-span-2">Outcome: {surgery.outcome}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social History */}
                  <div className="bg-white border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-green-600" />
                      Social History
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-xs">Smoking</p>
                        <p className="font-medium">{selectedPatient.medicalHistory.socialHistory.smoking}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-xs">Alcohol</p>
                        <p className="font-medium">{selectedPatient.medicalHistory.socialHistory.alcohol}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-xs">Exercise</p>
                        <p className="font-medium">{selectedPatient.medicalHistory.socialHistory.exerciseFrequency}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-gray-600 text-xs">Occupation</p>
                        <p className="font-medium">{selectedPatient.medicalHistory.socialHistory.occupation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Clinical Notes */}
                  {selectedPatient.notes && (
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-gray-600" />
                        Clinical Notes
                      </h3>
                      <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedPatient.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Created: {new Date(selectedPatient.createdAt).toLocaleDateString()} • 
                  Last updated: {new Date(selectedPatient.updatedAt).toLocaleDateString()}
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Edit3 className="w-4 h-4" />
                    <span>Edit Record</span>
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Visit</span>
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;