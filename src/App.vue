<template>
  <div class='home-container'>
    <!-- 这个router-view是最大的 所有的子页面都会render到这里来 -->
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  provide(){
    return {
      reload: this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  /*sass加变量*/
  $nav-height: 60px;
  $sidebar-width:185px;
  .home-container{
    height: 100%;
    .nav-screen{
      position: fixed;
      width: 100%;
      height: $nav-height;
      z-index: 99;
    }
    .sidebar-screen{
      height: calc(100% - #{$nav-height});
      .adaptive{
        top:$nav-height;
        position: fixed;
        width: $sidebar-width;
        min-width: 130px;
      }
    }
  }
  .full-screen{
    height:  calc(100% -  #{$nav-height});
  }
  .router-view{
    margin-top: 20px;
    position: absolute;
    top:$nav-height;
    right: 0;
    width: calc(100% - #{$sidebar-width});;
  }
</style>
