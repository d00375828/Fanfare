<template>
  <div v-if="clickOut" id="click-out" @click="closeAllMenus()"></div>
  <div style="background-color: #FFFBF5; min-height: 100vh; font-family: serif;">
    <div class="fanfare-title">Fanfare</div>
    
    <!-- Accepted Orders Page -->
    <div v-if="currentPage === 'accepted'" class="page-container">
      <h2 class="page-title">Accepted Orders</h2>
      <!-- Subheaders -->
      <div class="subheaders">
        <div class="subheader">Section</div>
        <div class="subheader">Seat #</div>
        <div class="subheader">Item</div>
      </div>

      <!-- Order boxes for accepted orders -->
      <div v-for="order in acceptedOrders" :key="order._id" class="order-box-container">
        <div class="order-box">
          <div class="order-detail">{{ order.section }}</div>
          <div class="order-detail">{{ order.seat }}</div>
          <div class="order-detail">{{ order.item }}</div>
          <div class="action-dots" @click="toggleMenu(order)">•••</div>
        </div>
        
        <!-- Dropdown menu -->
        <div class="action-menu" v-if="order.showMenu">
          <div class="menu-item" @click="updateOrderStatus(order._id, 'Delivered')">Delivered</div>
          <div class="menu-divider"></div>
          <div class="menu-item" @click="updateOrderStatus(order._id, 'Could not find')">Could Not Find</div>
          <div class="menu-divider"></div>
          <div class="menu-item" @click="updateOrderStatus(order._id, 'Admin Canceled after Accepting')">Cancel Order</div>
        </div>
      </div>
    </div>

    <!-- New Orders Page -->
    <div v-if="currentPage === 'new'" class="page-container">
      <h2 class="page-title">New Orders</h2>
      
      <div class="new-orders-container">
        <!-- Subheaders -->
        <div class="subheaders">
          <div class="subheader">Section</div>
          <div class="subheader">Seat #</div>
          <div class="subheader">Item</div>
        </div>
        
        <!-- Order boxes -->
        <div v-for="order in newOrders" :key="order._id" class="order-box-container">
          <div class="order-box">
            <div class="order-detail">{{ order.section }}</div>
            <div class="order-detail">{{ order.seat }}</div>
            <div class="order-detail">{{ order.item }}</div>
            <div class="action-dots" @click="toggleMenu(order)">•••</div>
          </div>
          
          <!-- Dropdown menu -->
          <div class="action-menu" v-if="order.showMenu">
            <div class="menu-item" @click="acceptNewOrder(order._id)">Accept</div>
            <div class="menu-divider"></div>
            <div class="menu-item" @click="updateOrderStatus(order._id, 'Admin Denied')">Do Not Accept</div>
            <div class="menu-divider"></div>
            <div class="menu-item" @click="updateOrderStatus(order._id, 'Admin Canceled')">Cancel Order</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inventory Page -->
    <div v-if="currentPage === 'inventory'" class="page-container">
        <!-- Item Modals -->
        <div v-if="editItemModal" id="item-popup">
          <h3 class="popup-header">Name</h3>
          <input v-model="name" class="input-field" />
          <h3 class="popup-header">Quantity</h3>
          <input v-model="quantity" class="input-field" />
          <h3 class="popup-header">Description</h3>
          <input v-model="description" class="input-field" />
          <div id="buttons">
            <button class="modal-buttons" @click="closeAllMenus()">Cancel</button>
            <button class="modal-buttons" @click="updateItemButton()">Update</button>
          </div>
        </div>

        <div v-else-if="createItemModal" id="item-popup">
          <h3 class="popup-header">Name</h3>
          <input v-model="name" class="input-field" />
          <h3 class="popup-header">Quantity</h3>
          <input v-model="quantity" class="input-field" />
          <h3 class="popup-header">Description</h3>
          <input v-model="description" class="input-field" />
          <div id="buttons">
            <button class="modal-buttons" @click="closeAllMenus()">Cancel</button>
            <button class="modal-buttons" @click="createNewItem()">Create</button>
          </div>
        </div>
        <div v-else>
        <h2 class="page-title">Inventory</h2>
          
          <!-- Inventory subheaders -->
          <div class="subheaders">
            <div class="subheader">Item</div>
            <div class="subheader">Quantity</div>
            <div class="subheader">Description</div>
          </div>
          
          <!-- Inventory item boxes -->
          <div v-for="item in items" :key="item._id" class="order-box-container">
            <div class="order-box">
              <div class="order-detail">{{ item.name }}</div>
              <div class="order-detail">{{ item.quantity }}</div>
              <div class="order-detail">{{ item.description }}</div>
              <div class="action-dots" @click="toggleMenu(item)">•••</div>
            </div>

            <div class="action-menu" v-if="item.showMenu">
              <div class="menu-item" @click="openEditModal(item)">Edit</div>
              <div class="menu-divider"></div>
              <div class="menu-item" @click="deteleItemButton(item._id)">Delete</div>
            </div>
          </div>

          <button id="new-button" @click="createItemModal = true">New Item</button>
        </div>
    </div>



    <!-- Navigation Buttons -->
    <div class="navigation-container">
      <button 
        @click="currentPage = 'accepted'" 
        :class="['nav-button', currentPage === 'accepted' ? 'active' : '']"
      >
        Accepted
      </button>
      <button 
        @click="currentPage = 'new'" 
        :class="['nav-button', currentPage === 'new' ? 'active' : '']"
      >
        New
      </button>
      <button 
        @click="currentPage = 'inventory'" 
        :class="['nav-button', currentPage === 'inventory' ? 'active' : '']"
      >
        Inventory
      </button>
    </div>
  </div>
