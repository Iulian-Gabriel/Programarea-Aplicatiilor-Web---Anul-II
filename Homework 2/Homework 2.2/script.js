const username = document.getElementById('name');
const password = document.getElementById('password');
const form = document.getElementById('form');
const cPassword = document.getElementById('cPassword');
const email = document.getElementById('email');
const errorElement = document.getElementById('error');

var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
form.addEventListener('submit', (e) => {
    let messages = [];
    if (username.value === '' || username.value == null){
        messages.push('Name is required')
    }

    if (password.value === '' || password.value == null){
        messages.push('Password is required')
    }

    if (cPassword.value === '' || cPassword.value == null){
        messages.push('Confirm Password is required')
    }

    if (email.value === '' || email.value == null){
        messages.push('Email is required')
    }

    if (password.value.length <= 5){
        messages.push('Password must be longer than 5')
    }

    if (password.value.length > 20){
        messages.push('Password must be shorter than 20')
    }

    if (cPassword.value.length <= 5){
        messages.push('Confirm Password must be longer than 5')
    }

    if (cPassword.value.length > 20){
        messages.push('Confirm Password must be longer than 5')
    }

    if(password.value !== cPassword.value){
        messages.push('Passwords must match')
    }

    if(username.value == password.value){
        messages.push('Name and Password can not be the same')
    }

    if (password.value ==='password'){
        messages.push ('Password cant be password')
    }
    
    if (!/\d/.test(password.value)){
        messages.push('Password must contain a number')
    }
    
    if (!/[A-Z]/.test(password.value)){
        messages.push('Password must contain a capital letter')
    }

    if (!emailRegex.test(email.value)){
        messages.push('Please enter a valid email address')
    }

    if (messages.length > 0){
        e.preventDefault();
        errorElement.innerText = messages.join(', ');
        return false;
    }
    return true;
});