<template>
  <!-- <header
    class="
      navigation-div
      w-full
      top-0
      bg-default
      z-50
      px-4
      sm:px-6
      lg:px-8
      xl:px-4
    "
  >
    <div class="relative max-w-5xl mx-auto">
      <nav
        class="relative flex items-center justify-between lg:justify-start"
        aria-label="Global"
      >
        <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div class="flex items-center justify-between w-full md:w-auto">
            <a href="#">
              <span class="sr-only">Kis Academics</span>
              <img
                class="logo-img w-auto h-32 mt-5"
                src="../assets/img/logo.png"
              />
            </a>
          </div>
        </div>
      </nav>
    </div>
  </header>
  <section
    class="
      sm:text-center
      lg:text-left
      sm:flex-row
      flex-wrap
      sm:py-16
      px-4
      sm:px-6
      lg:px-8
      xl:px-4
      bg-default
    "
  >
    <div class="max-w-5xl items-center flex sm:flex-row flex-col mx-auto">
      <div class="sm:w-1/2 w-full sm:text-left text-center">
        <p
          class="text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl uppercase"
        >
          Kis Academics
        </p>
        <h1
          class="
            font-bold
            text-white text-5xl
            lg:text-7xl
            hero-h1
            home-hero-h1
            sm:mb-0
            mb-8
          "
        >
          <span class="block">Find your</span>
          <span class="block"><i class="relative">perfect</i> tutor</span>
        </h1>
      </div>
      <div class="sm:w-1/2 w-full">
        <div class="right-text sm:w-full w-72 mx-auto">
          <ul
            class="
              ul-list
              text-white
              font-medium
              xl:pl-10
              green-check
              text-left
              sm:pl-14
            "
          >
            <li class="sm:mb-8 mb-4 relative">Median ATAR of 99.50</li>
            <li class="sm:mb-8 mb-4 relative">
              Free study skills consultation
            </li>
            <li class="sm:mb-0 mb-10 relative">
              Working with children's checks
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section> -->
  <section class="bg-default">
    <div class="max-w-5xl w-3/4 mx-auto py-10 pb-12">
      <!-- section with logo and title -->
      <div
        class="
          flex
          md:justify-between md:flex-row
          flex-col
          justify-center
          items-center
        "
      >
        <div>
          <img
            class="mx-auto logo-img w-auto h-32 xl:h-40"
            src="../assets/img/logo.png"
          />
        </div>

        <div class="mt-8 md:mt-0">
          <h1
            class="
              font-bold
              text-white text-5xl
              xl:text-7xl
              hero-h1
              home-hero-h1
            "
          >
            <span class="block">Find your</span>
            <span class="block"><i class="relative">perfect</i> tutor</span>
          </h1>
        </div>
      </div>
      <!-- Three ticks -->
      <div
        class="
          mt-12
          text-white
          font-semibold
          flex
          md:justify-between
          flex-col
          md:flex-row
          justify-center
          mx-auto
          md:w-full
          xl:text-base
          text-sm
          space-y-5
          w-max
          items-baseline
          h-min
        "
      >
        <div
          v-for="message of [
            'Median ATAR of 99.50',
            'Free study skills consultation',
            'Working with children\'s checks',
          ]"
          :key="message"
          class="flex items-center h-min"
        >
          <div
            class="
              bg-green-500
              rounded-full
              w-6
              h-6
              flex
              justify-center
              text-black
              items-center
              mr-2
            "
          >
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
          </div>
          <span>{{ message }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
} */
</style>
