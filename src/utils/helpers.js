function checkTextLength(paragraph, maxLength) {
	const textLenght = paragraph.length;

	return textLenght >= maxLength;
}

function checkIsReleased(date) {
	const d = new Date();
	const currentDate = d.getTime();
	const releaseDate = new Date(date);

	return releaseDate <= currentDate;
}

export { checkTextLength, checkIsReleased };
