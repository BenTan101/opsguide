<template>
  <v-container class="pa-16">
    <h1>Contact Us</h1>

    <v-container class="py-8">
      <v-select :items="items" label="Category" filled></v-select>
      <v-text-field label="Name" filled></v-text-field>
      <v-text-field label="Email" filled></v-text-field>
      <v-textarea label="Message" filled></v-textarea>
      <v-btn class="mt-2 paleteal--text" color="var(--v-secondary)"
        >Submit</v-btn
      >
    </v-container>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({
    items: ["Query", "Suggestion", "Feedback", "Bug report", "Other"],
  }),
};
</script>

<style scoped>
h1 {
  color: var(--v-primary);
}
</style>
