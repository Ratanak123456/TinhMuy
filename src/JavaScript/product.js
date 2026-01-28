// src/JavaScript/products.js

let allProducts = [];
let currentPage = 1;
const productsPerPage = 8;
let currentBrands = {};

// Main function to initialize products
async function initProducts() {
  try {
    showLoading();

    const response = await fetch("../Data/products.json");

    if (!response.ok) {
      throw new Error(`Failed to load products: ${response.status}`);
    }

    const data = await response.json();

    // Store data
    allProducts = Object.values(data.products);
    currentBrands = data.brand || {};

    // Display first page
    displayProducts();
    setupPagination();
    setupMobileFilter();

    console.log(data);
  } catch (error) {
    console.error("Error loading products:", error);
    showError("Failed to load products. Please try again.");
  }
}

// Display products function
function displayProducts(page = 1) {
  currentPage = page;
  const productGrid = document.getElementById("product-grid");

  if (!productGrid || allProducts.length === 0) {
    productGrid.innerHTML =
      '<div class="col-span-full text-center py-12"><p class="text-gray-600">No products found</p></div>';
    return;
  }

  // Calculate pagination
  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToShow = allProducts.slice(startIndex, endIndex);

  // Clear and display products
  productGrid.innerHTML = "";

  productsToShow.forEach((product) => {
    const brand = Object.values(currentBrands).find(
      (b) => b.id === product.brandId,
    );
    productGrid.innerHTML += createProductCard(product, brand);
  });

  updatePaginationButtons();
}

// Create product card HTML
function createProductCard(product, brand) {
  const imageUrl =
    product.images && product.images[0]
      ? `../${product.images[0].replace(/^\//, "")}`
      : "../../image/product/image.png";

  const rating = product.rating ? product.rating.toFixed(1) : "0.0";

  return `
    <section class="animate-fadeIn" data-aos="fade-up">
      <div class="group flex flex-col items-start rounded-[20px] lg:m-0 h-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300">
        <div class="relative bg-primary-300 rounded-[13px] w-full aspect-square mb-4 overflow-hidden">
          <img
            src="${product.images}"
            alt="${product.name}"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onerror="this.onerror=null; this.src='../../image/product/image.png'"
          />
          <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-70">
            <button class="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              Quick View
            </button>
          </div>
        </div>

        <div class="p-4 flex-1 w-full">
          <div class="flex items-start justify-between mb-2">
            <div class="flex-1 w-full">
              <h3 class="text-secondary-800 dark:text-white text-lg font-bold transition-colors duration-200 group-hover:text-primary-600 line-clamp-1">
                ${product.name}
              </h3>
              <div class="flex items-center justify-between mt-1">
                <p class="text-gray-500 dark:text-gray-300 text-sm flex items-center">
                  <span class="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">${brand ? brand.name : 'Generic'}</span>
                </p>
                <span class="bg-accent-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  ${product.status}
                </span>
              </div>
            </div>
          </div>
          
          <p class="text-gray-600 dark:text-gray-400 text-xs mb-2">${product.category}</p>
          
          <div class="flex items-center mb-3">
            <div class="flex text-yellow-400 mr-2">
              ${generateStars(product.rating)}
            </div>
            <span class="text-secondary-700 dark:text-gray-300 text-sm font-bold">${rating}/5</span>
            <span class="text-gray-400 text-xs ml-2">(${product.stock} in stock)</span>
          </div>
          
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            ${product.description}
          </p>

          <div class="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
            <div>
              <span class="font-bold text-accent-500 text-xl">$${product.price}</span>
              ${product.originalPrice ? `<span class="text-gray-400 text-sm line-through ml-2">$${product.originalPrice}</span>` : ""}
            </div>
            <button class="bg-primary-900 hover:bg-primary-800 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 flex items-center">
              <i class="fa-solid fa-cart-plus mr-2"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}

// Generate star ratings
function generateStars(rating) {
  if (!rating) return '<i class="fa-regular fa-star"></i>'.repeat(5);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  let stars = "";
  for (let i = 0; i < fullStars; i++) stars += '<i class="fa-solid fa-star"></i>';
  if (hasHalfStar) stars += '<i class="fa-solid fa-star-half-alt"></i>';
  for (let i = 0; i < emptyStars; i++) stars += '<i class="fa-regular fa-star"></i>';
  return stars;
}

// Pagination logic
function setupPagination() {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const pageNumbersContainer = document.getElementById("page-numbers");
  if (pageNumbersContainer) {
    pageNumbersContainer.innerHTML = "";
    pageNumbersContainer.innerHTML += createPageNumber(1);
    if (currentPage > 3) pageNumbersContainer.innerHTML += '<span class="px-2">...</span>';
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pageNumbersContainer.innerHTML += createPageNumber(i);
    }
    if (currentPage < totalPages - 2) pageNumbersContainer.innerHTML += '<span class="px-2">...</span>';
    if (totalPages > 1) pageNumbersContainer.innerHTML += createPageNumber(totalPages);
  }

  document.getElementById("prev-page").onclick = () => {
    if (currentPage > 1) {
      displayProducts(currentPage - 1);
      setupPagination();
    }
  };

  document.getElementById("next-page").onclick = () => {
    const totalPages = Math.ceil(allProducts.length / productsPerPage);
    if (currentPage < totalPages) {
      displayProducts(currentPage + 1);
      setupPagination();
    }
  };
}

function createPageNumber(page) {
  const isActive = page === currentPage;
  return `
    <button class="page-btn w-10 h-10 text-white rounded-[10px] ${isActive ? "bg-primary-700" : "bg-primary-500"} flex items-center justify-center hover:bg-primary-300 transition-colors"
            data-page="${page}">
      ${page}
    </button>
  `;
}

function updatePaginationButtons() {
  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const prevBtn = document.getElementById("prev-page");
  const nextBtn = document.getElementById("next-page");

  if(prevBtn) prevBtn.disabled = currentPage === 1;
  if(nextBtn) nextBtn.disabled = currentPage === totalPages;

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.onclick = () => {
      const page = parseInt(btn.dataset.page);
      if (page !== currentPage) {
        displayProducts(page);
        setupPagination();
      }
    };
  });
}

function setupMobileFilter() {
  const filterToggle = document.getElementById("filter-toggle");
  const filterSidebar = document.getElementById("filter-sidebar");
  if (filterToggle && filterSidebar) {
    filterToggle.onclick = () => {
      filterSidebar.classList.toggle("hidden");
    };
  }
}

function showLoading() {
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    productGrid.innerHTML = `<div class="col-span-full flex flex-col items-center justify-center py-12 min-h-100"><div class="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mb-4"></div><p class="text-gray-600">Loading products...</p></div>`;
  }
}

function showError(message) {
  const productGrid = document.getElementById("product-grid");
  if (productGrid) {
    productGrid.innerHTML = `<div class="col-span-full flex flex-col items-center justify-center py-12 min-h-100"><i class="fa-solid fa-exclamation-triangle text-red-500 text-4xl mb-4"></i><p class="text-red-500 mb-4">${message}</p><button onclick="initProducts()" class="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-full font-semibold transition-colors">Try Again</button></div>`;
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initProducts();
  
  setTimeout(() => {
    if (window.AOS) AOS.refresh();
  }, 500);
});

window.initProducts = initProducts;