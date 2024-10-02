"use strict";
// animate on scroll with intersection observer API
// if for some reason you're inspecting this, feel free to copy it lol
const thingsToAnimate = document.querySelectorAll(".animation");
const observerCallback = (entries) => {
    entries.forEach((entry) => {
        const targetElement = entry.target;
        if (entry.isIntersecting) {
            targetElement.classList.add("scroll-animation");
            observer.unobserve(targetElement); // animate once
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
