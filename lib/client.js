import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client= sanityClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion:'2024-05-11',
    userCdn:true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN

});

const builder = imageUrlBuilder(client);

export const urlFor = (source)=> builder.image(source);