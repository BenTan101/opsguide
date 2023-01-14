<template>
  <v-container class="pa-16">
    <h1>Login</h1>

    <v-container class="py-8">
      <v-text-field label="Email" filled></v-text-field>
      <v-text-field label="Password" type="password" filled></v-text-field>
      <v-btn class="mt-2 paleteal--text" color="var(--v-secondary)"
        >Login</v-btn
      >
    </v-container>
    <h3 class="font-weight-light mt-8"><i>New? Register here.</i></h3>

    <v-container class="py-8">
      <v-text-field label="School email" filled></v-text-field>
      <v-text-field label="Full name" filled></v-text-field>
      <v-text-field label="Class (M23X0X)" filled></v-text-field>
      <v-text-field label="Password" type="password" filled></v-text-field>
      <v-text-field
        label="Retype password"
        type="password"
        filled
      ></v-text-field>
      <v-btn class="mt-2 paleteal--text" color="var(--v-secondary)"
        >Sign up</v-btn
      >
    </v-container>
  </v-container>
</template>

<style scoped>
h1 {
  color: var(--v-primary);
}
</style>
