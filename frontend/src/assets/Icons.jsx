const width = "12px";
const height = "12px";

export function HamburgerIcon() {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4 6H20M4 12H20M4 18H20"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

export function CancelIcon() {
	return (
		<svg
			fill="#000000"
			width={width}
			height={height}
			viewBox="0 0 32 32"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<title>cancel</title>
			<path d="M10.771 8.518c-1.144 0.215-2.83 2.171-2.086 2.915l4.573 4.571-4.573 4.571c-0.915 0.915 1.829 3.656 2.744 2.742l4.573-4.571 4.573 4.571c0.915 0.915 3.658-1.829 2.744-2.742l-4.573-4.571 4.573-4.571c0.915-0.915-1.829-3.656-2.744-2.742l-4.573 4.571-4.573-4.571c-0.173-0.171-0.394-0.223-0.657-0.173v0zM16 1c-8.285 0-15 6.716-15 15s6.715 15 15 15 15-6.716 15-15-6.715-15-15-15zM16 4.75c6.213 0 11.25 5.037 11.25 11.25s-5.037 11.25-11.25 11.25-11.25-5.037-11.25-11.25c0.001-6.213 5.037-11.25 11.25-11.25z"></path>
		</svg>
	);
}

export function ShoppingCartIcon() {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<g id="Interface / Shopping_Cart_01">
				<path
					id="Vector"
					d="M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM17 17H9.29395C8.83288 17 8.60193 17 8.41211 16.918C8.24466 16.8456 8.09938 16.7291 7.99354 16.5805C7.8749 16.414 7.82719 16.1913 7.73274 15.7505L5.27148 4.26465C5.17484 3.81363 5.12587 3.58838 5.00586 3.41992C4.90002 3.27135 4.75477 3.15441 4.58732 3.08205C4.39746 3 4.16779 3 3.70653 3H3M6 6H18.8732C19.595 6 19.9555 6 20.1978 6.15036C20.41 6.28206 20.5653 6.48862 20.633 6.729C20.7104 7.00343 20.611 7.34996 20.411 8.04346L19.0264 12.8435C18.9068 13.2581 18.8469 13.465 18.7256 13.6189C18.6185 13.7547 18.4772 13.861 18.317 13.9263C18.1361 14 17.9211 14 17.4921 14H7.73047M8 21C6.89543 21 6 20.1046 6 19C6 17.8954 6.89543 17 8 17C9.10457 17 10 17.8954 10 19C10 20.1046 9.10457 21 8 21Z"
					stroke="#000000"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</g>
		</svg>
	);
}

export function AddIcon() {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="#1C274C"
				stroke-width="1.5"
			/>
			<path
				d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
				stroke="#1C274C"
				stroke-width="1.5"
				stroke-linecap="round"
			/>
		</svg>
	);
}

export function RemoveIcon() {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 32 32"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
			<title>minus-circle</title>
			<desc>Created with Sketch Beta.</desc>
			<defs></defs>
			<g
				id="Page-1"
				stroke="none"
				stroke-width="1"
				fill="none"
				fill-rule="evenodd"
				sketch:type="MSPage">
				<g
					id="Icon-Set"
					sketch:type="MSLayerGroup"
					transform="translate(-516.000000, -1087.000000)"
					fill="#000000">
					<path
						d="M532,1117 C524.268,1117 518,1110.73 518,1103 C518,1095.27 524.268,1089 532,1089 C539.732,1089 546,1095.27 546,1103 C546,1110.73 539.732,1117 532,1117 L532,1117 Z M532,1087 C523.163,1087 516,1094.16 516,1103 C516,1111.84 523.163,1119 532,1119 C540.837,1119 548,1111.84 548,1103 C548,1094.16 540.837,1087 532,1087 L532,1087 Z M538,1102 L526,1102 C525.447,1102 525,1102.45 525,1103 C525,1103.55 525.447,1104 526,1104 L538,1104 C538.553,1104 539,1103.55 539,1103 C539,1102.45 538.553,1102 538,1102 L538,1102 Z"
						id="minus-circle"
						sketch:type="MSShapeGroup"></path>
				</g>
			</g>
		</svg>
	);
}

export function ReturnIcon() {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 48 48"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12.9998 8L6 14L12.9998 21"
				stroke="#000000"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
				stroke="#000000"
				stroke-width="4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

export function EmptyListIcon() {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17"
				stroke="#000000"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
