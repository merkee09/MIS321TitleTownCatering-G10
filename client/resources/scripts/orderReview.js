const gratuityInput = document.getElementById('gratuity');
const totalOutput = document.getElementById('total');

function calculateTotal() {
    const subtotal = 100;
    const tax = subtotal * 0.10;
    const gratuity = parseFloat(gratuityInput.value) || 0;
    const total = subtotal + tax + gratuity;

    totalOutput.textContent = total.toFixed(2);
}

gratuityInput.addEventListener('input', calculateTotal);
  