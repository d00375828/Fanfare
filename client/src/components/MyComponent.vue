<template>
  <div style="background-color: #FFFBF5; min-height: 100vh; font-family: serif;">
    <div class="text-center fanfare-title">FanFare</div>
    
    <!-- Order Page -->
    <div v-if="currentPage === 'order'" class="container">
      <div class="section-container">
        <div class="label">Section</div>
        <input v-model="section" class="input-field" />
      </div>
      
      <div class="section-container">
        <div class="label">Seat #</div>
        <input v-model="seat" class="input-field" />
      </div>
      
      <div class="order-text">I want to order a...</div>
      
      <div class="item-grid">
        <div 
          v-for="(option, index) in options" 
          :key="index"
          :class="['item-button', option.selected ? 'item-selected' : '']"
          @click="toggleSelection(index)"
        >
          {{ option.label.replace('Option', 'Item') }}
        </div>
      </div>
      
      <button class="order-button" @click="placeOrder">
        Order
      </button>
    </div>
    
    <!-- Confirmation Page -->
    <div v-if="currentPage === 'confirmation'" class="container">
      <v-card outlined color="white" class="pa-4 text-center">
        <v-progress-circular 
          v-if="loading" 
          indeterminate 
          color="purple" 
          size="64" 
          class="my-4"
        ></v-progress-circular>

        <div v-if="!loading">
          <p class="text-h6">Your order is on the way!</p>
          <p class="text-subtitle1">Estimated delivery time: 30s</p>
          <v-btn color="purple" class="white--text mt-4" @click="cancelOrder">
            Cancel Order
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: "order",
      section: "",
      seat: "",
      options: [
        { label: "Option 1", selected: false },
        { label: "Option 2", selected: false },
        { label: "Option 3", selected: false },
        { label: "Option 4", selected: false }
      ],
      loading: false
    };
  },
  methods: {
    toggleSelection(index) {
      this.options[index].selected = !this.options[index].selected;
    },
    placeOrder() {
      this.currentPage = "confirmation"; 
      this.loading = true; 

      setTimeout(() => {
        this.loading = false; 
      }, 2000);
    },
    cancelOrder() {
      this.currentPage = "order"; 
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 650px;
  margin: 0 auto;
  padding: 0 20px;
}

.fanfare-title {
  font-size: 42px;
  font-weight: bold;
  color: #4e0ca6;
  margin: 40px 0;
  text-shadow: 2px 0 #ffde00, -2px 0 #ffde00, 0 2px #ffde00, 0 -2px #ffde00;
  letter-spacing: 2px;
}

.section-container {
  margin-bottom: 20px;
}

.label {
  font-size: 20px;
  color: #2D0F51;
  margin-bottom: 8px;
  text-align: left;
}

.input-field {
  width: 100%;
  height: 50px;
  border: 2px solid #2D0F51;
  border-radius: 5px;
  padding: 0 15px;
  font-size: 18px;
  outline: none;
}

.order-text {
  font-size: 22px;
  color: #2D0F51;
  margin: 30px 0 20px;
  text-align: left;
}

.item-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-bottom: 30px;
}

.item-button {
  padding: 15px 0;
  border: 2px solid #2D0F51;
  border-radius: 5px;
  text-align: center;
  font-size: 18px;
  color: #2D0F51;
  cursor: pointer;
}

.item-selected {
  background-color: #b859ff;
  color: white;
}

.order-button {
  width: 50%;
  margin: 20px auto;
  padding: 15px 0;
  background-color: #2D0F51;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  display: block;
  cursor: pointer;
}

/* Vuetify Overrides */
.v-card {
  margin-top: 20px;
}

.text-h6 {
  font-size: 24px !important;
  margin-bottom: 10px;
}

.text-subtitle1 {
  font-size: 18px !important;
  margin-bottom: 20px;
}

.pa-4 {
  padding: 16px !important;
}

.mt-4 {
  margin-top: 16px !important;
}

.my-4 {
  margin-top: 16px !important;
  margin-bottom: 16px !important;
}
</style>