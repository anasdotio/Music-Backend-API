import ImageKit from '@imagekit/nodejs';
import ApiError from '../utils/api-error.js';

let client;

const getPrivateKey = () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();

  if (!privateKey) {
    throw new ApiError(500, 'ImageKit private key is not set in environment variables');
  }

  return privateKey;
};

export const getImageKitClient = () => {
  if (!client) {
    client = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
      privateKey: getPrivateKey(),
    });
  }

  return client;
};

export default getImageKitClient;
