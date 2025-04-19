<template>
  <aside
    id="sidenav-main"
    class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 ms-3"
    :class="`${
      isRTL ? 'me-3 rotate-caret fixed-end' : 'fixed-start ms-3'
    } ${sidebarType}`"
  >
    <div class="sidenav-header">
      <i
        class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none"
        aria-hidden="true"
        id="iconSidenav"
      ></i>
      <a class="m-0 navbar-brand navbar-brand-cus" href="/" style="margin-left: -20px !important;">

        <div class="icon icon-shape icon-cus shadow text-center border-radius-lg bg-gradient-success">
          <i class="opacity-10 text-white fas fa-landmark" aria-hidden="true"></i>
        </div>
        <span class="app-title text-white"
          >LOTTO CENTER</span
        >
      </a>
      <a href="#" @click="toogleNavbar" class="p-0 nav-link text-body lh-1" id="iconNavbarSidenav" style="float:right;margin-top: -44px;">
            <div class="sidenav-toggler-inner">
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
              <i class="sidenav-toggler-line"></i>
            </div>
          </a>
    </div>
    <hr class="horizontal light mt-0 mb-2" />
    <sidenav-list />
  </aside>
</template>
<script>
import SidenavList from "./SidenavList.vue";
import logo from "@/assets/img/logo-ct.png";
import logoDark from "@/assets/img/logo-ct-dark.png";
import { mapState } from "vuex";
import { mapMutations } from "vuex";

export default {
  name: "index",
  components: {
    SidenavList
  },
  data() {
    return {
      logo,
      logoDark,
    };
  },
  computed: {
    ...mapState(["isRTL", "sidebarType", "isDarkMode"]),
  },
  methods: {
    ...mapMutations(["navbarMinimize"]),
    toogleNavbar() {
      this.navbarMinimize();
    }
  },
};
</script>
