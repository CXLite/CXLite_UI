<template>
  <van-nav-bar title="全部课程" class="title-bar" />
  <div class="main">
    <van-notice-bar left-icon="volume-o" text="下方列表仅展示未结束的课程" />

    <van-sticky :offset-top="44">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#eee"
      />
    </van-sticky>

    <div class="course-box">
      <div
        class="course"
        v-for="course in courseList"
        :key="course.id"
        :data-clazzId="course.clazzId"
        :data-courseId="course.courseId"
        :data-cpi="course.cpi"
        :data-info="course.info"
        :data-roleid="course.roleid"
        :data-title="course.title"
        @click="goToCourse"
      >
        <div class="left">
          <div class="top">
            <van-image
              width="80"
              height="60"
              fit="cover"
              :src="course.cover"
            ></van-image>
            <div class="inf">
              <div class="title">{{ course.title }}</div>
              <div class="teacher">{{ course.teacher }}</div>
            </div>
          </div>
          <div class="bottom">
            {{ course.desc }}
          </div>
        </div>
        <div class="right">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>

    <div class="bottom-space">
      <p>下面没有了~</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted } from "vue";
import api from "../api";

const courseList = ref([]);
const searchValue = ref("");

const { proxy } = getCurrentInstance();

onMounted(async () => {
  try {
    const response = await api.get("/get_course_list");
    courseList.value = response.data;
    console.log(courseList.value);
  } catch (error) {
    console.error("Error fetching course list:", error);
  }
});

const goToCourse = (event) => {
  const { clazzid, courseid, cpi, info, roleid, title } =
    event.currentTarget.dataset;
  console.log(clazzid, courseid, cpi, info, roleid, title);

  // 跳转到课程页面
  proxy.$changePage("chapter", { clazzid, courseid, cpi, info, roleid, title });
};
</script>

<style scoped>
.title-bar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 44px;
}

.main {
  height: calc(100% - 50px); /* 使容器占满整个视口高度 */
  background-color: #eee;
  margin-top: 44px;
}

.course {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 30px);
  padding: 5px;
  margin: 0 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  background-color: #fff;
}

.left {
  display: flex;
  flex-direction: column;
}

.course .top {
  display: flex;
  align-items: center;
}

.course .title {
  font-size: 16px;
  font-weight: bold;
}

.course .teacher {
  font-size: 14px;
  width: 200px;
  color: #666;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 超出省略号 */
}

.course .bottom {
  margin-top: 10px;
  font-size: 14px;
  width: 200px;
  color: #666;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 超出隐藏 */
  text-overflow: ellipsis; /* 超出省略号 */
}

.course .inf {
  display: flex;
  flex-direction: column;
}

.bottom-space {
  height: 100px;
  text-align: center;
  display: flex;
  align-items: flex-start; /* 垂直靠上 */
  justify-content: center; /* 水平居中 */
}
</style>
