<template>
  <div :class="width">
    <label class="block text-sm font-medium text-gray-700 text-left">
      {{ label }}
    </label>
    <button
      ref="button"
      type="button"
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
        sm:text-sm
        flex
        justify-between
      "
      @click="toggleDropdown"
      @blur="testBlur"
    >
      <span class="block truncate">{{ selectedOption || initial }}</span>
      <span>
        <!-- Heroicon name: solid/selector -->
        <svg
          class="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <ul
      ref="dropdown"
      :hidden="!dropdownOpen"
      :class="width"
      class="
        absolute
        z-10
        mt-1
        bg-white
        shadow-lg
        max-h-60
        rounded-md
        py-1
        text-base
        ring-1 ring-black ring-opacity-5
        overflow-auto
        focus:outline-none
        sm:text-sm
      "
      tabindex="-1"
    >
      <li
        v-for="option of [initial, ...options]"
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
        <span class="font-normal block truncate">{{ option }}</span>
        <span
          v-if="option === selectedOption"
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
  props: ["label", "options", "initial", "width", "emitType"],
  mounted() {
    this.$refs["dropdown"].addEventListener("mouseenter", () => {
      this.mouseOverOptions = true;
    });
    this.$refs["dropdown"].addEventListener("mouseleave", () => {
      this.mouseOverOptions = false;
    });
    this.selectedOption = this.initial;
  },
  data() {
    return {
      dropdownOpen: false,
      selectedOption: null,
      mouseOverOptions: false,
    };
  },
  methods: {
    setDropdownState(state) {
      this.dropdownOpen = state;
      if (state === false) this.$refs["button"].blur();
    },
    selectOption(option) {
      this.selectedOption = option;
      this.setDropdownState(false);
      // If option changed to is initial, set to empty string
      const emitOption = option === this.initial ? "" : option;
      this.$emit("option-changed", this.emitType, emitOption);
    },
    testBlur() {
      if (!this.mouseOverOptions) this.setDropdownState(false);
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
      if (this.dropdownOpen === false) this.$refs["button"].blur();
    },
  },
};
</script>

<style scoped>
</style>
