declare interface AnimeApi {
  mal_id: number;
  title: string;
  score: number;
  genres: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
  images: {
    webp: {
      large_image_url: string;
    };
  };
  year: number;
  trailer: {
    url: string;
    embed_url: string;
    images: { maximum_image_url: string };
  };
  background: string;
  synopsis: string;
  type: string;
  status: string;
  source: string;
  episodes: number;
  aired: {
    string: string;
  };
  studios: {
    mal_id: number;
    type: string;
    name: string;
    url: string;
  }[];
}

declare interface ReviewApi {
  mal_id: number;
  date: string;
  review: string;
  entry: {
    title: string;
  };
  score: number;
  user: {
    username: string;
    images: {
      webp: {
        image_url: string;
      };
    };
  };
}

declare interface RelationAnime {
  relation: string;
  entry: EntryAnime[];
}

declare interface EntryAnime {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

declare interface ListCharacter {
  character: Character;
  role: string;
  favorites: number;
  voice_actors: VoiceActor[];
}

declare interface VoiceActor {
  person: Person;
  language: string;
}

declare interface Character {
  mal_id: number;
  url: string;
  images: Images;
  name: string;
}
declare interface Images {
  jpg: Jpg;
  webp: Webp;
}

declare interface Jpg {
  image_url: string;
}

declare interface Webp {
  image_url: string;
  small_image_url: string;
}

declare interface Person {
  mal_id: number;
  url: string;
  images: Pick<Images, 'jpg'>;
  name: string;
}

declare interface Video {
  promo: Promo[];
  episodes: Episode[];
}

declare interface Promo {
  title: string;
  trailer: Trailer;
}

declare interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}

declare interface Episode {
  mal_id: number;
  title: string;
  episode: string;
  url: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

declare interface GenreAnime {
  mal_id: number;
  name: string;
  count: number;
}
