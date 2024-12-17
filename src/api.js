import axios from 'axios';

// 检查是否处于 debug 模式
const DEBUG = true;

// 设置基础 URL
const baseURL = DEBUG ? 'http://127.0.0.1:8080' : '';

// 创建 axios 实例
const api = axios.create({
  baseURL: baseURL,
  timeout: 10000, // 设置请求超时时间
});

export default api;