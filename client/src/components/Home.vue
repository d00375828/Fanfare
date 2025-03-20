<template>
  <div style="background-color: #FFFBF5; min-height: 100vh; font-family: serif;">
    <div class="text-center fanfare-title">Fanfare</div>
    
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
      
      <div class="order-text">Delivery Menu</div>
      
      <div class="item-grid">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          :class="['item-button', item.selected ? 'item-selected' : '']"
          @click="toggleSelection(index)"
          :disable="item.quantity <= 0"
        >
          {{ item.name }}
        </div>
      </div>
      
      <button class="order-button" @click="placeOrder">
        Order
      </button>
    </div>
    
    <!-- Confirmation Page -->
    <div v-else-if="currentPage === 'confirmation'" class="container">
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
          <div id="buttons">
            <v-btn color="grey" class="white--text mt-4" @click="cancelOrderButton">
              Cancel Order
            </v-btn>
            <v-btn color="purple" class="white--text mt-4" @click="cancelOrderButton">
              Order Received
            </v-btn>
        </div>
        </div>
      </v-card>
    </div>

    <div v-else-if="currentPage === 'error'" id="error-container">
        <p class="text-h6">Error placing order</p>
        <p class="text-subtitle1">Please try again.</p>
        <v-btn color="purple" class="white--text mt-4" @click="currentPage = 'order'">
          Back to home
        </v-btn>
    </div>

  </div>
</template>

<script>
import { sendOrder, cancelOrder } from '../hooks/orderApi';
import { getItems } from '../hooks/itemApi';

export default {
  data() {
    return {
      currentPage: "order",
      section: "",
      seat: "",
      items: [],
      loading: false,
      itemId: 0,
    };
  },
  async mounted() {
    try {
      const response = await getItems();
      
      if (response.ok) {
        const data = await response.json(); 
        this.items = data.map(item => ({
          ...item,
          selected: false, 
        }));
        console.log('Items fetched:', data);
      } else {
        this.error = 'Failed to load items';
        console.log('Failed to fetch items', response);
      }
    } catch (err) {
      this.error = 'An error occurred';
      console.error('Error fetching items:', err);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    toggleSelection(index) {
      if (this.items[index].selected === false) {
        this.resetSelection();
      };
      this.items[index].selected = !this.items[index].selected;
    },
    async placeOrder() {
      this.loading = true;

      const selectedItem = this.items.find(option => option.selected);

      if (selectedItem) {
        try {
          const response = await sendOrder(this.section, this.seat, selectedItem.name);
          
          if (response.ok) {
            console.log("Order placed successfully");
            const data = await response.json();
            this.itemId = data._id;
            this.loading = false;
            this.currentPage = "confirmation"; 
          } else {
            console.log("Failed to place order");
            this.error();
          }
        } catch (error) {
          console.error("Error placing order", error);
          this.error();
        }
      } else {
        this.error();
      }
    },
    async cancelOrderButton() {
      this.loading = true;
      try {
          const response = await cancelOrder(this.itemId, "Customer Cancelled");
          
          if (response.ok) {
            console.log("Order cancelled successfully");
            this.loading = false;
            this.currentPage = "order"; 
            this.resetSelection();
          } else {
            console.log("Failed to cancel order");
            this.error();
          }
        } catch (error) {
          console.error("Error cancelling order", error);
          this.error();
        }
    },
    resetSelection() {
      this.items = this.items.map(item => ({
        ...item,
        selected: false,
      }));

    },
    error() {
      this.loading = false;
      this.currentPage = "error"; 
      this.resetSelection();
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

#error-container {
  display: flex;
  flex-direction: column; /* Stack items vertically */
  justify-content: center; /* Center items vertically (in the column) */
  align-items: center; /* Center items horizontally */
}

#buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;

}
</style>