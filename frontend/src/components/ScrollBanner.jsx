import { useState } from "react"
import { useEffect } from "react"
import ItemButton from "./ItemButton"

const ScrollBanner = ({ slides = [] }) => {

    const [current, setCurrent] = useState(0)

    // Next img.
    const nextSlide = () => {
        setCurrent((prevImg) =>
            prevImg === slides.length - 1 ? 0 : prevImg + 1 // Is it last (?) Go back to the first one (0) else go to next (+1)
        )
    }

    // Prev img.
    const prevSlide = () => {
        setCurrent((prevImg) =>
            prevImg === 0 ? slides.length - 1 : prevImg - 1
        )
    }

    useEffect(() => {

        // Checking if it's the last img if not go to next img or start over again. ()
        const interval = setInterval(() => {
            setCurrent((prev) =>
                prev === slides.length - 1 ? 0 : prev + 1
            )
        }, 4000)

        return () => clearInterval(interval) // Stop timer

    }, [slides.length])

    if (slides.length === 0) {
        return <div>No images found</div>
    }

    const slide = slides[current]

    return (
        <div className="scrollBanner">

            <ItemButton onClick={prevSlide} text="←" />

            <img src={slide.image} alt="banner" className="banner-image" />

            <div className="text">
                {slide.title && <h2>{slide.title}</h2>}
                {slide.subtitle && <p>{slide.subtitle}</p>}

                {slide.buttonText && (
                    <ItemButton
                        onClick={slide.onClick}
                        text={slide.buttonText}
                    />
                )}
            </div>

            <ItemButton onClick={nextSlide} text="→" />

        </div>
    )

}

export default ScrollBanner