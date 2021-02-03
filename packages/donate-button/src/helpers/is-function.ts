const isFunction = (object) => {
	return Boolean(object && object.constructor && object.call && object.apply);
};

export default isFunction;
