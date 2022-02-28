// Global variable 
const emptyErrorMsg = document.getElementById('empty-error');
const wrongMsg = document.getElementById('wrong-value-error');

// spinner function
const toggleSpinner = (displaySpinner) => {
    document.getElementById('spinner').style.display = displaySpinner;
}
const toggleSpinner2 = (spinnerOn, spinnerOff) => {
    document.getElementById('spinner').classList.add(spinnerOn);
    document.getElementById('spinner').classList.remove(spinnerOff);
}

// Load data from Server
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    const cardsDiv = document.getElementById('card-section');
    cardsDiv.textContent = '';

    if(inputFieldValue === ''){
        emptyErrorMsg.style.display = 'block';
        wrongMsg.style.display = 'none';
    }
    else if(isNaN){
        fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`)
        .then(res => res.json())
        .then(data => displayData(data.data))
        emptyErrorMsg.style.display = 'none';
        wrongMsg.style.display = 'none';
        toggleSpinner('block');
        toggleSpinner2('d-flex', 'd-none');
    }
    inputField.value = '';
}

// Display Data in the Card 
const displayData = (phones) => {
    console.log(phones);
    const cardsDiv = document.getElementById('card-section');
    cardsDiv.textContent = '';
    if(phones.length === 0){
        wrongMsg.style.display = 'block';
        emptyErrorMsg.style.display = 'none';
        toggleSpinner('block');
        toggleSpinner2('d-none', 'd-flex');
    }
    else{
        phones?.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 justify-content-center">
                <img src="${phone.image}" class="card-img-top img-fluid img-radius h-auto w-75 mx-auto pt-1" alt="My Image">
                <div class="card-body mx-auto">
                    <h5 class="card-title">Name: ${phone.phone_name}</h5>
                    <p class="card-text">${phone.slug}</p>
                </div>
                <button class="btn btn-primary w-50 mx-auto mb-3 p-2 rounded-pill">More details</button>
            </div>
            `;
            cardsDiv.appendChild(div);
        });
        toggleSpinner('none');
        toggleSpinner2('d-none', 'd-flex');
    }
}