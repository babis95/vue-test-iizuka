<template>
  <!-- Modal displayed when button to process case action clicked. -->
  <div
    class="overflow-y-auto bg-gray-900 opacity-90 overflow-x-hidden fixed flex right-0 left-0 top-4 z-50 justify-center items-center md:inset-0 h-modal sm:h-full"
    id="popup-modal"
  >
    <div class="relative px-4 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative rounded-lg shadow bg-gray-700">
        <!-- Modal header -->
        <div class="flex justify-end p-2">
          <button
            type="button"
            class="text-gray-200 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
            @click="closeModal"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 pt-0 text-center">
          <svg
            class="mx-auto mb-4 w-10 h-10 text-gray-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <h3 class="mb-5 text-lg font-normal text-gray-200">
            Are you sure you want to COMPLETE this case action?
          </h3>
          <div class="flex justify-center items-center">
            <button
              v-if="!processingRequest"
              @click="$emit('complete-action')"
              type="button"
              class="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            >
              Yes, I'm sure
            </button>
            <button
              v-if="!processingRequest"
              @click="closeModal"
              type="button"
              class="rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-200 border-gray-500 hover:text-white hover:bg-gray-600"
            >
              No, cancel
            </button>
            <loading-button v-else />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from "./LoadingButton.vue";
export default {
  components: { LoadingButton },
  emits: ["complete-action", "toggle-modal"],
  props: { processingRequest: { type: Boolean, default: false } },
  methods: {
    closeModal() {
      this.$emit("toggle-modal");
    },
  },
};
</script>
