import { TImage } from "./comman";

export type UserSanity = {
  image: string;
  userName: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

export type UserGoogle = {
  image: string;
  userName: string;
};

export type TPins = {
  destination: string;
  image: TImage;
  postedBy: {
    _id: string;
    image: string;
    userName: string;
  };
  _id: string;
  save: any;
};
