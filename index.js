const current_time = document.getElementById('current-time');
const current_date = document.getElementById('current-date');

function formatNow() {
const now = new Date();
const hours = now.getHours() % 12 || 12;
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');
const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
const ampm = now.getHours() >= 12 ? 'pm' : 'am';


const time = `${hours}:${minutes}:${seconds}:${milliseconds} ${ampm}`;
const date = now.toLocaleDateString(undefined, {
year: 'numeric',
month: 'short',
day: 'numeric'
});

if (current_time && current_date) {
current_time.textContent = time;
current_date.textContent = date;
}
}

formatNow();
setInterval(formatNow, 50);

const form = document.getElementById('contactForm');
const fname = document.getElementById('fname');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const successMessage = document.getElementById('successMessage');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateInputs(field, errorId, isValid) {
    const error = document.getElementById(errorId);
    if (!isValid) {
        field.classList.add('error');
        field.classList.remove('success');
        error.classList.add('show');
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        error.classList.remove('show');
        return true;
    }
}

fname.addEventListener('blur', () => validateInputs(fname, 'fname-error', fname.value.trim().length >= 2));
fname.addEventListener('input', () => {
    if (fname.classList.contains('error')) {
        validateInputs(fname, 'fname-error', fname.value.trim().length >= 2);
    }
});

email.addEventListener('blur', () => validateInputs(email, 'email-error', emailRegex.test(email.value.trim())));
email.addEventListener('input', () => {
    if (email.classList.contains('error')) {
        validateInputs(email, 'email-error', emailRegex.test(email.value.trim()));
    }
});

subject.addEventListener('blur', () => validateInputs(subject, 'subject-error', subject.value.trim().length >= 3));
subject.addEventListener('input', () => {
    if (subject.classList.contains('error')) {
        validateInputs(subject, 'subject-error', subject.value.trim().length >= 3);
    }
});

message.addEventListener('blur', () => validateInputs(message, 'message-error', message.value.trim().length >= 10));
message.addEventListener('input', () => {
    if (message.classList.contains('error')) {
        validateInputs(message, 'message-error', message.value.trim().length >= 10);
    }
});


form.addEventListener('submit', function(e) {
    e.preventDefault();
    const isFnameValid = validateInputs(fname, 'fname-error', fname.value.trim().length >= 2);
    const isEmailValid = validateInputs(email, 'email-error', emailRegex.test(email.value.trim()));
    const isSubjectValid = validateInputs(subject, 'subject-error', subject.value.trim().length >= 3);
    const isMessageValid = validateInputs(message, 'message-error', message.value.trim().length >= 10);

    if (isFnameValid && isEmailValid && isSubjectValid && isMessageValid) {
        successMessage.classList.add('show');
        setTimeout(() => {
            form.reset();
            [fname, email, subject, message].forEach(field => {
                field.classList.remove('success', 'error');
            });
            successMessage.classList.remove('show');
        }, 3000);
    } 
});