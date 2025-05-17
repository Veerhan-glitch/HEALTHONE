const hospitalBtn = document.getElementById('hospitalBtn');
const departmentBtn = document.getElementById('departmentBtn');
const backBtn = document.getElementById('backBtn');
const mainContent = document.getElementById('mainContent');
let navigationState = 'hospitals'; // Track view: 'hospitals', 'departments', 'hospital_departments', 'department_hospitals', 'doctors'

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
    if (navigationState === 'hospital_departments' || navigationState === 'doctors') {
        showHospitals();
    } else if (navigationState === 'department_hospitals') {
        showDepartments();
    }
    backBtn.style.display = 'none';
});

async function showHospitals() {
    mainContent.innerHTML = '<p>Loading...</p>';
    backBtn.style.display = 'none';
    navigationState = 'hospitals';

    try {
        const response = await fetch('/api/hospitals/');
        if (!response.ok) throw new Error(`Failed to fetch hospitals: ${response.status}`);
        const hospitals = await response.json();

        mainContent.innerHTML = '';
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
                if (hospital.latitude && hospital.longitude) {
                    showMapPopup(hospital.latitude, hospital.longitude, hospital.name);
                } else {
                    alert('Location data unavailable for this hospital.');
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
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        mainContent.innerHTML = '<p>Error loading hospitals. Please try again later.</p>';
    }
}

function showMapPopup(latitude, longitude, name) {
    const modal = document.getElementById('mapModal');
    const closeBtn = document.querySelector('.close');

    modal.style.display = 'block';

    const map = L.map('popupMap').setView([latitude, longitude], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([latitude, longitude]).addTo(map).bindPopup(name).openPopup();

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

async function showDepartmentsForHospital(hospitalName) {
    mainContent.innerHTML = '<p>Loading...</p>';
    backBtn.style.display = 'block';
    navigationState = 'hospital_departments';

    try {
        const response = await fetch(`/api/hospitals/${hospitalName}/departments/`);
        if (!response.ok) throw new Error(`Failed to fetch departments for ${hospitalName}: ${response.status}`);
        const departments = await response.json();
        
        mainContent.innerHTML = '';
        const headerText = document.createElement('h2');
        headerText.textContent = `Departments at ${hospitalName}`;
        headerText.style.width = '100%';
        headerText.style.textAlign = 'center';
        headerText.style.color = '#1565c0';
        mainContent.appendChild(headerText);

        departments.forEach(department => {
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.textContent = department.name;
            
            departmentDiv.onclick = (event) => {
                event.stopPropagation();
                showDoctors(hospitalName, department.name);
            };
            
            mainContent.appendChild(departmentDiv);
        });
    } catch (error) {
        console.error(`Error fetching departments for ${hospitalName}:`, error);
        mainContent.innerHTML = '<p>Error loading departments. Please try again later.</p>';
    }
}

async function showDepartments() {
    mainContent.innerHTML = '<p>Loading...</p>';
    backBtn.style.display = 'none';
    navigationState = 'departments';

    try {
        const response = await fetch('/api/departments/');
        if (!response.ok) throw new Error(`Failed to fetch departments: ${response.status}`);
        const departments = await response.json();
        
        mainContent.innerHTML = '';
        departments.forEach(department => {
            const departmentDiv = document.createElement('div');
            departmentDiv.className = 'department';
            departmentDiv.textContent = department.name;
            departmentDiv.onclick = () => showHospitalsForDepartment(department.name);
            mainContent.appendChild(departmentDiv);
        });
    } catch (error) {
        console.error('Error fetching departments:', error);
        mainContent.innerHTML = '<p>Error loading departments. Please try again later.</p>';
    }
}

async function showHospitalsForDepartment(departmentName) {
    mainContent.innerHTML = '<p>Loading...</p>';
    backBtn.style.display = 'block';
    navigationState = 'department_hospitals';

    try {
        const response = await fetch(`/api/departments/${departmentName}/hospitals/`);
        if (!response.ok) throw new Error(`Failed to fetch hospitals for ${departmentName}: ${response.status}`);
        const hospitals = await response.json();

        mainContent.innerHTML = '';
        const headerText = document.createElement('h2');
        headerText.textContent = `Hospitals with ${departmentName}`;
        headerText.style.width = '100%';
        headerText.style.textAlign = 'center';
        headerText.style.color = '#1565c0';
        mainContent.appendChild(headerText);

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
                if (hospital.latitude && hospital.longitude) {
                    showMapPopup(hospital.latitude, hospital.longitude, hospital.name);
                } else {
                    alert('Location data unavailable for this hospital.');
                }
            };

            mapIconContainer.appendChild(mapIcon);
            hospitalDiv.appendChild(hospitalName);
            hospitalDiv.appendChild(mapIconContainer);
            
            hospitalDiv.onclick = () => showDoctors(hospital.name, departmentName);
            
            mainContent.appendChild(hospitalDiv);
        });
    } catch (error) {
        console.error(`Error fetching hospitals for ${departmentName}:`, error);
        mainContent.innerHTML = '<p>Error loading hospitals. Please try again later.</p>';
    }
}

