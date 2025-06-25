import React, { useState } from 'react';
import { Users, User } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import StatCard from './StatCard';
import FilterDropdown from './FilterDropdown';
import { filterOptions, PIE_COLORS } from '../data/mockData';

const OrganizationalView = ({ data }) => {
    const [selectedWard, setSelectedWard] = useState('Ward');
    
    const religionData = [
      { name: 'Hindu', value: data.hindu },
      { name: 'Muslim', value: data.muslim },
      { name: 'Christian', value: data.christian },
    ];
    
    const genderData = [
        { name: 'Male', value: data.male },
        { name: 'Female', value: data.female },
        { name: 'Third Gender', value: data.thirdGender },
    ];

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontWeight="bold">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    return (
        <div className="p-4 md:p-6 space-y-6">
             <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold text-gray-300 mb-3">Filters</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-3">
                    <FilterDropdown name="Districts" options={filterOptions.districts} />
                    <FilterDropdown name="Organisational Districts" options={filterOptions.organisationalDistricts} />
                    <FilterDropdown name="Organisational Mandal" options={filterOptions.organisationalMandals} />
                    <FilterDropdown name="Assembly Constituency" options={filterOptions.assemblyConstituencies} />
                    <FilterDropdown name="Local Body" options={filterOptions.localBodies} />
                    <FilterDropdown name="Ward" options={Object.values(filterOptions.wards).flatMap(p => p.wards)} onSelect={setSelectedWard} />
                </div>
            </div>

            <h2 className="text-3xl font-bold text-white px-2">
                {selectedWard && selectedWard !== 'Ward' ? `${selectedWard} Data` : 'Organisational Overview'}
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <StatCard title="Total Voters" value={data.total} icon={<Users size={24} className="text-white"/>} color="bg-indigo-500" />
               <StatCard title="Female Voters" value={data.female} icon={<User size={24} className="text-white"/>} color="bg-pink-500" />
               <StatCard title="Male Voters" value={data.male} icon={<User size={24} className="text-white"/>} color="bg-blue-500" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
               <StatCard title="Hindu Voters" value={data.hindu} icon={<div className="font-bold text-lg">H</div>} color="bg-orange-500" />
               <StatCard title="Muslim Voters" value={data.muslim} icon={<div className="font-bold text-lg">M</div>} color="bg-green-500" />
               <StatCard title="Christian Voters" value={data.christian} icon={<div className="font-bold text-lg">C</div>} color="bg-yellow-500" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-80">
                     <h3 className="text-white text-lg font-bold mb-4 text-center">Gender Distribution</h3>
                     <ResponsiveContainer>
                         <PieChart>
                            <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={renderCustomizedLabel}>
                                 {genderData.map((entry, index) => (
                                     <Cell key={`cell-${index}`} fill={PIE_COLORS.gender[index % PIE_COLORS.gender.length]} />
                                 ))}
                             </Pie>
                             <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }} />
                             <Legend />
                         </PieChart>
                     </ResponsiveContainer>
                </div>
                 <div className="bg-gray-800 p-4 rounded-lg shadow-lg h-80">
                     <h3 className="text-white text-lg font-bold mb-4 text-center">Religion Distribution</h3>
                     <ResponsiveContainer>
                         <PieChart>
                            <Pie data={religionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} labelLine={false} label={renderCustomizedLabel}>
                                {religionData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS.religion[index % PIE_COLORS.religion.length]} />
                                ))}
                             </Pie>
                             <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }} />
                             <Legend />
                         </PieChart>
                     </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default OrganizationalView;