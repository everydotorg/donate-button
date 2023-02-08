import {BASE_CLOUDINARY_URL} from 'src/constants/url';

export const getCloudinaryUrl = (cloudinaryId: string) => {
	return `${BASE_CLOUDINARY_URL}${cloudinaryId}`;
};
