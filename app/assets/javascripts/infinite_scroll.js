document.addEventListener("DOMContentLoaded", function () {
    let loading = false;
    let productContainer = document.getElementById("product-container");
  
    // Create a sentinel element
    let sentinel = document.createElement("div");
    sentinel.id = "sentinel";
    productContainer.appendChild(sentinel);
  
    // Initialize Intersection Observer
    let observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !loading) {
                    loadMoreProducts();
                }
            });
        },
        {
            rootMargin: "100px", // Trigger 100px before the sentinel enters the viewport
        }
    );
  
    // Start observing the sentinel
    observer.observe(sentinel);
  
    function loadMoreProducts() {
        loading = true;
        document.getElementById("loading").style.display = "block";
  
        let offset = document.getElementById("offset").value;
  
        fetch(`/products/load_more?offset=${offset}`)
            .then((response) => response.json())
            .then((data) => {
                data.forEach((product) => {
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
                    productContainer.insertBefore(div, sentinel); // Insert new products before the sentinel
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