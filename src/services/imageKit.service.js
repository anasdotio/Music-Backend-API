import getImageKitClient from '../config/imageKit.js';
import ApiError from '../utils/api-error.js';

export const uploadMusic = async (file, fileName) => {
  if (!file || !fileName) {
    throw new ApiError(400, 'File and fileName are required for upload');
  }

  const imageKit = getImageKitClient();

  const uploadResponse = await imageKit.files.upload({
    file: file.toString('base64'), // Convert buffer to base64 string
    fileName: fileName,
    folder: '/music', // Optional: specify a folder in ImageKit
  });

  if (!uploadResponse) {
    throw new ApiError(500, 'Music upload failed');
  }

  return { url: uploadResponse.url, fileId: uploadResponse.fileId };
};
