// animate on scroll with intersection observer API
// if for some reason you're inspecting this, feel free to copy it lol
const thingsToAnimate: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(".animation");

const observerCallback = (entries: IntersectionObserverEntry[]): void => {
    entries.forEach((entry: IntersectionObserverEntry) => {
        const targetElement = entry.target as HTMLElement;

        if (entry.isIntersecting) {
            targetElement.classList.add("scroll-animation");
            observer.unobserve(targetElement); // animate once
        } else {
            targetElement.classList.remove("scroll-animation");
        }
    });
};

const observer: IntersectionObserver = new IntersectionObserver(observerCallback, { threshold: 0.5 });

thingsToAnimate.forEach((element: HTMLElement) => {
    observer.observe(element);
});
