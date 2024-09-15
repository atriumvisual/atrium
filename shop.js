document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const orderItemsList = document.getElementById('order-items');
    const checkoutTotalPrice = document.getElementById('checkout-total-price');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - €${item.price} x ${item.size}`;
            cartItemsList.appendChild(li);
            totalPrice += item.price;
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
    }

    function addToCart(product) {
        const name = product.querySelector('h3').textContent;
        const price = parseFloat(product.getAttribute('data-price'));
        const size = product.querySelector('input[type=radio]:checked').value;

        cart.push({ name, price, size });
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }

    function loadOrderSummary() {
        orderItemsList.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - €${item.price} x ${item.size}`;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = '×'; // Tanda silang
            removeButton.className = 'remove-item';
            removeButton.onclick = () => removeItem(index);
            
            li.appendChild(removeButton);
            orderItemsList.appendChild(li);
            totalPrice += item.price;
        });

        checkoutTotalPrice.textContent = totalPrice.toFixed(2);
    }

    function removeItem(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
        loadOrderSummary();
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.product');
            if (product.querySelector('input[type=radio]:checked')) {
                addToCart(product);
            } else {
                alert('Please select a size.');
            }
        });
    });

    function openCheckoutModal() {
        loadOrderSummary();
        document.getElementById('checkout-modal').style.display = 'block';
    }

    function closeCheckoutModal() {
        document.getElementById('checkout-modal').style.display = 'none';
    }

    document.getElementById('checkout-button').addEventListener('click', openCheckoutModal);
    document.getElementById('cancel-checkout').addEventListener('click', closeCheckoutModal);
});

function openModal(src) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const caption = document.getElementById('caption');

    modalImage.src = src;
    caption.textContent = "Image preview";
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
}
// Function to open the checkout modal
function openCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'block';
}

// Function to close the checkout modal
function closeCheckoutModal() {
    document.getElementById('checkout-modal').style.display = 'none';
}

// Event listeners for opening and closing modals
document.getElementById('checkout-button').addEventListener('click', openCheckoutModal);
document.getElementById('cancel-checkout').addEventListener('click', closeCheckoutModal);
