import { NewsFeed, NewsDetail } from '../types';

export class Api {
    xhr: XMLHttpRequest;
    url: string;
  
    constructor(url: string) {
      this.xhr = new XMLHttpRequest();
      this.url = url;
    }
  
    // getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    //   this.xhr.open('GET', this.url);
    //   this.xhr.addEventListener('load', () => {
    //     cb(JSON.parse(this.xhr.response) as AjaxResponse);
    //   });

    //   this.xhr.send();
    // }

    async request<AjaxResponse>(): Promise<AjaxResponse> {
      const response = await fetch(this.url);
      return await response.json() as AjaxResponse;
    }
  }
  
export class NewsFeedApi extends Api{
  constructor(url: string) {
    super(url);
  }

  // getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
  //   return this.getRequestWithXHR<NewsFeed[]>(cb);
  // }

  async getData(): Promise<NewsFeed[]> {
    return this.request<NewsFeed[]>();
  }
}
  
export class NewsDetailApi extends Api{
  constructor(url: string) {
    super(url);
  }
  
  // getDataWithXHR(cb: (data: NewsDetail) => void): void {
  //   return this.getRequestWithXHR<NewsDetail>(cb);
  // }

  async getData(): Promise<NewsDetail> {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }

  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
}