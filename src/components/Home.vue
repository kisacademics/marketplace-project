<template>
  <main class="mx-auto max-w-full main-content">
    <section class="sm:text-center lg:text-left sm:flex-row flex-wrap lg:pt-36 lg:pb-32 sm:py-16 hero-sec home-sec1 px-4 sm:px-6 lg:px-8 xl:px-4 bg-default">
      <div class="max-w-6xl items-center flex sm:flex-row flex-col mx-auto">
        <div class="sm:w-1/2 w-full sm:text-left text-center">
          <p class="mt-3 text-base text-white sm:mt-5 sm:text-lg sm:max-w-xl uppercase"> Kis Academics </p>
          <h1 class="font-bold text-white text-5xl lg:text-7xl hero-h1 home-hero-h1 sm:mb-0 mb-8">
            <span class="block">Find your</span>
            <span class="block"><i class="relative">perfect</i> tutor</span>
          </h1>
        </div>
        <div class="sm:w-1/2 w-full">
          <div class="right-text sm:w-full w-72 mx-auto">
            <ul class="ul-list text-white font-medium xl:pl-10 green-check text-left sm:pl-14">
              <li class="sm:mb-8 mb-4 relative">Median ATAR of 99.50</li>
              <li class="sm:mb-8 mb-4 relative">Free study skills consultation</li>
              <li class="sm:mb-0 mb-10 relative">Working with children's checks</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="filter-sec pt-12 pb-10  px-4 sm:px-6 lg:px-8 xl:px-4">
      <div class="max-w-6xl w-full filter-div mx-auto">
        <!-- <form > -->
          <div class="sm:rounded-md">
            <div class="bg-white">
              <div class="grid grid-cols-4 gap-4">
                <div class="col-span-4 sm:col-span-2">
                  <select class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none bg-white h-10" @change="updateData('subject',$event.target.value)">
                    <option value="">Select Subject</option>
                    <option v-for="(item) in subjectData" :key="item" :value="item.id">{{item.subject}}</option>
                  </select>
                  <!-- <input placeholder="Subject" type="text" name="subject" id="subject" autocomplete="given-name" class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none"> -->
                </div>
                <div class="col-span-2 sm:col-span-1">
                   <select class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none bg-white h-10" @change="updateData('state',$event.target.value)">
                    <option value="">Select State</option>
                    <option v-for="(item) in stateData" :key="item" >{{item}}</option>
                  </select>
                  <!-- <input placeholder="State" type="text" class="px-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none" @change="updateData('state',$event.target.value)"> -->
                </div>
                <div class="col-span-2 sm:col-span-1">
                  <button class="inline-flex justify-center w-full py-2 px-4 border shadow-sm rounded-md text-white bg-accent focus:outline-none" @click="submitFilter()"> Let's Go </button>
                </div>              
              </div>
            </div>
          </div>
        <!-- </form> -->

        <!-- This example requires Tailwind CSS v2.0+ -->
        <div class="more_filters relative inline-block text-left w-full mt-4">
          <button v-show="!dropdownOpen" @click="dropdownOpen=!dropdownOpen" class="w-32 relative z-10 block rounded-md bg-white p-2 pr-4 focus:outline-none rounded-md border border-gray-300 shadow-sm mb-4">
            <svg class="h-5 w-5 text-gray-800 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg> More Filter
          </button>
          <button v-show="dropdownOpen"  @click="dropdownOpen=!dropdownOpen" class="w-32 relative z-10 block rounded-md bg-white p-2 pr-4 focus:outline-none rounded-md border border-gray-300 shadow-sm mb-4">
            <svg class="h-5 w-5 transform rotate-180 text-gray-800 inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg> Less Filter
          </button>
          
          <div v-show="dropdownOpen" class="origin-top-right mf-box flex gap-4 sm:gap-12 md:gap-20 right-0 mt-2 w-full  bg-white focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" style="display: none;">
            <div class="w-1/2">
              <p class="w-full mb-4 filterr flt1 max-w-xs">
                <input type="text" class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none" placeholder="Uni Degree" @change="updateData('areaOfStudy',$event.target.value)">
              </p>
              <p class="w-full mb-4 filterr flt2 max-w-xs">
                 <select class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none bg-white h-10" @change="updateData('availabilityForPrivateTutoring',$event.target.value)">
                    <option value="">Select Availability</option>
                    <option value="Availability">Availability</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                <!-- <input type="text" class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none" placeholder="Availability"> -->
              </p>
              <p class="w-full mb-0 filterr flt3 max-w-xs">
                <input type="text" class="px-4 py-2 rounded-lg border w-full border-gray-300 focus:outline-none" placeholder="Pricing" @change="updateData('publicPrivateTutoringTier',$event.target.value)">
              </p>
            </div>
            <div class="w-1/2 right-range border-none">
              <p class="w-full mb-8 sm:mb-12 filterr flt4 max-w-xs">
                <label>For In-Person Tutoring:</label>
                <input type="text" class="px-4 py-2 mt-4 rounded-lg border w-full border-gray-300 focus:outline-none" placeholder="Postcode" @change="updateData('of',$event.target.value)">
              </p>
              <div class="w-full mb-0 filterr flt5 max-w-xs">
                <div class="w-auto rangefilter">
                  <div x-data="{total_value:50}" class="relative max-w-screen-xl mx-auto range-txt">
                    <input class="w-full py-2" type="range" x-model="total_value" min="5" max="15" step="5" @change="updateData('km',$event.target.value)">
                    <span class="range-text top-6 text-xs absolute w-full flex justify-between">
                      <span>5Km</span>
                      <span>10Km</span>
                      <span>15Km</span>
                    </span>
                  </div>
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-show="loading" class="tutor-sec px-4 sm:px-6 lg:px-8 xl:px-4 py-12 bg-gray-100 flex justify-center">
      <img src="../assets/img/loading1.gif">
    </section>
    <section v-show="!loading" class="tutor-sec px-4 sm:px-6 lg:px-8 xl:px-4 py-12 bg-gray-100" >
      <div class="grid grid-cols-1 max-w-6xl mx-auto sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <a class="w-full max-w-md mx-auto bg-white rounded-lg p-12 flex flex-col justify-center items-center" v-for="(item) in tutorData && tutorData.results" :key="item" :href="item.viewProfile.url" target="_blank">
          <div class="mb-8">
            <img class="object-center object-cover rounded-full h-48 w-48" :src="item.profilePicture[0].url" alt="photo">
          </div>
          <div class="text-center w-full" >
            <p class="text-xl text-gray-700 font-bold">{{item.name}}</p>
            <p class="flex justify-between w-full my-5 items-center"><a class="bg-gray-400 rounded-3xl px-3 text-sm py-1" href="">{{item.publicPrivateTutoringTier}}</a> <span class="atar text-sm font-medium">{{item.atar}} ATAR</span></p>
            <p class="text-base text-gray-400 font-normal"><span class="bg-green-300 rounded-3xl px-3 available text-black text-sm py-1">{{item.availabilityForPrivateTutoring}}</span></p>
          </div>
        </a>
      </div>
      <div class="pagination w-full flex justify-center items-center mt-12">
        <span><button :disabled="tutorData && !tutorData.hasPreviousPage" @click="previous()"><a ><img class="w-5" src="../assets/img/arrow.svg"></a></button></span>
        <button type="submit" class="inline-flex w-auto py-1 px-12 mx-8 rounded-3xl text-white bg-gray-400"> Page {{pageno}} </button>
        <span><button :disabled="tutorData && !tutorData.hasNextPage" @click="next()"><a ><img class="flip w-5" src="../assets/img/arrow.svg"></a></button></span>
      </div>
    </section>

    <section class="cant-choose px-4 sm:px-6 lg:px-8 xl:px-4 py-12 bg-indigo-600">
      <div class="max-w-6xl flex mx-auto">
        <div class="choosee w-full text-center text-white">
          <h2 class="text-4xl font-bold capitalize">can't choose?</h2>
          <p class="max-w-xl text-lg my-5 mx-auto">Let us help you out. Answer a few questions and the KIS Team will recommend the perfect tutor for you</p>
          <button type="submit" class="inline-flex justify-center w-auto text-2xl py-3 px-8 rounded-md text-white bg-accent focus:outline-none"> Find me a Tutor </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions,mapGetters } from "vuex";

