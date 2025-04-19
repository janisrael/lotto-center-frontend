<template>
  <div class="py-4 container-fluid">
    <div class="row mb-4">
      <div class="col-lg-12 position-relative z-index-2">
       
        <div class="row mt-4" style="margin-top: 0px !important;">
          <div class="col-lg-4 col-md-6 mt-4">
            <!-- <chart-holder-card
              title="Daily Sales"
              subtitle="(<span class='font-weight-bolder'>+15%</span>) increase in today sales."
              update="updated 4 min ago"
              color="success"
            >
              <reports-line-chart
                :chart="{
                  labels: [
                    'Apr 1',
                    'May 1',
                    'Jun 1',
                    'Jul 1',
                    'Aug 1',
                    'Sep 1',
                    'Oct 1',
                    'Nov 1',
                    'Dec 1',
                  ],
                  datasets: {
                    label: 'Mobile apps',
                    data: [50, 40, 300, 320, 500, 350, 200, 230, 1000],
                  },
                }"
              />
            </chart-holder-card> -->
            <!-- <h1>{{  lottoResult  }} </h1> -->
            <game-holder-card
              v-if="lottoResult"
              title="Lotto Max Prize"
              :jackpot="lottoResult.jackpot[0].prize"
              subtitle="Tuesday | Friday"
              update="get your ticket now"
              type="lottomax"
              next_draw="Next Draw"
            >

            </game-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <game-holder-card
             v-if="lottoResult"
              title="Lotto 6-49"
              :jackpot="lottoResult.jackpot[2].prize"
              subtitle="Wednesdays | Saturdays"
              update="get your ticket now"
              type="lotto649"
              next_draw="Next Draw"
            >

            </game-holder-card>
          </div>
          <div class="col-lg-4 mt-4">
            <game-holder-card
             v-if="lottoResult"
              title="Lotto Daily Grand"
              :jackpot="lottoResult.jackpot[4].prize"
              subtitle="Monday | Thursday"
              update="get your ticket now"
              type="dailygrand"
              next_draw="Next Draw"
            >

            </game-holder-card>
          </div>
        </div>
        <!-- Western Lotto -->
        <div class="row mt-4">
          <div class="col-lg-4 col-md-6 mt-4">
            <game-holder-card
             v-if="lottoResult"
              title="Western Lotto Max Prize"
              :jackpot="lottoResult.jackpot[1].prize"
              subtitle="Tuesday | Friday"
              update="get your ticket now"
              type="lottomax-western"
              next_draw="Next Draw"
            >

            </game-holder-card>
          </div>
          <div class="col-lg-4 col-md-6 mt-4">
            <game-holder-card
             v-if="lottoResult"
              title="Western Lotto 6-49"
              :jackpot="lottoResult.jackpot[3].prize"
              subtitle="Wednesdays | Saturdays"
              update="get your ticket now"
              type="lotto649-western"
              next_draw="Next Draw"
            >

            </game-holder-card>
          </div>
        </div>

        
        <div class="row pills-preview-result">
          <h3 style="padding-bottom: 30px; padding-left: 30px;">Statistics</h3>
          <div class="col-lg-cus col-lg-2 col-md-6 col-sm-6">
            <mini-statistics-card
              :title="{ text: 'Today\'s Money', value: '$53k' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+55%</span> than last week"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'dark',
              }"
            />
          </div>
          <div class="col-lg-cus col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Today\'s Users', value: '2,300' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+3%</span> than last month"
              :icon="{
                name: 'leaderboard',
                color: 'text-white',
                background: 'primary',
              }"
            />
          </div>
          <div class="col-lg-cus col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'New Clients', value: '3,462' }"
              detail="<span class='text-danger text-sm font-weight-bolder'>-2%</span> than yesterday"
              :icon="{
                name: 'person',
                color: 'text-white',
                background: 'success',
              }"
            />
          </div>
          <div class="col-lg-cus col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Sales', value: '$103,430' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+5%</span> Just updated"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
          <div class="col-lg-cus col-lg-2 col-md-6 col-sm-6 mt-lg-0 mt-4">
            <mini-statistics-card
              :title="{ text: 'Sales', value: '$103,430' }"
              detail="<span class='text-success text-sm font-weight-bolder'>+5%</span> Just updated"
              :icon="{
                name: 'weekend',
                color: 'text-white',
                background: 'info',
              }"
            />
          </div>
        </div>


      </div>
    </div>

    <div class="row">
      <h3 style="padding-bottom: 30px; padding-left: 30px;">Recent Draws</h3>
      <div class="col-lg-8 col-md-6 mb-md-0 mb-4">
        <RecentResultCard
          v-if="lottoResult"
          title="Recent Draw Results"
          description="<i class='fa fa-check text-info' aria-hidden='true'></i> <span class='font-weight-bold ms-1'>30 done</span> this month"
          :headers="['Game', 'Winning Number', 'Draw Date', 'Bonus', 'Extra', 'Winner']"
          :projects="lottoResult.results"
          @getdetails="getDetails"
        />
      </div>
      <div class="col-lg-4 col-md-6">
        <RecentResultDetails 
        :result_details="result_details"
        ></RecentResultDetails>
        <!-- <timeline-list
          class="h-100"
          title="Orders overview"
          description="<i class='fa fa-arrow-up text-success' aria-hidden='true'></i>
        <span class='font-weight-bold'>24%</span> this month"
        >
          <timeline-item
            :icon="{
              component: 'notifications',
              class: 'text-success',
            }"
            title="$2400 Design changes"
            date-time="22 DEC 7:20 PM"
          />
          <TimelineItem
            :icon="{
              component: 'code',
              class: 'text-danger',
            }"
            title="New order #1832412"
            date-time="21 DEC 11 PM"
          />
          <TimelineItem
            :icon="{
              component: 'shopping_cart',
              class: 'text-info',
            }"
            title="Server payments for April"
            date-time="21 DEC 9:34 PM"
          />
          <TimelineItem
            :icon="{
              component: 'credit_card',
              class: 'text-warning',
            }"
            title="New card added for order #4395133"
            date-time="20 DEC 2:20 AM"
          />
          <TimelineItem
            :icon="{
              component: 'vpn_key',
              class: 'text-primary',
            }"
            title="Unlock packages for development"
            date-time="18 DEC 4:54 AM"
            class="pb-1"
          />
        </timeline-list> -->
      </div>
    </div>
  </div>
