"use strict";
const thingsToAnimate = document.querySelectorAll(".animation");
const observerCallback = (entries) => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add("scroll-animation");
            observer.unobserve(targetElement);
        }
        else {
            targetElement.classList.remove("scroll-animation");
        }
    });
};
const observer = new IntersectionObserver(observerCallback, { threshold: 0.5 });
thingsToAnimate.forEach((element) => {
    observer.observe(element);
});
