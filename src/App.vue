<template>
  <nav class="flex justify-center text-lg mt-3 text-white">
    <router-link to="/">Home</router-link>
  </nav>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<style>
body {
  background-color: rgb(17 24 39);
}
a:hover,
a:active,
a.router-link-active {
  color: #f1a80a;
  border-color: #f1a80a;
  text-decoration: underline;
}

.route-enter-from,
.route-enter-active {
  animation: fade 0.5s ease-out;
}

.route-leave-action {
  animation: fade 0.5s ease-in;
}

@keyframes fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
