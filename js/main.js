new Vue({
  el: '#app',
  data: {
    products: [
      {
        id: 1,
        title: 'Огірок Атлет F1',
        short_text: 'Гібридний тепличний огірок',
        image: 'img/cucumber1.jpg',
        desc: 'Ранньостиглий гібрид огірка з високою врожайністю, підходить для вирощування у теплицях та у відкритому ґрунті.'
      },
      {
        id: 2,
        title: 'Огірок Герман F1',
        short_text: 'Ранній партенокарпічний сорт',
        image: 'img/cucumber2.jpg',
        desc: 'Дуже популярний сорт огірка з хрусткими плодами, чудово підходить для салатів і консервування.'
      },
      {
        id: 3,
        title: 'Огірок Кураж F1',
        short_text: 'Урожайний тепличний огірок',
        image: 'img/cucumber3.jpg',
        desc: 'Сильнорослий гібрид із рівними плодами, стійкий до хвороб, добре переносить перепади температур.'
      },
      {
        id: 4,
        title: 'Огірок Маша F1',
        short_text: 'Компактний ранній гібрид',
        image: 'img/cucumber4.jpg',
        desc: 'Ранній огірок із невеликими плодами, відмінно підходить для маринування та щоденного споживання.'
      },
      {
        id: 5,
        title: 'Огірок Амур F1',
        short_text: 'Салатний та універсальний сорт',
        image: 'img/cucumber5.jpg',
        desc: 'Високопродуктивний огірок із соковитими плодами, підходить для вирощування на присадибних ділянках.'
      }
    ],
    product: {},
    btnVisible: 0,
    cart: [],
    contactFields: {
      name: '',
      company: '',
      position: '',
      city: '',
      country: '',
      telephone: '',
      email: '',
      role: 'seed producer',
      other: '',
      message: '',
      code: ''
    },
    orderDone: false
  },

  methods: {
    getProduct() {
      let id = window.location.hash.replace('#', '');

      if (!id) return;

      this.product = this.products.find(item => item.id == id) || {};
    },

    addToCart(id) {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || [];

      if (!cartIds.includes(id)) {
        cartIds.push(id);
        localStorage.setItem('cart', JSON.stringify(cartIds));
      }

      this.btnVisible = 1;
    },

    checkInCart() {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || [];

      if (this.product.id && cartIds.includes(this.product.id)) {
        this.btnVisible = 1;
      } else {
        this.btnVisible = 0;
      }
    },

    getCart() {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || [];
      this.cart = this.products.filter(item => cartIds.includes(item.id));
    },

    removeFromCart(id) {
      let cartIds = JSON.parse(localStorage.getItem('cart')) || [];
      cartIds = cartIds.filter(item => item != id);

      localStorage.setItem('cart', JSON.stringify(cartIds));
      this.getCart();
      this.checkInCart();
    },

    makeOrder() {
      this.orderDone = true;
      this.cart = [];
      localStorage.removeItem('cart');
    }
  },

  mounted() {
    this.getProduct();
    this.checkInCart();
    this.getCart();
  }
});