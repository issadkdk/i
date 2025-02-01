document.addEventListener("DOMContentLoaded", () => {
  // Get all product elements dynamically
  const products = Array.from(document.querySelectorAll(".first, .first2, .first3, .first4, .first5, .first6, .first7")).map(productDiv => {
      return {
          button: productDiv.querySelector(".button11"),
          select: productDiv.querySelector("select"),
          priceElement: productDiv.querySelector(".p3"),
          nameElement: productDiv.querySelector(".p1")
      };
  });

  // Cart quantity update from localStorage
  let cartCount = localStorage.getItem("cartCount") || 0;
  document.getElementById("quantity").textContent = cartCount;

  // Add event listener for each "Add to Cart" button
  products.forEach(product => {
      product.button.addEventListener("click", () => {
          let selectedQuantity = parseInt(product.select.value); // Get selected quantity
          let newCartCount = parseInt(document.getElementById("quantity").textContent) + selectedQuantity;
          document.getElementById("quantity").textContent = newCartCount;
          localStorage.setItem("cartCount", newCartCount); // Save updated cart count

          // Get dynamic price and product name from the HTML
          let productPrice = parseFloat(product.priceElement.textContent.replace("$", ""));
          let productName = product.nameElement.textContent.trim();

          // Calculate total price for the product
          let totalPrice = productPrice * selectedQuantity;

          // Create cart item object
          let cartItem = {
              name: productName,
              price: productPrice,
              quantity: selectedQuantity,
              total: totalPrice
          };

          // Retrieve current cart from localStorage
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          // Check if the item already exists in the cart
          let existingItem = cart.find(item => item.name === productName);
          if (existingItem) {
              existingItem.quantity += selectedQuantity;
              existingItem.total = existingItem.price * existingItem.quantity;
          } else {
              cart.push(cartItem);
          }

          // Save the updated cart to localStorage
          localStorage.setItem("cart", JSON.stringify(cart));
      });
  });
});





