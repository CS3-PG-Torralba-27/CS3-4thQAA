const wrapper = document.querySelector('.wrapper');
const registerLink = document.querySelector('.register-link');
const loginLink = document.querySelector('.login-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');
const loginForm = document.querySelector('.form-box.login form');
const registerForm = document.querySelector('.form-box.register form');

function saveAccount(username, email, password) {
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];
    const newAccount = { username, email, password };
    accounts.push(newAccount);
    localStorage.setItem('accounts', JSON.stringify(accounts));
}

function getAccounts() {
    return JSON.parse(localStorage.getItem('accounts')) || [];
}

function isValidLogin(email, password) {
    const accounts = getAccounts();
    return accounts.some(account => account.email === email && account.password === password);
}

function loginWithGoogle() {
    gapi.auth2.getAuthInstance().signIn().then(user => {
        const profile = user.getBasicProfile();
        const email = profile.getEmail();
        const name = profile.getName();
    });
}

function loginWithFacebook() {
    FB.login(response => {
        if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            FB.api('/me', { fields: 'email,name' }, userInfo => {
                const email = userInfo.email;
                const name = userInfo.name;
            });
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, { scope: 'email' });
}

registerLink.onclick = () => {
    wrapper.classList.add('active');
};

loginLink.onclick = () => {
    wrapper.classList.remove('active');
};

btnPopup.onclick = () => {
    wrapper.classList.add('active-popup');
};

iconClose.onclick = () => {
    wrapper.classList.remove('active-popup');
    wrapper.classList.remove('active');
};

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = registerForm.querySelector('input[type="text"]').value;
    const email = registerForm.querySelector('input[type="email"]').value;
    const password = registerForm.querySelector('input[type="password"]').value;
    saveAccount(username, email, password);
    registerForm.reset();
    alert('Account registered successfully!');
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value;
    const password = loginForm.querySelector('input[type="password"]').value;
    if (isValidLogin(email, password)) {
        alert('Login successful!');
        loginForm.reset();
        
    } else {
        alert('Invalid email or password. Please try again.');
    }
});

document.querySelector('.login-google-btn').addEventListener('click', loginWithGoogle);
document.querySelector('.login-facebook-btn').addEventListener('click', loginWithFacebook);