const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement("div");
const NEWS_URL = "https://api.hnpwa.com/v0/news/1.json";
const CONTENT_URL = "https://api.hnpwa.com/v0/item/@id.json";
const store = {
  currentPage: 1,
};

function getData(url) {
  ajax.open("GET", url, false); // 사이트에서 동기적으로 데이터를 가져오겠다는 옵션
  ajax.send(); // 데이터를 가져온다.

  return JSON.parse(ajax.response);
}

function newsFeed(){
    // 자주 사용되는 패턴 배열형태로 저장을한다. 
  const newsFeed = JSON.parse(NEWS_URL);
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

  for (let i = (store.currentPage - 1) * 10; i < store.currentPage * 10; i++) {
    newsList.push(`
    <li> 
      <a href="#/show/${newsFeed[i].id}">  
        ${newsFeed[i].title} (${newsFeed[i].comments_count}) 
      </a> 
    </li>
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

  container.innerHTML = `
    <h1>${newsContent.title}</h1>

    <div>
      <a href="#">목록으로</a>
    </div>
  `;
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
