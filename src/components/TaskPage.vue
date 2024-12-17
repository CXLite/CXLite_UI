<template>
  <van-nav-bar title="当前任务" />
  <div class="main">
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item name="1">
        <template #title>
          <span>形势与政策</span>
          <van-tag type="success">已完成</van-tag>
        </template>
        代码是写出来给人看的，附带能在机器上运行。
      </van-collapse-item>
      <van-collapse-item name="2">
        <template #title>
          <span>操作系统</span>
          <van-tag type="warning">正在进行</van-tag>
        </template>
        技术无非就是那些开发它的人的共同灵魂。
      </van-collapse-item>
      <van-collapse-item name="3">
        <template #title>
          <span>数据库系统原理</span>
          <van-tag type="primary">排队</van-tag>
        </template>
        在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance } from "vue";

const activeName = ref("1");
</script>

<style scoped>
.main {
  height: calc(100% - 50px); /* 使容器占满整个视口高度 */
}
</style>
