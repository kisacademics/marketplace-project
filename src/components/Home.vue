<template>
  <main class="mx-auto max-w-full main-content">
    <div
      class="
        md:max-w-6xl md:w-3/4
        w-11/12
        mx-auto
        flex
        justify-between
        pt-5
        space-x-0
        lg:space-x-5 lg:flex-row
        flex-col
      "
    >
      <SearchableDropdown
        label="Subject"
        :options="
          subjectData ? subjectData.map((subject) => subject.subject) : []
        "
        initial="All Subjects"
        width="lg:w-1/2 w-full"
        emitType="subject"
        @option-changed="updateData"
      />
      <div class="flex space-x-5 lg:w-1/2 w-full mt-5 lg:mt-0 justify-between">
        <Dropdown
          label="State"
          :options="stateData"
          initial="All States"
          width="w-1/2"
          emitType="state"
          @option-changed="updateData"
        />
        <div class="w-1/2 self-end">
          <button
            class="
              text-sm
              sm:text-base
              py-2
              w-full
              border
              rounded-md
              shadow-sm
              text-white
              bg-accent
              focus:outline-none
              font-semibold
            "
            @click="submitFilter()"
          >
            Find Tutors
          </button>
        </div>
      </div>
    </div>
    <div
      class="
        mt-3
        text-left
        md:max-w-6xl md:w-3/4
        w-11/12
        mx-auto
        flex flex-wrap
        items-center
      "
      :class="dropdownOpen ? 'mb-2' : 'mb-5'"
    >
      <div class="mr-5 h-12 flex items-center">
        <button
          class="border border-gray-300 rounded-full p-1 shadow-sm"
          @click="dropdownOpen = !dropdownOpen"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            :class="dropdownOpen ? 'rotate180' : ''"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#9ca3af"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <span class="text-sm sm:text-base ml-2">{{
          dropdownOpen ? "Less Filters" : "More Filters"
        }}</span>
      </div>
      <template v-if="!dropdownOpen">
        <p
          class="bg-gray-300 rounded-3xl px-3 text-sm py-1 mr-5 my-2"
          v-for="filterName of filterNames"
          :key="filterName"
        >
          {{ filterName }}
        </p>
      </template>
    </div>
    <div v-if="dropdownOpen" class="mb-5 md:max-w-6xl md:w-3/4 w-11/12 mx-auto">
      <div
        class="
          w-full
          mx-auto
          flex
          justify-between
          space-x-0
          lg:space-x-5 lg:flex-row
          flex-col
        "
      >
        <SearchableDropdown
          label="Tutor's Area of Study"
          :options="areasOfStudy"
          initial="All areas of study"
          width="lg:w-1/2 w-full"
          emitType="areaOfStudy"
          @option-changed="updateData"
        />
        <div class="flex space-x-5 lg:w-1/2 w-full mt-5 lg:mt-0">
          <Dropdown
            label="Pricing Tier"
            :options="pricingTiers"
            initial="All Pricing Tiers"
            emitType="publicPrivateTutoringTier"
            width="w-full"
            @option-changed="updateData"
          />

          <Dropdown
            label="Gender"
            :options="['Male', 'Female']"
            initial="Everyone"
            emitType="gender"
            width="w-full"
            @option-changed="updateData"
          />
        </div>
      </div>
      <div
        class="
          w-full
          mx-auto
          flex
          justify-between
          pt-5
          space-x-0
          lg:space-x-5 lg:flex-row
          flex-col
        "
      >
        <Dropdown
          label="Availability"
          :options="['Available', 'Not Available']"
          initial="All Availabilities"
          emitType="availabilityForPrivateTutoring"
          width="lg:w-1/2 w-full"
          @option-changed="updateData"
        />
        <div class="flex space-x-5 lg:w-1/2 w-full mt-5 lg:mt-0">
          <div class="flex flex-col w-1/2">
            <label
              class="
                block
                font-medium
                text-gray-700 text-left text-sm
                sm:text-base
              "
              >Postcode</label
            >
            <input
              placeholder="Online"
              type="number"
              class="
                max-h-60
                bg-white
                w-full
                border border-gray-300
                rounded-md
                shadow-sm
                px-3
                py-2
                text-left
                cursor-pointer
                focus:outline-none
                focus:ring-1
                focus:ring-blue-800
                focus:border-blue-800
                flex
                justify-between
                items-center
                space-x-3
                text-sm
                sm:text-base
              "
              @change="updateData('of', $event.target.value)"
            />
            <div
              class="text-xs sm:text-sm text-left text-red-500 font-medium"
              v-if="showPostcodeError"
            >
              Postcode must be four numbers
            </div>
          </div>

          <div class="flex flex-col w-1/2">
            <label
              class="
                block
                font-medium
                text-gray-700 text-left text-sm
                sm:text-base
              "
              >Distance</label
            >
            <input
              :disabled="filterData.location.within.of === '' || !validPostcode"
              class="w-full py-2 cursor-pointer"
              type="range"
              x-model="total_value"
              min="5"
              max="15"
              step="5"
              @change="updateData('km', $event.target.value)"
            />
            <span class="range-text top-6 text-xs w-full flex justify-between">
              <span>5Km</span>
              <span>10Km</span>
              <span>15Km</span>
            </span>
          </div>
        </div>
      </div>
      <!-- <div class="mt-5 flex flex-row space-x-5 lg:w-1/2 mx-auto w-full">
        <div class="flex flex-col w-1/2">
          <label class="text-left text-sm sm:text-base">Postcode</label>
          <input
            type="number"
            class="
              max-h-60
              bg-white
              w-full
              border border-gray-300
              rounded-md
              shadow-sm
              px-3
              py-2
              text-left
              cursor-pointer
              focus:outline-none
              focus:ring-1
              focus:ring-blue-800
              focus:border-blue-800
              flex
              justify-between
              items-center
              space-x-3
              text-sm
              sm:text-base
            "
            @change="updateData('of', $event.target.value)"
          />
          <div
            class="text-xs sm:text-sm text-left text-red-500 font-medium"
            v-if="showPostcodeError"
          >
            Postcode must be four numbers
          </div>
        </div>
        <div class="flex flex-col w-1/2">
          <label class="text-left text-sm sm:text-base">Distance</label>
          <input
            class="w-full py-2 cursor-pointer"
            type="range"
            x-model="total_value"
            min="5"
            max="15"
            step="5"
            @change="updateData('km', $event.target.value)"
          />
          <span class="range-text top-6 text-xs w-full flex justify-between">
            <span>5Km</span>
            <span>10Km</span>
            <span>15Km</span>
          </span>
        </div>
      </div> -->
    </div>

    <section
      v-show="loading"
      class="
        tutor-sec
        px-4
        sm:px-6
        lg:px-8
        xl:px-4
        py-12
        bg-gray-100
        flex
        justify-center
      "
    >
      <img src="../assets/img/loading1.gif" />
    </section>
    <section
      v-show="!loading"
      class="tutor-sec px-4 sm:px-6 lg:px-8 xl:px-4 py-12 bg-gray-100"
    >
      <div
        class="
          grid grid-cols-1
          max-w-6xl
          mx-auto
          sm:grid-cols-2
          md:grid-cols-2
          lg:grid-cols-3
          gap-12
        "
      >
        <a
          class="
            w-full
            max-w-md
            mx-auto
            bg-white
            rounded-lg
            p-12
            flex flex-col
            justify-center
            items-center
          "
          v-for="item in tutorData && tutorData.results"
          :key="item"
          :href="item.viewProfile.url"
          target="_blank"
        >
          <div class="mb-8">
            <img
              class="object-center object-cover rounded-full h-48 w-48"
              :src="item.profilePicture.url"
              alt="photo"
            />
          </div>
          <div class="text-center w-full">
            <p class="text-xl text-gray-700 font-bold">{{ item.name }}</p>
            <p class="flex justify-between w-full my-5 items-center">
              <span
                class="rounded-3xl px-3 text-sm py-1"
                :class="
                  tierColours[item.publicPrivateTutoringTier] &&
                  `${tierColours[item.publicPrivateTutoringTier].text}`
                "
                :style="
                  tierColours[item.publicPrivateTutoringTier] &&
                  `background: ${
                    tierColours[item.publicPrivateTutoringTier].bg
                  }`
                "
                >{{ item.publicPrivateTutoringTier }}</span
              >
              <span class="atar text-sm font-medium">{{ item.atar }} ATAR</span>
            </p>
            <p class="text-base text-gray-400 font-normal">
              <span
                class="rounded-3xl px-3 text-black text-sm py-1"
                :style="`background: ${
                  item.availabilityForPrivateTutoring === 'Available'
                    ? '#ade1b7'
                    : '#d88e8a'
                }`"
                >{{ item.availabilityForPrivateTutoring }}</span
              >
            </p>
          </div>
        </a>
      </div>
      <div class="w-full mt-12">
        <div
          class="
            py-2
            px-12
            w-max
            mx-auto
            rounded-3xl
            text-white
            bg-gray-400
            relative
          "
        >
          <button
            v-if="tutorData && tutorData.hasPreviousPage"
            @click="previous()"
            class="absolute -left-10"
            style="top: 50%; transform: translateY(-50%)"
          >
            <img class="w-5" src="../assets/img/arrow.svg" /></button
          ><span>Page {{ pageno }}</span
          ><button
            v-if="tutorData && tutorData.hasNextPage"
            @click="next()"
            class="absolute -right-10"
            style="top: 50%; transform: translateY(-50%)"
          >
            <img class="w-5 rotate180" src="../assets/img/arrow.svg" />
          </button>
        </div>
      </div>
    </section>

    <section class="cant-choose px-4 sm:px-6 lg:px-8 xl:px-4 py-12 bg-default">
      <div class="max-w-6xl flex mx-auto">
        <div class="choosee w-full text-center text-white">
          <h2 class="text-4xl font-bold capitalize">can't choose?</h2>
          <p class="max-w-xl text-lg my-5 mx-auto">
            Let us help you out. Answer a few questions and the KIS Team will
            recommend the perfect tutor for you
          </p>
          <button
            type="submit"
            class="
              inline-flex
              justify-center
              w-auto
              text-2xl
              py-2
              px-12
              rounded-md
              text-white
              bg-accent
              focus:outline-none
              font-semibold
            "
          >
            Find me a Tutor
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import Dropdown from "./Dropdown.vue";
import SearchableDropdown from "./SearchableDropdown.vue";

export default {
  components: {
    Dropdown,
    SearchableDropdown,
  },
  // Called before mounted
  // Earliest lifecycle hook for data fetching
  async created() {
    await this.getSubjectData();
    await this.getTutorData({
      paging: { first: 18, after: "" },
      filter: this.filterData,
    });
    this.filterData.location.within.km = 15;
    this.updateFilter(this.filterData);
  },
  name: "Home",
  data: function () {
    return {
      showPostcodeError: false,
      dropdownOpen: false,
      pageno: 1,
      paging: { first: 18, after: "" },
      stateData: ["VIC", "QLD", "WA", "NSW"],
      areasOfStudy: [
        "Medicine",
        "Law",
        "Engineering and IT",
        "Education",
        "Buisness and Economics",
        "Science and Biomedicine",
        "Arts/Humanities",
        "Design and Architecture",
        "Pharmaceutical Science and Health Sciences",
        "Languages",
        "Music",
      ],
      pricingTiers: ["Gold ($60/h)", "Platinum ($90/h)", "Executive ($150/h)"],
      filterNames: [
        "Tutor Area of Study",
        "Location",
        "Availability",
        "Pricing",
        "Gender",
      ],
      tierColours: {
        "Gold ($60/h)": {
          bg: "#f2e8a1",
          text: "text-black",
        },
        "Platinum ($90/h)": {
          bg: "#bebebe",
          text: "text-black",
        },
        "Executive ($150/h)": {
          bg: "black",
          text: "text-white",
        },
      },
    };
  },
  methods: {
    // Make store functions accessible from component
    ...mapActions(["getTutorData", "getSubjectData", "updateFilter"]),

    async next() {
      this.paging = {
        first: 18,
        after: this.tutorData.endCursor, // the id of a tutor
      };
      await this.getTutorData({ paging: this.paging, filter: this.filterData });
      this.pageno = this.pageno + 1;
    },

    previous: async function () {
      this.paging = {
        last: 18,
        before: this.tutorData.startCursor, // the id of a tutor
      };
      await this.getTutorData({ paging: this.paging, filter: this.filterData });
      this.pageno = this.pageno - 1;
    },
    updateData: async function (key, value) {
      switch (key) {
        case "state":
          value === "" || value === "All States"
            ? (this.filterData.state = {})
            : (this.filterData.state = { equals: value });
          this.updateFilter(this.filterData);
          break;
        case "subject":
          value === ""
            ? (this.filterData.subjects = {})
            : (this.filterData.subjects = {
                includes: this.subjectData.find(
                  (subject) => subject.subject === value
                ).id,
              });
          this.updateFilter(this.filterData);
          break;
        case "areaOfStudy":
          value === ""
            ? (this.filterData.areaOfStudy = {})
            : (this.filterData.areaOfStudy = { equals: value });
          this.updateFilter(this.filterData);
          break;
        case "availabilityForPrivateTutoring":
          value === ""
            ? (this.filterData.availabilityForPrivateTutoring = {})
            : (this.filterData.availabilityForPrivateTutoring = {
                equals: value,
              });
          this.updateFilter(this.filterData);
          break;
        case "km":
          value === ""
            ? (this.filterData.location.within = {
                km: "",
                of: this.filterData.location.within.of,
              })
            : (this.filterData.location.within = {
                km: value,
                of: this.filterData.location.within.of,
              });
          this.updateFilter(this.filterData);
          break;
        case "of":
          value === ""
            ? (this.filterData.location.within = {
                km: this.filterData.location.within.km,
                of: "",
              })
            : (this.filterData.location.within = {
                km: this.filterData.location.within.km,
                of: value,
              });
          this.updateFilter(this.filterData);
          this.showPostcodeError = !this.validPostcode;
          break;
        case "publicPrivateTutoringTier":
          value === ""
            ? (this.filterData.publicPrivateTutoringTier = {})
            : (this.filterData.publicPrivateTutoringTier = { equals: value });
          this.updateFilter(this.filterData);
          break;
        case "gender":
          value === ""
            ? (this.filterData.gender = {})
            : (this.filterData.gender = { equals: value });
          this.updateFilter(this.filterData);
          break;
        default:
      }
    },
    submitFilter: async function () {
      if (!this.validPostcode) {
        this.showPostcodeError = true;
        return;
      }
      this.pageno = 1;
      this.tutorData.after = "";
      this.tutorData.before = "";
      this.paging = {
        last: 18,
        before: "",
      };
      await this.getTutorData({ paging: this.paging, filter: this.filterData });
    },
  },
  computed: {
    ...mapGetters({
      tutorData: "StateTutorData",
      subjectData: "StateSubjectData",
      loading: "StateTutorDataLoading",
      filterData: "StateTutorFilterData",
    }),
    validPostcode() {
      const postcode = this.filterData.location.within.of;
      return postcode.length === 4 || postcode.length === 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rotate180 {
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}

.rotate270 {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
</style>
