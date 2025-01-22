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
        lat: 28.4595,
        lng: 77.0266,
        departments: [
            { department: departments[0], doctors: ["Dr. Agrawal", "Dr. Bansal", "Dr. Chatterjee"] },
            { department: departments[1], doctors: ["Dr. Gupta", "Dr. Iyer"] },
            { department: departments[2], doctors: ["Dr. Joshi", "Dr. Kulkarni"] }
        ]
    },
    {
        name: "PSRI",
        lat: 28.5625,
        lng: 77.2100,
        departments: [
            { department: departments[2], doctors: ["Dr. Mehta", "Dr. Nair"] },
            { department: departments[3], doctors: ["Dr. Pandey", "Dr. Reddy"] }
        ]
    },
    {
        name: "Apolo",
        lat: 28.7041,
        lng: 77.1025,
        departments: [
            { department: departments[0], doctors: ["Dr. Sharma", "Dr. Tiwari"] },
            { department: departments[4], doctors: ["Dr. Upadhyay", "Dr. Varma"] }
        ]
    }
];

document.getElementById('hospitalBtn').addEventListener('click', showHospitals);
document.getElementById('departmentBtn').addEventListener('click', showDepartments);

function showHospitals() {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    hospitals.forEach(hospital => {
        const hospitalDiv = createHospitalElement(hospital);
        mainContent.appendChild(hospitalDiv);
    });
}

function createHospitalElement(hospital) {
    const hospitalDiv = document.createElement('div');
    hospitalDiv.className = 'hospital';

    const hospitalName = document.createElement('h3');
    hospitalName.textContent = hospital.name;

    const mapIconContainer = document.createElement('div');
    mapIconContainer.className = 'map-icon-container';

    const mapIcon = document.createElement('i');
    mapIcon.className = 'fa-solid fa-map-location-dot map-icon';

    mapIcon.onclick = (event) => {
        event.stopPropagation();
        showMapPopup(hospital.lat, hospital.lng, hospital.name);
    };

    mapIconContainer.appendChild(mapIcon);
    hospitalDiv.appendChild(hospitalName);
    hospitalDiv.appendChild(mapIconContainer);

    hospitalDiv.onclick = () => showDepartmentsForHospital(hospital.name);

    return hospitalDiv;
}

function showMapPopup(lat, lng, name) {
    const modal = document.getElementById('mapModal');
    const closeBtn = document.querySelector('.close');

    modal.style.display = 'block';

    const map = L.map('popupMap').setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup(name).openPopup();

    closeBtn.onclick = () => {
        modal.style.display = 'none';
        map.remove(); 
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            map.remove();
        }
    };
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

function showDepartmentsForHospital(hospitalName) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    const hospital = hospitals.find(h => h.name === hospitalName);

    if (hospital) {
        hospital.departments.forEach(({ department }) => {
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.textContent = department.name;

            departmentDiv.onclick = (event) => {
                event.stopPropagation();
                showHospitalsForDepartment(department.name);
            };

            mainContent.appendChild(departmentDiv);
        });
    }
}

function showHospitalsForDepartment(departmentName) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = '';

    hospitals.forEach(hospital => {
        if (hospital.departments.some(d => d.department.name === departmentName)) {
            const hospitalDiv = createHospitalElement(hospital);
            mainContent.appendChild(hospitalDiv);
        }
    });
}

showHospitals(); // Default
