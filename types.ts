
export interface Game {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  category: string;
  description: string;
  tags: string[];
}

export type Category = 'All' | 'Action' | 'Puzzle' | 'Strategy' | 'Sports' | 'Retro' | 'Other';
