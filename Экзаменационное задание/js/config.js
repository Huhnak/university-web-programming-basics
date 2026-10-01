/* eslint-disable no-unused-vars */

const API_BASE = 'https://web-basics-exam-gagashaggy.amvera.io';
const API_KEY = '019c2353-d76f-4eaa-b9f6-ec8231dcddb5';
const PAGE_SIZE = 5;

function apiUrl(path) {
    return `${API_BASE}${path}?api_key=${API_KEY}`;
}
