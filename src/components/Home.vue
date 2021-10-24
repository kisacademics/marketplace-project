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
      <Dropdown
        label="Subject"
        :options="
          subjectData ? subjectData.map((subject) => subject.subject) : []
        "
        initial="All Subjects"
        width="lg:w-1/2 w-full"
        emitType="subject"
        @option-changed="updateData"
      />
      <div class="flex space-x-5 lg:w-1/2 w-full mt-5 lg:mt-0">
        <Dropdown
          label="Availability"
          :options="['Available', 'Not Available']"
          initial="All Availabilities"
          emitType="availabilityForPrivateTutoring"
          width="w-1/2"
          @option-changed="updateData"
        />
        <Dropdown
          label="State"
          :options="stateData"
          initial="All States"
          width="w-1/2"
          emitType="state"
          @option-changed="updateData"
        />
      </div>
    </div>
    <div
      class="
        text-left
        md:max-w-6xl md:w-3/4
        w-11/12
        mx-auto
        mt-5
        flex
        items-center
        space-x-2
      "
    >
      <span class="text-sm sm:text-base">{{
        dropdownOpen ? "Less Filters" : "More Filters"
      }}</span>
      <button
        class="border border-gray-300 rounded-full p-2"
        @click="dropdownOpen = !dropdownOpen"
      >
        <img
          class="w-2 sm:w-3"
          :class="dropdownOpen ? 'rotate90' : 'rotate270'"
          src="../assets/img/arrow.svg"
        />
      </button>
    </div>
    <div v-if="dropdownOpen" class="md:max-w-6xl md:w-3/4 w-11/12 mx-auto">
      <div
        v-if="dropdownOpen"
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
      <div class="mt-5 flex flex-row space-x-5 lg:w-1/2 mx-auto w-full">
        <div class="flex flex-col w-1/2">
          <label class="text-left text-sm sm:text-base">Postcode</label>
          <input
            type="text"
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
      </div>
    </div>
    <div class="md:max-w-6xl md:w-3/4 w-11/12 mx-auto text-center my-10">
      <button
        class="
          py-2
          px-8
          rounded-md
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
              <a class="bg-gray-400 rounded-3xl px-3 text-sm py-1" href="">{{
                item.publicPrivateTutoringTier
              }}</a>
              <span class="atar text-sm font-medium">{{ item.atar }} ATAR</span>
            </p>
            <p class="text-base text-gray-400 font-normal">
              <span
                class="rounded-3xl px-3 available text-black text-sm py-1"
                :class="
                  item.availabilityForPrivateTutoring === 'Available'
                    ? 'bg-green-300'
                    : 'bg-yellow-500'
                "
                >{{ item.availabilityForPrivateTutoring }}</span
              >
            </p>
          </div>
        </a>
      </div>
      <div class="pagination w-full flex justify-center items-center mt-12">
        <span
          ><button
            :disabled="tutorData && !tutorData.hasPreviousPage"
            @click="previous()"
          >
            <a><img class="w-5" src="../assets/img/arrow.svg" /></a></button
        ></span>
        <button
          type="submit"
          class="
            inline-flex
            w-auto
            py-1
            px-12
            mx-8
            rounded-3xl
            text-white
            bg-gray-400
          "
        >
          Page {{ pageno }}
        </button>
        <span
          ><button
            :disabled="tutorData && !tutorData.hasNextPage"
            @click="next()"
          >
            <a
              ><img class="flip w-5" src="../assets/img/arrow.svg"
            /></a></button
        ></span>
      </div>
    </section>

    <section
      class="cant-choose px-4 sm:px-6 lg:px-8 xl:px-4 py-12 bg-indigo-600"
    >
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
              py-3
              px-8
              rounded-md
              text-white
              bg-accent
              focus:outline-none
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

export default {
  components: {
    Dropdown,
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
          this.showPostcodeError = !this.validPostcode();
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
      if (!this.validPostcode()) {
        this.showPostcodeError = true;
        return;
      }
      await this.getTutorData({ paging: this.paging, filter: this.filterData });
    },
    validPostcode() {
      const postcode = this.filterData.location.within.of;
      console.log("validating", postcode, postcode.length);

      return postcode.length === 4 || postcode.length === 0;
    },
  },
  computed: {
    ...mapGetters({
      tutorData: "StateTutorData",
      subjectData: "StateSubjectData",
      loading: "StateTutorDataLoading",
      filterData: "StateTutorFilterData",
    }),
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rotate90 {
  -webkit-transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -o-transform: rotate(90deg);
  -ms-transform: rotate(90deg);
  transform: rotate(90deg);
}

.rotate270 {
  -webkit-transform: rotate(-90deg);
  -moz-transform: rotate(-90deg);
  -o-transform: rotate(-90deg);
  -ms-transform: rotate(-90deg);
  transform: rotate(-90deg);
}
</style>