</template>

<script>
import { getOrders, acceptOrder, completeOrder } from '../hooks/orderApi';
import { getItems, createItem, updateItem, deleteItem } from '../hooks/itemApi';

export default {
  data() {
    return {
      currentPage: 'new',
      orders: [],
      clickOut: 'false',
      acceptedOrders: [],
      newOrders: [],
      items: [],

      editItemModal: false,
      createItemModal: false,

      id: 0,
      name: "",
      quantity: 0,
      description: "",
    };
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const items = await getItems();
        const orders = await getOrders();
        
        const itemData = await items.json(); 
        this.items = itemData.map((item) => {
          return { ...item, showMenu: false };
        });

        const orderData = await orders.json(); 

        this.newOrders = [];
        this.acceptedOrders = [];

        orderData.forEach(order => {
          if (order.isCompleted) {
            return;
          }
          if (order.isAccepted) {
            this.acceptedOrders.push({...order, showMenu: false});
          } else {
            this.newOrders.push({...order, showMenu: false});
          }
        });

        console.log('orders fetched:', this.orders);
      } catch (err) {
        console.error('Error fetching items:', err);
      }
    },
    async acceptNewOrder(id) {
      console.log(id)
      try {
          const response = await acceptOrder(id);
          if (response.ok) {
            console.log("Order accept successfully");
            this.fetchData();
          } else {
            console.log("Failed to accept order");
          }
        } catch (error) {
          console.error("Error accepting order", error);
        }
    },
    async updateOrderStatus(id, status) {
      console.log(id, status)
      try {
          const response = await completeOrder(id, status);
          if (response.ok) {
            console.log("Order updated successfully");
            this.fetchData();
          } else {
            console.log("Failed to updated order");
          }
        } catch (error) {
          console.error("Error updating order", error);
        }
    },
    async updateItemButton() {
      try {
          const response = await updateItem(this.id, this.name, this.quantity, this.description);
          if (response.ok) {
            console.log("Item updated successfully");
            this.fetchData();
          } else {
            console.log("Failed to updated Item");
          }
        } catch (error) {
          console.error("Error updating Item", error);
        } finally {
          this.closeAllMenus();
        }
    },
    async deteleItemButton(id) {
      console.log(id)
      try {
          const response = await deleteItem(id);
          if (response.ok) {
            console.log("Item deleted successfully");
            this.fetchData();
          } else {
            console.log("Failed to delete item");
          }
        } catch (error) {
          console.error("Error deleting item", error);
        }
    },
    async createNewItem() {
      try {
          const response = await createItem(this.name, this.quantity, this.description);
          if (response.ok) {
            console.log("Item created successfully");
            this.fetchData();
            this.closeAllMenus()
          } else {
            console.log("Failed to create item");
          }
        } catch (error) {
          console.error("Error creating item", error);
        }
    },
    openEditModal(item) {
      this.name = item.name;
      this.description = item.description;
      this.quantity = item.quantity;
      this.id = item._id;

      this.closeAllMenus();
      this.editItemModal = true;
    },
    toggleMenu(row) {
      this.closeAllMenus();
      this.clickOut = true; 
      row.showMenu = true;
    },
    closeAllMenus() {
      this.editItemModal = false;
      this.createItemModal = false;

      this.clickOut = false;

      this.acceptedOrders.forEach(order => {
        order.showMenu = false;
      });

      this.newOrders.forEach(order => {
        order.showMenu = false;
      });

      this.items.forEach(order => {
        order.showMenu = false;
      });
    },
  }
};
</script>

