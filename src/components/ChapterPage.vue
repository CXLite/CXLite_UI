<template>
  <van-nav-bar
    class="title-bar"
    :title="title"
    left-text="返回"
    right-text="按钮"
    left-arrow
    @click-left="onClickBack"
    @click-right="onAddTask"
  >
    <template #right>
      <van-icon name="add-o" size="20" />
    </template>
  </van-nav-bar>
  <div class="main">
    <van-notice-bar left-icon="volume-o" text="点击上方加号将课程添加到任务队列" />

    <van-sticky :offset-top="44">
      <van-search
        v-model="searchValue"
        placeholder="请输入搜索关键词"
        shape="round"
        background="#eee"
      />
    </van-sticky>

    <div class="progress">
      <span>已完成任务点：</span>
      {{ chapter_data.knowledgeFinishCount }} /
      {{ chapter_data.knowledgeCount }}
      <van-progress
        :percentage="
          Math.floor(
            (chapter_data.knowledgeFinishCount / chapter_data.knowledgeCount) *
              100
          )
        "
        style="width: 80px; margin-left: 10px"
        color="#478027"
        stroke-width="8"
      />
    </div>

    <van-collapse v-model="activeChapter">
      <van-collapse-item
        v-for="chapter in chapter_data.items"
        :key="chapter.chapter_name"
        :name="chapter.chapter_name"
        :title="chapter.chapter_name"
      >
        <van-cell-group>
          <van-cell
            value=""
            v-for="point in chapter.points"
            :data-id="point.id"
          >
            <template #title>
              <span
                :class="`job ${point.jobCount === 0 ? 'jobComplate' : 'jobCount'}`"
              >
                {{ point.jobCount === 0 ? '√' : point.jobCount }}
              </span>
              <span class="custom-title"> {{ point.title }} </span>
            </template>
          </van-cell>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>

    <div class="bottom-space">
      <p>下面没有了~</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted, inject } from "vue";
import api from "../api";

const searchValue = ref("");

const { proxy } = getCurrentInstance();

const title = ref("");
let course_info;
const chapter_data = ref([]); // 章节数据

const activeChapter = ref([]); // 当前展开的章节

const activePage = inject("activePage");
const pageParams = inject("pageParams");

const refreshData = async () => {
    course_info = pageParams.value;
  title.value =
    pageParams.value.title.length > 12
      ? pageParams.value.title.slice(0, 12) + "..."
      : pageParams.value.title;

  try {
    const response = await api.get("/get_course_point", {
      params: {
        clazzId: course_info.clazzid,
        courseId: course_info.courseid,
        cpi: course_info.cpi,
      },
    });
    let result = response.data;

    console.log("获取课程章节列表:", result);
    let chapter = result.chapter;
    let points = result.points;

    let chapter_items = [];
    for (let i = 0; i < chapter.length; i++) {
      let chapter_item = {
        chapter_name: chapter[i],
        points: [],
      };
      for (let j = 0; j < points.length; j++) {
        if (points[j].title.startsWith(`${i + 1}.`)) {
          chapter_item.points.push(points[j]);
        }
      }
      chapter_items.push(chapter_item);
    }

    chapter_data.value = {
      hasLocked: result.hasLocked,
      knowledgeCount: result.knowledgeCount,
      knowledgeFinishCount: result.knowledgeFinishCount,
      items: chapter_items,
    };

    console.log("章节数据:", chapter_data.value);
  } catch (error) {
    console.error("Error fetching course list:", error);
  }
};

watch(activePage, (newPage) => {
  if (newPage === "chapter") {
    refreshData();
  }
},{ immediate: true });

const onClickBack = () => {
  proxy.$changePage("course");
};

const onAddTask = () => {
  console.log("添加任务");
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

.progress {
  width: calc(100% - 10px);
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 5px;
  margin: 5px 0;
}

.job {
  display: inline-block;
  width: 20px; /* 设置宽度 */
  height: 20px; /* 设置高度 */
  line-height: 20px; /* 设置行高，使文本垂直居中 */
  border-radius: 50%; /* 使元素变成圆形 */
  
  color: white; /* 设置文本颜色 */
  text-align: center; /* 设置文本水平居中 */
  font-weight: bold; /* 设置文本加粗 */
  margin-right: 10px; /* 设置右边距 */
}

.jobComplate {
    background: linear-gradient(45deg, #05b640, #22ac1d); /* 渐变绿色背景 */
}

.jobCount {
    background: linear-gradient(45deg, #ff7e5f, #feb47b); /* 渐变橙色背景 */
}

.bottom-space {
  height: 100px;
  text-align: center;
  display: flex;
  align-items: flex-start; /* 垂直靠上 */
  justify-content: center; /* 水平居中 */
}
</style>
