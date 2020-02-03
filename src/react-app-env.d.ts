// / <reference types="react-scripts" />

export interface RiceDbEntry {
  deadsince?: number;
  distros?: string[];
  dotfiles?: string[];
  dtops?: string[];
  handwritings?: string[];
  lastfm?: string;
  last_seen?: number; // eslint-disable-line camelcase
  pets?: string[];
  selfies?: string[];
  stations?: string[];
}

export type RiceDb = {
  [key: string]: RiceDbEntry;
}
