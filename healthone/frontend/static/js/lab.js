
const sampleData = [
    {
        id: 'cbc',
        name: 'Complete Blood Count (CBC)',
        category: 'blood',
        price: 500,
        description: 'Comprehensive blood test that measures various components of your blood',
        overview: 'A CBC test is one of the most common blood tests that evaluates your overall health.',
        purpose: 'To screen for various disorders and conditions that affect blood cells.',
        procedure: 'A healthcare provider draws blood from a vein in your arm using a small needle.',
        sideEffects: 'Minimal risks including slight pain or bruising at the injection site.',
        results: 'Provides information about red blood cells, white blood cells, and platelets.',
        preparationRequired: true,
        turnaroundTime: '24 hours'
    },

    {
        id: 'lipid',
        name: 'Lipid Profile',
        category: 'blood',
        price: 700,
        description: 'Measures the amount of cholesterol and fats in your blood',
        overview: 'A lipid profile is a blood test that measures your cholesterol levels.',
        purpose: 'To assess your risk of developing cardiovascular diseases.',
        procedure: 'A blood sample is drawn from a vein in your arm using a small needle.',
        sideEffects: 'Minimal risks from blood draw.',
        results: 'Provides information about total cholesterol, HDL, LDL, and triglycerides.',
        preparationRequired: true,
        turnaroundTime: '24 hours'

    },
    {
        id: 'diabetes',
        name: 'Diabetes Screening',
        category: 'diabetes',
        price: 800,
        description: 'Comprehensive screening for diabetes and pre-diabetes',
        overview: 'Tests blood glucose levels and other markers related to diabetes.',
        purpose: 'To diagnose diabetes or monitor blood sugar control.',
        procedure: 'Blood sample taken after fasting for 8-12 hours.',
        sideEffects: 'Minimal risks from blood draw.',
        results: 'Indicates blood sugar levels and risk of diabetes.',
        preparationRequired: true,
        turnaroundTime: '24-48 hours'
    },
    {
        id: 'thyroid',
        name: 'Thyroid Function Test',
        category: 'hormones',
        price: 600,
        description: 'Measures thyroid hormone levels in your blood',
        overview: 'A thyroid function test evaluates the health of your thyroid gland.',
        purpose: 'To diagnose thyroid disorders or monitor thyroid function.',
        procedure: 'Blood sample taken at any time of the day.',
        sideEffects: 'Minimal risks from blood draw.',
        results: 'Indicates levels of T3, T4, and TSH hormones.',
        preparationRequired: false,
        turnaroundTime: '24 hours'
    },

    {
        id: 'liver',
        name: 'Liver Function Test',
        category: 'liver',
        price: 600,
        description: 'Measures various enzymes and proteins in your blood',
        overview: 'A liver function test evaluates how well your liver is functioning.',
        purpose: 'To diagnose liver diseases or monitor liver health.',
        procedure: 'Blood sample taken at any time of the day.',
        sideEffects: 'Minimal risks from blood draw.',
        results: 'Provides information about liver enzymes and proteins.',
        preparationRequired: false,
        turnaroundTime: '24 hours'
    },

    {
        id: 'vitamin',
        name: 'Vitamin D Test',
        category: 'vitamins',
        price: 400,
        description: 'Measures the level of vitamin D in your blood',
        overview: 'A vitamin D test evaluates your body\'s vitamin D levels.',
        purpose: 'To diagnose vitamin D deficiency or monitor vitamin D levels.',
        procedure: 'Blood sample taken at any time of the day.',
        sideEffects: 'Minimal risks from blood draw.',
        results: 'Indicates levels of vitamin D in your blood.',
        preparationRequired: false,
        turnaroundTime: '24 hours'
    },
    
    {
        id: 'covid',
        name: 'COVID-19 Antibody Test',
        category: 'covid',
        price: 1000,
        description: 'Detects antibodies in your blood to determine past COVID-19 infection',
        overview: 'A COVID-19 antibody test checks for antibodies produced in response to the virus.',
        purpose: 'To determine if you have been previously infected with COVID-19.',
        procedure: 'Blood sample taken at least 2 weeks after exposure to the virus.',
        sideEffects: 'Minimal risks from blood draw.',
        results: 'Indicates presence of antibodies against the virus.',
        preparationRequired: false,
        turnaroundTime: '24-48 hours'
    },

    {
        id: 'allergy',
        name: 'Allergy Testing',
        category: 'allergy',
        price: 1200,
        description: 'Identifies allergens that cause allergic reactions in your body',
        overview: 'Allergy testing helps identify substances that trigger allergic reactions.',
        purpose: 'To diagnose allergies and develop a treatment plan.',
        procedure: 'Blood sample or skin prick test to check for allergic reactions.',
        sideEffects: 'Minimal risks from blood draw or skin test.',
        results: 'Identifies allergens that cause allergic reactions.',
        preparationRequired: false,
        turnaroundTime: '24-48 hours'
    }
];


const labs = [
    {
        id: 1,
        name: 'Central Lab',
        address: 'Main Street, City Center',
        latitude: 28.6139,
        longitude: 77.2090
    },
    {
        id: 2,
        name: 'North Branch',
        address: 'North Avenue, Suburb Area',
        latitude: 28.7041,
        longitude: 77.1025
    }
];


let map = null;


