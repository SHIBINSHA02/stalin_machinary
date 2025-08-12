// src/components/StaalianMachinery.jsx
import React, { useState } from 'react';
import MainDashboard from './MainDashboard';
import MachineDetails from './MachineDetails';

const StalinMachineryDashboard = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState('7days');

  return selectedMachine ? (
    <MachineDetails 
      selectedMachine={selectedMachine} 
      setSelectedMachine={setSelectedMachine} 
      selectedTimeRange={selectedTimeRange} 
      setSelectedTimeRange={setSelectedTimeRange} 
    />
  ) : (
    <MainDashboard setSelectedMachine={setSelectedMachine} />
  );
};

export default StalinMachineryDashboard;