// Countdown Timer JavaScript

let eventDate = new Date('2025-03-22T18:00:00').getTime();
const DEFAULT_EVENT = '2025-03-22T18:00:00';

function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    updateStatus(distance);
}

function updateStatus(distance) {
    const status = document.getElementById('statusDisplay');
    const now = new Date().getTime();
    const eventEndTime = eventDate + (4 * 60 * 60 * 1000); // Event duurt 4 uur

    if (distance <= 0 && now < eventEndTime) {
        status.className = 'status happening';
        status.textContent = '🎉 Event is nu live!';
    } else if (distance <= 0) {
        status.className = 'status ended';
        status.textContent = '✓ Event is voorbij!';
    } else {
        status.className = 'status upcoming';
        status.textContent = '⏰ Event start in...';
    }
}

function updateEventDate() {
    const input = document.getElementById('eventInput').value;
    if (input) {
        eventDate = new Date(input).getTime();
        const date = new Date(input);
        document.getElementById('eventDateDisplay').textContent = 
            date.toLocaleDateString('nl-NL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        updateCountdown();
    }
}

function resetToDefault() {
    eventDate = new Date(DEFAULT_EVENT).getTime();
    document.getElementById('eventInput').value = DEFAULT_EVENT;
    document.getElementById('eventDateDisplay').textContent = '22 Maart 2025 - 18:00';
    updateCountdown();
}

function registerEvent() {
    alert('Bedankt! Je bent ingeschreven voor het event! 🎉\n\nJe ontvangt een bevestigingsemail.');
}

function shareEvent() {
    const text = '🎉 Join me at the Filipijnen Event Countdown! Help us fundraise for children in need. Check it out!';
    if (navigator.share) {
        navigator.share({
            title: 'Filipijnen Event',
            text: text,
            url: window.location.href
        });
    } else {
        alert('Event:\n' + text + '\n\nURL: ' + window.location.href);
    }
}

// Update countdown elke seconde
window.addEventListener('load', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    document.getElementById('eventInput').value = DEFAULT_EVENT;
});
