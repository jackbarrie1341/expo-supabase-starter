module.exports = {
	root: true,
	extends: ["universe/native"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
			},
		],
		"simple-import-sort/imports": "off",
		"simple-import-sort/exports": "off",
	},
};
