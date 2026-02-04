// Donatie Tracker JavaScript

const GOAL = 5000;
let currentAmount = localStorage.getItem('donationAmount') ? parseInt(localStorage.getItem('donationAmount')) : 0;

function updateProgressBar() {
    const percentage = Math.min((currentAmount / GOAL) * 100, 100);
    const progressFill = document.getElementById('progressFill');
    progressFill.style.width = percentage + '%';
    progressFill.textContent = Math.round(percentage) + '%';

    document.getElementById('currentAmount').textContent = '€' + currentAmount;
    document.getElementById('percentageDisplay').textContent = Math.round(percentage) + '%';

    updateMilestones();
}

function updateMilestones() {
    const milestones = [
        { id: 'milestone1', amount: 1000 },
        { id: 'milestone2', amount: 2500 },
        { id: 'milestone3', amount: 5000 }
    ];

    milestones.forEach(m => {
        const element = document.getElementById(m.id);
        if (currentAmount >= m.amount) {
            element.classList.add('achieved');
        }
    });
}

function setDonationAmount(amount) {
    document.getElementById('donationAmount').value = amount;
}

function addDonation() {
    const amount = parseInt(document.getElementById('donationAmount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Voer alstublieft een geldig bedrag in');
        return;
    }

    currentAmount += amount;
    localStorage.setItem('donationAmount', currentAmount);
    updateProgressBar();

    document.getElementById('donationAmount').value = '';
    
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Initialiseer bij pagina load
window.addEventListener('load', updateProgressBar);
