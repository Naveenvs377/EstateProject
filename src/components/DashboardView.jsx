import React from 'react';
import { Target, Users, CheckSquare, MapPin } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Cell } from 'recharts';
import StatCard from './StatCard';

const BoothGrowthChart = ({ data, title, colors }) => (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-80">
        <h3 className="text-white text-lg font-bold mb-4">{title}</h3>
        <ResponsiveContainer>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                    cursor={{fill: '#37415180'}}
                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                    labelStyle={{ color: '#F9FAFB' }}
                />
                <Bar dataKey="count" name="Count">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

const ProgramProgressChart = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-80">
    <h3 className="text-white text-lg font-bold mb-4">Voter Sampark Abhiyan Progress</h3>
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9CA3AF" />
        <YAxis stroke="#9CA3AF" tickFormatter={(value) => new Intl.NumberFormat('en-IN', { notation: "compact", compactDisplay: "short" }).format(value)} />
        <Tooltip
            contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
            labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend wrapperStyle={{ color: '#9CA3AF' }} />
        <Line type="monotone" dataKey="contacted" name="Voters Contacted" stroke="#F97316" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const PriorityTasks = ({ tasks }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h3 className="text-white text-lg font-bold mb-4">Priority Tasks</h3>
            <ul className="space-y-3">
                {tasks.map(item => (
                    <li key={item.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-md">
                        <p className="text-gray-300 text-sm">{item.task}</p>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getPriorityClass(item.priority)}`}>{item.priority}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const DashboardView = ({ data }) => (
    <div className="p-4 md:p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Local Bodies" value={data.kpi.totalLocalBodies} icon={<Target size={24} className="text-white" />} color="bg-blue-600" />
            <StatCard title="Total Wards" value={data.kpi.totalWards} icon={<MapPin size={24} className="text-white" />} color="bg-green-600" />
            <StatCard title="Booth Committees Formed" value={data.kpi.boothsFormed} icon={<CheckSquare size={24} className="text-white" />} color="bg-yellow-500" />
            <StatCard title="Voters Contacted" value={data.kpi.votersContacted} icon={<Users size={24} className="text-white" />} color="bg-orange-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <BoothGrowthChart data={data.growthData.booth} title="Booth Growth" colors={['#3B82F6', '#60A5FA']} />
           <BoothGrowthChart data={data.growthData.karyakartha} title="Karyakartha Growth" colors={['#F97316', '#FB923C']} />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
            <ProgramProgressChart data={data.programProgress} />
            <PriorityTasks tasks={data.priorityTasks} />
        </div>
    </div>
);

export default DashboardView;