const searchInp = document.getElementById('searchTests');
const boxTestLists = document.getElementById('testsList');
const categoryBut = document.querySelectorAll('.category-btn');
const labBut = document.getElementById('findLabBtn');
const locationTrack = document.getElementById('locationTrack');
const testReportTrack = document.getElementById('testModal');
const appointmentModal = document.getElementById('appointmentModal');

document.addEventListener('DOMContentLoaded', () => {
    displayTests('all');
    initializeMap();
});

searchInp.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    filterTests(searchTerm);
});

categoryBut.forEach(button => {
    button.addEventListener('click', () => {
        categoryBut.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        displayTests(button.dataset.category);
    });
});

labBut.addEventListener('click', () => {
    locationTrack.style.display = 'block';
    if (map) {
        map.invalidateSize();
    }
});


document.querySelectorAll('.close').forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        testReportTrack.style.display = 'none';
        locationTrack.style.display = 'none';
        appointmentModal.style.display = 'none';
    });
});

window.addEventListener('click', (event) => {
    if (event.target === testReportTrack || event.target === locationTrack || event.target === appointmentModal) {
        testReportTrack.style.display = 'none';
        locationTrack.style.display = 'none';
        appointmentModal.style.display = 'none';
    }
});


function displayTests(category) {
    boxTestLists.innerHTML = '';
    const filteredTests = category === 'all' 
        ? sampleData 
        : sampleData.filter(test => test.category === category);

    filteredTests.forEach(test => {
        const testCard = cardTestC(test);
        boxTestLists.appendChild(testCard);
    });
}

function cardTestC(test) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'test-card';
    cardDiv.innerHTML = `
        <h3>${test.name}</h3>
        <p>${test.description}</p>
        <p class="price">₹${test.price}</p>
        <button onclick="showTestDetails('${test.id}')">View Details</button>
        <button onclick="showAppointmentModal('${test.id}')">Book Appointment</button>
    `;
    return cardDiv;
}

function showTestDetails(testId) {
    const test = sampleData.find(t => t.id === testId);
    if (!test) return;

    const detailsDiv = document.getElementById('testDetails');
    detailsDiv.innerHTML = `
        <h2>${test.name}</h2>
        <div class="test-details">
            <h3>Overview</h3>
            <p>${test.overview}</p>
            
            <h3>Purpose</h3>
            <p>${test.purpose}</p>
            
            <h3>How is it performed?</h3>
            <p>${test.procedure}</p>
            
            <h3>Side Effects</h3>
            <p>${test.sideEffects}</p>
            
            <h3>What the results may indicate?</h3>
            <p>${test.results}</p>
            
            <div class="test-meta">
                <p><strong>Preparation Required:</strong> ${test.preparationRequired ? 'Yes' : 'No'}</p>
                <p><strong>Turnaround Time:</strong> ${test.turnaroundTime}</p>
                <p><strong>Price:</strong> ₹${test.price}</p>
            </div>
        </div>
    `;
    
    testReportTrack.style.display = 'block';
}

function showAppointmentModal(testId) {
    const test = sampleData.find(t => t.id === testId);
    if (!test) return;

    

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('appointmentDate').min = today;
    const summaryDiv = document.getElementById('selectedTestDetails');
    summaryDiv.innerHTML = `
        <h4>${test.name}</h4>
        <p>${test.description}</p>
        <p class="price">Price: ₹${test.price}</p>
        <p>Turnaround Time: ${test.turnaroundTime}</p>
    `;

    appointmentModal.style.display = 'block';
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            timeSlots.forEach(s => s.classList.remove('selected'));
            slot.classList.add('selected');
        });
    });
    const form = document.getElementById('appointmentForm');
    form.onsubmit = (event) => {
        event.preventDefault();
        
        const selectedTime = document.querySelector('.time-slot.selected');
        if (!selectedTime) {
            alert('Please select a time slot');
            return;
        }

        const appointmentDetails = {
            testId: test.id,
            testName: test.name,
            date: document.getElementById('appointmentDate').value,
            time: selectedTime.textContent,
            name: document.getElementById('fullName').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value
        };

        console.log('Appointment Details:', appointmentDetails);
        
        alert('Appointment booked successfully!');
        appointmentModal.style.display = 'none';
        form.reset();
    };
}

function filterTests(searchTerm) {
    const filteredTests = sampleData.filter(test => 
        test.name.toLowerCase().includes(searchTerm) ||
        test.description.toLowerCase().includes(searchTerm)
    );
    
    boxTestLists.innerHTML = '';
    filteredTests.forEach(test => {
        const testCard = cardTestC(test);
        boxTestLists.appendChild(testCard);
    });
}

function initializeMap() {
    map = L.map('map').setView([28.6139, 77.2090], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);

    labs.forEach(lab => {
        L.marker([lab.latitude, lab.longitude])
            .bindPopup(`<b>${lab.name}</b><br>${lab.address}`)
            .addTo(map);
    });

    displayLabsList();
}

function displayLabsList() {
    const labsList = document.getElementById('labsList');
    labsList.innerHTML = '';
    
    labs.forEach(lab => {
        const labDiv = document.createElement('div');
        labDiv.className = 'lab-item';
        labDiv.innerHTML = `
            <h3>${lab.name}</h3>
            <p>${lab.address}</p>
        `;
        labsList.appendChild(labDiv);
    });
}

displayTests('all');