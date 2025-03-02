const ctx = document.getElementById('lineChart').getContext('2d');

const datasets = [
    {
        label: 'Dr. Bansal, Cardiologist',
        data: [{ x: 2019, y: 12 }, { x: 2020, y: 20 }, { x: 2021, y: 28 }, { x: 2022, y: 38 }],
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/1.jpeg'
    },
    {
        label: 'Dr. Chatterjee, Neurologist',
        data: [{ x: 2018, y: 8 }, { x: 2019, y: 18 }, { x: 2020, y: 25 }, { x: 2021, y: 33 }, { x: 2022, y: 45 }],
        borderColor: 'blue',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/2.jpeg'
    },
    {
        label: 'Dr. Iyer, Orthopedic',
        data: [{ x: 2018, y: 6 }, { x: 2019, y: 14 }, { x: 2020, y: 22 }, { x: 2021, y: 31 }, { x: 2022, y: 40 }],
        borderColor: 'green',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/3.jpeg'
    },
    {
        label: 'Dr. Agrawal, Dermatologist',
        data: [{ x: 2020, y: 21 }, { x: 2021, y: 29 }, { x: 2022, y: 37 }],
        borderColor: 'orange',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/4.jpeg'
    },
    {
        label: 'Dr. Kulkarni, Oncologist',
        data: [{ x: 2019, y: 13 }, { x: 2020, y: 23 }, { x: 2021, y: 32 }, { x: 2022, y: 42 }],
        borderColor: 'purple',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/5.jpeg'
    }
];

Promise.all(datasets.map(dataset => {
    return new Promise(resolve => {
        const img = new Image();
        img.src = dataset.images;
        img.onload = function () {
            const offscreenCanvas = document.createElement("canvas");
            const offscreenCtx = offscreenCanvas.getContext("2d");

            const imgSize = 25;
            offscreenCanvas.width = imgSize;
            offscreenCanvas.height = imgSize;

            offscreenCtx.drawImage(img, 0, 0, imgSize, imgSize);

            dataset.pointStyle = dataset.data.map((_, index, arr) =>
                index === arr.length - 1 ? offscreenCanvas : false
            );

            dataset.pointRadius = dataset.data.map((_, index, arr) =>
                index === arr.length - 1 ? 6 : 0
            ); 

            resolve();
        };
    });
})).then(() => {
    window.chart = new Chart(ctx, {
        type: 'line',
        data: { datasets: datasets },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom',
                    min: Math.min(...datasets.flatMap(d => d.data.map(p => p.x))) - 1,
                    max: Math.max(...datasets.flatMap(d => d.data.map(p => p.x))) + 1 
                },
                y: {
                    beginAtZero: true,
                    afterDataLimits: (scale) => {
                        scale.max *= 1.01; 
                    }
                }
            },
            plugins: {
                tooltip: {
                    enabled: true,
                    mode: 'nearest',
                    intersect: false,
                    callbacks: {
                        title: function (tooltipItems) {
                            return tooltipItems[0].dataset.label;
                        },
                        label: function () {
                            return '';
                        }
                    }
                }
            },
            interaction: {
                mode: 'nearest',
                intersect: false
            }
        }
    });
});
document.getElementById('lineChart').onclick = function (evt) {
    console.log("Chart clicked!"); 

    const points = window.chart.getElementsAtEventForMode(evt, 'nearest', { intersect: false }, true);
    console.log("Points:", points); 

    if (points.length) {
        const datasetIndex = points[0].datasetIndex;
        const dataset = window.chart.data.datasets[datasetIndex];
        const doctorName = dataset.label.split(',')[0];

        console.log("Doctor selected:", doctorName); 
        showAppointmentModal(doctorName);
    } else {
        console.log("No points detected! Try clicking on the dots."); // Debugging log
    }
};

// Hospital Success Rate Section
const hospitals = [
    { name: "All India General Hospital", successRate: 85 },
    { name: "City Healthcare Center", successRate: 92 },
    { name: "Central Medical Institute", successRate: 88 },
    { name: "Praveer Care Hospital", successRate: 90 }
];

function createProgressCircle(percentage) {
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return `
        <div class="progress-circle">
            <svg width="120" height="120" viewBox="0 0 120 120">
                <circle class="background"
                    cx="60"
                    cy="60"
                    r="${radius}"
                    stroke-width="8"/>
                <circle class="progress"
                    cx="60"
                    cy="60"
                    r="${radius}"
                    stroke-width="8"
                    style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}"/>
            </svg>
            <span class="percentage">${percentage}%</span>
        </div>
    `;
}

function createHospitalCards() {
    const hospitalMains = document.querySelector('.hospital-grid');
    
    hospitals.forEach(hospital => {
        const card = document.createElement('div');
        card.className = 'hospital-card';
        card.innerHTML = `
            <h3>${hospital.name}</h3>
            ${createProgressCircle(hospital.successRate)}
        `;
        hospitalMains.appendChild(card);
    });
}

function initializeSearch() {
    const searchInp = document.getElementById('doctorSearch');
    
    searchInp.addEventListener('input', (e) => {
        const searchTemp = e.target.value.toLowerCase();
        console.log('Searching for:', searchTemp);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createHospitalCards();
    initializeSearch();
});



const departments = [
    { name: "Cardiology" },
    { name: "Neurology" },
    { name: "Pediatrics" },
    { name: "Orthopedics" },
    { name: "Dermatology" }
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


function showAppointmentModal(doctorName) {
    console.log("Showing apointment")
    const doctor = doctors[doctorName];
    console.log(doctor)

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