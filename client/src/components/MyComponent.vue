<template>
  <v-app style="background-color: #FFFBF5; min-height: 100vh;">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8">
          
          <v-card outlined color="white" class="pa-4 text-center">
            <v-card-title class="purple--text text-h5">Fanfare</v-card-title>

            <!-- Order Page -->
            <div v-if="currentPage === 'order'">
              <v-subheader class="purple--text">Section</v-subheader>
              <v-text-field v-model="section" label="Enter Section" outlined color="purple"></v-text-field>

              <v-subheader class="purple--text">Seat #</v-subheader>
              <v-text-field v-model="seat" label="Enter Seat Number" outlined color="purple"></v-text-field>

              <v-row>
                <v-col v-for="(option, index) in options" :key="index" cols="6" md="3">
                  <v-card 
                    :color="option.selected ? 'yellow' : 'white'" 
                    outlined 
                    class="pa-4 text-center" 
                    @click="toggleSelection(index)"
                  >
                    <v-card-text class="purple--text">{{ option.label }}</v-card-text>
                  </v-card>
                </v-col>
              </v-row>

              <v-btn block color="purple" class="white--text mt-4" @click="placeOrder">
                Order
              </v-btn>
            </div>

            <!-- Confirmation Page -->
            <div v-if="currentPage === 'confirmation'">
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
            </div>

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      currentPage: "order", // Tracks the page state
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
      this.currentPage = "confirmation"; // Switch to confirmation page
      this.loading = true; // Show loading spinner

      setTimeout(() => {
        this.loading = false; // Remove spinner after 2 seconds
      }, 2000);
    },
    cancelOrder() {
      this.currentPage = "order"; // Go back to order page
    }
  }
};
</script>

<style scoped>
.v-text-field >>> .v-input__control {
  border: 2px solid #2D0F51 !important;
}
</style>
