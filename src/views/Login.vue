<template>
  <div class="d-flex justify-content-center flex-wrap">
    <b-card
      style="min-width: 20rem;"
      class="mb-1"
      border-variant="warning"
      header="Social OC"
      header-bg-variant="warning"

    >
     <div>
        <form>
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email"  placeholder="Email" class="form-control" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" placeholder="Password" class="form-control" />
            </div>
            <button type="submit" class="btn btn-outline-warning m-2">Sign In</button>
            <p class="forgot-password text-right mt-2 mb-4">
                <router-link class="link" to="/forgot-password">Forgot password ?</router-link>
            </p>
            <!-- <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                </ul>
            </div> -->
        </form>
    </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  }
}
</script>
<style>
.link{
    text-decoration-line: none;
}
</style>