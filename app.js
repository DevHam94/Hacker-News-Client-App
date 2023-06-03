const ajax = new XMLHttpRequest();

ajax.open('GET', 'https://api.hnpwa.com/v0/news/1.json', false); // 사이트에서 동기적으로 데이터를 가져오겠다는 옵션
ajax.send(); // 데이터를 가져온다. 

