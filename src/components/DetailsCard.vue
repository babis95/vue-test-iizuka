<template>
  <div
    class="max-w-md px-8 py-4 mx-auto mt-16 rounded-lg shadow-lg bg-gray-800"
  >
    <div class="flex justify-center -mt-16 md:justify-end">
      <img
        class="object-cover w-20 h-20 border-2 rounded-full border-blue-400"
        alt="Testimonial avatar"
        :src="`https://picsum.photos/500?random=${intForImage}`"
      />
    </div>

    <h2 class="mt-2 text-2xl font-semibold text-white md:mt-0 md:text-3xl">
      <slot name="title"></slot>
    </h2>

    <p class="mt-2 text-gray-200">
      <slot name="details"></slot>
    </p>

    <div
      class="flex justify-end mt-4 transform-cpu hover:scale-105 duration-300"
    >
      <button class="animate-bounce text-xl font-medium text-blue-300">
        <slot name="button"></slot>
      </button>
    </div>
    <div class="flex justify-end mt-2 text-red-500">
      <slot name="processError"></slot>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.intForImage = Math.floor(Math.random() * 10);
  },
  data() {
    return {
      intForImage: "",
    };
  },
};
</script>
