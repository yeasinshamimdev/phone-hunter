// Load data from Server
const loadData = () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputFieldValue}`)
    .then(res => res.json())
    .then(data => displayData(data))
}

// Display Data in the Card 
const displayData = (phones) => {
    console.log(phones);
}