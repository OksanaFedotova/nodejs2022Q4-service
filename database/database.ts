export interface User {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
export interface Artist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export interface Track {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
  [key: string]: string | number;
}
export interface Album {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
  [key: string]: string | number;
}
export interface IDatabase {
  users: User[];
  track: Track[];
}
export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
export class Database {
  users: User[];
  tracks: Track[];
  artists: Artist[];
  albums: Album[];
  favorites: FavoritesResponse;
  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
    this.favorites = {
      artists: [],
      albums: [],
      tracks: [],
    };
  }
}
