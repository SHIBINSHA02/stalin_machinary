// src/components/MachineDetails.jsx
import React from 'react';
import { Power, PowerOff, MapPin, Calendar, Activity, Zap, BarChart3, Clock, ArrowLeft, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { rentalData, generateChartData, generateLogData, toggleMachine, calculateDaysLeft, calculateTotalDays, calculateRevenue, CustomTooltip } from './utils';

const MachineDetails = ({ selectedMachine, setSelectedMachine, selectedTimeRange, setSelectedTimeRange }) => {
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
                <h1 className="text-4xl font-bold text-yellow-400">STALLION MACHINERY</h1>
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
};

export default MachineDetails;