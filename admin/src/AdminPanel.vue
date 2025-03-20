<template>
  <div style="background-color: #FFFBF5; min-height: 100vh; font-family: serif;">
    <div class="fanfare-title">Fanfare</div>
    
    <!-- Accepted Orders Page -->
    <div v-if="currentPage === 'accepted'" class="page-container">
      <h2 class="page-title">Accepted Orders</h2>
      
      <div v-for="(orders, section) in acceptedOrders" :key="section" class="section-container">
        <h3 class="section-title">Section {{ section }}</h3>
        
        <!-- Order boxes for accepted orders -->
        <div v-for="order in orders" :key="order.id" class="order-box-container">
          <div class="order-box">
            <div class="order-detail seat-number">{{ order.seat }}</div>
            <div class="order-detail item-name">{{ order.item }}</div>
            <div class="action-dots" @click="toggleMenu(order)">•••</div>
          </div>
          
          <!-- Dropdown menu -->
          <div class="action-menu" v-if="order.showMenu">
            <div class="menu-item" @click="updateStatus(order, 'Delivered')">Delivered</div>
            <div class="menu-divider"></div>
            <div class="menu-item" @click="updateStatus(order, 'Could Not Find')">Could Not Find</div>
            <div class="menu-divider"></div>
            <div class="menu-item" @click="updateStatus(order, 'Cancel Order')">Cancel Order</div>
          </div>
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
        <div v-for="order in newOrders" :key="order.id" class="order-box-container">
          <div class="order-box">
            <div class="order-detail">{{ order.section }}</div>
            <div class="order-detail">{{ order.seat }}</div>
            <div class="order-detail">{{ order.item }}</div>
            <div class="action-dots" @click="toggleMenu(order)">•••</div>
          </div>
          
          <!-- Dropdown menu -->
          <div class="action-menu" v-if="order.showMenu">
            <div class="menu-item" @click="updateStatus(order, 'Accept')">Accept</div>
            <div class="menu-divider"></div>
            <div class="menu-item" @click="updateStatus(order, 'Do Not Accept')">Do Not Accept</div>
            <div class="menu-divider"></div>
            <div class="menu-item" @click="updateStatus(order, 'Cancel Order')">Cancel Order</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Inventory Page -->
    <div v-if="currentPage === 'inventory'" class="page-container">
      <h2 class="page-title">Inventory</h2>
      
      <div v-for="(items, category) in inventory" :key="category" class="section-container">
        <h3 class="section-title">{{ category }}</h3>
        
        <!-- Inventory subheaders -->
        <div class="subheaders">
          <div class="subheader">Item</div>
          <div class="subheader">Total Sold</div>
          <div class="subheader">Remaining</div>
        </div>
        
        <!-- Inventory item boxes -->
        <div v-for="item in items" :key="item.name" class="order-box-container">
          <div class="order-box">
            <div class="order-detail">{{ item.name }}</div>
            <div class="order-detail">{{ item.sold }}</div>
            <div class="order-detail">{{ item.remaining }}</div>
          </div>
        </div>
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
export default {
  data() {
    return {
      currentPage: 'accepted',
      acceptedOrders: {
        A: [
          { id: 1, seat: "13B", item: "Item 3", status: "", showMenu: false },
          { id: 2, seat: "12C", item: "Item 2", status: "", showMenu: false },
          { id: 3, seat: "1A", item: "Item 3", status: "", showMenu: false },
        ],
        B: [
          { id: 4, seat: "6f", item: "Item 2", status: "", showMenu: false },
        ],
      },
      newOrders: [
        { id: 5, section: "A", seat: "13B", item: "Item 3", status: "", showMenu: false },
        { id: 6, section: "C", seat: "12C", item: "Item 2", status: "", showMenu: false },
        { id: 7, section: "B", seat: "1A", item: "Item 3", status: "", showMenu: false },
      ],
      inventory: {
        Food: [
          { name: "Burger", sold: 30, remaining: 20 },
          { name: "Fries", sold: 50, remaining: 10 },
        ],
        Drink: [
          { name: "Soda", sold: 40, remaining: 25 },
          { name: "Beer", sold: 60, remaining: 5 },
        ],
        Merch: [
          { name: "T-Shirt", sold: 20, remaining: 15 },
        ],
      },
    };
  },
  methods: {
    updateStatus(order, status) {
      order.status = status;
      order.showMenu = false;
      // Here you would typically handle the status change - this is just a placeholder
      // to maintain the original functionality
    },
    toggleMenu(order) {
      // Close all other menus first
      this.closeAllMenus();
      // Then toggle the selected order's menu
      order.showMenu = !order.showMenu;
    },
    closeAllMenus() {
      // Close menus in acceptedOrders
      Object.keys(this.acceptedOrders).forEach(section => {
        this.acceptedOrders[section].forEach(order => {
          order.showMenu = false;
        });
      });
      
      // Close menus in newOrders
      this.newOrders.forEach(order => {
        order.showMenu = false;
      });
    }
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
</style>