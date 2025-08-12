// src/components/MainDashboard.jsx
import React from 'react';
import { Activity, PowerOff, Settings, Users, DollarSign } from 'lucide-react';
import { calculateDaysLeft, rentalData, totalRevenue } from './utils';

const MainDashboard = ({ setSelectedMachine }) => {
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

export default MainDashboard;