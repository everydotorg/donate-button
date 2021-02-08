export const loadFonts = () => {
	const fonts = document.createElement('style');
	fonts.innerHTML = `
    @font-face {
      font-family: "Basis Grotesque Pro";
      src: local("Basis Grotesque Pro"), local("Basis Grotesque Pro"),
        url(https://assets.every.org/every-month/BasisGrotesque-Regular-Pro.woff2) format("woff2");
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: "Basis Grotesque Pro";
      src: local("Basis Grotesque Pro"), local("Basis Grotesque Pro"),
        url(https://assets.every.org/every-month/BasisGrotesque-Bold-Pro.woff2) format("woff2");
      font-weight: bold;
      font-style: normal;
    }
    @font-face {
      font-family: "Basis Grotesque Pro";
      src: local("Basis Grotesque Pro"), local("Basis Grotesque Pro"),
        url(https://assets.every.org/every-month/BasisGrotesque-Medium-Pro.woff2) format("woff2");
      font-weight: 500;
      font-style: normal;
    }
    `;
	document.head.append(fonts);
};
