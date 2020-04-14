// / <reference types="react-scripts" />

export interface User {
  nick: string;
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
