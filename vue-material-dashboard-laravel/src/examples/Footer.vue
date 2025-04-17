<template>
  <footer class="py-3 footer">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="mb-4 col-lg-6 mb-lg-0">
          <div class="text-sm text-center copyright text-muted"
            :class="this.$store.state.isRTL ? 'text-lg-end' : 'text-lg-start'">
            © {{ new Date().getFullYear() }}, made with
            <i class="fa fa-heart" aria-hidden="true"></i>Care by
            <a href="https://www.sourceselect.ca" class="font-weight-bold" target="_blank">Source Select</a>.
          </div>
        </div>
        <div class="col-lg-6">
          <ul class="nav nav-footer justify-content-center justify-content-lg-end">
            <li class="nav-item">
                <a href="https://sourceselect.ca" class="nav-link" target="_blank">Source Select</a>
            </li>
            <li class="nav-item">
                <a href="https://www.source-select.ca/about-us" class="nav-link"
                    target="_blank">About Us</a>
            </li>
            <li class="nav-item">
                <a href="https://www.sourceselect.ca/contact-us" class="nav-link"
                    target="_blank">Contact</a>
            </li>
            <li class="nav-item">
                <a href="" class="nav-link pe-0"
                    target="_blank">License</a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "app-footer",
};
</script>
