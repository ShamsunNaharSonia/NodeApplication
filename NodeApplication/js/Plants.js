$(() => {
            var products = localStorage.getItem("product-list") ?
                JSON.parse(localStorage.getItem("product-list")) : [];
            var carts = sessionStorage.getItem("cart") ?
                JSON.parse(sessionStorage.getItem("cart")) : [];
            // console.log(products)
            products.forEach((p) => {
                $(".products").append(`
           
           <div class="product">
                <img src="${p.picture}" />
                <div class="desc">${p.description}</div>
                <div class="price">Price ${p.price}</div>
                <div style="text-align: right;">
                  <button data-pk='${p.id}' data-name='${p.name}' data-price='${p.price}' type='button' class="cart">Add to cart</button>
                </div>
            </div>
          
            `);

            });
            $('.cart').on('click', function() {
                var pk = $(this).data('pk');
                var pr = $(this).data('price');
                var n = $(this).data('name');
                var x = carts.filter(p => p.id == pk);
                if (x && x.length > 0) {
                    x[0].qty = x[0].qty + 1;
                } else {
                    carts.push({
                        id: pk,
                        name: n,
                        price: pr,
                        qty: 1
                    });
                }
                sessionStorage.setItem('cart', JSON.stringify(carts));
                console.log(carts);
            });
        });
    

        // admin start 
        $(() => {
            var products = getProducts();
            console.log(products);
            showProducts(products);
            $("#f").submit((ev) => {
                ev.preventDefault();
                products = getProducts();

                var product = {
                    id: products.length + 1,
                    name: $("#name").val(),
                    price: $("#price").val(),
                    description: $("#desc").val(),
                };
                var f = document.getElementById("pic").files[0];
                var reader = new FileReader();
                reader.onload = () => {
                    product.picture = reader.result;
                    products.push(product);
                    localStorage.setItem("product-list", JSON.stringify(products));
                    $("#f").trigger('reset');
                    products = getProducts();
                    showProducts(products);
                };
                reader.readAsDataURL(f);
            });
        });

        function getProducts() {
            return localStorage.getItem("product-list") ? JSON.parse(localStorage.getItem("product-list")) : [];
        }

        function showProducts(products) {
            $("#tbody").empty();
            products.forEach(p => {
                $("#tbody").append(`<tr>
                    <td>${p.name}</td>
                    <td>${p.price}</td>
                    <td>${p.description}</td>
                </tr>`);
            });
        }
  
        // admin end 
    
