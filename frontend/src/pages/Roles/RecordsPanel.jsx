import {
  ChevronDown,
  ChevronUp,
  Download,
  Edit,
  FileCode,
  FileSpreadsheet,
  FileText,
  Filter,
  Image,
  Pill,
  Plus,
  Search,
  Share,
  TrendingUp,
  User
} from 'lucide-react';
import { useState } from 'react';

const RecordsPanel = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'timeline'

  // Mock patient records data
  const mockRecords = [
    {
      id: 1,
      patientId: 'P-001',
      patientName: 'Jane Doe',
      date: '2023-11-10',
      time: '10:30 AM',
      type: 'consultation',
      doctor: 'Dr. Smith',
      department: 'Cardiology',
      diagnosis: 'Hypertension',
      medications: ['Lisinopril 10mg', 'Amlodipine 5mg'],
      notes: 'Patient reported consistent BP readings. advised to continue medication and reduce sodium intake.',
      attachments: 2,
      vitalSigns: {
        bp: '138/88',
        hr: '72',
        temp: '98.6°F',
        oxygen: '98%'
      },
      status: 'completed'
    },
    {
      id: 2,
      patientId: 'P-002',
      patientName: 'Jan Lorenz Laroco',
      date: '2023-11-08',
      time: '2:15 PM',
      type: 'lab_result',
      doctor: 'Dr. Johnson',
      department: 'General Medicine',
      diagnosis: 'Vitamin D Deficiency',
      medications: ['Vitamin D3 2000IU'],
      notes: 'Blood test shows low vitamin D levels. Recommended supplements and sunlight exposure.',
      attachments: 3,
      labResults: {
        vitaminD: '18 ng/mL',
        cholesterol: '180 mg/dL',
        glucose: '92 mg/dL'
      },
      status: 'reviewed'
    },
    {
      id: 3,
      patientId: 'P-003',
      patientName: 'Maria Rodriguez',
      date: '2023-11-05',
      time: '9:45 AM',
      type: 'imaging',
      doctor: 'Dr. Lee',
      department: 'Orthopedics',
      diagnosis: 'Right Knee Osteoarthritis',
      medications: ['Ibuprofen 400mg', 'Acetaminophen 500mg'],
      notes: 'X-ray shows moderate osteoarthritis. Recommended physical therapy and weight management.',
      attachments: 4,
      images: ['X-Ray Right Knee'],
      status: 'completed'
    },
    {
      id: 4,
      patientId: 'P-004',
      patientName: 'Robert Johnson',
      date: '2023-11-03',
      time: '11:20 AM',
      type: 'surgery',
      doctor: 'Dr. Smith',
      department: 'Cardiology',
      diagnosis: 'Coronary Artery Disease',
      medications: ['Aspirin 81mg', 'Atorvastatin 40mg', 'Metoprolol 50mg'],
      notes: 'Successful coronary artery bypass graft surgery. Patient recovering well in ICU.',
      attachments: 5,
      procedure: 'CABG x3',
      status: 'post_op'
    },
    {
      id: 5,
      patientId: 'P-005',
      patientName: 'Sarah Williams',
      date: '2023-10-28',
      time: '3:00 PM',
      type: 'vaccination',
      doctor: 'Dr. Garcia',
      department: 'Pediatrics',
      diagnosis: 'Seasonal Flu Prevention',
      medications: [],
      notes: 'Administered seasonal flu vaccine. No adverse reactions observed.',
      attachments: 1,
      vaccine: 'Influenza Quadrivalent 2023-2024',
      status: 'completed'
    }
  ];

  // Filter records based on search and filters
  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || record.type === typeFilter;
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'week' && isDateInLastWeek(record.date)) ||
                       (dateFilter === 'month' && isDateInLastMonth(record.date));
    
    return matchesSearch && matchesType && matchesDate;
  });

  // Helper functions for date filtering
  const isDateInLastWeek = (dateString) => {
    const recordDate = new Date(dateString);
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return recordDate >= oneWeekAgo;
  };

  const isDateInLastMonth = (dateString) => {
    const recordDate = new Date(dateString);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return recordDate >= oneMonthAgo;
  };

  // Get type icon and color
  const getTypeInfo = (type) => {
    switch(type) {
      case 'consultation': return { 
        icon: <User className="w-4 h-4" />,
        color: 'bg-blue-100 text-blue-800 border-blue-200',
        label: 'Consultation'
      };
      case 'lab_result': return { 
        icon: <FileSpreadsheet className="w-4 h-4" />,
        color: 'bg-green-100 text-green-800 border-green-200',
        label: 'Lab Results'
      };
      case 'imaging': return { 
        icon: <Image className="w-4 h-4" />,
        color: 'bg-purple-100 text-purple-800 border-purple-200',
        label: 'Imaging'
      };
      case 'surgery': return { 
        icon: <FileCode className="w-4 h-4" />,
        color: 'bg-red-100 text-red-800 border-red-200',
        label: 'Surgery'
      };
      case 'vaccination': return { 
        icon: <TrendingUp className="w-4 h-4" />,
        color: 'bg-amber-100 text-amber-800 border-amber-200',
        label: 'Vaccination'
      };
      default: return { 
        icon: <FileText className="w-4 h-4" />,
        color: 'bg-gray-100 text-gray-800 border-gray-200',
        label: 'Record'
      };
    }
  };

  // Toggle record details expansion
  const toggleRecordDetails = (id) => {
    if (expandedRecord === id) {
      setExpandedRecord(null);
    } else {
      setExpandedRecord(id);
    }
  };

  // Stats for the header
  const stats = {
    total: mockRecords.length,
    consultations: mockRecords.filter(r => r.type === 'consultation').length,
    labResults: mockRecords.filter(r => r.type === 'lab_result').length,
    imaging: mockRecords.filter(r => r.type === 'imaging').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Records</h1>
              <p className="text-gray-600">Comprehensive medical history and documentation</p>
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1">
              <Plus className="w-5 h-5" />
              <span>New Record</span>
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Records</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Consultations</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.consultations}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Lab Results</p>
                  <p className="text-2xl font-bold text-green-600">{stats.labResults}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Imaging</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.imaging}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Image className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search by patient name, ID, or diagnosis..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap items-center space-x-3">
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="consultation">Consultations</option>
                <option value="lab_result">Lab Results</option>
                <option value="imaging">Imaging</option>
                <option value="surgery">Surgeries</option>
                <option value="vaccination">Vaccinations</option>
              </select>
              
              <select
                className="border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
              </select>
              
              <button className="flex items-center space-x-2 border border-gray-200 rounded-xl px-4 py-3 text-gray-600 hover:bg-gray-50">
                <Filter className="w-5 h-5" />
                <span>Advanced Filters</span>
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
                  onClick={() => setViewMode('timeline')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    viewMode === 'timeline' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Timeline
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Records List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Patient</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Type</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Doctor</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Diagnosis</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Attachments</th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredRecords.map((record) => {
                  const typeInfo = getTypeInfo(record.type);
                  return (
                    <>
                      <tr key={record.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleRecordDetails(record.id)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">
                                {record.patientName}
                              </div>
                              <div className="text-sm text-gray-500">ID: {record.patientId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{record.date}</div>
                            <div className="text-gray-500">{record.time}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium border ${typeInfo.color}`}>
                            {typeInfo.icon}
                            <span>{typeInfo.label}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{record.doctor}</div>
                          <div className="text-xs text-gray-500">{record.department}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 max-w-xs truncate">{record.diagnosis}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <FileText className="w-4 h-4 mr-1" />
                            {record.attachments} files
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors">
                              <Share className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                              {expandedRecord === record.id ? (
                                <ChevronUp className="w-4 h-4" />
                              ) : (
                                <ChevronDown className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedRecord === record.id && (
                        <tr className="bg-blue-50">
                          <td colSpan="7" className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Clinical Notes</h4>
                                <p className="text-sm text-gray-600 bg-white p-4 rounded-xl border border-gray-200">
                                  {record.notes}
                                </p>
                                
                                <h4 className="text-sm font-semibold text-gray-700 mb-2 mt-4">Medications</h4>
                                <div className="space-y-2">
                                  {record.medications.length > 0 ? (
                                    record.medications.map((med, idx) => (
                                      <div key={idx} className="flex items-center text-sm text-gray-600 bg-white p-3 rounded-xl border border-gray-200">
                                        <Pill className="w-4 h-4 mr-2 text-blue-500" />
                                        {med}
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-sm text-gray-400 italic">No medications prescribed</p>
                                  )}
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Vital Signs</h4>
                                {record.vitalSigns ? (
                                  <div className="grid grid-cols-2 gap-3 mb-4">
                                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                                      <div className="text-xs text-gray-500">Blood Pressure</div>
                                      <div className="font-semibold">{record.vitalSigns.bp}</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                                      <div className="text-xs text-gray-500">Heart Rate</div>
                                      <div className="font-semibold">{record.vitalSigns.hr} bpm</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                                      <div className="text-xs text-gray-500">Temperature</div>
                                      <div className="font-semibold">{record.vitalSigns.temp}</div>
                                    </div>
                                    <div className="bg-white p-3 rounded-xl border border-gray-200">
                                      <div className="text-xs text-gray-500">Oxygen</div>
                                      <div className="font-semibold">{record.vitalSigns.oxygen}</div>
                                    </div>
                                  </div>
                                ) : record.labResults ? (
                                  <div className="bg-white p-4 rounded-xl border border-gray-200 mb-4">
                                    <h5 className="text-xs font-semibold text-gray-600 mb-2">Lab Results</h5>
                                    <div className="space-y-2">
                                      {Object.entries(record.labResults).map(([test, value], idx) => (
                                        <div key={idx} className="flex justify-between text-sm">
                                          <span className="text-gray-600">{test.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                                          <span className="font-semibold">{value}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}
                                
                                <h4 className="text-sm font-semibold text-gray-700 mb-2">Actions</h4>
                                <div className="flex space-x-2">
                                  <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 px-3 py-2 bg-blue-100 rounded-lg">
                                    <Download className="w-4 h-4 mr-1" />
                                    Download
                                  </button>
                                  <button className="flex items-center text-sm text-green-600 hover:text-green-800 px-3 py-2 bg-green-100 rounded-lg">
                                    <Share className="w-4 h-4 mr-1" />
                                    Share
                                  </button>
                                  <button className="flex items-center text-sm text-gray-600 hover:text-gray-800 px-3 py-2 bg-gray-100 rounded-lg">
                                    <Edit className="w-4 h-4 mr-1" />
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* No Results */}
        {filteredRecords.length === 0 && (
          <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
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

export default RecordsPanel;