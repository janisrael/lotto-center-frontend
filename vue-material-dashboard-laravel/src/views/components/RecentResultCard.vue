<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>{{ title }}</h6>
          <p class="text-sm mb-0" v-html="description"></p>
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <a
              class="cursor-pointer"
              id="dropdownTable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
            </a>
            <ul
              class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
              aria-labelledby="dropdownTable"
              style=""
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  AnotherAction
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  SomethingElse
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                v-for="(heading, index) of headers"
                :key="index"
                :class="[
                  index === 1 ? 'ps-2' : '',
                  index >= 2 ? 'text-center' : '',
                ]"
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                {{ heading }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(
                { name, draw_date, bonus, extra, numbers, prize_details_data },
                index
              ) of projects"
              :key="index"
              @click="handleRow(index, prize_details_data, numbers)"
              :class="{ 'selected-row': selectedIndex === index }"
            >
              <td>
                <div class="d-flex px-2 py-1">
                  <div>
                    <img src="#" class="avatar avatar-sm me-3" alt="Logo" />
                  </div>
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">{{ name }}</h6>
                  </div>
                </div>
              </td>
              <td>
                <div class="avatar-group mt-2">
                  <material-badge
                    v-for="(number, index) of numbers"
                    :key="index"
                    variant="gradient"
                    size="lg"
                  >
                    {{ number }}
                  </material-badge>
                  <!-- <a
                      v-for="(member, index) of numbers"
                      :key="index"
                      href="javascript:;"
                      class="avatar avatar-xs rounded-circle"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      title=""
                      data-bs-original-title=""
                    >
                    {{ member }}
                      <img :src="member" alt="Team member" />
                    </a> -->
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-md font-weight-bold">
                  {{ dateFormatter(draw_date) }}
                </span>
              </td>
              <td class="align-middle d-flex justify-content-end">
                <div
                  class="progress-wrapper w-75 mx-auto"
                  style="text-align: center"
                >
                  <span class="text-md font-weight-bold">
                    {{ bonus }}
                    <!-- {{ percentage }}% -->
                  </span>
                  <!-- <div class="progress-info">
                      <div class="progress-percentage">
                        
                      </div>
                    </div> -->
                  <!-- <div class="progress">
                      <div
                        class="progress-bar"
                        :class="`w-${percentage}  bg-gradient-${color}`"
                        role="progressbar"
                        :aria-valuenow="percentage"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div> -->
                </div>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-md font-weight-bold"> {{ extra }} </span>
              </td>
              <td class="align-middle text-center text-sm">
                <span class="text-md font-weight-bold">
                  {{ prize_details_data.prize_data[0].winners }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import MaterialBadge from "@/components/MaterialBadge.vue";
export default {
  name: "projectCard",
  components: {
    MaterialBadge,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    headers: {
      type: Array,
      required: true,
    },
    projects: {
      type: Array,
      required: true,
      logo: String,
      title: String,
      members: Array,
      budget: String,
      progress: {
        type: Object,
        percentage: Number,
        color: String,
      },
    },
  },
  data() {
    return {
      selectedIndex: null,
    };
  },
  methods: {
    dateFormatter(date) {
      const nextDraw = new Date(date);
      let date_format = `${nextDraw.toLocaleString("en-US", {
        weekday: "long",
      })} ${nextDraw.toLocaleString("en-US", {
        month: "long",
      })} ${nextDraw.getDate()}, ${nextDraw.getFullYear()}`;

      return date_format;
    },
    handleRow(index, prizeDetails, numbers) {
  
      const formatted = numbers.join("-");
      let prize_data = {
        'winning_number': formatted,
        'details': prizeDetails
      }
      this.$emit("getdetails", prize_data);
      this.selectedIndex = index;
      console.log(prizeDetails); // your existing logic
    },
  },
};
</script>
<style scoped>
.table tr:hover {
  background-color: #49a3f127; /* Change to your desired color */
  cursor: pointer;
}
.table tr {
  transition: all 0.2s ease-in-out !important;
}

.selected-row {
  background-color: #49a3f148; /* change to any highlight color you want */
  transition: background-color 0.3s ease;
}
</style>
