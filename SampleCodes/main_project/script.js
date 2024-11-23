document.getElementById('transportation-type').addEventListener('change', function() {
    const selectedType = this.value;
    document.querySelectorAll('.options').forEach(option => option.style.display = 'none');
    if (selectedType === 'car') {
        document.getElementById('car-options').style.display = 'block';
    } else if (selectedType === 'public_transport') {
        document.getElementById('public-transport-options').style.display = 'block';
    } else if (selectedType === 'air_travel') {
        document.getElementById('air-travel-options').style.display = 'block';
    }
});

document.getElementById('shopping-type').addEventListener('change', function() {
    const selectedType = this.value;
    document.querySelectorAll('.options').forEach(option => option.style.display = 'none');
    if (selectedType === 'online') {
        document.getElementById('online-options').style.display = 'block';
    } else if (selectedType === 'in_store') {
        document.getElementById('in-store-options').style.display = 'block';
    }
});

document.getElementById('energy-type').addEventListener('change', function() {
    const selectedType = this.value;
    document.getElementById('appliance-options').style.display = selectedType === 'appliances' ? 'block' : 'none';
});

// Synchronize range inputs with number inputs
function syncInput(sliderId, numberId) {
    const slider = document.getElementById(sliderId);
    const numberInput = document.getElementById(numberId);
    slider.addEventListener('input', function() {
        numberInput.value = this.value;
    });
    numberInput.addEventListener('input', function() {
        slider.value = this.value;
    });
}


function updateSlider() {
    const inputValue = document.getElementById('userInput').value;
    const slider = document.getElementById('slider');
    slider.value = inputValue;
    document.getElementById('sliderValue').innerText = inputValue;
}

function updateInput() {
    const sliderValue = document.getElementById('slider').value;
    document.getElementById('userInput').value = sliderValue;
    document.getElementById('sliderValue').innerText = sliderValue;
}

// Call syncInput for all relevant inputs
syncInput('car-distance-slider', 'car-distance');
syncInput('public-transport-distance-slider', 'public-transport-distance');
syncInput('air-travel-distance-slider', 'air-travel-distance');
syncInput('online-quantity-slider', 'online-quantity');
syncInput('in-store-quantity-slider', 'in-store-quantity');
syncInput('diet-quantity-slider', 'diet-quantity');
syncInput('appliance-usage-slider', 'appliance-usage');

document.getElementById('calculate-button').addEventListener('click', function() {
    let totalEmissions = 0;

    // Transportation emissions
    const transportationType = document.getElementById('transportation-type').value;
    if (transportationType === 'car') {
        const fuelType = document.getElementById('car-fuel').value;
        const distance = parseFloat(document.getElementById('car-distance').value) || 0;
        totalEmissions += EMISSION_FACTORS.transportation.car[fuelType] * distance;
    } else if (transportationType === 'public_transport') {
        const transportType = document.getElementById('public-transport-type').value;
        const distance = parseFloat(document.getElementById('public-transport-distance').value) || 0;
        totalEmissions += EMISSION_FACTORS.transportation.public_transport[transportType] * distance;
    } else if (transportationType === 'air_travel') {
        const travelType = document.getElementById('air-travel-type').value;
        const distance = parseFloat(document.getElementById('air-travel-distance').value) || 0;
        totalEmissions += EMISSION_FACTORS.transportation.air_travel[travelType] * distance;
    }

    // Shopping emissions
    const shoppingType = document.getElementById('shopping-type').value;
    if (shoppingType === 'online') {
        const itemType = document.getElementById('online-item').value;
        const quantity = parseFloat(document.getElementById('online-quantity').value) || 0;
        totalEmissions += EMISSION_FACTORS.shopping.online[itemType] * quantity;
    } else if (shoppingType === 'in_store') {
        const itemType = document.getElementById('in-store-item').value;
        const quantity = parseFloat(document.getElementById('in-store-quantity').value) || 0;
        totalEmissions += EMISSION_FACTORS.shopping.in_store[itemType] * quantity;
    }

    // Diet emissions
    const dietType = document.getElementById('diet-type').value;
    const mealsPerWeek = parseFloat(document.getElementById('diet-quantity').value) || 0;
    totalEmissions += EMISSION_FACTORS.diet[dietType].base * mealsPerWeek;

    // Energy emissions
    const energyType = document.getElementById('energy-type').value;
    if (energyType === 'electricity') {
        totalEmissions += EMISSION_FACTORS.energy.electricity;
    } else if (energyType === 'natural_gas') {
        totalEmissions += EMISSION_FACTORS.energy.natural_gas;
    } else if (energyType === 'appliances') {
        const applianceType = document.getElementById('appliance-type').value;
        const usageHours = parseFloat(document.getElementById('appliance-usage').value) || 0;
        totalEmissions += EMISSION_FACTORS.energy.appliances[applianceType] * usageHours;
    }

    document.getElementById('total-emissions').textContent = totalEmissions.toFixed(2);
});