import React, { useState } from 'react';
import { Search, Phone, CheckCircle2, XCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import FilterDropdown from './FilterDropdown';
import { filterOptions } from '../data/mockData';

const MicroLevelDataView = () => {
    const [activeTab, setActiveTab] = useState('Organisation');
    const [panchayatSearch, setPanchayatSearch] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [selectedPanchayat, setSelectedPanchayat] = useState(null);
    const [availableWards, setAvailableWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState('Select Ward');
    const [wardData, setWardData] = useState(null);

    // --- Data Generation ---
    const generateRandomData = (wardName) => {
        if (!selectedPanchayat || !wardName || wardName === 'Select Ward') {
            setWardData(null);
            return;
        }

        const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
        const randomName = () => {
            const first = ["Anil", "Sunil", "Rajesh", "Prakash", "Suresh", "Ramesh", "Deepa", "Latha", "Sita", "Gita"];
            const last = ["Menon", "Nair", "Pillai", "Kumar", "Verma"];
            return `${first[randomInt(0,9)]} ${last[randomInt(0,4)]}`;
        }
        
        const orgData = {
            leaders: [
                { position: 'District President', name: randomName(), phone: `987654${randomInt(1000,9999)}` },
                { position: 'Mandalam President', name: randomName(), phone: `987654${randomInt(1000,9999)}` },
                { position: 'Panchayat President', name: randomName(), phone: `987654${randomInt(1000,9999)}` },
            ],
            prominentLeaders: Array.from({length: 3}, () => ({ name: randomName(), position: 'Ward Leader', number: `912345${randomInt(1000,9999)}` })),
            vikasitaKeralamTeam: Array.from({length: 3}, () => ({ name: randomName(), details: `Convenor, ${wardName}` })),
        };

        const electoralData = {
             wardInfo: {
                acName: filterOptions.wards[selectedPanchayat]?.acName || 'N/A', 
                localBodyName: selectedPanchayat, 
                localBodyType: 'Panchayat', 
                wardName: wardName
            },
            councilorInfo: {
                name: randomName(), alliance: ['LDF','UDF'][randomInt(0,1)], margin: randomInt(10,500), diffBjp: randomInt(-500, -50),
            },
            electionResults: [
               { 
                 booth: 'S0',
                 '2024_nda': randomInt(50, 100), '2024_udf': randomInt(150, 300), '2024_ldf': randomInt(150, 300),
                 '2020_nda': randomInt(20, 70), '2020_udf': randomInt(200, 300), '2020_ldf': randomInt(200, 300),
                 '2015_nda': randomInt(30, 80), '2015_udf': randomInt(200, 300), '2015_ldf': randomInt(200, 300),
               },
               { 
                 booth: 'S1',
                 '2024_nda': randomInt(50, 100), '2024_udf': randomInt(150, 300), '2024_ldf': randomInt(150, 300),
                 '2020_nda': randomInt(20, 70), '2020_udf': randomInt(200, 300), '2020_ldf': randomInt(200, 300),
                 '2015_nda': randomInt(30, 80), '2015_udf': randomInt(200, 300), '2015_ldf': randomInt(200, 300),
               },
            ],
            religionDemographics: [
                { name: 'Hindu', value: randomInt(30, 60), fill: '#FF8042' },
                { name: 'Christian', value: randomInt(20, 50), fill: '#0088FE' },
                { name: 'Muslim', value: randomInt(5, 20), fill: '#00C49F' },
            ]
        };

        const outreachData = {
            teamFormation: Math.random() > 0.3,
            voterListRegistration: Math.random() > 0.2,
            boothVerification: Math.random() > 0.5,
            samparkamJune: Math.random() > 0.4,
        };
        
        setWardData({ orgData, electoralData, outreachData });
    };

    const handlePanchayatSearchChange = (e) => {
        const query = e.target.value;
        setPanchayatSearch(query);
        setSelectedPanchayat(null);
        setAvailableWards([]);
        setSelectedWard('Select Ward');
        setWardData(null);

        if(query) {
            const suggestions = filterOptions.panchayats.filter(p => p.toLowerCase().startsWith(query.toLowerCase()));
            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    }

    const handlePanchayatSelect = (panchayat) => {
        setPanchayatSearch(panchayat);
        setSelectedPanchayat(panchayat);
        setAvailableWards(filterOptions.wards[panchayat]?.wards || []);
        setSelectedWard('Select Ward');
        setSearchSuggestions([]);
        setWardData(null);
    }
    
    const handleWardSelect = (ward) => {
        setSelectedWard(ward);
        generateRandomData(ward);
    }

    const renderContent = () => {
        if (!selectedPanchayat || !selectedWard || selectedWard === 'Select Ward') {
             return <div className="text-center py-20 text-gray-500">Please search and select a Panchayat, then select a Ward to view data.</div>;
        }
        if (!wardData) return <div className="text-center py-20 text-gray-500">Loading data...</div>;

        if (activeTab === 'Organisation') return <OrganisationTab data={wardData.orgData} />;
        if (activeTab === 'Electoral') return <ElectoralTab data={wardData.electoralData} />;
        if (activeTab === 'Outreach') return <OutreachTab data={wardData.outreachData} />;
        return null;
    }
    
    return (
        <div className="p-4 md:p-6 space-y-6">
            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <div className="absolute top-3 left-3 text-gray-400">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search Panchayat..."
                            value={panchayatSearch}
                            onChange={handlePanchayatSearchChange}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                         {searchSuggestions.length > 0 && panchayatSearch && !selectedPanchayat && (
                            <div className="absolute left-0 right-0 mt-1 bg-gray-700 border border-gray-600 rounded-lg z-10">
                                {searchSuggestions.map(p => (
                                    <div key={p} onClick={() => handlePanchayatSelect(p)} className="px-4 py-2 text-gray-300 hover:bg-orange-600 cursor-pointer">
                                        {p}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <FilterDropdown name="Select Ward" options={availableWards} onSelect={handleWardSelect} selectedValue={selectedWard} disabled={!selectedPanchayat}/>
                    </div>
                </div>
            </div>
            
            <div className="flex space-x-2 rounded-lg bg-gray-700/50 p-1">
                <button
                    onClick={() => setActiveTab('Organisation')}
                    className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-all ${
                        activeTab === 'Organisation'
                            ? 'bg-orange-600 text-white shadow'
                            : 'text-gray-300 hover:bg-white/10'
                    }`}
                >
                    Organisation
                </button>
                <button
                    onClick={() => setActiveTab('Electoral')}
                    className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-all ${
                        activeTab === 'Electoral'
                            ? 'bg-orange-600 text-white shadow'
                            : 'text-gray-300 hover:bg-white/10'
                    }`}
                >
                    Electoral
                </button>
                <button
                    onClick={() => setActiveTab('Outreach')}
                    className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-all ${
                        activeTab === 'Outreach'
                            ? 'bg-orange-600 text-white shadow'
                            : 'text-gray-300 hover:bg-white/10'
                    }`}
                >
                    Outreach
                </button>
            </div>
            
            <div>{renderContent()}</div>
        </div>
    );
};

const OrganisationTab = ({ data }) => (
    <div className="space-y-6">
        <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-3">Leaders Name and Details</h3>
            <div className="overflow-x-auto bg-gray-800 rounded-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Position</th>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Phone Number</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.leaders.map((leader, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium">{leader.position}</td>
                                <td className="px-6 py-4">{leader.name}</td>
                                <td className="px-6 py-4">{leader.phone}</td>
                                <td className="px-6 py-4">
                                    <a href={`tel:${leader.phone}`} className="text-green-400 hover:text-green-300">
                                        <Phone size={18} />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-3">Prominent BJP Leaders in the Ward</h3>
            <div className="overflow-x-auto bg-gray-800 rounded-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Position</th>
                            <th scope="col" className="px-6 py-3">Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.prominentLeaders.map((leader, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium">{leader.name}</td>
                                <td className="px-6 py-4">{leader.position}</td>
                                <td className="px-6 py-4">{leader.number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-3">Vikasita Keralam Team</h3>
             <div className="overflow-x-auto bg-gray-800 rounded-lg">
                <table className="w-full text-sm text-left text-gray-300">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">Member Name</th>
                            <th scope="col" className="px-6 py-3">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.vikasitaKeralamTeam.map((member, index) => (
                            <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                                <td className="px-6 py-4 font-medium">{member.name}</td>
                                <td className="px-6 py-4">{member.details}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const ElectoralTab = ({ data }) => {
    const InfoRow = ({ label, value }) => (
        <div className="flex justify-between py-2 border-b border-gray-700">
            <span className="text-gray-400">{label}:</span>
            <span className="font-semibold text-white">{value}</span>
        </div>
    );
     const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontWeight="bold">
                {`${(percent * 100).toFixed(2)}%`}
            </text>
        );
    };

    return (
        <div className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-orange-500 mb-3">Ward Information</h3>
                    <div className="space-y-1">
                        <InfoRow label="AC Name" value={data.wardInfo.acName} />
                        <InfoRow label="Local Body Name" value={data.wardInfo.localBodyName} />
                        <InfoRow label="Local Body Type" value={data.wardInfo.localBodyType} />
                        <InfoRow label="Ward Name" value={data.wardInfo.wardName} />
                    </div>
                </div>
                 <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-orange-500 mb-3">Councilor Information</h3>
                    <div className="space-y-1">
                        <InfoRow label="Councilor Name" value={data.councilorInfo.name} />
                        <InfoRow label="Councilor Alliance" value={data.councilorInfo.alliance} />
                        <InfoRow label="Margin" value={data.councilorInfo.margin} />
                        <InfoRow label="Difference With BJP" value={data.councilorInfo.diffBjp} />
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-orange-500 mb-3">Activity Status</h3>
                <div className="overflow-x-auto bg-gray-800 rounded-lg">
                     <table className="w-full text-sm text-center text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                            <tr>
                                <th rowSpan="2" className="px-4 py-3 border-b border-gray-600 align-middle">Respective Booths in Lok Sabha</th>
                                <th colSpan="3" className="px-4 py-3 border-b border-l border-gray-600">2024 GE Results</th>
                                <th colSpan="3" className="px-4 py-3 border-b border-l border-gray-600">2020 LSG Results</th>
                                <th colSpan="3" className="px-4 py-3 border-b border-l border-gray-600">2015 LSG Results</th>
                            </tr>
                            <tr>
                                <th className="px-2 py-2 font-medium text-orange-400 border-l border-gray-600">NDA</th>
                                <th className="px-2 py-2 font-medium text-blue-400">UDF</th>
                                <th className="px-2 py-2 font-medium text-red-400">LDF</th>
                                <th className="px-2 py-2 font-medium text-orange-400 border-l border-gray-600">NDA</th>
                                <th className="px-2 py-2 font-medium text-blue-400">UDF</th>
                                <th className="px-2 py-2 font-medium text-red-400">LDF</th>
                                <th className="px-2 py-2 font-medium text-orange-400 border-l border-gray-600">NDA</th>
                                <th className="px-2 py-2 font-medium text-blue-400">UDF</th>
                                <th className="px-2 py-2 font-medium text-red-400">LDF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.electionResults.map(row => (
                                <tr key={row.booth} className="hover:bg-gray-700/50">
                                    <td className="px-4 py-2 font-medium border-t border-gray-700">{row.booth}</td>
                                    <td className="px-2 py-2 border-t border-l border-gray-700">{row['2024_nda']}</td>
                                    <td className="px-2 py-2 border-t border-gray-700">{row['2024_udf']}</td>
                                    <td className="px-2 py-2 border-t border-gray-700">{row['2024_ldf']}</td>
                                    <td className="px-2 py-2 border-t border-l border-gray-700">{row['2020_nda']}</td>
                                    <td className="px-2 py-2 border-t border-gray-700">{row['2020_udf']}</td>
                                    <td className="px-2 py-2 border-t border-gray-700">{row['2020_ldf']}</td>
                                    <td className="px-2 py-2 border-t border-l border-gray-600">{row['2015_nda']}</td>
                                    <td className="px-2 py-2 border-t border-gray-700">{row['2015_udf']}</td>
                                    <td className="px-2 py-2 border-t border-gray-700">{row['2015_ldf']}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <div className="h-80">
                     <ResponsiveContainer>
                         <PieChart>
                            <Pie data={data.religionDemographics} dataKey="value" nameKey="name" cx="50%" cy="45%" outerRadius={110} labelLine={false} label={renderCustomizedLabel}>
                                {data.religionDemographics.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
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

const OutreachTab = ({ data }) => {
    const StatusBox = ({ title, status }) => (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center h-full">
            <h4 className="text-gray-300 font-semibold mb-3">{title}</h4>
            {status ? (
                <div className="flex items-center text-green-400">
                    <CheckCircle2 size={28} className="mr-2"/>
                    <span className="text-2xl font-bold">Yes</span>
                </div>
            ) : (
                <div className="flex items-center text-red-400">
                    <XCircle size={28} className="mr-2"/>
                    <span className="text-2xl font-bold">No</span>
                </div>
            )}
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatusBox title="Vikasita Keralam Team Formation" status={data.teamFormation} />
            <StatusBox title="Voters List Registration" status={data.voterListRegistration} />
            <StatusBox title="Booth Verification" status={data.boothVerification} />
            <StatusBox title="Samparkam In June Month" status={data.samparkamJune} />
        </div>
    );
};

export default MicroLevelDataView;