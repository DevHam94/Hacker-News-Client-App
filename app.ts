


const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
  feeds: [],
};

function getData(url) {
  ajax.open("GET", url, false); // 사이트에서 동기적으로 데이터를 가져오겠다는 옵션
  ajax.send(); // 데이터를 가져온다.

  return JSON.parse(ajax.response);
}

function makeFeed(feeds) {
  for(let i = 0; i < feeds.length; i++) {
    feeds[i].read = false;
  }

  return feeds;
}

function newsFeed(){
    // 자주 사용되는 패턴 배열형태로 저장을한다. 
  let newsFeed = store.feeds;
  const newsList = [];
  let template = `
    <div class="bg-gray-600 min-h-screen">
    <div class="bg-white text-xl">
      <div class="mx-auto px-4">
        <div class="flex justify-between items-center py-6">
          <div class="flex justify-start">
            <h1 class="font-extrabold">Hacker News</h1>
          </div>
          <div class="items-center justify-end">
            <a href="#/page/{{__prev_page__}}" class="text-gray-500">
              Previous
            </a>
            <a href="#/page/{{__next_page__}}" class="text-gray-500 ml-4">
              Next
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="p-4 text-2xl text-gray-700">
      {{__news_feed__}}
    </div>
    </div>
  `;

  if (newsFeed.length === 0){
    newsFeed = store.feeds = makeFeed(getData(NEWS_URL));
  }

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <div class="p-6 ${newsFeed[i].read ? 'bg-red-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
    <div class="flex">
      <div class="flex-auto">
        <a href="#/show/${newsFeed[i].id}">${newsFeed[i].title}</a>
      </div>
      <div class="text-center text-sm">
        <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${newsFeed[i].comments_count}</div>
      </div>
      </div>
      <div class="flex mt-3">
        <div class="grid grid-cols-3 text-sm text-gray-500">
          <div><i class="fas fa-user mr-1></i>${newsFeed[i].user}</div>
          <div><i class="fas fa-heart mr-1"></i>${newsFeed[i].points}</div>
          <div><i class="far fa-clock mr-1"></i>${newsFeed[i].time_ago}</div>
        </div>
      </div>
    </div>
    `);
  }

  template = template.replace('{{__news_feed__}}', newsList.join(''));
  template = template.replace('{{__prev_page__}}', store.currentPage > 1 ? store.currentPage - 1 : 1);
  template = template.replace('{{__next_page__}}', store.currentPage + 1);  

  container.innerHTML = template;
}

//console.log(ajax.response); // 데이터를 가져오는걸 성공했다.
// 자바스크립트에서 보이는것을 응답 값을 객체로 바꿔볼꺼다. 보기쉽게하기위해서 Json형식만 가능하다.

function newsDetail() {
  const id = location.hash.substr(7);

  const newsContent = getData(CONTENT_URL.replace('@id', id))
  const title = document.createElement("h1");
  let template = `
  <div class="bg-gray-600 min-h-screen pb-8">
  <div class="bg-white text-xl">
    <div class="mx-auto px-t">
      <div class="flex justify-between items-center py-6">
        <div class="flex jutify-start">
          <h1 class="font-extrabold">Hacker News</h1>
        </div>
        <div class="items-center justify-end">
          <a href="#/page/${store.currentPage}" class="text-gray-500">
            <i class="fa fa-times"></i>
          </a>
        </div>
      </div>
    </div>
  </div>

    <div class="h-full border rounded-xl bg-white m-6 p-4 ">
      <h2>${newsContent.title}</h2>
    <div class="text-gray-400 h-20">
      ${newsContent.content}
    </div>

      {{__comments__}}

    </div>
  </div>    
  `;

  for (let i = 0; i < store.feeds.length; i++) {
    if(store.feeds[i].id === Number(id)) {
      store.feeds[i].read = true;
      break;
    }
  }

  function makeComment(comments, called = 0) {
    const commentString = [];
  
    for(let i = 0; i < comments.length; i++){
      commentString.push(`
        <div style="padding-left: ${called * 40}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${comments[i].user}</strong> ${comments[i].time_ago}
          </div>
          <p class="text-gray-700">${comments[i].content}</p>
        </div>
      `);

      if (comments[i].comments.length > 0){
        commentString.push(makeComment(comments[i].comments, called + 1));
      }
    }

    return commentString.join('');
  }

  container.innerHTML = template.replace('{{__comments__}}', makeComment(newsContent.comments));
}



function router(){
  const routePath = location.hash;

  if(routePath === '') {
    // 첫 진입시. location에 #가 들어있으면 빈 값을 반환해서 작동한다. 
    newsFeed();
  } else if (routePath.indexOf('#/page/') >= 0){
    store.currentPage = Number(routePath.substr(7));
    newsFeed();
  } else {
    newsDetail();
  }

  // 시작하자 마자 게시글을 보여주게 
  newsFeed();
}

window.addEventListener("hashchange", router);

router();