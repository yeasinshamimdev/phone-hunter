// Global variable 
const emptyErrorMsg = document.getElementById('empty-error');
const wrongMsg = document.getElementById('wrong-value-error');

// Load data from Server
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;

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
    }
}