<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          <router-link to="/"><i class="fab fa-galactic-senate fa-2x"> Sigem</i></router-link> 
        </a>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item">
            <router-link to="/"><i class="fas fa-rocket "> Home</i></router-link> 
          </a>
          <a class="navbar-item">
            <router-link to="/trip"><i class="fas fa-calendar-alt"> Trips</i></router-link>
          </a>
          <a class="navbar-item">
            <router-link to="/review"><i class="fas fa-search"> Review</i></router-link>
          </a>
          <a class="navbar-item">
            <router-link to="/about"><i class="fas fa-info"> About</i></router-link>
          </a>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
}

.error {
  color: red
}
</style>
