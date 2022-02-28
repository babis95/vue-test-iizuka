<template>
  <section class="container mx-auto p-6 font-mono">
    <!-- Request Sent - Waiting for response -->
    <div v-if="isLoading">
      <loading-skeleton />
    </div>
    <!-- Request Done - Responded with Error -->
    <div v-else-if="!isLoading && error !== null" class="flex justify-center">
      <p class="text-white">{{ error }}</p>
    </div>
    <!-- Request Done - Reponse has no data -->
    <div
      v-else-if="!isLoading && (!getCaseActions || getCaseActions.length === 0)"
      class="flex justify-center"
    >
      <p class="text-white">There seems to be no data...</p>
    </div>
    <!-- Response Done - Data present -->
    <div v-else class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
      <div class="w-full">
        <table class="w-full">
          <thead>
            <tr
              class="text-md font-semibold tracking-wide text-left text-gray-100 bg-gray-800 uppercase border-b border-gray-600"
            >
              <th class="px-4 py-3 cursor-pointer" @click="sortID">Owner</th>
              <th class="px-4 py-3">Type</th>
              <th class="px-4 py-3 cursor-pointer" @click="sortDate">Date</th>
            </tr>
          </thead>
          <tbody class="bg-gray-700">
            <tr
              v-for="(item, index) in getCaseActions"
              :key="index"
              class="text-gray-100 hover:bg-gray-600 transform-cpu duration-100"
            >
              <td class="px-4 py-3 border border-gray-400">
                <div class="flex items-center text-sm">
                  <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                    <!-- Random Pic based on index passed -->
                    <img
                      class="object-cover w-full h-full rounded-full"
                      :src="`https://picsum.photos/500?random=${index}`"
                      alt=""
                      loading="lazy"
                    />
                    <div
                      class="absolute inset-0 rounded-full shadow-inner"
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div>
                    <!-- Re-route to another page and pass CASE ID in URL -->
                    <router-link
                      :to="{ name: 'about', params: { caseID: item.id } }"
                    >
                      <p
                        class="font-semibold text-mg text-white cursor-pointer transform-cpu hover:scale-110 duration-300"
                      >
                        {{ item.owner.label }}
                      </p>
                    </router-link>
                    <p
                      v-if="item.state"
                      class="text-xs"
                      :class="
                        item.state.name === 'ACKNOWLEDGED'
                          ? 'text-red-500'
                          : 'text-green-500'
                      "
                    >
                      {{ item.id }} - {{ item.state.label }}
                    </p>
                    <p v-else class="text-xs text-gray-400">
                      {{ item.id }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-sm border border-gray-400">
                {{ item.type.label }}
              </td>
              <td
                class="px-4 py-3 text-ms font-semibold border border-gray-400"
              >
                {{ convertTimeLocal(item.date) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
import LoadingSkeleton from "@/components/LoadingSkeleton.vue";
import { convertTime } from "../services.js";
export default {
  components: { LoadingSkeleton },
  name: "App",
  data() {
    return {
      isLoading: false,
      error: null,
      sortType: "ASC",
      requestBody: {
        offset: 0,
        limit: 20,
        filter: {
          cases: [32],
        },
        // Cannot get this to work. Data returned seems to always comeback in ID ASC Order
        // sort: [
        //   {
        //     property: "date",
        //     order: "DESC",
        //   },
        // ],
      },
    };
  },
  // Start app here
  mounted() {
    this.fetchCaseActions();
  },
  methods: {
    async fetchCaseActions() {
      try {
        this.isLoading = true;
        await this.$store.dispatch(
          "testRequest/fetchCaseActions",
          this.requestBody
        );
        this.isLoading = false;
      } catch (e) {
        this.error = e.message;
        this.isLoading = false;
      }
    },
    convertTimeLocal(time) {
      return convertTime(time);
    },
    sortID() {
      if (this.sortType === "DESC") {
        this.sortType = "ASC";
        return this.getCaseActions.sort((a, b) => (a.id > b.id ? 1 : -1));
      } else if (this.sortType === "ASC") {
        this.sortType = "DESC";
        return this.getCaseActions.sort((a, b) => (a.id < b.id ? 1 : -1));
      }
    },
    sortDate() {
      if (this.sortType === "DESC") {
        this.sortType = "ASC";
        return this.getCaseActions.sort((a, b) => (a.date > b.date ? 1 : -1));
      } else if (this.sortType === "ASC") {
        this.sortType = "DESC";
        return this.getCaseActions.sort((a, b) => (a.date < b.date ? 1 : -1));
      }
    },
  },
  computed: {
    //  Use getters to get response data
    getCaseActions() {
      return this.$store.getters["testRequest/getCaseActions"];
    },
  },
};
</script>
