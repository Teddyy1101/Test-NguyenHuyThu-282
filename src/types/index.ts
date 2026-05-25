
/** Interface mô tả cấu trúc dữ liệu của một video */
export interface Video {
  id: string;
  videoUrl: string;
  authorName: string;
  description: string;
  likesCount: number;
}
