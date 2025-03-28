function login() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    if (email === '' || password === '') {
        alert('Please enter email and password');
        return;
    }
    alert('Logging in with Email: ' + email);
}
function googleLogin() {
    alert('Logging in with Google');
}
function appleLogin() {
    alert('Logging in with Apple');
}
