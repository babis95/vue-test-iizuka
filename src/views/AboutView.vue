<template>
  <div v-if="isLoading">
    <small-loading-skeleton />
  </div>
  <!-- Request Done - Responded with Error -->
  <div v-else-if="!isLoading && error !== null" class="flex justify-center">
    <p class="text-white">{{ error }}</p>
  </div>
  <!-- Request Done - Reponse has no data -->
  <div
    v-else-if="
      !isLoading && (!getCaseActionDetails || getCaseActionDetails.length === 0)
    "
    class="flex justify-center"
  >
    <p class="text-white">There seems to be no data...</p>
  </div>
  <!-- All Good -->
  <div class="text-gray-100" v-else>
    <Teleport to="body">
      <transition name="fade" mode="out-in">
        <base-alert
          v-if="showConfirmationModal"
          :processingRequest="processing"
          @toggle-modal="toggleModal"
          @complete-action="completeAction"
        ></base-alert>
      </transition>
    </Teleport>
    <details-card>
      <template v-slot:title>
        <p v-if="getCaseActionDetails.type">
          {{ getCaseActionDetails.type.label }}
        </p>
        <p v-else>No Type Present</p>
      </template>
      <template v-slot:details>
        <p v-if="getCaseActionDetails">
          <span class="font-semibold">Date:</span>
          {{ convertTimeLocal(getCaseActionDetails.date) }}
        </p>
        <p>
          <span class="font-semibold">Owner:</span>
          {{ getCaseActionDetails.owner.label }}
        </p>
        <p>
          <span class="font-semibold">Owner Organisation:</span>
          {{ getCaseActionDetails.ownerOrganisation.label }}
        </p>
        <p v-if="getCaseActionDetails.state">
          <span class="font-semibold">State: </span>
          <span
            class=""
            :class="
              getCaseActionDetails.state.name === 'ACKNOWLEDGED'
                ? 'text-red-500'
                : 'text-green-500'
            "
            >{{ getCaseActionDetails.state.label }}</span
          >
        </p>
        <p>
          <span class="font-semibold">Created Date:</span>
          {{ convertTimeLocal(getCaseActionDetails.created) }}
        </p>
        <p>
          <span class="font-semibold">Created By:</span>
          {{ getCaseActionDetails.createdBy.label }}
        </p>
      </template>
      <template v-slot:button>
        <div v-if="getCaseActionDetails.state">
          <button
            @click="toggleModal"
            v-if="
              getCaseActionDetails.state &&
              getCaseActionDetails.state.name === 'ACKNOWLEDGED'
            "
          >
            Complete Case Action!
          </button>
        </div>
      </template>
      <template v-if="processingError !== null" v-slot:processError>
        <p>Request Failed. Please try again</p>
      </template>
    </details-card>
  </div>
</template>

<script>
import { convertTime } from "../services.js";
import SmallLoadingSkeleton from "@/components/SmallLoadingSkeleton.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import DetailsCard from "@/components/DetailsCard.vue";
export default {
  components: { SmallLoadingSkeleton, DetailsCard, BaseAlert },
  data() {
    return {
      isLoading: false,
      showConfirmationModal: false,
      error: null,
      processingError: null,
      processing: false,
      caseTransitionPayload: {
        caseAction: Number(this.$route.params.caseID),
        transition: "complete",
      },
    };
  },
  // Start Page here.
  async mounted() {
    await this.fetchCaseDetails();
  },
  // Fetch case data based on ID passed in URL
  methods: {
    async fetchCaseDetails() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "testRequest/fetchCaseDetails",
          this.$route.params.caseID
        );
        this.isLoading = false;
      } catch (e) {
        this.error = e.message;
        this.isLoading = false;
      }
    },
    // Modal confirmation received
    async completeAction() {
      try {
        this.isLoading = true;
        this.processing = true;
        await this.$store.dispatch(
          "testRequest/completeAction",
          this.caseTransitionPayload
        );
        this.showConfirmationModal = false;
        this.fetchCaseDetails();
      } catch (e) {
        this.showConfirmationModal = false;
        this.processing = false;
        this.isLoading = false;
        this.processingError = e.message;
      }
    },
    // Convert date object
    convertTimeLocal(time) {
      return convertTime(time);
    },
    toggleModal() {
      this.showConfirmationModal = !this.showConfirmationModal;
    },
  },
  // Use VUEX getters to get data about current CaseAction
  computed: {
    getCaseActionDetails() {
      return this.$store.getters["testRequest/getCaseActionDetails"];
    },
  },
};
</script>

<style scoped>
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.3s ease-out;
}
.fade-leave-active {
  transition: opacity 0.3s ease-in;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
