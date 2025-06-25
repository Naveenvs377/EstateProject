export const mockData = {
  kpi: {
    totalLocalBodies: 1200,
    totalWards: 21854,
    boothsFormed: 16543,
    votersContacted: 4578901,
  },
   growthData: {
    booth: [
        { month: 'April', count: 2000 },
        { month: 'May', count: 5000 }
    ],
    karyakartha: [
        { month: 'April', count: 15000 },
        { month: 'May', count: 25000 }
    ]
  },
  voterDemographics: [
    { name: 'Category A (Strong Supporters)', value: 450000 },
    { name: 'Category B (Leaning Supporters)', value: 750000 },
    { name: 'Category C (Undecided)', value: 1200000 },
    { name: 'Category D (Opponent)', value: 900000 },
  ],
  organizationalVoters: {
    total: 28543987,
    male: 13986554,
    female: 14557123,
    thirdGender: 310,
    hindu: 15699192, // ~55%
    muslim: 7706876,  // ~27%
    christian: 5137917 // ~18%
  },
   microLevelOrgData: {
    leaders: [
        { position: 'District President', name: 'K. Ananthan', phone: '9876543210' },
        { position: 'Mandalam President', name: 'B. Sreekumar', phone: '9876543211' },
        { position: 'Panchayat President', name: 'C. Vimala', phone: '9876543212' },
    ],
    prominentLeaders: [
        { name: 'Smt. Sobha Surendran', position: 'State Vice President', number: '9123456780' },
        { name: 'Sri. P. K. Krishnadas', position: 'National Executive Member', number: '9123456781' },
        { name: 'Sri. M. T. Ramesh', position: 'State General Secretary', number: '9123456782' },
    ],
    vikasitaKeralamTeam: [
        { name: 'V. Muraleedharan', details: 'Union Minister, Convenor' },
        { name: 'Kummanam Rajasekharan', details: 'Former Governor, Member' },
        { name: 'E. Sreedharan', details: 'Metroman, Advisor' },
    ]
  },
  microLevelElectoralData: {
    wardInfo: {
        acName: 'Kanjirappally',
        localBodyName: 'Chirakkadavu',
        localBodyType: 'Municipality',
        wardName: 'Attickal',
    },
    councilorInfo: {
        name: 'Abraham K.A',
        alliance: 'LDF',
        margin: 28,
        diffBjp: -432,
    },
    electionResults: [
       { 
         booth: 'S0',
         '2024_nda': 64, '2024_udf': 288, '2024_ldf': 185,
         '2020_nda': 22, '2020_udf': 250, '2020_ldf': 260,
         '2015_nda': 34, '2015_udf': 270, '2015_ldf': 220,
       },
       { 
         booth: 'S1',
         '2024_nda': 95, '2024_udf': 172, '2024_ldf': 187,
         '2020_nda': 30, '2020_udf': 206, '2020_ldf': 224,
         '2015_nda': 50, '2015_udf': 223, '2015_ldf': 181,
       },
    ],
    religionDemographics: [
        { name: 'Hindu', value: 44.84, fill: '#FF8042' },
        { name: 'Christian', value: 51.24, fill: '#0088FE' },
        { name: 'Muslim', value: 3.92, fill: '#00C49F' },
    ]
  },
  microLevelOutreachData: {
      teamFormation: true,
      voterListRegistration: true,
      boothVerification: false,
      samparkamJune: true,
  },
   panchayatData: {
    "Parassala": {
        acName: "Parassala",
        wards: ["Kottaykkakam", "Nediyaamkode", "Peruvila", "Pulloorkkonam", "Parasuvaykkal", "Aadumankadu"]
    },
    "Karode": {
        acName: "Neyyattinkara",
        wards: ["Plamoottukkada", "Pottayilkkada", "Ayira", "Vadoorkkonam", "Manchamkuzhi", "Chenkavila", "Ambilikonam"]
    },
    "Kulathoor": {
        acName: "Neyyattinkara",
        wards: ["Venkadampu", "Poozhikkunnu", "Nalloorvattam", "Cherunnalppazhinji", "High School", "Kulathoor", "Uchakkada", "Perumbazhinji"]
    },
    "Kalliyoor": {
        acName: "Nemom",
        wards: ["Paappanchani", "Vellayani", "Mukaloormoola", "Shanthivila", "Sarvodhayam", "Cherubaalamandiram", "Kulikkudiyoorkonam", "Upaniyoor", "Ookkodu", "Chenkodu", "Vallamkodu", "Pegeyoor", "Kalliyoor", "Kannankuzhi", "Office Ward", "Punnamoodu", "Peringammala", "Kuzhithaalchal", "Hospital Ward", "Nedinjal", "Kaakkamoola", "Poonkulam", "Signal Station", "Agricultural College"]
    }
  },
  programProgress: [
    { month: 'Jan', contacted: 120000 },
    { month: 'Feb', contacted: 180000 },
    { month: 'Mar', contacted: 250000 },
    { month: 'Apr', contacted: 310000 },
    { month: 'May', contacted: 380000 },
    { month: 'Jun', contacted: 457890 },
  ],
  priorityTasks: [
    { id: 1, task: "Finalize candidate list for Thiruvananthapuram Corporation", priority: 'High' },
    { id: 2, task: "Organize Booth President meeting in Ernakulam district", priority: 'High' },
    { id: 3, task: "Review 'Voter Sampark Abhiyan' progress in Malappuram", priority: 'Medium' },
    { id: 4, task: "Distribute campaign materials in Kollam and Pathanamthitta", priority: 'Medium' },
    { id: 5, task: "Data entry verification for Kozhikode North constituency", priority: 'Low' },
  ],
};

export const PIE_COLORS = {
    gender: ['#3B82F6', '#EC4899', '#8B5CF6'],
    religion: ['#F97316', '#16A34A', '#EAB308']
}

export const filterOptions = {
    districts: ["Thiruvananthapuram", "Kollam", "Pathanamthitta", "Alappuzha", "Kottayam", "Idukki", "Ernakulam", "Thrissur", "Palakkad", "Malappuram", "Kozhikode", "Wayanad", "Kannur", "Kasaragod"],
    organisationalDistricts: ["Org TVM South", "Org TVM North", "Org Kollam Rural"],
    organisationalMandals: ["Mandal A", "Mandal B", "Mandal C"],
    assemblyConstituencies: ["Kazhakootam", "Vattiyoorkavu", "Nemom", "Kollam"],
    localBodies: ["Thiruvananthapuram Corp.", "Kollam Corp.", "Attingal Munc.", "Neyyattinkara Munc."],
    panchayats: Object.keys(mockData.panchayatData),
    wards: mockData.panchayatData
};