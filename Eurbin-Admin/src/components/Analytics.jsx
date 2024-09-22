import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line,
  PieChart, Pie, Cell,
  ResponsiveContainer
} from 'recharts';

function Analytics() {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];
  const data = [
    {
      id: '66cc2dab6b2763b302ad38bb',
      totalUser: 308,
      totalSmartPoints: 76050,
      totalBottle: 9005,
      totalCo2: 324,
      date: '2024-08-26T15:24:27.218+00:00',  
    },
    {
      id: '66cc2e0d6b2763b302ad38bd',
      totalUser: 408,
      totalSmartPoints: 106050,
      totalBottle: 11005,
      totalCo2: 524,
      date: '2024-08-26T15:26:05.929+00:00',
    },
    {
      id: '66cc2e216b2763b302ad38bf',
      totalUser: 608,
      totalSmartPoints: 136050,
      totalBottle: 12405,
      totalCo2: 724,
      date: '2024-08-26T15:26:25.450+00:00',
    },
    {
      id: '66cc2e216b2763b302ad38bf',
      totalUser: 708,
      totalSmartPoints: 146050,
      totalBottle: 14405,
      totalCo2: 924,
      date: '2024-09-26T15:26:25.450+00:00',
    },
    {
      id: '66cc2e216b2763b302ad38bf',
      totalUser: 908,
      totalSmartPoints: 206050,
      totalBottle: 15405,
      totalCo2: 1024,
      date: '2024-10-26T15:26:25.450+00:00',
    },
    {
      id: '66cc2e216b2763b302ad38bf',
      totalUser: 1008,
      totalSmartPoints: 226050,
      totalBottle: 19405,
      totalCo2: 1324,
      date: '2024-11-26T15:26:25.450+00:00',
    },
    {
      id: '66cc2e216b2763b302ad38bf',
      totalUser: 1208,
      totalSmartPoints: 266050,
      totalBottle: 20405,
      totalCo2: 1524,
      date: '2024-12-26T15:26:25.450+00:00',
    },
  ];

  // Function to format the date to "Month Year"
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return `${date.toLocaleDateString('default', { month: 'short', year: 'numeric' })}`;
  };
  
  // Map the data and format the date
  const formattedData = data.map(item => ({
    ...item,
    formattedDate: formatDate(item.date)
  }));

  return (
    <div className='graphs'>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formattedDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalUser" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="formattedDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalBottle" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default Analytics;
