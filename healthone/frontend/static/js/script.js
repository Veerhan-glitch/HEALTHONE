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
            {
                department: departments[0],
                doctors: ["Dr. Agrawal", "Dr. Bansal", "Dr. Chatterjee"]
            },
            {
                department: departments[1],
                doctors: ["Dr. Gupta", "Dr. Iyer"]
            },
            {
                department: departments[2],
                doctors: ["Dr. Joshi", "Dr. Kulkarni"]
            }
        ]
    },
    {
        name: "PSRI",
        lat: 28.5625,
        lng: 77.2100,
        departments: [
            {
                department: departments[2],
                doctors: ["Dr. Mehta", "Dr. Nair"]
            },
            {
                department: departments[3],
                doctors: ["Dr. Pandey", "Dr. Reddy"]
            }
        ]
    },
    {
        name: "Apolo",
        lat: 28.7041,
        lng: 77.1025,
        departments: [
            {
                department: departments[0],
                doctors: ["Dr. Sharma", "Dr. Tiwari"]
            },
            {
                department: departments[4],
                doctors: ["Dr. Upadhyay", "Dr. Varma"]
            }
        ]
    }
];

const doctors = {
    "Dr. Agrawal": {
        name: "Dr. Balbir Singh Agrawal",
        photo: "https://files.oaiusercontent.com/file-84HHkn6kPbGRD7Vg7ghj8Y?se=2025-01-22T16%3A53%3A39Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D38ba85d3-3ad1-4292-a3ee-093cffc95859.webp&sig=/M3CngAowALKfY2BAhUharjxm0x/id6azU0aQs%2BWPNA%3D",
        position: "Group Chairman - Cardiac Sciences, Pan Max & Chief of Interventional Cardiology",
        specialization: "Cardiac Sciences, Cardiology, Cardiac Electrophysiology-Pacemaker",
        experience: "34+ Years",
        gender: "Male",
        consultationFee: 2000,
        videoConsultationFee: 2500,
        availability: {
            "morning": ["10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM"],
            "evening": ["2:00 PM - 4:00 PM"]
        }
    },
    "Dr. Bansal": {
        name: "Dr. Rakesh Bansal",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Director - Cardiology",
        specialization: "Cardiology, Cardiac Sciences",
        experience: "20+ Years",
        gender: "Male",
        consultationFee: 1500,
        videoConsultationFee: 2000,
        availability: {
            "morning": ["9:00 AM - 11:00 AM", "11:00 AM - 1:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    },

    "Dr. Chatterjee": {
        name: "Dr. Sabyasachi Chatterjee",
        photo: "https://files.oaiusercontent.com/file-B7FZtzkPXThzt5stHx76ps?se=2025-01-22T16%3A54%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D99731378-2d39-4d11-93e6-cad93b3c433f.webp&sig=K/MhCdkfH1xojh/QzRoeX3dwsoCpmEEM2WDK6P1i/fI%3D",
        position: "Senior Consultant - Cardiology",
        specialization: "Cardiology, Cardiac Sciences",
        experience: "15+ Years",
        gender: "Female",
        consultationFee: 1000,
        videoConsultationFee: 1500,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Gupta": {
        name: "Dr. Ravi Gupta",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Senior Consultant - Neurology",
        specialization: "Neurology",
        experience: "12+ Years",
        gender: "Male",
        consultationFee: 1200,
        videoConsultationFee: 1700,
        availability: {
            "morning": ["9:00 AM - 11:00 AM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Iyer": {
        name: "Dr. Anjali Iyer",
        photo: "https://files.oaiusercontent.com/file-B7FZtzkPXThzt5stHx76ps?se=2025-01-22T16%3A54%3A45Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D99731378-2d39-4d11-93e6-cad93b3c433f.webp&sig=K/MhCdkfH1xojh/QzRoeX3dwsoCpmEEM2WDK6P1i/fI%3D",
        position: "Consultant - Neurology",
        specialization: "Neurology",
        experience: "8+ Years",
        gender: "Female",
        consultationFee: 1000,
        videoConsultationFee: 1500,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    },

    "Dr. Joshi": {
        name: "Dr. Anand Joshi",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Senior Consultant - Pediatrics",
        specialization: "Pediatrics",
        experience: "10+ Years",
        gender: "Male",
        consultationFee: 800,
        videoConsultationFee: 1200,
        availability: {
            "morning": ["9:00 AM - 11:00 AM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Kulkarni": {
        name: "Dr. Mukul Kulkarni",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Consultant - Pediatrics",
        specialization: "Pediatrics",
        experience: "6+ Years",
        gender: "Male",
        consultationFee: 700,
        videoConsultationFee: 1000,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    },

    "Dr. Mehta": {
        name: "Dr. Ramesh Mehta",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Senior Consultant - Pediatrics",
        specialization: "Pediatrics",
        experience: "12+ Years",
        gender: "Male",
        consultationFee: 900,
        videoConsultationFee: 1400,
        availability: {
            "morning": ["9:00 AM - 11:00 AM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Nair": {
        name: "Dr. Anil Nair",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Consultant - Pediatrics",
        specialization: "Pediatrics",
        experience: "8+ Years",
        gender: "Male",
        consultationFee: 800,
        videoConsultationFee: 1200,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    },

    "Dr. Pandey": {
        name: "Dr. Ravi Pandey",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Senior Consultant - Orthopedics",
        specialization: "Orthopedics",
        experience: "10+ Years",
        gender: "Male",
        consultationFee: 1000,
        videoConsultationFee: 1500,
        availability: {
            "morning": ["9:00 AM - 11:00 AM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Reddy": {
        name: "Dr. Arjun Reddy",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Consultant - Orthopedics",
        specialization: "Orthopedics",
        experience: "6+ Years",
        gender: "Male",
        consultationFee: 800,
        videoConsultationFee: 1200,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    },

    "Dr. Sharma": {
        name: "Dr. Ramesh Sharma",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Senior Consultant - Dermatology",
        specialization: "Dermatology",
        experience: "12+ Years",
        gender: "Male",
        consultationFee: 900,
        videoConsultationFee: 1400,
        availability: {
            "morning": ["9:00 AM - 11:00 AM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Tiwari": {
        name: "Dr. Anil Tiwari",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Consultant - Dermatology",
        specialization: "Dermatology",
        experience: "8+ Years",
        gender: "Male",
        consultationFee: 800,
        videoConsultationFee: 1200,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    },

    "Dr. Upadhyay": {
        name: "Dr. Ravi Upadhyay",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Senior Consultant - Dermatology",
        specialization: "Dermatology",
        experience: "10+ Years",
        gender: "Male",
        consultationFee: 700,
        videoConsultationFee: 1000,
        availability: {
            "morning": ["9:00 AM - 11:00 AM"],
            "evening": ["5:00 PM - 7:00 PM"]
        }
    },

    "Dr. Varma": {
        name: "Dr. Rahul Varma",
        photo: "https://files.oaiusercontent.com/file-2hc7gtdqAxcYWReKFm1ZQ9?se=2025-01-22T16%3A52%3A12Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D5fa9c884-fdd4-424d-9cc0-255900a641ff.webp&sig=HEeeOCdWnwlBlS4iO%2B7554IUc3StR3htsrFkz%2Bbxalo%3D",
        position: "Consultant - Dermatology",
        specialization: "Dermatology",
        experience: "6+ Years",
        gender: "Male",
        consultationFee: 600,
        videoConsultationFee: 900,
        availability: {
            "morning": ["10:00 AM - 12:00 PM"],
            "evening": ["4:00 PM - 6:00 PM"]
        }
    }

};


const hospitalBtn = document.getElementById('hospitalBtn');
const departmentBtn = document.getElementById('departmentBtn');
const backBtn = document.getElementById('backBtn');
const mainContent = document.getElementById('mainContent');

hospitalBtn.addEventListener('click', () => {
    hospitalBtn.classList.add('active');
    departmentBtn.classList.remove('active');
    showHospitals();
});

departmentBtn.addEventListener('click', () => {
    departmentBtn.classList.add('active');
    hospitalBtn.classList.remove('active');
    showDepartments();
});

backBtn.addEventListener('click', () => {
    if (hospitalBtn.classList.contains('active')) {
        showHospitals();
    } else {
        showDepartments();
    }
    backBtn.style.display = 'none';
});

function showHospitals() {
    mainContent.innerHTML = '';
    backBtn.style.display = 'none';

    hospitals.forEach(hospital => {
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
            if (hospital.lat && hospital.lng) {
                showMapPopup(hospital.lat, hospital.lng, hospital.name);
            }
        };

        const departmentCount = document.createElement('p');
        departmentCount.textContent = `${hospital.departments.length} Departments`;
        departmentCount.style.color = '#666';

        mapIconContainer.appendChild(mapIcon);
        hospitalDiv.appendChild(hospitalName);
        hospitalDiv.appendChild(departmentCount);
        hospitalDiv.appendChild(mapIconContainer);
        
        hospitalDiv.onclick = () => showDepartmentsForHospital(hospital.name);
        
        mainContent.appendChild(hospitalDiv);
    });
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

function showDepartmentsForHospital(hospitalName) {
    mainContent.innerHTML = '';
    backBtn.style.display = 'block';

    const hospital = hospitals.find(h => h.name === hospitalName);
    
    if (hospital) {
        const header_text = document.createElement('h2');
        header_text.textContent = `Departments at ${hospitalName}`;
        header_text.style.width = '100%';
        header_text.style.textAlign = 'center';
        header_text.style.color = '#1565c0';
        mainContent.appendChild(header_text);

        hospital.departments.forEach(({ department, doctors }) => {
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.textContent = department.name;
            
            departmentDiv.onclick = (event) => {
                event.stopPropagation();
                showDoctors(hospital.name, department.name);
            };
            
            mainContent.appendChild(departmentDiv);
        });
    }
}

function showDepartments() {
    mainContent.innerHTML = '';
    backBtn.style.display = 'none';

    const uniqueDepartments = [...new Set(hospitals.flatMap(h => 
        h.departments.map(d => d.department.name)
    ))];
    
    uniqueDepartments.forEach(departmentName => {
        const departmentDiv = document.createElement('div');
        departmentDiv.className = 'department';
        departmentDiv.textContent = departmentName;
        departmentDiv.onclick = () => showHospitalsForDepartment(departmentName);
        mainContent.appendChild(departmentDiv);
    });
}

function showHospitalsForDepartment(departmentName) {
    mainContent.innerHTML = '';
    backBtn.style.display = 'block';

    const header_text = document.createElement('h2');
    header_text.textContent = `Hospitals with ${departmentName}`;
    header_text.style.width = '100%';
    header_text.style.textAlign = 'center';
    header_text.style.color = '#1565c0';
    mainContent.appendChild(header_text);

    hospitals.forEach(hospital => {
        if (hospital.departments.some(d => d.department.name === departmentName)) {
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
                if (hospital.lat && hospital.lng) {
                    showMapPopup(hospital.lat, hospital.lng, hospital.name);
                }
            };

            mapIconContainer.appendChild(mapIcon);
            hospitalDiv.appendChild(hospitalName);sgsdbdageg
            hospitalDiv.appendChild(mapIconContainer);
            
            hospitalDiv.onclick = () => showDoctors(hospital.name, departmentName);
            
            mainContent.appendChild(hospitalDiv);
        }
    });
}

function showDoctors(hospitalName, departmentName) {
    mainContent.innerHTML = '';
    backBtn.style.display = 'block';

    const hospital = hospitals.find(h => h.name === hospitalName);
    
    if (hospital) {
        const { doctors: doctorsList } = hospital.departments.find(d => 
            d.department.name === departmentName
        );

        const doctorList = document.createElement('div');
        doctorList.className = 'doctor-list';
        
        const header_text = document.createElement('h2');
        header_text.textContent = `${departmentName} Doctors at ${hospitalName}`;
        doctorList.appendChild(header_text);

        doctorsList.forEach(doctorName => {
            const doctor = doctors[doctorName];
            if (!doctor) return;

            const doctorCard = document.createElement('div');
            doctorCard.className = 'doctor-card';
            
            doctorCard.innerHTML = `
                <div class="doctor-info">
                    <img src="${doctor.photo}" alt="${doctor.name}" class="doctor-photo">
                    <div class="doctor-details">
                        <h3>${doctor.name}</h3>
                        <p class="position">${doctor.position}</p>
                        <p class="specialization">${doctor.specialization}</p>
                        <p class="experience">Experience: ${doctor.experience}</p>
                        <p class="gender">Gender: ${doctor.gender}</p>
                    </div>
                </div>
                <button class="book-appointment" onclick="showAppointmentModal('${doctorName}')">
                    Book Appointment
                </button>
            `;
            
            doctorList.appendChild(doctorCard);
        });

        mainContent.appendChild(doctorList);
    }
}

function showAppointmentModal(doctorName) {
    const doctor = doctors[doctorName];
    const existingModal = document.querySelector('.modal');
    if (existingModal) {
        existingModal.remove();
    }

    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>Book Appointment with ${doctor.name}</h2>
            
            <div class="calendar">
                <input type="date" id="appointment-date" min="${formattedDate}" value="${formattedDate}">
            </div>

            <div class="time-slots">
                <h3>Available Time Slots</h3>
                <div class="slot-group">
                    <h4>Morning</h4>
                    ${doctor.availability.morning.map(slot => 
                        `<button class="time-slot">${slot}</button>`
                    ).join('')}
                </div>
                <div class="slot-group">
                    <h4>Evening</h4>
                    ${doctor.availability.evening.map(slot => 
                        `<button class="time-slot">${slot}</button>`
                    ).join('')}
                </div>
            </div>

            <div class="consultation-types">
                <button class="consultation-type active" data-type="in-person">
                    In-Person Consultation (₹${doctor.consultationFee})
                </button>
                <button class="consultation-type" data-type="video">
                    Video Consultation (₹${doctor.videoConsultationFee})
                </button>
            </div>

            <form id="appointment-form" class="appointment-form">
                <input type="text" placeholder="Full Name" required>
                <input type="tel" placeholder="Phone Number" required pattern="[0-9]{10}">
                <input type="email" placeholder="Email" required>
                <textarea placeholder="Address" required></textarea>
                <button type="submit" class="submit-appointment">Confirm Booking</button>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Close Implementation
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.remove();

 // Make sure and show only one is selected at a time 
    const timeSlots = modal.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.onclick = (e) => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            e.target.classList.add('selected');
        };
    });

    // Make sure that only one is selected at a time 
    const consultationTypes = modal.querySelectorAll('.consultation-type');
    consultationTypes.forEach(type => {
        type.onclick = (e) => {
            consultationTypes.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        };
    });

     // Prevent the reloading of the page 
    // give message while filling details
    // close implementation
    const form = modal.querySelector('#appointment-form');
    form.onsubmit = (e) => {
        e.preventDefault();
        alert('Appointment booked successfully!');
        modal.remove();
    };
}

// Initialize the application
showHospitals();


