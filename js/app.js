// Global variable 
const emptyErrorMsg = document.getElementById('empty-error');
const wrongMsg = document.getElementById('wrong-value-error');

// spinner function
const toggleSpinner = (displaySpinner) => {
    document.getElementById('spinner').style.display = displaySpinner;
}
const toggleSpinner2 = (addClass, removeClass) => {
    document.getElementById('spinner').classList.add(addClass);
    document.getElementById('spinner').classList.remove(removeClass);
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
    const cardsDiv = document.getElementById('card-section');
    cardsDiv.textContent = '';
    if(phones.length === 0){
        wrongMsg.style.display = 'block';
        emptyErrorMsg.style.display = 'none';
        toggleSpinner('block');
        toggleSpinner2('d-none', 'd-flex');
    }
    else{
        phones.slice(0, 20)?.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 justify-content-center">
                <img src="${phone.image}" class="card-img-top img-fluid img-radius h-auto w-75 mx-auto pt-1" alt="My Image">
                <div class="card-body mx-auto text-dark">
                    <h4 class="card-title">Name: ${phone.phone_name}</h4>
                    <p class="card-text">Brand: ${phone.brand}</p>
                </div>
                <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary w-50 mx-auto mb-3 p-2 rounded-pill" data-bs-toggle="modal" data-bs-target="#exampleModal">More details</button>
            </div>
            // `;
            cardsDiv.appendChild(div);
        });
        toggleSpinner('none');
        toggleSpinner2('d-none', 'd-flex');
    }
}

// Details information function 
const loadDetails = (details) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(res => res.json())
    .then(data => displayDetails(data.data));
}

// Display details function
const displayDetails = (detail) => {
    // destructuring
    const {storage, displaySize, chipSet, memory, sensors} = detail.mainFeatures;

    const modalImg = document.getElementById('modal-img');
    modalImg.setAttribute('src', `${detail.image}`);
    const modalDetails = document.getElementById('modal-details');
    modalDetails.classList.add('mt-3');

    modalDetails.innerHTML = `
        <h4><b>Name:</b> ${detail.name}</h4>
        <h6><b>Release:</b>  ${detail.releaseDate ? detail.releaseDate : 'Release Date not available.'} </h6>
        <br>
        <h5><b>Main Features:</b></h5>
        <p><b>Storage:</b> ${storage}</p>
        <p><b>Display Size:</b> ${displaySize}</p>
        <p><b>Chip Set:</b> ${chipSet}</p>
        <p><b>Memory:</b> ${memory}</p>
        <div><b class="text-warning">Sensors:</b><h6 id="sensor-id"></h6></div>
        <div><b class="text-warning"><h6>Others facility: </b></h6> <span id="others-div"> </span></div>
    `;
    for(const other in detail.others){
        const sensorId = document.getElementById('others-div');
        const p = document.createElement('p');
        p.innerText = `Name: ${other ? other : 'No other result found!!'}`;
        sensorId.appendChild(p);
    }
    for(const sensor of sensors){
        const sensorId = document.getElementById('sensor-id');
        const p = document.createElement('p');
        p.innerText = `Name: ${sensor}`;
        sensorId.appendChild(p);
    }
}