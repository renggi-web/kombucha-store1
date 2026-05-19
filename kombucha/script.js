let cart = [];

function tambahKeranjang(nama, harga){

    let item = cart.find(produk => produk.nama === nama);

    if(item){

        item.qty++;

    }else{

        cart.push({
            nama: nama,
            harga: harga,
            qty: 1
        });

    }

    updateCart();

}

function updateCart(){

    let cartItems = document.getElementById("cart-items");

    let totalHarga = 0;

    cartItems.innerHTML = "";

    cart.forEach((item,index)=>{

        totalHarga += item.harga * item.qty;

        cartItems.innerHTML += `

            <div class="cart-item">

                <h4>${item.nama}</h4>

                <p>
                    Rp ${item.harga.toLocaleString("id-ID")}
                </p>

                <div class="qty-control">

                    <button onclick="kurangQty(${index})">
                        -
                    </button>

                    <span>${item.qty}</span>

                    <button onclick="tambahQty(${index})">
                        +
                    </button>

                </div>

            </div>

        `;

    });

    document.getElementById("totalHarga").innerHTML =
        "Total : Rp " + totalHarga.toLocaleString("id-ID");

    document.getElementById("cart-count").innerHTML =
        cart.length;

}

function tambahQty(index){

    cart[index].qty++;

    updateCart();

}

function kurangQty(index){

    cart[index].qty--;

    if(cart[index].qty <= 0){

        cart.splice(index,1);

    }

    updateCart();

}

function toggleCart(){

    document.getElementById("cartSidebar")
    .classList.toggle("active");

}

function checkoutWA(){

    if(cart.length == 0){

        alert("Keranjang kosong!");

        return;

    }

    let pesan = "Halo KombuchaTeh,%0ASaya ingin memesan:%0A%0A";

    let total = 0;

    cart.forEach(item=>{

        pesan += `- ${item.nama} (${item.qty}x)%0A`;

        total += item.harga * item.qty;

    });

    pesan += `%0ATotal : Rp ${total.toLocaleString("id-ID")}`;

    let nomorWA = "6285182697923";

    window.open(
        `https://wa.me/${nomorWA}?text=${pesan}`,
        "_blank"
    );

}

function bukaPembayaran(){

    if(cart.length == 0){

        alert("Keranjang kosong!");

        return;

    }

    document.getElementById("paymentModal")
    .style.display = "block";

}

function tutupPembayaran(){

    document.getElementById("paymentModal")
    .style.display = "none";

    document.getElementById("qrisArea")
    .style.display = "none";

    document.getElementById("bankArea")
    .style.display = "none";

}

function showQris(){

    document.getElementById("qrisArea")
    .style.display = "block";

    document.getElementById("bankArea")
    .style.display = "none";

}

function showBank(){

    document.getElementById("bankArea")
    .style.display = "block";

    document.getElementById("qrisArea")
    .style.display = "none";

}