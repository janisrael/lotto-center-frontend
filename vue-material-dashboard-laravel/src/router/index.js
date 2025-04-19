import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Tables from "../views/Tables.vue";
import Billing from "../views/Billing.vue";
import RTL from "../views/Rtl.vue";
import Notifications from "../views/Notifications.vue";
import Profile from "../views/Profile.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";

import Login from "../views/user/Login.vue";
import Signup from "../views/user/Signup.vue";
import PasswordForgot from "../views/user/PasswordForgot.vue";
import PasswordReset from "../views/user/PasswordReset.vue";
import UserProfile from "../views/user/profile/UserProfile.vue";
import Users from "../views/user/users/UsersList.vue";

// Helper function to check authentication (e.g., check token in localStorage)
function checkAuthentication() {
  const token = localStorage.getItem("token");  // Example: Check if token exists
  console.log(token)
  return token ? true : false;  // Return true if token exists, else false
}

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/login",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/results",
    name: "Results",
    component: Tables,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/billing",
    name: "Billing",
    component: Billing,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/rtl-page",
    name: "RTL",
    component: RTL,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: Notifications,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/sign-in",
    name: "SignIn",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/password-forgot",
    name: "Password Forgot",
    component: PasswordForgot,
  },
  {
    path: "/password-reset",
    name: "Password Reset",
    component: PasswordReset,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    component: UserProfile,
    meta: { requiresAuth: true },  // Protect this route
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    meta: { requiresAuth: true },  // Protect this route
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Global beforeEach navigation guard
router.beforeEach((to, from, next) => {
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = checkAuthentication();  // Check if user is authenticated

    if (isAuthenticated) {
      next();  // Allow access to the route
    } else {
      next({ name: "Login" });  // Redirect to login if not authenticated
    }
  } else {
    next();  // Allow access to routes that do not require authentication
  }
});

export default router;
