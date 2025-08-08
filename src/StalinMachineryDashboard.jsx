// src/StalinMachineryDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Power, PowerOff, MapPin, Calendar, Activity, Zap, BarChart3, Clock, Eye, ArrowLeft, Settings, Users, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const StalinMachineryDashboard = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');
  
  // Hardcoded rental data with comprehensive information
  const rentalData = [
    {
      id: 'CM001',
      name: 'Concrete Mixer Pro 350L',
      customer: 'ABC Construction',
      customerPhone: '+91 9876543210',
      location: { lat: 10.8505, lng: 76.2711, address: 'Thiruvananthapuram Construction Site A' },
      status: 'active',
      rentalStart: '2025-08-01',
      rentalEnd: '2025-08-15',
      rentalRate: 2500,
      currentVoltage: 240,
      currentAmperage: 15.5,
      totalHours: 42.5,
      lastActive: '2025-08-07 14:30',
      peakVoltage: 245,
      peakCurrent: 18.2,
      efficiency: 92
    },
    {
      id: 'CM002',
      name: 'Heavy Duty Mixer 500L',
      customer: 'XYZ Builders',
      customerPhone: '+91 9876543211',
      location: { lat: 10.8555, lng: 76.2811, address: 'Kovalam Beach Resort Project' },
      status: 'inactive',
      rentalStart: '2025-08-03',
      rentalEnd: '2025-08-20',
      rentalRate: 3200,
      currentVoltage: 0,
      currentAmperage: 0,
      totalHours: 28.2,
      lastActive: '2025-08-07 09:15',
      peakVoltage: 242,
      peakCurrent: 22.1,
      efficiency: 88
    },
    {
      id: 'VB001',
      name: 'Vibrator Poker VP-50',
      customer: 'Premium Constructions',
      customerPhone: '+91 9876543212',
      location: { lat: 10.8405, lng: 76.2611, address: 'Technopark Phase IV' },
      status: 'active',
      rentalStart: '2025-08-05',
      rentalEnd: '2025-08-12',
      rentalRate: 1800,
      currentVoltage: 220,
      currentAmperage: 8.2,
      totalHours: 15.8,
      lastActive: '2025-08-07 15:45',
      peakVoltage: 225,
      peakCurrent: 9.8,
      efficiency: 95
    },
    {
      id: 'PH001',
      name: 'Power Hoist PH-1000',
      customer: 'Skyline Developers',
      customerPhone: '+91 9876543213',
      location: { lat: 10.8605, lng: 76.2911, address: 'Trivandrum Medical College Extension' },
      status: 'maintenance',
      rentalStart: '2025-07-28',
      rentalEnd: '2025-08-18',
      rentalRate: 4500,
      currentVoltage: 0,
      currentAmperage: 0,
      totalHours: 65.3,
      lastActive: '2025-08-06 16:20',
      peakVoltage: 238,
      peakCurrent: 35.5,
      efficiency: 85
    },
    {
      id: 'CM003',
      name: 'Mini Mixer 200L',
      customer: 'Local Builder Co',
      customerPhone: '+91 9876543214',
      location: { lat: 10.8305, lng: 76.2511, address: 'Neyyattinkara Highway Project' },
      status: 'active',
      rentalStart: '2025-08-04',
      rentalEnd: '2025-08-11',
      rentalRate: 1500,
      currentVoltage: 230,
      currentAmperage: 12.1,
      totalHours: 22.7,
      lastActive: '2025-08-07 16:10',
      peakVoltage: 235,
      peakCurrent: 14.8,
      efficiency: 90
    },
    {
      id: 'DR001',
      name: 'Diamond Drill DR-250',
      customer: 'Rock Solid Constructions',
      customerPhone: '+91 9876543215',
      location: { lat: 10.8705, lng: 76.3011, address: 'Vellayani Lake Bridge Project' },
      status: 'inactive',
      rentalStart: '2025-08-02',
      rentalEnd: '2025-08-16',
      rentalRate: 3800,
      currentVoltage: 0,
      currentAmperage: 0,
      totalHours: 31.4,
      lastActive: '2025-08-07 11:30',
      peakVoltage: 240,
      peakCurrent: 28.9,
      efficiency: 87
    }
  ];

  // Generate mock data for charts with realistic patterns
  const generateChartData = (days, machineId) => {
    const data = [];
    const now = new Date();
    const machine = rentalData.find(m => m.id === machineId);
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Generate realistic data based on machine status and type
      const isActive = machine?.status === 'active';
      const baseVoltage = machine?.currentVoltage || 220;
      const baseCurrent = machine?.currentAmperage || 10;
      
      data.push({
        date: date.toISOString().split('T')[0],
        time: date.toISOString().split('T')[1].substring(0, 5),
        voltage: isActive ? baseVoltage + (Math.random() - 0.5) * 20 : Math.random() * 50 + 180,
        current: isActive ? baseCurrent + (Math.random() - 0.5) * 5 : Math.random() * 8 + 3,
        hours: Math.random() * 8 + 2,
        power: isActive ? (baseVoltage * baseCurrent / 1000) + Math.random() * 2 : Math.random() * 3
      });
    }
    return data;
  };

  const generateLogData = (machineId) => {
    const logs = [
      { time: '2025-08-07 15:45', action: 'ON', duration: '2h 15m', voltage: 240, current: 15.2 },
      { time: '2025-08-07 13:30', action: 'OFF', duration: '1h 45m', voltage: 0, current: 0 },
      { time: '2025-08-07 11:45', action: 'ON', duration: '3h 30m', voltage: 238, current: 16.1 },
      { time: '2025-08-07 08:15', action: 'OFF', duration: '45m', voltage: 0, current: 0 },
      { time: '2025-08-07 07:30', action: 'ON', duration: '2h 20m', voltage: 242, current: 14.8 },
      { time: '2025-08-06 16:20', action: 'OFF', duration: '4h 10m', voltage: 0, current: 0 },
      { time: '2025-08-06 12:10', action: 'ON', duration: '3h 55m', voltage: 239, current: 15.9 },
      { time: '2025-08-06 08:15', action: 'OFF', duration: '2h 30m', voltage: 0, current: 0 }
    ];
    return logs;
  };

  const toggleMachine = (machineId, newStatus) => {
    console.log(`Toggling machine ${machineId} to ${newStatus}`);
    alert(`Machine ${machineId} ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
  };

  const calculateDaysLeft = (endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateTotalDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const calculateRevenue = (machine) => {
    const totalDays = calculateTotalDays(machine.rentalStart, machine.rentalEnd);
    return totalDays * machine.rentalRate;
  };

  const totalRevenue = rentalData.reduce((sum, machine) => sum + calculateRevenue(machine), 0);

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg border border-yellow-400">
          <p className="text-yellow-400 font-semibold">{`Date: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)}`}
              {entry.dataKey === 'voltage' && 'V'}
              {entry.dataKey === 'current' && 'A'}
              {entry.dataKey === 'hours' && 'h'}
              {entry.dataKey === 'power' && 'kW'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (selectedMachine) {
    const machine = rentalData.find(m => m.id === selectedMachine);
    const chartData = generateChartData(selectedTimeRange === '7days' ? 7 : 30, selectedMachine);
    const logData = generateLogData(selectedMachine);
    const daysLeft = calculateDaysLeft(machine.rentalEnd);
    const totalDays = calculateTotalDays(machine.rentalStart, machine.rentalEnd);
    const revenue = calculateRevenue(machine);

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gray-900 text-white shadow-2xl">
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setSelectedMachine(null)}
                  className="bg-yellow-400 text-gray-900 p-2 rounded-lg hover:bg-yellow-300 transition-colors flex items-center space-x-2"
                >
                  <ArrowLeft size={20} />
                  <span className="font-semibold">Back to Dashboard</span>
                </button>
                <div>
                  <h1 className="text-4xl font-bold text-yellow-400">STALIN MACHINERY</h1>
                  <p className="text-gray-300">Machine Monitoring - {machine.name}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-yellow-400 font-semibold">ID: {machine.id}</p>
                <p className="text-gray-300">Customer: {machine.customer}</p>
                <p className="text-gray-400 text-sm">{machine.customerPhone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 min-h-screen">
          {/* Control Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Machine Control</h3>
                  <p className={`text-2xl font-bold ${
                    machine.status === 'active' ? 'text-green-600' : 
                    machine.status === 'maintenance' ? 'text-orange-600' : 'text-red-600'
                  }`}>
                    {machine.status.toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={() => toggleMachine(machine.id, machine.status === 'active' ? 'inactive' : 'active')}
                  className={`p-4 rounded-full shadow-lg transition-all ${
                    machine.status === 'active' 
                      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                      : 'bg-green-100 text-green-600 hover:bg-green-200'
                  }`}
                >
                  {machine.status === 'active' ? <PowerOff size={28} /> : <Power size={28} />}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Live Readings</h3>
                  <p className="text-xl font-bold text-blue-600">{machine.currentVoltage}V</p>
                  <p className="text-lg font-semibold text-gray-600">{machine.currentAmperage}A</p>
                </div>
                <Zap className="text-blue-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Rental Period</h3>
                  <p className="text-xl font-bold text-green-600">{totalDays} days</p>
                  <p className="text-sm text-gray-600">Days Left: {daysLeft}</p>
                </div>
                <Calendar className="text-green-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Usage Hours</h3>
                  <p className="text-2xl font-bold text-purple-600">{machine.totalHours}h</p>
                  <p className="text-sm text-gray-600">Efficiency: {machine.efficiency}%</p>
                </div>
                <Clock className="text-purple-500" size={32} />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-400">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Revenue</h3>
                  <p className="text-2xl font-bold text-yellow-600">₹{revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Rate: ₹{machine.rentalRate}/day</p>
                </div>
                <DollarSign className="text-yellow-500" size={32} />
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center">
                  <BarChart3 className="mr-2 text-yellow-500" size={24} />
                  Voltage & Current Monitoring
                </h3>
                <select 
                  value={selectedTimeRange}
                  onChange={(e) => setSelectedTimeRange(e.target.value)}
                  className="bg-gray-900 text-white border border-yellow-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="7days">Last 7 Days</option>
                  <option value="30days">Last 30 Days</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#374151"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis stroke="#374151" />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="voltage" 
                    stroke="#f59e0b" 
                    strokeWidth={3} 
                    name="Voltage" 
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#1f2937" 
                    strokeWidth={3} 
                    name="Current" 
                    dot={{ fill: '#1f2937', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Activity className="mr-2 text-yellow-500" size={24} />
                Power Consumption
              </h3>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#374151"
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis stroke="#374151" />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="power" 
                    stroke="#f59e0b" 
                    fill="#fbbf24" 
                    fillOpacity={0.6} 
                    name="Power (kW)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Peak Usage Stats */}
          <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <Zap className="mr-2 text-yellow-500" size={24} />
              Peak Usage Statistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Peak Voltage</h4>
                <p className="text-3xl font-bold text-yellow-600">{machine.peakVoltage}V</p>
                <p className="text-sm text-gray-600">Maximum recorded voltage</p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Peak Current</h4>
                <p className="text-3xl font-bold text-gray-800">{machine.peakCurrent}A</p>
                <p className="text-sm text-gray-600">Maximum recorded current</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Efficiency</h4>
                <p className="text-3xl font-bold text-green-600">{machine.efficiency}%</p>
                <p className="text-sm text-gray-600">Overall performance rating</p>
              </div>
            </div>
          </div>

          {/* Location and Logs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <MapPin className="mr-2 text-yellow-500" size={24} />
                Current Location
              </h3>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <p className="font-semibold text-gray-800">{machine.location.address}</p>
                <p className="text-sm text-gray-600">Lat: {machine.location.lat}, Lng: {machine.location.lng}</p>
                <p className="text-sm text-gray-600">Last Updated: {machine.lastActive}</p>
              </div>
              <div className="h-64 bg-gray-200 rounded-lg overflow-hidden shadow-inner">
                {/* <iframe
                  src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${machine.location.lat},${machine.location.lng}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe> */}
                <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d50866.22504018273!2d76.81380026561514!3d8.56495651800724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1754586529367!5m2!1sen!2sin" width="100%"
                  height="100%" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Activity className="mr-2 text-yellow-500" size={24} />
                Activity Log
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                {logData.map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full mr-4 ${
                        log.action === 'ON' ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                      <div>
                        <p className="font-bold text-gray-800">{log.action}</p>
                        <p className="text-sm text-gray-600">{log.time}</p>
                        {log.voltage > 0 && (
                          <p className="text-xs text-gray-500">{log.voltage}V, {log.current}A</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">{log.duration}</p>
                      <p className="text-xs text-gray-500">Duration</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 text-white shadow-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold text-yellow-400 mb-2">STALLION MACHINERY</h1>
              <p className="text-gray-300 text-lg">Rental Equipment Management Dashboard</p>
              <p className="text-gray-400 text-sm">Real-time monitoring & control system</p>
            </div>
            <div className="text-right space-y-2">
              <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg">
                <p className="font-bold">Total Rentals: {rentalData.length}</p>
              </div>
              <div className="bg-green-600 text-white px-4 py-2 rounded-lg">
                <p className="font-semibold">Active: {rentalData.filter(r => r.status === 'active').length}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Active Rentals</h3>
                <p className="text-4xl font-bold text-green-600">
                  {rentalData.filter(r => r.status === 'active').length}
                </p>
                <p className="text-sm text-gray-600">Currently running</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Activity className="text-green-500" size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-red-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Inactive Rentals</h3>
                <p className="text-4xl font-bold text-red-600">
                  {rentalData.filter(r => r.status === 'inactive').length}
                </p>
                <p className="text-sm text-gray-600">Currently stopped</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <PowerOff className="text-red-500" size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Maintenance</h3>
                <p className="text-4xl font-bold text-orange-600">
                  {rentalData.filter(r => r.status === 'maintenance').length}
                </p>
                <p className="text-sm text-gray-600">Under service</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <Settings className="text-orange-500" size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Total Customers</h3>
                <p className="text-4xl font-bold text-blue-600">{rentalData.length}</p>
                <p className="text-sm text-gray-600">Active contracts</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="text-blue-500" size={32} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-yellow-400 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800">Total Revenue</h3>
                <p className="text-4xl font-bold text-yellow-600">₹{totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-gray-600">All active rentals</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <DollarSign className="text-yellow-500" size={32} />
              </div>
            </div>
          </div>
        </div>

        {/* Rentals Grid */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Current Rentals</h2>
            <p className="text-gray-600">Click on any rental to view detailed monitoring</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {rentalData.map((rental) => (
              <div 
                key={rental.id} 
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer border-2 border-transparent hover:border-yellow-200"
                onClick={() => setSelectedMachine(rental.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{rental.name}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    rental.status === 'active' ? 'bg-green-100 text-green-800' :
                    rental.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {rental.status.toUpperCase()}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-4 h-4 mr-2 flex-shrink-0">👤</div>
                    <span>{rental.customer}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{rental.location.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{rental.rentalStart} to {rental.rentalEnd}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{rental.totalHours}h total usage</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>₹{rental.rentalRate}/day</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm">
                    <span className="text-gray-600">Days left: </span>
                    <span className="font-semibold text-yellow-600">{calculateDaysLeft(rental.rentalEnd)}</span>
                  </div>
                  <button className="flex items-center text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StalinMachineryDashboard;