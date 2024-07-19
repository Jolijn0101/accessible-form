document.querySelector('button').addEventListener('click', (event) => {
    // reset alertDiv before using again
    alertDivInActive();
    document.querySelector('.alertDiv').innerHTML = '';

    //collect information from fname,lname,email and message
    document.querySelectorAll('#fname, #lname, #email, #message').forEach((input) => {
        validateInput(input);
    });

    // check if one of the radio buttons is checked
    if (document.querySelector('#general-enquiry').checked === false && document.querySelector('#support-request').checked === false) {
        //show alert for people with sight
        document.querySelector('fieldset').ariaInvalid = 'true';
        //create alert for screen readers
        alertDivActive();
        alertScreenreaders('radio');
    }

    // check if the checkbox is checked
    if (document.querySelector('#checkbox').checked === false) {
        //show alert for people with sight
        document.querySelector('#checkbox').ariaInvalid = 'true';
        //create alert for screen readers
        alertDivActive();
        alertScreenreaders('checkbox');
    }

    // if the form doesn't have errors display the thank you message
    if (document.querySelector('.alertDiv').classList.value.includes('alertDivActive') === false) {
        activateThankYouMss();
    }
});

function alertDivActive() {
    document.querySelector('.alertDiv').classList.add('alertDivActive');
}

function alertDivInActive() {
    document.querySelector('.alertDiv').classList.remove('alertDivActive');
}

function alertScreenreaders(input) {
    const node = document.createElement('p');
    let errorMessage;
    if (typeof input === 'string') {
        errorMessage = document.querySelector(`#error-ms-${input}`).innerHTML;
    } else {
        errorMessage = document.querySelector(`#error-ms-${input.id}`).innerHTML;
    }
    const errorNode = document.createTextNode(errorMessage + ',');
    node.appendChild(errorNode);
    document.querySelector('.alertDiv').appendChild(node);
}

function validateInput(input) {
    // get the name of the current input field
    const nameField = document.querySelector(`label[for='${input.id}']`).innerText.slice(0, -1) + ' field';

    // check if the input field is empty
    if (input.value === '') {
        //show alert for people with sight
        input.ariaInvalid = 'true';
        //create alert for screen readers
        alertDivActive();
        alertScreenreaders(input);
        return;
    }

    //check if the input field has more then three characters
    if (input.value.length < 3) {
        //show alert for people with sight
        input.ariaInvalid = 'true';
        //change error message
        document.querySelector(`#error-ms-${input.id}`).innerHTML = `${nameField} needs to have at least three characters`;
        //create alert for screen readers
        alertDivActive();
        alertScreenreaders(input);
        return;
    }

    //check if the input contains code
    const codeArray = ['<', '>', '{', '}', '[', ']', '#'];
    if (codeArray.some((el) => input.value.includes(el))) {
        //show alert for people with sight
        input.ariaInvalid = 'true';
        //change error message
        document.querySelector(`#error-ms-${input.id}`).innerHTML = `${nameField} must not contain special characters`;
        //create alert for screen readers
        alertDivActive();
        alertScreenreaders(input);
        return;
    }

    //check the email address field
    if (input.id === 'email' && !input.value.includes('@')) {
        //show alert for people with sight
        input.ariaInvalid = 'true';
        //change error message
        document.querySelector(`#error-ms-${input.id}`).innerHTML = `${nameField} must contain a valid email address`;
        //create alert for screen readers
        alertDivActive();
        alertScreenreaders(input);
        return;
    }
}

function activateThankYouMss() {
    // clear the form like it was send
    document.querySelectorAll('input, #message').forEach((input) => {
        input.value = '';
        input.checked = false;
    });
    // show the thank you message for people with sight
    document.querySelector('#success-message').style.display = 'block';
    document.querySelector('#success-message').setAttribute('tabindex', '0');
    document.querySelector('#success-message').focus();
    document.querySelector('#success-message__wrapper').style.transform = 'scale(1)';

    // remove the thank you message after five seconds
    setTimeout(() => {
        document.querySelector('#success-message__wrapper').style.transform = 'scale(0)';
        document.querySelector('.alertDiv').innerHTML = '';
        document.querySelector('#success-message').setAttribute('tabindex', '');
        document.querySelector('#success-message').style.display = 'none';
    }, 8000);
}

