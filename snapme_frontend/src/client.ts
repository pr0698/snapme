import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// const { SANITY_PROJECT_ID, SANITY_TOKEN } = import.meta.env;

export const client = sanityClient({
  projectId: "b61k1emy",
  dataset: "production",
  apiVersion: "2021-11-16",
  useCdn: true,
  token: "skTT2aokx1h1KUOaCzB8Nz5bBMtgjmkOoKCyNmjtCbpiREdbJADi3Y6nUfzFwVSOzJxxdUuv4aiNcMPmzJVusd0tiaq6CESwCB2vGnBZqCi3805I6FhQelBkLBg1njXehMvftmjDXfIoASLrzfAbNphCJTonXiSwCq4JsQmKHOZmSAau6WyR",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
