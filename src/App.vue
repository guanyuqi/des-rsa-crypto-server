<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  position: absolute;
  /* background-color: #fff; */
  background-image: linear-gradient(to right bottom, #3b31ed 0%, #4773f4 52%, #52b4fb 100%);
  padding: 5% 15%;
  box-sizing: border-box;
}
@media (min-width: 992px) and (max-width: 1600px) {
  #app {
    padding: 5% 8%;
  }
}
* {
  margin: 0;
  padding: 0;
}
</style>
