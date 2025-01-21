const departments = [
    { name: "Cardiology" },
    { name: "Neurology" },
    { name: "Pediatrics" },
    { name: "Orthopedics" },
    { name: "Dermatology" }
];

const hospitals = [
    {
        name: "Max",
        departments: [
            {
                department: departments[0], // Cardiology
                doctors: ["Dr. Agrawal", "Dr. Bansal", "Dr. Chatterjee"]
            },
            {
                department: departments[1], // Neurology
                doctors: ["Dr. Gupta", "Dr. Iyer"]
            },
            {
                department: departments[2], // Pediatrics
                doctors: ["Dr. Joshi", "Dr. Kulkarni"]
            }
        ]
    },
    {
        name: "PSRI",
        departments: [
            {
                department: departments[2], // Pediatrics
                doctors: ["Dr. Mehta", "Dr. Nair"]
            },
            {
                department: departments[3], // Orthopedics
                doctors: ["Dr. Pandey", "Dr. Reddy"]
            }
        ]
    },
    {
        name: "Aplo",
        departments: [
            {
                department: departments[0], // Cardiology
                doctors: ["Dr. Sharma", "Dr. Tiwari"]
            },
            {
                department: departments[4], // Dermatology
                doctors: ["Dr. Upadhyay", "Dr. Varma"]
            }
        ]
    }
];

document.getElementById('hospitalBtn').addEventListener('click', showHospitals);
document.getElementById('departmentBtn').addEventListener('click', showDepartments);

function showHospitals() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    hospitals.forEach(hospital => {
        const hospitalDiv = document.createElement('div');
        hospitalDiv.className = 'hospital';
        
        const hospitalName = document.createElement('h3');
        hospitalName.textContent = hospital.name;

        hospitalDiv.appendChild(hospitalName);
        
        hospitalDiv.onclick = () => showDepartmentsForHospital(hospital.name);
        
        mainContent.appendChild(hospitalDiv);
    });
}

function showDepartmentsForHospital(hospitalName) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    const hospital = hospitals.find(h => h.name === hospitalName);
    
    if (hospital) {
        hospital.departments.forEach(({ department, doctors }) => {
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.textContent = `${department.name}`;
            
            departmentDiv.onclick = (event) => {
                event.stopPropagation();
                showDoctors(hospital.name, department.name);
            };
            
            mainContent.appendChild(departmentDiv);
        });
    }
}

function showDepartments() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    const uniqueDepartments = [...new Set(hospitals.flatMap(h => h.departments.map(d => d.department.name)))];
    
    uniqueDepartments.forEach(departmentName => {
        const departmentDiv = document.createElement('div');
        departmentDiv.className = 'department';
        departmentDiv.textContent = departmentName;

        departmentDiv.onclick = () => showHospitalsForDepartment(departmentName);
        
        mainContent.appendChild(departmentDiv);
    });
}

function showHospitalsForDepartment(departmentName) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    hospitals.forEach(hospital => {
        if (hospital.departments.some(d => d.department.name === departmentName)) {
            const hospitalDiv = document.createElement('div');
            hospitalDiv.className = 'hospital';
            
            const hospitalName = document.createElement('h3');
            hospitalName.textContent = hospital.name;

            hospitalDiv.appendChild(hospitalName);
            
            hospitalDiv.onclick = () => showDoctors(hospital.name, departmentName);
            
            mainContent.appendChild(hospitalDiv);
        }
    });
}

function showDoctors(hospitalName, departmentName) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    const hospital = hospitals.find(h => h.name === hospitalName);
    
    if (hospital) {
        const { doctors } = hospital.departments.find(d => d.department.name === departmentName);

        const doctorList = document.createElement('ul');
        
        doctors.forEach(doctor => {
            const listItem = document.createElement('li');
            listItem.textContent = doctor;
            
            doctorList.appendChild(listItem);
        });

        mainContent.innerHTML = `<h2>${hospitalName} - ${departmentName}</h2>`;
        mainContent.appendChild(doctorList);
    }
}

showHospitals(); // Default
