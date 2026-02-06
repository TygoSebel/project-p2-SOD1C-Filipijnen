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

    const setIf = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    setIf('days', String(days));
    setIf('hours', String(hours));
    setIf('minutes', String(minutes));
    setIf('seconds', String(seconds));

    updateStatus(distance);
}

function updateStatus(distance) {
    const status = document.getElementById('statusDisplay');
    if (!status) return;
    const now = new Date().getTime();
    const eventEndTime = eventDate + (4 * 60 * 60 * 1000);

    if (distance <= 0 && now < eventEndTime) {
        status.textContent = 'Event is nu live';
    } else if (distance <= 0) {
        status.textContent = 'Event is voorbij';
    } else {
        status.textContent = 'Event start binnenkort';
    }
}

function updateEventDate() {
    const inputEl = document.getElementById('eventInput');
    if (!inputEl) return;
    const input = inputEl.value;
    if (input) {
        eventDate = new Date(input).getTime();
        const date = new Date(input);
        const disp = document.getElementById('eventDateDisplay');
        if (disp) disp.textContent = date.toLocaleString();
        updateCountdown();
    }
}

function resetToDefault() {
    eventDate = new Date(DEFAULT_EVENT).getTime();
    const input = document.getElementById('eventInput');
    if (input) input.value = DEFAULT_EVENT;
    const disp = document.getElementById('eventDateDisplay');
    if (disp) disp.textContent = '22-03-2025 18:00';
    updateCountdown();
}

function registerEvent() {
    alert('Bedankt! Je staat nu op de lijst.');
}

window.addEventListener('load', () => {
    updateCountdown();
    setInterval(updateCountdown, 1000);
    const input = document.getElementById('eventInput'); if (input) input.value = DEFAULT_EVENT;
});