<style scoped>
.fanfare-title {
  font-size: 42px;
  font-weight: bold;
  color: #d00;
  text-align: center;
  margin: 20px 0 40px;
  text-shadow: 2px 0 #ffde00, -2px 0 #ffde00, 0 2px #ffde00, 0 -2px #ffde00;
  letter-spacing: 2px;
  margin-top: 1rem;
}

.page-container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.section-container {
  margin-bottom: 40px;
}

.section-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* New boxed layout styling - shared across all pages */
.new-orders-container, .inventory-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

.subheaders {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 15px;
  padding: 0 50px 0 15px;
}

.subheader {
  flex: 1;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}

.order-box-container {
  position: relative;
  margin-bottom: 15px;
}

.order-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border: 2px solid #000;
  border-radius: 4px;
  position: relative;
  background-color: white;
}

.order-detail {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.seat-number {
  min-width: 100px;
}

.input-field {
  width: 80%;
  height: 50px;
  border: 2px solid #2D0F51;
  border-radius: 5px;
  padding: 0 15px;
  font-size: 18px;
  outline: none;
}

.item-name {
  flex-grow: 1;
}

.action-dots {
  width: 40px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}

.action-menu {
  position: absolute;
  right: 20px;
  top: 50px;
  width: 200px;
  background-color: #fff;
  border: 1px solid #000;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.menu-item {
  padding: 15px;
  text-align: center;
  cursor: pointer;
}

.menu-item:hover {
  background-color: #f5f5f5;
}

.menu-divider {
  height: 1px;
  background-color: #ddd;
}

/* Navigation buttons */
.navigation-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  position: fixed;
  bottom: 20px;
  left: 0;
  right: 0;
}

.nav-button {
  padding: 15px 30px;
  margin: 0 5px;
  background-color: #f0f0f0;
  border: 1px solid #ff0000;
  border-radius: 4px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
}

.nav-button.active {
  background-color: #f0f0f0;
  font-weight: bold;
}

#click-out {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0, 0, 0, 0); /* Optional: for background dimming effect */
}

#item-popup {
  position: absolute;
  width: 90vw;
  height: 25rem;
  background-color: #ffffff;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: #000 0.2rem solid;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.popup-header {
  align-self: flex-start;
  margin-left: 5rem;
  margin-top: 1rem;
}

#buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

#new-button{
  background-color: rgb(240, 240, 240);
  height: 4rem;
  width: 100%;
  border-radius: 0.2rem;
  border: #000 0.1rem solid;
  font-size: 1.3rem;
  font-weight: bold;
}

.modal-buttons {
  background-color: rgb(240, 240, 240);
  height: 2rem;
  width: 5rem;
  border-radius: 0.2rem;
  border: #d00 0.1rem solid;
}

</style>