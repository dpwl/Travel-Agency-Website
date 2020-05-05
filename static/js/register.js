// Author:        Yeji Soh
// Date:          03/20/2020
// Course Module: CPRG 210 XM5
// Assignment:    Proj-207 Travel Experts

// Variables
const userID = document.getElementById("userID")
const password = document.getElementById("password")
const pcode = document.querySelector('#pcode')
const name = document.getElementById("name")
const email = document.getElementById('email')
const phone = document.getElementById('phone')
const submit = document.getElementById('submit');
let errmsg_ID = document.getElementById('alert-ID')
let errmsg_PW = document.getElementById('alert-PW')
let errmsg_name = document.getElementById('alert-name')
let errmsg_pc = document.getElementById('alert-pcode')
let errmsg_em = document.getElementById('alert-email')
let errmsg_ph = document.getElementById('alert-phone')

// Patterns for Postal Code, Email, and Phone Number
var patterns = {
    pcode_p : '[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]',
    email_p : '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$',
    phone_p : '[0-9]{3}[0-9]{3}[0-9]{4}',
    ID_p: '^[a-z0-9_-]{3,16}$',
    PW_p: '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,15}$'
}   
const IDp = RegExp(patterns["ID_p"])
const PWp = RegExp(patterns["PW_p"])
const pp = RegExp(patterns["pcode_p"])
const ep = RegExp(patterns["email_p"])
const php = RegExp(patterns["phone_p"])


// Validation on userID
userID.addEventListener('blur', (e) => {
    if (userID.value.length == 0) {
        errmsg_ID.innerHTML = "userID must be provided to be registered."
        errmsg_ID.classList.add('alert-ID')
        userID.classList.remove('active');
        submit.disabled = true;
    } else if (IDp.test(userID.value) == false) {
        errmsg_ID.innerHTML = "Alphanumeric string that may include _ and – having a length of 3 to 16 characters.."
        errmsg_ID.classList.add('alert-ID')
        userID.classList.remove('active');
        submit.disabled = true;
    } else {
        errmsg_ID.innerHTML = ""
        userID.classList.add('active');
        errmsg_ID.classList.remove('alert-ID')
        errmsg_ID.innerHTML = ''
        submit.disabled = false;
    }
})

// Validation on password
password.addEventListener('blur', (e) => {
    if (password.value.length == 0) {
        errmsg_PW.innerHTML = "Password must be provided to be registered."
        errmsg_PW.classList.add('alert-PW')
        password.classList.remove('active');
        submit.disabled = true;
    } else if (PWp.test(password.value) == false) {
        errmsg_PW.innerHTML = "Total 6 - 15 characters including at least one lowercase, one uppercase, one number, and one special character."
        errmsg_PW.classList.add('alert-PW')
        password.classList.remove('active');
        submit.disabled = true;
    } else {
        errmsg_PW.innerHTML = ""
        password.classList.add('active');
        errmsg_PW.classList.remove('alert-PW')
        errmsg_PW.innerHTML = ''
        submit.disabled = false;
    }
})

// Validation on Postal Code
pcode.addEventListener('blur', (e) => {
    if (pcode.value.length == 0) {
        submit.disabled = false;
        pcode.classList.remove('active');
    } else if (pp.test(pcode.value) == false) {
        errmsg_pc.innerHTML = "Invalid postal code format,e.g. T2R 0M8 - blank is MUST."
        errmsg_pc.classList.add('alert-pcode')
        pcode.classList.remove('active');
        submit.disabled = true;
    } else {
        errmsg_pc.innerHTML = ""
        pcode.classList.add('active');
        errmsg_pc.classList.remove('alert-pcode')
        errmsg_pc.innerHTML = ''
        submit.disabled = false;
    }
})

// Validation on Email
email.addEventListener('blur',(ev) => {
    if (email.value.length == 0) {
        errmsg_em.innerHTML = "Email must be provided."
        errmsg_em.classList.add('alert-email')
        email.classList.remove('active');
        submit.disabled = true;
    } else if (ep.test(email.value) == false) {
        errmsg_em.innerHTML = "Invalid email address format, e.g. john.doe@email.com."
        errmsg_em.classList.add('alert-email')
        email.classList.remove('active');
        submit.disabled = true;
    } else {
        errmsg_em.innerHTML = ""
        email.classList.add('active');
        errmsg_em.classList.remove('alert-email');
        errmsg_em.innerHTML = '';
        submit.disabled = false;
    }
})

// Validation on Phone Number
phone.addEventListener('blur', (evt) => {
    if (phone.value.length == 0) {
        errmsg_ph.innerHTML = "Phone Number must be provided."
        errmsg_ph.classList.add('alert-email')
        phone.classList.remove('active');
        submit.disabled = true;
    } else if (php.test(phone.value) == false) {
        errmsg_ph.innerHTML = "Invalid phone number format, e.g. 4031238877, NO special characters."
        errmsg_ph.classList.add('alert-email')
        phone.classList.remove('active');
        submit.disabled = true;
    } else {
        errmsg_ph.innerHTML = ""
        phone.classList.add('active');
        errmsg_ph.classList.remove('alert-email');
        errmsg_ph.innerHTML = '';
        submit.disabled = false;
    }
})

// Validation on Name
name.addEventListener('blur', (e) => {
    if (name.value.length == 0) {
        errmsg_name.innerHTML = "Name must be provided."
        errmsg_name.classList.add('alert-name')
        name.classList.remove('active');
        submit.disabled = true;
    }
    else if (name.value.length !==0 ) {
        name.classList.add('active')
        errmsg_name.innerHTML = ""
    }
})
