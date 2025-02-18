document.addEventListener("DOMContentLoaded", function() {
    let loading = false;
    let productContainer = document.getElementById("product-container");
  
    window.addEventListener("scroll", function() {
      if (loading) return;
      
      let scrollPosition = window.innerHeight + window.scrollY;
      let pageHeight = document.documentElement.scrollHeight;
  
      if (scrollPosition >= pageHeight - 100) {
        loading = true;
        document.getElementById("loading").style.display = "block";
  
        let offset = document.getElementById("offset").value;
  
        fetch(`/products/load_more?offset=${offset}`)
          .then(response => response.json())
          .then(data => {
            data.forEach(product => {
              let div = document.createElement("div");
              div.className = "product-card";
              div.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}" class="product-image">
                <div class="product-details">
                  <p class="product-brand">${product.brand}</p>
                  <p class="product-title">${product.name}</p>
                  <p class="product-price">₹${product.selling_price} <del>₹${product.price}</del></p>
                </div>
              `;
              productContainer.appendChild(div);
            });
  
            document.getElementById("offset").value = parseInt(offset) + 8;
            document.getElementById("loading").style.display = "none";
            loading = false;
          })
          .catch(() => {
            document.getElementById("loading").style.display = "none";
            loading = false;
          });
      }
    });
  });
  