const ctx = document.getElementById('lineChart').getContext('2d');

const datasets = [
    {
        label: 'Dr. Smith, Cardiologist',
        data: [{ x: 2019, y: 12 }, { x: 2020, y: 20 }, { x: 2021, y: 28 }, { x: 2022, y: 38 }],
        borderColor: 'red',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/1.jpeg'
    },
    {
        label: 'Dr. Johnson, Neurologist',
        data: [{ x: 2018, y: 8 }, { x: 2019, y: 18 }, { x: 2020, y: 25 }, { x: 2021, y: 33 }, { x: 2022, y: 45 }],
        borderColor: 'blue',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/2.jpeg'
    },
    {
        label: 'Dr. Lee, Orthopedic',
        data: [{ x: 2018, y: 6 }, { x: 2019, y: 14 }, { x: 2020, y: 22 }, { x: 2021, y: 31 }, { x: 2022, y: 40 }],
        borderColor: 'green',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/3.jpeg'
    },
    {
        label: 'Dr. Brown, Dermatologist',
        data: [{ x: 2020, y: 21 }, { x: 2021, y: 29 }, { x: 2022, y: 37 }],
        borderColor: 'orange',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/4.jpeg'
    },
    {
        label: 'Dr. Williams, Oncologist',
        data: [{ x: 2019, y: 13 }, { x: 2020, y: 23 }, { x: 2021, y: 32 }, { x: 2022, y: 42 }],
        borderColor: 'purple',
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 0,
        images: '../static/image/5.jpeg'
    }
];

// Load images BEFORE chart renders
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
    console.log("Chart clicked!"); // Debugging log

    const points = window.chart.getElementsAtEventForMode(evt, 'nearest', { intersect: false }, true);
    console.log("Points:", points); // Log what is detected

    if (points.length) {
        const datasetIndex = points[0].datasetIndex;
        const dataset = window.chart.data.datasets[datasetIndex];
        const doctorName = dataset.label.split(',')[0];

        console.log("Doctor selected:", doctorName); // Debugging log
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





