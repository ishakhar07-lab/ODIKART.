/* =====================================================
   ODICART APP
===================================================== */

let cart = [];


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

  document
    .getElementById("nav")
    .classList.toggle("show");

}


/* =====================================================
   CART
===================================================== */

function addToCart(name, price) {

  const existing = cart.find(
    item => item.name === name
  );

  if(existing) {

    existing.quantity++;

  } else {

    cart.push({
      name:name,
      price:price,
      quantity:1
    });

  }

  updateCart();

  showToast(
    "✓ " + name + " added to your cart"
  );

}


function updateCart() {

  const count = cart.reduce(
    (total,item) =>
      total + item.quantity,
    0
  );

  document.getElementById(
    "cartCount"
  ).textContent = count;


  const container =
    document.getElementById("cartItems");


  if(!cart.length) {

    container.innerHTML = `
      <div style="
        text-align:center;
        padding:30px;
        color:#806e61;
      ">
        🛒<br><br>
        Your OdiKart is empty.<br>
        Discover something delicious!
      </div>
    `;

  } else {

    container.innerHTML =
      cart.map((item,index) => `

        <div class="cart-item">

          <span>
            ${item.name}
            × ${item.quantity}
          </span>

          <strong>
            ₹${item.price * item.quantity}

            <button
              onclick="removeCartItem(${index})"
              style="
                border:none;
                background:none;
                cursor:pointer;
                color:#e94f22;
                margin-left:8px;
              "
            >
              ×
            </button>

          </strong>

        </div>

      `).join("");

  }


  const total =
    cart.reduce(
      (sum,item) =>
        sum + item.price * item.quantity,
      0
    );

  document.getElementById(
    "cartTotal"
  ).textContent = total;

}


function removeCartItem(index) {

  cart.splice(index,1);

  updateCart();

}


function openCart() {

  document.getElementById(
    "cartModal"
  ).style.display = "flex";

  updateCart();

}


function closeCart() {

  document.getElementById(
    "cartModal"
  ).style.display = "none";

}


/* =====================================================
   ORDER
===================================================== */

function openOrder() {

  closeCart();

  document.getElementById(
    "orderModal"
  ).style.display = "flex";

}


function closeOrder() {

  document.getElementById(
    "orderModal"
  ).style.display = "none";

}


function placeOrder(event) {

  event.preventDefault();

  const name =
    document.getElementById(
      "customerName"
    ).value;


  closeOrder();

  document.getElementById(
    "successModal"
  ).style.display = "flex";


  cart = [];

  updateCart();

  event.target.reset();

}


function closeSuccess() {

  document.getElementById(
    "successModal"
  ).style.display = "none";

}


/* =====================================================
   TOAST
===================================================== */

function showToast(message) {

  const toast =
    document.createElement("div");

  toast.textContent = message;

  toast.style.position = "fixed";
  toast.style.bottom = "25px";
  toast.style.left = "50%";
  toast.style.transform =
    "translateX(-50%)";

  toast.style.background =
    "#542719";

  toast.style.color =
    "white";

  toast.style.padding =
    "13px 22px";

  toast.style.borderRadius =
    "30px";

  toast.style.zIndex =
    "9999";

  toast.style.fontSize =
    "12px";

  toast.style.fontWeight =
    "700";

  toast.style.boxShadow =
    "0 15px 40px rgba(0,0,0,.2)";

  document.body.appendChild(toast);


  setTimeout(() => {

    toast.style.opacity = "0";

    toast.style.transition = ".4s";

    setTimeout(
      () => toast.remove(),
      400
    );

  },2200);

}


/* =====================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener(
  "click",
  function(event) {

    const cartModal =
      document.getElementById(
        "cartModal"
      );

    const orderModal =
      document.getElementById(
        "orderModal"
      );

    const successModal =
      document.getElementById(
        "successModal"
      );


    if(event.target === cartModal) {

      closeCart();

    }


    if(event.target === orderModal) {

      closeOrder();

    }


    if(event.target === successModal) {

      closeSuccess();

    }

  }
);


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
  "keydown",
  function(event) {

    if(event.key === "Escape") {

      closeCart();
      closeOrder();
      closeSuccess();

    }

  }
);


/* =====================================================
   SCROLL ANIMATION
===================================================== */

const observer =
  new IntersectionObserver(

    entries => {

      entries.forEach(entry => {

        if(entry.isIntersecting) {

          entry.target.style.opacity = "1";

          entry.target.style.transform =
            "translateY(0)";

          observer.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold:.12
    }

  );


document
  .querySelectorAll(
    ".category, .food-card, .benefit, .festival-list div, .about-art, .about-text"
  )
  .forEach(element => {

    element.style.opacity = "0";

    element.style.transform =
      "translateY(30px)";

    element.style.transition =
      "opacity .7s ease, transform .7s ease";

    observer.observe(element);

  });


/* =====================================================
   INITIALIZE
===================================================== */

updateCart();
