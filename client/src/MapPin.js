import React from 'react';

function MapPin({ color, viewport, clicked }) {
	return (
		<svg
			style={{
				width: 6 * viewport.zoom + 'px',
				height: 6 * viewport.zoom + 'px',
				maxWidth: '44px',
				maxHeight: '44px',
				transform: 'translate(-50%, -100%)'
			}}
			viewBox="0 0 24 24"
			width="48"
			height="48"
			stroke={color}
			strokeWidth="1.5"
			fill="none"
			strokeLinecap="round"
			onClick={clicked}
			>
			<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
			<circle cx="12" cy="10" r="3"></circle>
		</svg>
	);
};

export default MapPin;
