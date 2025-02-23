document.addEventListener("DOMContentLoaded", function () {
    let productContainer = document.getElementById("product-container");
    let offset = parseInt(document.getElementById("offset").value) || 0;
    let loading = false;

    let observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !loading) {
            loadMoreProducts();
        }
    });

    let sentinel = document.createElement("div");
    sentinel.id = "sentinel";
    productContainer.appendChild(sentinel);
    observer.observe(sentinel);

    function loadMoreProducts() {
        loading = true;
        document.getElementById("loading").style.display = "block";

        fetch(`/products/load_more?offset=${offset}`)
            .then((response) => response.text())
            .then((html) => {
                if (html.trim()) {
                    let tempDiv = document.createElement("div");
                    tempDiv.innerHTML = html;

                    while (tempDiv.firstChild) {
                        productContainer.insertBefore(tempDiv.firstChild, sentinel);
                    }

                    offset += 8;
                    document.getElementById("offset").value = offset;
                } else {
                    document.getElementById("no-more-products").style.display = "block";
                    observer.unobserve(sentinel);
                }

                document.getElementById("loading").style.display = "none";
                loading = false;
            })
            .catch(() => {
                document.getElementById("loading").style.display = "none";
                loading = false;
            });
    }
});
