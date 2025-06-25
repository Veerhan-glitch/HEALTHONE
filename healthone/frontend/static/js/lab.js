function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
const csrftoken = getCookie('csrftoken');

// Element references and global variables
const testsList = document.getElementById('testsList');
const searchInput = document.getElementById('searchTests');
const searchBtn = document.getElementById('searchBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const testModal = document.getElementById('testModal');
const locationModal = document.getElementById('locationModal');
const appointmentModal = document.getElementById('appointmentModal');
const findLabBtn = document.getElementById('findLabBtn');
let selectedTest = null;
let allTests = [];

// Fetch tests from the API and display them
async function fetchTests() {
  try {
    const response = await fetch('/api/tests/');
    const data = await response.json();
    allTests = data;
    displayTests(allTests);
  } catch (error) {
    console.error('Error fetching tests:', error);
  }
}

// Display tests in the tests list; each card includes two buttons:
// one to view details and one to directly book an appointment.
function displayTests(tests) {
  testsList.innerHTML = '';
  if (tests.length === 0) {
    testsList.innerHTML = '<p>No tests found.</p>';
    return;
  }
  tests.forEach(test => {
    const div = document.createElement('div');
    div.classList.add('test-card');
    // Wrap test.id in quotes so it's passed as a string literal
    div.innerHTML = `
      <h3>${test.name}</h3>
      <p>${test.description}</p>
      <button onclick="viewTestDetails('${test.id}')">View Details</button>
      <button onclick="bookTestAppointment('${test.id}')">Book Appointment</button>
    `;
    testsList.appendChild(div);
  });
}

// Search button event handler
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.toLowerCase();
  const filtered = allTests.filter(test => test.name.toLowerCase().includes(query));
  displayTests(filtered);
});

// Category filter buttons event handler
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelector('.category-btn.active').classList.remove('active');
    btn.classList.add('active');
    const category = btn.dataset.category;
    if (category === 'all') {
      displayTests(allTests);
    } else {
      const filtered = allTests.filter(test => test.category.toLowerCase() === category);
      displayTests(filtered);
    }
  });
});

// Retrieve a test's details from the locally cached list and show in the test modal
function viewTestDetails(id) {
  const test = allTests.find(t => t.id === id);
  if (!test) {
    alert("Test not found.");
    return;
  }
  selectedTest = test;
  const details = document.getElementById('testDetails');
  details.innerHTML = `
    <h2>${test.name}</h2>
    <div class="test-details">
      <h3>Overview</h3>
      <p>${test.overview || test.description}</p>
      <h3>Purpose</h3>
      <p>${test.purpose || 'N/A'}</p>
      <h3>Procedure</h3>
      <p>${test.procedure || 'N/A'}</p>
      <h3>Side Effects</h3>
      <p>${test.side_effects || 'N/A'}</p>
      <h3>Results</h3>
      <p>${test.results || 'N/A'}</p>
      <div class="test-meta">
        <p><strong>Preparation Required:</strong> ${test.preparation_required === "True" ? 'Yes' : 'No'}</p>
        <p><strong>Turnaround Time:</strong> ${test.turnaround_time || 'N/A'}</p>
        <p><strong>Price:</strong> ₹${test.price}</p>
      </div>
    </div>
    <button onclick="openAppointmentModal()">Book Appointment</button>
  `;
  testModal.style.display = 'flex';
}

// Retrieve a test from the locally cached list and directly open the appointment modal
function bookTestAppointment(id) {
  const test = allTests.find(t => t.id === id);
  if (!test) {
    alert("Test not found.");
    return;
  }
  selectedTest = test;
  openAppointmentModal();
}

// Close modals when clicking any element with the class 'close'
document.querySelectorAll('.close').forEach(span => {
  span.onclick = () => {
    testModal.style.display = 'none';
    locationModal.style.display = 'none';
    appointmentModal.style.display = 'none';
  };
});



// Open the appointment modal and populate it with the selected test details
function openAppointmentModal() {
  // Set minimum date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('appointmentDate').min = today;
  
  document.getElementById('selectedTestDetails').innerHTML = `
    <h4>${selectedTest.name}</h4>
    <p>${selectedTest.description}</p>
    <p>Price: ₹${selectedTest.price}</p>
  `;
  // Reset any previously selected time slot
  appointmentModal.style.display = 'block';
  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
      slot.addEventListener('click', () => {
          timeSlots.forEach(s => s.classList.remove('selected'));
          slot.classList.add('selected');
      });
  });
}
function convertTo24Hour(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours.padStart(2, '0')}:${minutes}:00`;
}

document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const selectedTimeElem = document.querySelector('.time-slot.active');
    const time12 = selectedTimeElem.innerText.trim();  // "06:00 PM"
    const time24 = convertTo24Hour(time12);            // "18:00:00"

    if (!selectedTimeElem) {
        alert('Please select a time slot');
        return;
    }

    const appointmentData = {
        test: selectedTest.id,
        appointment_date: document.getElementById('appointmentDate').value,
        appointment_time: time24,
        full_name: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
    };

    try {
        const response = await fetch('/api/appointments/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(appointmentData)
        });

        if (response.ok) {
            alert('Appointment booked successfully!');
            appointmentModal.style.display = 'none';
            document.getElementById('appointmentForm').reset();
            document.querySelectorAll('.time-slot').forEach(slot => slot.classList.remove('active'));
        } else {
            const errorData = await response.json();
            alert('Failed to book appointment: ' + (errorData.detail || 'Unknown error'));
        }
    } catch (error) {
        console.error('Error booking appointment:', error);
        alert('An error occurred while booking the appointment.');
    }
});

// Time slot selection handler
document.querySelectorAll('.time-slot').forEach(slot => {
    slot.addEventListener('click', () => {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
    });
});


// "Find Labs" button event: Show location modal and initialize the map
findLabBtn.addEventListener('click', () => {
  locationModal.style.display = 'flex';
  initMap();
});

// Initialize the Leaflet map with lab locations
function initMap() {
  const map = L.map('map').setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
  
  const labs = [
    { name: 'Apollo Lab', lat: 28.6139, lng: 77.2090 },
    { name: 'Dr Lal Path Lab', lat: 19.0760, lng: 72.8777 },
    { name: 'SRL Lab', lat: 13.0827, lng: 80.2707 }
  ];
  
  labs.forEach(lab => {
    L.marker([lab.lat, lab.lng])
      .addTo(map)
      .bindPopup(`<b>${lab.name}</b>`);
  });
}

// Load tests when the page is ready
fetchTests();
