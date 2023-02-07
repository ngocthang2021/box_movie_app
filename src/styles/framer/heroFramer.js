const heroContainer = {
	initial: { opacity: 0, x: '10%', y: '-50%' },
	animate: {
		opacity: 1,
		x: '10%',
		y: '-50%',
		transition: {
			ease: 'linear',
			delay: 0.25,
			delayChildren: 0.4,
		},
	},
};

const heroItem = {
	initial: { opacity: 0, scaleY: 0 },
	animate: {
		opacity: 1,
		scaleY: 1,
		transition: {
			duration: 0.2,
		},
	},
};

export { heroContainer, heroItem };
