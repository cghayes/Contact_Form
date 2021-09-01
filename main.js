const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');


form.addEventListener('submit', e => {
  // Prevent default form action
  e.preventDefault();

  // Call validateForm
  validateForm();
});

function validateForm() {
  // Get values from inputs
  // Use trim to remove extraneous spaces the user might enter
  const nameValue = name.value.trim();
  const emailValue = email.value.trim();
  const phoneValue = phone.value.trim();
  const messageValue = message.value.trim();

  // Set flag to true
  var valid = true;

  // Check input values
  if(nameValue === '') {
    // Add error class if empty
    errorResult(name)
    valid = false;
  } else {
    // Add success class if filled
    successResult(name)
  }

  if(emailValue === '') {
    errorResult(email)
    valid = false;
  } else if(!isEmail(emailValue)) { // Validate email format
    errorResult(email)
  } else {
    successResult(email)
  }

  if(phoneValue === '') {
    errorResult(phone)
    valid = false;
  } else if(!isPhone(phoneValue)) { // Validate phone number format
    errorResult(phone)
    valid = false;
  } else if (phoneValue.length < 10 || phoneValue.length > 18) { // Validate phone number length
    errorResult(phone)
    valid = false;
  } else {
    successResult(phone)
  }

  if(messageValue === '') {
    errorResult(message)
    valid = false;
  } else {
    successResult(message)
  }

  // If problems exist
  // Display error message
  if(!valid) {
    console.log('failed validation');
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
  }

  // If no problems
  // Display success message
  if(valid) {
    console.log('success');
    successMessage.style.display = 'block';
    errorMessage.style.display = 'none';
  }
}

function errorResult(input) {
  const formField = input.parentElement;

  // Add error class
  formField.classList.add('error');
}

function successResult(input) {
  const formField = input.parentElement;

  // Add success class
  formField.classList.remove('error'); // Remove error class if previously added
  formField.classList.add('success');
}

function isPhone(phone) {
  // Regex from StrackOverflow https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
	return /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g.test(phone);
}

function isEmail(email) {
  // Regex from StrackOverflow https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
	return /\S+@\S+\.\S+/.test(email);
}
