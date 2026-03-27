const GOAL = 5000;
let currentAmount = 0; // eenvoudige in-memory opslag

function updateProgressBar() {
    const percentage = Math.min((currentAmount / GOAL) * 100, 100);
    const progressFill = document.getElementById('progressFill');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
        progressFill.textContent = Math.round(percentage) + '%';
    }

    const current = document.getElementById('currentAmount');
    if (current) current.textContent = '€' + currentAmount;
}

function setDonationAmount(amount) {
    const input = document.getElementById('donationAmount');
    if (input) input.value = amount;
}

function addDonation() {
    const input = document.getElementById('donationAmount');
    const amount = input ? parseInt(input.value) : NaN;

    if (isNaN(amount) || amount <= 0) {
        alert('Voer alstublieft een geldig bedrag in');
        return;
    }

    currentAmount += amount;
    updateProgressBar();

    if (input) input.value = '';
    alert('Bedankt voor je donatie!');
}

window.addEventListener('load', updateProgressBar);
