Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `   
    <div class="product">
        <div class="product-image">
            <img v-bind:src="image" alt="sock" />
        </div>

        <div class="product-info">
            <h1>{{ title }}</h2>
            <p v-if="isStock">In Stock</p>
            <p v-else>Out of Stock</p>
            <p>Shipping : {{shipping}}</p>

            <ul>
                <li v-for="detail in details">{{ detail }}</li>
            </ul>

            <div v-for="(variant, index) in variants" 
                :key="variant.variantId" class="color-box" 
                :style="{ backgroundColor : variant.variantColor }"
                @mouseover="updateProduct(index)"
                >
            </div>

            <button @click="addToCart" :disabled="!isStock" :class="{ disabledButton : !isStock}">Add to Cart</button>
        </div>
    </div>
    `,
  data() {
    return {
      product: "Socks",
      brand: "Vue Mastery",
      selectedVariant: 0,
      inventory: 8,
      details: ["80% Cotton", "20% Polyester", "Gender-Neutral"],
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./assests/socks-green.jpg",
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: "blue",
          variantImage: "./assests/socks-blue.jpg",
          variantQuantity: 0,
        },
      ],
    };
  },
  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    isStock() {
      return this.variants[this.selectedVariant].variantQuantity;
    },
    shipping() {
      if (this.premium === true) {
        return "Free";
      } else {
        return "$ 2.99";
      }
    },
  },
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
  },
});