export default {
  /**Function for calling api */
  async created() {
      await this.getSubjectData();
      await this.getTutorData({paging:{first: 10,after: ""},filter:this.filterData});
      console.log(this.subjectData,"tutorData",this.tutorData,"filterdata",this.filterData);
  },
  name: 'Home',
  data:function(){
    return{
      dropdownOpen:false,
      pageno:1,
      paging:{first: 10,after: ""},
      state:null,
      subject:null,
      location:null,
      atar:null,
      availabilityForPrivateTutoring:null,
      areaOfStudy:null,
      publicPrivateTutoringTier:null,
      stateData:[
        'VIC',
        'QLD',
        'WA',
        'NSW'
      ]
    }
  },
  methods: {
    /**State management */
    ...mapActions([
      "getTutorData",
      "getSubjectData",
      "updateFilter"
      ]),
    next:async function(){
      this.paging = {
        first: 10,
        after: this.tutorData.endCursor, // the id of a tutor
      }
      await this.getTutorData({paging:this.paging,filter:this.filterData});
      this.pageno=this.pageno+1
    },
    previous:async function(){
      this.paging = {
        last: 10,
        before: this.tutorData.startCursor, // the id of a tutor
      }
      await this.getTutorData({paging:this.paging,filter:this.filterData});
      this.pageno=this.pageno-1
    },
    updateData:async function(key,value){
      switch(key){
        case 'state' :
          value === "" ? this.filterData.state = {} : this.filterData.state = {equals : value};
          this.updateFilter(this.filterData);
          break;
        case 'subject':
          value === "" ? this.filterData.subjects={} : this.filterData.subjects = {includes : value};
          this.updateFilter(this.filterData);
          break;
        case 'areaOfStudy':
          value === "" ? this.filterData.areaOfStudy = {} : this.filterData.areaOfStudy = {equals : value};
          this.updateFilter(this.filterData);
          break;
        case 'availabilityForPrivateTutoring' :
          value === "" ? this.filterData.availabilityForPrivateTutoring = {} : this.filterData.availabilityForPrivateTutoring = {equals : value};
          this.updateFilter(this.filterData);
          break;
        case 'km' :
          value === "" ? this.filterData.location.within = {km : "",of:this.filterData.location.within.of} : this.filterData.location.within = {km : value,of:this.filterData.location.within.of};
          this.updateFilter(this.filterData);
          break;
        case 'of' :
           value === "" ? this.filterData.location.within = {km : this.filterData.location.within.km,of:""} : this.filterData.location.within = {km : this.filterData.location.within.km,of:value};
          this.updateFilter(this.filterData);
          break;
        case 'publicPrivateTutoringTier' :
          value === "" ? this.filterData.publicPrivateTutoringTier = {} : this.filterData.publicPrivateTutoringTier = {equals : value};
          this.updateFilter(this.filterData);
          break;
        default :

      }
    },
    submitFilter:async function(){
      await this.getTutorData({paging:this.paging,filter:this.filterData});
    }
  },
   computed: {
    ...mapGetters({ 
        tutorData: "StateTutorData",
        subjectData : "StateSubjectData",
        loading: "StateTutorDataLoading",
        filterData: "StateTutorFilterData"
      }),
  },
}
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