</template>
<script>
// import ChartHolderCard from "./components/ChartHolderCard.vue";
import GameHolderCard from "./components/GameHolderCard.vue";
// import ReportsBarChart from "@/examples/Charts/ReportsBarChart.vue";
// import ReportsLineChart from "@/examples/Charts/ReportsLineChart.vue";
import MiniStatisticsCard from "./components/MiniStatisticsCard.vue";
// import ProjectCard from "./components/ProjectCard.vue";
// import TimelineList from "@/examples/Cards/TimelineList.vue";
// import TimelineItem from "@/examples/Cards/TimelineItem.vue";
import logoXD from "@/assets/img/small-logos/logo-xd.svg";
import logoAtlassian from "@/assets/img/small-logos/logo-atlassian.svg";
import logoSlack from "@/assets/img/small-logos/logo-slack.svg";
import logoSpotify from "@/assets/img/small-logos/logo-spotify.svg";
import logoJira from "@/assets/img/small-logos/logo-jira.svg";
import logoInvision from "@/assets/img/small-logos/logo-invision.svg";
import team1 from "@/assets/img/team-1.jpg";
import team2 from "@/assets/img/team-2.jpg";
import team3 from "@/assets/img/team-3.jpg";
import team4 from "@/assets/img/team-4.jpg";
import RecentResultCard from "./components/RecentResultCard.vue";
import RecentResultDetails from "./components/RecentResultDetails.vue";
// import { mapState } from "vuex";
export default {
  name: "dashboard-default",
  data() {
    return {
      logoXD,
      team1,
      team2,
      team3,
      team4,
      logoAtlassian,
      logoSlack,
      logoSpotify,
      logoJira,
      logoInvision,
      result_details: {}
    };
  },
  components: {
    // ChartHolderCard,
    GameHolderCard,
    // ReportsBarChart,
    // ReportsLineChart,
    MiniStatisticsCard,
    // ProjectCard,
    RecentResultCard,
    RecentResultDetails,
    // TimelineList,
    // TimelineItem,
  },
  computed: {
    lottoResult() {
      return this.$store.getters["result/getLottoResult"];
    }
  },
  methods: {
    getDetails(value) {
      this.result_details = value
    }
  },
};
</script>
