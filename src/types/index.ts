
export interface Store {
    currentPage: number;
    feeds: NewsFeed[];
  }
  
export interface News {
  readonly id: number;
  readonly time_ago: string;
  readonly title: string;
  readonly url: string;
  readonly user: string;
  readonly content: string;
}
  
export interface NewsFeed extends News {
  readonly comments_count: number;
  readonly url: string;
  readonly points: number;
  readonly read?: boolean;
}
  
export interface NewsDetail extends News {
  readonly comments: NewsComment[];
}
  
export interface NewsComment extends News {
  readonly comments: NewsComment[];
  readonly level: number;
}
  
export interface RouteInfo {
  readonly path: string;
  readonly page: View;
}