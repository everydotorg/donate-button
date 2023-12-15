import {BASE_CLOUDINARY_URL} from 'src/constants/url';

interface CloudinaryOptions {
	width?: number;
	height?: number;
	fillMode?: 'fill' | 'lfill';
}

const FLAGS = 'f_auto,q_auto';

export function fillDimensionsTransform(options: CloudinaryOptions) {
	if (options.width === 0 || options.height === 0) {
		throw new Error('dimensions cannot be 0');
	}

	return [
		`c_${options.fillMode ?? 'lfill'}`,
		options.width ? `w_${Math.floor(options.width)}` : undefined,
		options.height ? `h_${Math.floor(options.height)}` : undefined
	]
		.filter((value?: string) => value !== undefined)
		.join(',');
}

export const getCloudinaryUrl = (
	cloudinaryId: string,
	options?: CloudinaryOptions
) => {
	return `${BASE_CLOUDINARY_URL}${FLAGS}${
		options ? `,${fillDimensionsTransform(options)}` : ''
	}/${cloudinaryId}`;
};
