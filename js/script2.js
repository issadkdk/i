document.addEventListener("DOMContentLoaded", () => {
  
  const products = Array.from(document.querySelectorAll(".first1, .first2")).map(productDiv => {
      return {
          button: productDiv.querySelector(".button11"),
          select: productDiv.querySelector("select"),
          priceElement: productDiv.querySelector(".p3"),
          nameElement: productDiv.querySelector(".p1")
      };
  });

  
  let cartCount = localStorage.getItem("cartCount") || 0;
  document.getElementById("quantity").textContent = cartCount;

  
  products.forEach(product => {
      product.button.addEventListener("click", () => {
          let selectedQuantity = parseInt(product.select.value); 
          let newCartCount = parseInt(document.getElementById("quantity").textContent) + selectedQuantity;
          document.getElementById("quantity").textContent = newCartCount;
          localStorage.setItem("cartCount", newCartCount); 

          
          let productPrice = parseFloat(product.priceElement.textContent.replace("$", ""));
          let productName = product.nameElement.textContent.trim();

          
          let totalPrice = productPrice * selectedQuantity;

          
          let cartItem = {
              name: productName,
              price: productPrice,
              quantity: selectedQuantity,
              total: totalPrice
          };

          
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          
          let existingItem = cart.find(item => item.name === productName);
          if (existingItem) {
              existingItem.quantity += selectedQuantity;
              existingItem.total = existingItem.price * existingItem.quantity;
          } else {
              cart.push(cartItem);
          }

          
          localStorage.setItem("cart", JSON.stringify(cart));
      });
  });
});





