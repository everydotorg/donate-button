const joinClassNames = (classNames: Array<string | null | undefined>) => {
	return classNames.filter((className) => Boolean(className)).join(' ');
};

export default joinClassNames;
