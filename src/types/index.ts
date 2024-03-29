export * from './common';
export * from './address';
export { default as User } from './user';

// import View from '../core/view';


// export interface NewsStore {
//     getAllFeeds: () => NewsFeed[];
//     getFeed: (position: number) => NewsFeed;
//     setFeeds: (feeds: NewsFeed[]) => void;
//     makeRead: (id: number) => void;
//     hasFeeds: boolean;
//     currentPage: number;
//     numberOfFeed: number;
//     nextPage: number;
//     prevPage: number;
// }
  
// export interface News {
//   readonly id: number;
//   readonly time_ago: string;
//   readonly title: string;
//   readonly url: string;
//   readonly user: string;
//   readonly content: string;
// }
  
// export interface NewsFeed extends News {
//   readonly comments_count: number;
//   readonly url: string;
//   readonly points: number;
//   readonly read?: boolean;
// }
  
// export interface NewsDetail extends News {
//   readonly comments: NewsComment[];
// }
  
// export interface NewsComment extends News {
//   readonly comments: NewsComment[];
//   readonly level: number;
// }
  
// export interface RouteInfo {
//   readonly path: string;
//   readonly page: View;
// }