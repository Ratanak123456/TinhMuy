
// Cart data
let cartItems = [
    {
        id: 1,
        name: 'Sweater',
        image: 'https://i.pinimg.com/736x/f4/e4/94/f4e494cbbad4a466c008631209180da0.jpg',
        price: 14.00,
        quantity: 5,
        size: 'M',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 2,
        name: 'Green Capsicum',
        image: 'https://i.pinimg.com/1200x/79/f2/f9/79f2f9be797f652ff78cd83b442fc96e.jpg',
        price: 14.00,
        quantity: 5,
        size: 'M',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    },
    {
        id: 3,
        name: 'Hoodie',
        image: 'https://i.pinimg.com/736x/03/80/37/0380374b508e2f11e47c9a1eca4673db.jpg',
        price: 14.00,
        quantity: 5,
        size: 'L',
        sizes: ['XS', 'S', 'M', 'L', 'XL']
    }
];

// Render cart items for desktop table
function renderCartTable() {
    const tableBody = document.getElementById('cart-items-table');
    tableBody.innerHTML = '';

    cartItems.forEach((item, index) => {
        const subtotal = (item.price * item.quantity).toFixed(2);
        
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100';
        row.innerHTML = `
            <td class="px-6 py-6">
                <div class="flex items-center gap-4">
                    <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg"/>
                    <span class="text-[#5a7370] text-base font-medium">${item.name}</span>
                </div>
            </td>
            <td class="px-4 py-6 text-center">
                <div class="relative inline-block">
                    <select 
                        onchange="updateSize(${index}, this.value)"
                        class="appearance-none px-6 py-2 pr-10 text-sm font-medium text-black bg-white border border-gray-300 rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#5a7370] cursor-pointer"
                    >
                        ${item.sizes.map(size => `
                            <option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>
                        `).join('')}
                    </select>
                    <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <svg class="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>
                </div>
            </td>
            <td class="px-4 py-6 text-center text-[#5a7370] font-medium">$${item.price.toFixed(2)}</td>
            <td class="px-4 py-6">
                <div class="inline-flex items-center gap-4 px-4 py-2 bg-white border border-gray-300 rounded-full">
                    <button onclick="decreaseQuantity(${index})" class="text-gray-600 hover:text-[#5a7370] transition">
                        <svg width="14" height="2" viewBox="0 0 14 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <span class="w-8 text-center text-[#191919] font-medium">${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})" class="text-gray-900 hover:text-[#5a7370] transition">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </td>
            <td class="px-4 py-6 text-center text-[#5a7370] font-semibold">$${subtotal}</td>
            <td class="px-4 py-6 text-center">
                <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-500 transition">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M15 9L9 15M15 15L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });

    updateSummary();
}

// Render cart items for mobile
function renderCartMobile() {
    const mobileContainer = document.getElementById('cart-items-mobile');
    mobileContainer.innerHTML = '';

    cartItems.forEach((item, index) => {
        const subtotal = (item.price * item.quantity).toFixed(2);
        
        const card = document.createElement('div');
        card.className = 'bg-white border border-gray-200 rounded-xl p-4';
        card.innerHTML = `
            <div class="flex gap-4 mb-4">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg"/>
                <div class="flex-1">
                    <h3 class="text-[#5a7370] font-medium mb-2">${item.name}</h3>
                    <p class="text-[#5a7370] font-semibold">$${item.price.toFixed(2)}</p>
                </div>
                <button onclick="removeItem(${index})" class="text-gray-400 hover:text-red-500">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5"/>
                        <path d="M15 9L9 15M15 15L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <select 
                        onchange="updateSize(${index}, this.value)"
                        class="px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#5a7370]"
                    >
                        ${item.sizes.map(size => `
                            <option value="${size}" ${size === item.size ? 'selected' : ''}>${size}</option>
                        `).join('')}
                    </select>
                    <div class="inline-flex items-center gap-3 px-3 py-2 border border-gray-300 rounded-full">
                        <button onclick="decreaseQuantity(${index})" class="text-gray-600">
                            <svg width="12" height="2" viewBox="0 0 14 2" fill="none">
                                <path d="M1 1H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span class="w-6 text-center font-medium">${item.quantity}</span>
                        <button onclick="increaseQuantity(${index})" class="text-gray-900">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1V13M1 7H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="text-[#5a7370] font-semibold">$${subtotal}</div>
            </div>
        `;
        
        mobileContainer.appendChild(card);
    });

    updateSummary();
}

// Increase quantity
function increaseQuantity(index) {
    cartItems[index].quantity++;
    renderCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cartItems[index].quantity > 1) {
        cartItems[index].quantity--;
        renderCart();
    }
}

// Update size
function updateSize(index, newSize) {
    cartItems[index].size = newSize;
}

// Remove item
function removeItem(index) {
    if (confirm('Are you sure you want to remove this item from cart?')) {
        cartItems.splice(index, 1);
        renderCart();
    }
}

// Update order summary
function updateSummary() {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-items').textContent = totalItems;
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
    document.getElementById('subtotal-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Render cart (both desktop and mobile)
function renderCart() {
    renderCartTable();
    renderCartMobile();
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    renderCart();
});
