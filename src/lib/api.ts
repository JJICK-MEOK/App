import axios from 'axios';

export const api = axios.create({
  baseURL: '', // 지금은 빈 문자열, 나중에 실제 URL 넣기
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
