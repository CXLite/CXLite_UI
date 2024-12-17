<template>
  <van-nav-bar title="登录" />
  <div class="main">
    <van-cell-group inset>
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名(手机号)"
      />
      <van-field
        v-model="password"
        label="密码"
        placeholder="请输入密码"
        type="password"
      />
      <van-button type="primary" block @click="onLogin">登录</van-button>
    </van-cell-group>
    
  </div>
</template>

<script setup>
import { ref, watch, getCurrentInstance, onMounted } from "vue";
import api from "../api";

const username = ref("");
const password = ref("");

let isLogin = ref(false);

const { proxy } = getCurrentInstance();

watch(isLogin, () => {
  if (isLogin.value) {
    proxy.$changePage("task");
  }
}, { immediate: true });

// 组件加载时检查登录状态
onMounted(async () => {
  try {
    const response = await api.get('/login_state');
    if (response.data.state) {
      isLogin.value = true;
    } else {
      isLogin.value = false;
      // 如果未登录，查看是否有登录历史，进行自动填充账号密码
      const response2 = await api.get('/account_history');
      username.value = response2.data.username;
      password.value = response2.data.password;
    }
  } catch (error) {
    console.error('Error checking login state:', error);
  }
});

const onLogin = async () => {
  console.log(username.value, password.value);

  const response = await api.get('/login', {
      params: {
        username: username.value,
        password: password.value
      }
    });

  if (response.data.status) {
    isLogin.value = true;
  } else {
    console.log(response.data.msg);
  }

  
};
</script>

<style scoped>
.top-bar {
  height: 44px;
  background-color: #07c160;
  color: #fff;
}
.main {
  height: calc(100% - 50px); /* 使容器占满整个视口高度 */
}

.van-cell-group{
  margin-top: 20px;
}
</style>
