interface AiredDate {
  day: number;
  month: number;
  year: number;
}

interface Aired {
  from: Date;
  prop: {
    from: AiredDate;
    to: AiredDate;
  };
  string: string;
  to: Date;
}

interface Broadcast {
  day: string;
  string: string;
  time: string;
  timezone: string;
}

interface Demographic {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

interface Genre {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

interface ImageDetail {
  image_url: string;
  large_image_url: string;
  small_image_url: string;
}

interface Images {
  jpg: ImageDetail;
  webp: ImageDetail;
}

interface Lisensor {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

interface Producer {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

interface Studio {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

interface Themes {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

interface Title {
  type: string;
  title: string;
}

interface Title {
  embed_url: string;
  images: ImageDetail;
  url: string;
  youtube_id: string;
}

export interface Anime {
  aired: Aired;
  airing: boolean;
  approved: boolean;
  background: string;
  broadcast: Broadcast;
  demographic: Demographic[];
  duration: string;
  episodes: number;
  explicit_genres: any;
  favorites: number;
  genres: Genre[];
  images: Images;
  licensors: Lisensor[];
  mal_id: number;
  members: number;
  popularity: number;
  producers: Producer[];
  rank: number;
  rating: string;
  score: number;
  scored_by: number;
  season: string;
  source: string;
  status: string;
  studios: Studio[];
  synopsis: string;
  themes: Themes[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  titles: Title[];
  type: string;
  url: string;
  year: number;
}
