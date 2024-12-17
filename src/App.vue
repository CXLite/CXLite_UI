<script setup>
import LoginAcount from "./components/LoginAcount.vue";
import TaskPage from "./components/TaskPage.vue";
import CoursePage from "./components/CoursePage.vue";
import ChapterPage from "./components/ChapterPage.vue";

import { ref, watch, getCurrentInstance, provide } from "vue";

const showTabBar = ref(true);
const tabHeight = showTabBar.value ? "calc(100vh - 50px)" : "100vh";
const activePage = ref('login');
const pageParams = ref(null);
provide('activePage', activePage);
provide('pageParams', pageParams);

const TabPges = ["task", "course"];


// 根据活动页面控制标题栏显示
watch(activePage, (newPage) => {
  if (TabPges.includes(newPage)) {
    showTabBar.value = true;
  } else {
    showTabBar.value = false;
  }
}, { immediate: true });

const changePage = (page, params) => {
  
  console.log("切换页面:", page, "参数:", params);
  if (params) {
    pageParams.value = params;
  }
  
  activePage.value = page;
};

// 获取当前实例并将 changePage 挂载到全局
const { appContext } = getCurrentInstance();
appContext.config.globalProperties.$changePage = changePage;

</script>

<template>
  <van-tabs v-model:active="activePage" class="app-main" :show-header="false" :style="{ height: tabHeight }">
    <van-tab  name="login"><LoginAcount /></van-tab>
    <van-tab  name="task"><TaskPage /></van-tab>
    <van-tab  name="course"><CoursePage /></van-tab>
    <van-tab  name="chapter"><ChapterPage /></van-tab>
  </van-tabs>
  <van-tabbar v-model="activePage" v-show="showTabBar">
    <van-tabbar-item name="task" icon="home-o">任务</van-tabbar-item>
    <van-tabbar-item name="course" icon="search">课程</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>
.app-main {
  background-color: #eeeeee;
  height: calc(100vh - 50px); /* 使容器占满整个视口高度 */
}
</style>
