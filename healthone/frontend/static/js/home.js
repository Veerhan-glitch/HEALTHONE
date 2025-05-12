const ctx = document.getElementById('lineChart').getContext('2d');

async function fetchData() {
    try {
        const [hospitalsResponse, performanceResponse, doctorsResponse] = await Promise.all([
            fetch('/api/hospitals/'),
            fetch('/api/doctor-performance/'),
            fetch('/api/doctors/')
        ]);

        const hospitals = await hospitalsResponse.json();
        const datasets = await performanceResponse.json();
        const doctors = await doctorsResponse.json();

        // Process datasets for Chart.js
        const processedDatasets = datasets.map(dataset => ({
            label: dataset.label,
            data: dataset.data,
            borderColor: getRandomColor(),
            borderWidth: 2,
            pointRadius: dataset.data.map((_, index, arr) => index === arr.length - 1 ? 6 : 0),
            pointStyle: dataset.data.map((_, index, arr) => {
                if (index === arr.length - 1) {
                    const img = new Image();
                    img.src = dataset.photo;
                    return img;
                }
                return false;
            })
        }));

        // Initialize Chart
        window.chart = new Chart(ctx, {
            type: 'line',
            data: { datasets: processedDatasets },
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

        // Chart click handler
        document.getElementById('lineChart').onclick = function (evt) {
            const points = window.chart.getElementsAtEventForMode(evt, 'nearest', { intersect: false }, true);
            if (points.length) {
                const datasetIndex = points[0].datasetIndex;
                const dataset = window.chart.data.datasets[datasetIndex];
                const doctorName = dataset.label.split(',')[0]; // e.g., "Dr. Balbir Singh Agrawal"
                showAppointmentModal(doctorName);
            }
        };

        // Hospital Success Rate Section
        function createProgressCircle(percentage) {
            const radius = 54;
            const circumference = 2 * Math.PI * radius;
            const offset = circumference - (percentage / 100) * circumference;

            return `
                <div class="progress-circle">
                    <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle class="background" cx="60" cy="60" r="${radius}" stroke-width="8"/>
                        <circle class="progress" cx="60" cy="60" r="${radius}" stroke-width="8" style="stroke-dasharray: ${circumference}; stroke-dashoffset: ${offset}"/>
                    </svg>
                    <span class="percentage">${percentage}%</span>
                </div>
            `;
        }

        function createHospitalCards() {
            const hospitalMains = document.querySelector('.hospital-grid');
            hospitalMains.innerHTML = '';
            hospitals.forEach(hospital => {
                const card = document.createElement('div');
                card.className = 'hospital-card';
                card.innerHTML = `
                    <h3>${hospital.name}</h3>
                    ${createProgressCircle(hospital.success_rate)}
                `;
                hospitalMains.appendChild(card);
            });
        }

        // Search Functionality
        function initializeSearch() {
            const searchInp = document.getElementById('doctorSearch');
            searchInp.addEventListener('input', async (e) => {
                const searchTerm = e.target.value.toLowerCase();
                if (searchTerm) {
                    const response = await fetch(`/api/doctors/?name=${encodeURIComponent(searchTerm)}`);
                    const filteredDoctors = await response.json();
                    console.log('Filtered doctors:', filteredDoctors);
                    // Add logic to display search results if needed
                }
            });
        }

        // Appointment Modal
        async function showAppointmentModal(doctorName) {
            try {
                const response = await fetch(`/api/doctors/?name=${encodeURIComponent(doctorName)}`);
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
                            <input type="text" placeholder="Full Name" required>
                            <input type="tel" placeholder="Phone Number" required pattern="[0-9]{10}">
                            <input type="email" placeholder="Email" required>
                            <textarea placeholder="Address" required></textarea>
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
                form.onsubmit = (e) => {
                    e.preventDefault();
                    alert('Appointment booked successfully!');
                    modal.remove();
                };
            } catch (error) {
                console.error('Error fetching doctor details:', error);
                alert('Failed to load doctor details.');
            }
        }

        // Helper function for random colors
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            createHospitalCards();
            initializeSearch();
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();