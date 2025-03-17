<template>
    <v-app>
      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-card>
              <v-card-title class="headline">Welcome to Your Vue + Vuetify App</v-card-title>
              <v-card-text>
                This is a basic setup for a Vue 2 + Vuetify component.
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click="showAlert">Click Me</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    name: "MyComponent",
    methods: {
      showAlert() {
        alert("Button clicked!");
      }
    }
  };
  </script>
  
  <style scoped>
  .v-container {
    margin-top: 20px;
  }
  </style>
  