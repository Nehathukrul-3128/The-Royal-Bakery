// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Define CSS variables used in the CSS for button toggling
    // In a real project, this would be managed entirely in CSS using classes.
    const secondaryColor = '#ef3488ff'; 

    // ---------------------------------------------
    // 1. Initialise Cart State & DOM elements
    // ---------------------------------------------
    let cartItemCount = 0;
    const cartBadge = document.querySelector('.position-absolute.top-20.start-90');
    const productSection = document.getElementById('Product');

    // Function to update the cart badge displayed on the navbar
    function updateCartBadge() {
        if (cartBadge) {
            cartBadge.textContent = cartItemCount;
        }
    }

    // Function to handle adding a product to the cart
    function addToCart(productName, productPrice) {
        cartItemCount++;
        updateCartBadge();
        
        // Log to console for debugging
        console.log(`Added "${productName}" to cart! New total items: ${cartItemCount}`);
        
        // Display a small notification to the user
        // Using an alert here, but a toaster notification would be better UX
        alert(`${productName} (${productPrice}) added to your cart!`);
    }

    // Function to handle adding a product to the wishlist
    function toggleWishlist(productName, isAdded) {
        if (isAdded) {
             console.log(`Added "${productName}" to wishlist.`);
        } else {
             console.log(`Removed "${productName}" from wishlist.`);
        }
    }

    // ---------------------------------------------
    // 2. Event Listener Delegation for Product Actions
    // ---------------------------------------------
    if (productSection) {
        productSection.addEventListener('click', (event) => {
            const target = event.target;
            
            // Handle "Add to Cart" button click
            if (target.classList.contains('btn-primary') && target.textContent.includes('Add to Cart')) {
                const card = target.closest('.product-card');
                
                if (card) {
                    const productName = card.querySelector('.product-title').textContent;
                    const productPriceText = card.querySelector('.product-price').textContent;
                    
                    addToCart(productName, productPriceText);
                }
            }
            
            // Handle "Wishlist" button (heart) click
            if (target.classList.contains('btn-outline-danger')) {
                const card = target.closest('.product-card');
                
                if (card) {
                    const productName = card.querySelector('.product-title').textContent;
                    
                    // Toggle the 'active-wishlist' class
                    target.classList.toggle('active-wishlist');
                    
                    // Update appearance via inline style or rely purely on CSS for best practice
                    if(target.classList.contains('active-wishlist')) {
                        target.style.backgroundColor = secondaryColor;
                        target.style.color = 'white';
                        toggleWishlist(productName, true);
                    } else {
                        target.style.backgroundColor = 'transparent';
                        target.style.color = secondaryColor; // Revert to initial color
                        toggleWishlist(productName, false);
                    }
                }
            }
        });
    }

    // Set initial badge count to 0 when the page loads
    updateCartBadge();
});