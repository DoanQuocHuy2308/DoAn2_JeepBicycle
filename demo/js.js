$(document).ready(function() {
    $.getJSON("product.json", function(products) {
        let container = $("#product-container");

        // Split products into two rows with 3 items each
        for (let i = 0; i < products.length; i += 3) {
            let row = $('<div class="row"></div>');
            // Get 3 items for the current row
            let rowItems = products.slice(i, i + 3);

            // Loop through each item in the row and create the product card
            rowItems.forEach(function(product) {
                let productCard = `
                    <div class="col-md-4 d-flex">
                        <div class="card w-100">
                            <div class="position-relative image-container">
                                <span class="discount-badge">${product.discount}</span>
                                <img alt="Image of ${product.title}" class="card-img-top" height="270" src="${product.image}" width="300" />
                            </div>
                            <div class="card-body text-center">
                                <p class="promotion">${product.promotionText}</p>
                                <p class="product-title">${product.title}</p>
                                <p>
                                    <span class="old-price">${product.oldPrice}</span>
                                    <span class="new-price">${product.newPrice}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                `;

                // Append the product card to the current row
                row.append(productCard);
            });

            // Append the row to the main container
            container.append(row);
        }
    });
});