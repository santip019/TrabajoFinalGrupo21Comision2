import { useState, useEffect, useMemo } from "react";

// breakpoints: [{ max: 576, value: 1 }, { max: 992, value: 2 }, ...]
export function useSlidesCarrusel(array, breakpoints) {
  const [itemsPerSlide, setItemsPerSlide] = useState(
    breakpoints[breakpoints.length - 1].value
  );

  useEffect(() => {
    function update() {
      const width = window.innerWidth;
      const bp = breakpoints.find(b => width <= b.max);
      setItemsPerSlide(bp.value);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [breakpoints]);

  // Divide el array en grupos según itemsPerSlide
  const slides = useMemo(() => {
    const result = [];
    for (let i = 0; i < array.length; i += itemsPerSlide) {
      result.push(array.slice(i, i + itemsPerSlide));
    }
    return result;
  }, [array, itemsPerSlide]);

  return slides;
}