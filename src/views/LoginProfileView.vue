<template>
  <div>
    <ProfileView v-if="store().state.isLoggedIn" />
    <LoginView v-if="!store().state.isLoggedIn" />
  </div>
</template>

<script>
import ProfileView from "@/views/ProfileView.vue";
import LoginView from "@/views/LoginView.vue";
import store from "@/store";

export default {
  components: { ProfileView, LoginView },
  methods: {
    store() {
      return store;
    },
  },
};
</script>

<style scoped></style>
