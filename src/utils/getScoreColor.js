function getScoreColor(point) {
	let borderColor;
	// Change to Number type for comparison
	if (Number(point) > 6) {
		borderColor = 'green';
	} else if ((Number(point) < 5) & (Number(point) > 0)) {
		borderColor = 'red';
	} else if ((Number(point) >= 5) & (Number(point) <= 6)) {
		borderColor = 'yellow';
	}

	return borderColor;
}

export default getScoreColor;
