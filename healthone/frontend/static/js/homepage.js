
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