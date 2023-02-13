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

function moneyFormat(num) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'symbol',
		notation: 'compact',
		maximumFractionDigits: 1,
	}).format(num);
}

function dateFormat(date) {
	return new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
	}).format(date);
}

export { checkTextLength, checkIsReleased, moneyFormat, dateFormat };