async function showDoctors(hospitalName, departmentName) {
    mainContent.innerHTML = '<p>Loading...</p>';
    backBtn.style.display = 'block';
    navigationState = 'doctors';

    try {
        const response = await fetch(`/api/hospitals/${hospitalName}/departments/${departmentName}/doctors/`);
        if (!response.ok) throw new Error(`Failed to fetch doctors for ${hospitalName}, ${departmentName}: ${response.status}`);
        const doctors = await response.json();
        
        mainContent.innerHTML = '';
        const doctorList = document.createElement('div');
        doctorList.className = 'doctor-list';
        
        const headerText = document.createElement('h2');
        headerText.textContent = `${departmentName} Doctors at ${hospitalName}`;
        doctorList.appendChild(headerText);

        doctors.forEach(doctor => {
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
                <button class="book-appointment" onclick="showAppointmentModal('${doctor.name}')">
                    Book Appointment
                </button>
            `;
            
            doctorList.appendChild(doctorCard);
        });

        mainContent.appendChild(doctorList);
    } catch (error) {
        console.error(`Error fetching doctors for ${hospitalName}, ${departmentName}:`, error);
        mainContent.innerHTML = '<p>Error loading doctors. Please try again later.</p>';
    }
}

// Function to get CSRF token from cookies
function getCsrfToken() {
    const name = 'csrftoken';
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [key, value] = cookie.trim().split('=');
        if (key === name) {
            return value;
        }
    }
    return null;
}

async function showAppointmentModal(doctorName) {
    try {
        const response = await fetch(`/api/doctors/?name=${encodeURIComponent(doctorName)}`);
        if (!response.ok) throw new Error(`Failed to fetch details for ${doctorName}: ${response.status}`);
        const doctors = await response.json();
        const doctor = doctors.find(d => d.name === doctorName); // Exact match

        if (!doctor) {
            alert('Doctor not found!');
            return;
        }

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
                <span class="close">×</span>
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
                        In-Person Consultation (₹${doctor.consultation_fee})
                    </button>
                    <button class="consultation-type" data-type="video">
                        Video Consultation (₹${doctor.video_consultation_fee})
                    </button>
                </div>

                <form id="appointment-form" class="appointment-form">
                    <input type="text" name="patient_name" placeholder="Full Name" required>
                    <input type="tel" name="phone" placeholder="Phone Number" required pattern="[0-9]{10}">
                    <input type="email" name="email" placeholder="Email" required>
                    <textarea name="address" placeholder="Address" required></textarea>
                    <button type="submit" class="submit-appointment">Confirm Booking</button>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => modal.remove();

        const timeSlots = modal.querySelectorAll('.time-slot');
        timeSlots.forEach(slot => {
            slot.onclick = (e) => {
                timeSlots.forEach(s => s.classList.remove('selected'));
                e.target.classList.add('selected');
            };
        });

        const consultationTypes = modal.querySelectorAll('.consultation-type');
        consultationTypes.forEach(type => {
            type.onclick = (e) => {
                consultationTypes.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            };
        });

        const form = modal.querySelector('#appointment-form');
        form.onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const selectedTimeSlot = document.querySelector('.time-slot.selected');
            const selectedConsultationType = document.querySelector('.consultation-type.active');

            if (!selectedTimeSlot) {
                alert('Please select a time slot.');
                return;
            }
            if (!selectedConsultationType) {
                alert('Please select a consultation type.');
                return;
            }

            const data = {
                doctor: doctor.id,
                patient_name: formData.get('patient_name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                address: formData.get('address'),
                date: document.getElementById('appointment-date').value,
                time_slot: selectedTimeSlot.textContent,
                consultation_type: selectedConsultationType.dataset.type
            };

            try {
                const response = await fetch('/api/patientappointments/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCsrfToken()
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`Failed to book appointment: ${JSON.stringify(errorData)}`);
                }

                alert('Appointment booked successfully!');
                modal.remove();
            } catch (error) {
                console.error('Booking error:', error);
                alert(`Failed to book appointment: ${error.message}`);
            }
        };
    } catch (error) {
        console.error(`Error in appointment modal for ${doctorName}:`, error);
        alert('Failed to load doctor details. Please try again.');
    }
}

// Initialize the application
showHospitals();