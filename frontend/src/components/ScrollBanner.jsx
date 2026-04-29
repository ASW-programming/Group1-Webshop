import { useState, useEffect, useRef } from "react";
import ItemButton from "./ItemButton";
import { ArrowIcon, EnterIcon } from "../assets/Icons";

const ScrollBanner = ({ slides = [] }) => {
	const [current, setCurrent] = useState(0);
	const intervalRef = useRef(null);

	// Start / Restart timer.
	const startTimer = () => {
		clearInterval(intervalRef.current);

		intervalRef.current = setInterval(() => {
			setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
		}, 4000);
	};

	// Next.
	const nextSlide = () => {
		setCurrent(
			(prev) => (prev === slides.length - 1 ? 0 : prev + 1), // Is it last (?) Go back to the first one (0) else go to next (+1).
		);
		startTimer(); // Reset timer.
	};

	// Prev.
	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
		startTimer(); // Reset timer.
	};

	// Start timer when component loads.
	useEffect(() => {
		if (slides.length === 0) return;

		startTimer();

		return () => clearInterval(intervalRef.current);
	}, [slides.length]);

	if (slides.length === 0) {
		return <div>No images found</div>;
	}

	const slide = slides[current];

	return (
        <div className="scrollBannerContainer">
		<div className="scrollBanner">
			<ItemButton onClick={prevSlide} icon={<ArrowIcon />} />
            <div className="bannerContent">
			<img src={slide.image} alt="banner" className="banner-image" />

			<div className="bannerText">
				{slide.title && <h3>{slide.title}</h3>}
				{slide.subtitle && <p>{slide.subtitle}</p>}

			
			</div>
            </div>
			<ItemButton
				onClick={nextSlide}
				icon={<ArrowIcon transform={"rotate(180 16 16)"} />}
			/>
		</div>
        </div>
	);
};

export default ScrollBanner;
