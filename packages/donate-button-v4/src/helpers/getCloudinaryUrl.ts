import {BASE_CLOUDINARY_URL} from 'src/constants/url';

const FLAGS = 'f_auto,q_auto/';

export const getCloudinaryUrl = (cloudinaryId: string) => {
	return `${BASE_CLOUDINARY_URL}${FLAGS}${cloudinaryId}`;
};
