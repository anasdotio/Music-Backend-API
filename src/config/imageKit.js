import ImageKit from '@imagekit/nodejs';

let client;

const getPrivateKey = () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY?.trim();

  if (!privateKey) {
    throw new Error('IMAGEKIT_PRIVATE_KEY is not configured');
  }

  return privateKey;
};

export const getImageKitClient = () => {
  if (!client) {
    client = new ImageKit({
      privateKey: getPrivateKey(),
    });
  }

  return client;
};

export default getImageKitClient;
