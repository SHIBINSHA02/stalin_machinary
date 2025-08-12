// src/components/utils.js
export const rentalData = [
  {
    id: 'CM001',
    name: 'Concrete Mixer Pro 350L',
    customer: 'Shankar constructions',
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
    customer: 'Manoj Constructions',
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
    customer: 'Binoj Builders',
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
    customer: 'Akash Builders',
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
    customer: 'Rinku Constructions',
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
    customer: 'Bruce Constructions',
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

export const generateChartData = (days, machineId) => {
  const data = [];
  const now = new Date();
  const machine = rentalData.find(m => m.id === machineId);
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
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

export const generateLogData = (machineId) => {
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

export const toggleMachine = (machineId, newStatus) => {
  console.log(`Toggling machine ${machineId} to ${newStatus}`);
  alert(`Machine ${machineId} ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully!`);
};

export const calculateDaysLeft = (endDate) => {
  const today = new Date();
  const end = new Date(endDate);
  const diffTime = end - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
};

export const calculateTotalDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = end - start;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const calculateRevenue = (machine) => {
  const totalDays = calculateTotalDays(machine.rentalStart, machine.rentalEnd);
  return totalDays * machine.rentalRate;
};

export const totalRevenue = rentalData.reduce((sum, machine) => sum + calculateRevenue(machine), 0);

export const CustomTooltip = ({ active, payload, label }) => {
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