<template>
  <div :class="width">
    <label
      class="block font-medium text-gray-700 text-left text-sm sm:text-base"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        ref="input"
        type="text"
        class="
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
          space-x-2
          text-sm
          sm:text-base
        "
        :value="searchValue || dropdownOpen ? searchValue : initial"
        @input="setInput"
        @click="toggleDropdown"
        @blur="testBlur"
      />
      <svg
        v-if="!dropdownOpen"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 absolute right-4 sm:top-3 top-2 cursor-pointer"
        @click="svgOpen"
        fill="none"
        viewBox="0 0 24 24"
        stroke="#9ca3af"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>

    <ul
      ref="dropdown"
      :hidden="!dropdownOpen"
      :style="{ width: inputWidth + 'px' }"
      class="
        absolute
        z-10
        mt-1
        bg-white
        shadow-lg
        max-h-60
        rounded-md
        py-1
        ring-1 ring-black ring-opacity-5
        overflow-auto
        focus:outline-none
        sm:text-sm
      "
      tabindex="-1"
    >
      <li
        v-for="option of filteredOptions"
        :key="option"
        class="
          group
          text-gray-900
          cursor-default
          select-none
          py-2
          px-3
          flex
          justify-between
          hover:text-white
          z-100
          hover:bg-blue-800
        "
        id="listbox-option-0"
        role="option"
        @click="selectOption(option)"
      >
        <span class="font-normal block truncate text-sm sm:text-base">{{
          option
        }}</span>
        <span
          v-if="
            selectedOption === option || (!selectedOption && option === initial)
          "
          class="text-blue-800 flex items-center group-hover:text-white"
        >
          <!-- Heroicon name: solid/check -->
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: ["label", "options", "initial", "width", "emitType", "selectedOption"],
  mounted() {
    this.$refs["dropdown"].addEventListener("mouseenter", () => {
      this.mouseOverOptions = true;
    });
    this.$refs["dropdown"].addEventListener("mouseleave", () => {
      this.mouseOverOptions = false;
    });
    window.addEventListener("resize", () => {
      if (!this.$refs["input"]) return;
      this.inputWidth = this.$refs["input"].offsetWidth;
    });
    this.searchValue = this.selectedOption;
    this.inputWidth = this.$refs["input"].offsetWidth;
  },
  data() {
    return {
      dropdownOpen: false,
      mouseOverOptions: false,
      inputWidth: null,
      searchValue: "",
    };
  },
  methods: {
    setInput(e) {
      this.searchValue = e.target.value;
    },
    setDropdownState(state) {
      this.dropdownOpen = state;
      if (state === false) this.$refs["input"].blur();
    },
    selectOption(option) {
      this.searchValue = option;
      this.setDropdownState(false);
      // If option changed to is initial, set to empty string
      const emitOption = option === this.initial ? "" : option;
      this.$emit("option-changed", this.emitType, emitOption);
    },
    testBlur() {
      if (!this.mouseOverOptions) {
        this.setDropdownState(false);
        this.searchValue = this.selectedOption;
      }
    },
    svgOpen() {
      this.$refs["input"].focus();
      this.searchValue = "";
      this.dropdownOpen = true;
    },
    toggleDropdown() {
      this.searchValue = "";
      this.dropdownOpen = !this.dropdownOpen;
      if (!this.dropdownOpen) this.$refs["input"].blur();
    },
  },
  computed: {
    filteredOptions() {
      return [this.initial, ...this.options].filter((option) => {
        const lower = option.toLowerCase();
        if (!this.searchValue) return true;
        const input = this.searchValue.toLowerCase();
        if (input === "") return true;
        return lower.includes(input);
      });
    },
  },
  watch: {
    selectedOption() {
      this.searchValue = this.selectedOption;
    },
  },
};
</script>

<style scoped>
</style>
