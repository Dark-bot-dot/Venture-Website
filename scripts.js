document.addEventListener('DOMContentLoaded', function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    const cartItemsList = document.getElementById('cartItemsList');
    const orderForm = document.getElementById('orderForm');

    function updateCart() {
        cartCountElement.textContent = cart.length;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        renderCartModal();
    }

    function renderCartItems() {
        cartItemsList.innerHTML = '';
        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p>No items in cart</p>';
            return;
        }

        const ul = document.createElement('ul');
        ul.className = 'list-group';

        cart.forEach(item => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                ${item.name}
                <span class="badge bg-primary rounded-pill">${item.price} Rs</span>
            `;
            ul.appendChild(li);
        });

        const total = cart.reduce((sum, item) => sum + parseInt(item.price), 0);
        const totalLi = document.createElement('li');
        totalLi.className = 'list-group-item d-flex justify-content-between align-items-center fw-bold';
        totalLi.innerHTML = `Total <span class="badge bg-success rounded-pill">${total} Rs</span>`;
        ul.appendChild(totalLi);

        cartItemsList.appendChild(ul);
    }

    function renderCartModal() {
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = '<tr><td colspan="3" class="text-center">Your cart is empty</td></tr>';
            cartTotal.textContent = '0 Rs';
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price} Rs</td>
                <td>
                    <button class="btn btn-sm btn-danger remove-item" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;
            cartItems.appendChild(row);
            total += parseInt(item.price);
        });

        cartTotal.textContent = `${total} Rs`;
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const name = this.getAttribute('data-name');
            const price = this.getAttribute('data-price');
            
            cart.push({ name, price });
            updateCart();
            
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.classList.add('btn-success');
            this.classList.remove('btn-primary');
            
            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('btn-success');
                this.classList.add('btn-primary');
            }, 1500);
        });
    });

    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            const button = e.target.classList.contains('remove-item') ? e.target : e.target.closest('.remove-item');
            const index = button.getAttribute('data-index');
            cart.splice(index, 1);
            updateCart();
        }
    });

    orderForm.addEventListener('submit', function(e) {
        if (cart.length === 0) {
            e.preventDefault();
            alert('Your cart is empty. Please add items before placing an order.');
            return;
        }
        
        cart.forEach((item, index) => {
            const inputName = document.createElement('input');
            inputName.type = 'hidden';
            inputName.name = `products[${index}][name]`;
            inputName.value = item.name;
            orderForm.appendChild(inputName);
            
            const inputPrice = document.createElement('input');
            inputPrice.type = 'hidden';
            inputPrice.name = `products[${index}][price]`;
            inputPrice.value = item.price;
            orderForm.appendChild(inputPrice);
        });
        
        localStorage.removeItem('cart');
        cart = [];
        updateCart();
    });

    updateCart();
});
