function SmoothScroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
SmoothScroll();

function navToggle() {
  let tl = gsap.timeline();
  tl.to(".boundingele", {
    y: -10,  
    duration: 1,
    stagger: .2,
    scrub: 2,
  });

  tl.from('.footer_heading',{
    y: -10,
    opacity: 0,
    delay:.2,
  })
}
navToggle();

function UpdateClock() {
  function updateCurrentTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    currentTimeElement.textContent = `${formattedHours}:${formattedMinutes} ${ampm} EST`;
  }

  function updateCurrentYear() {
    const currentYearElement = document.getElementById("currentYear");
    const date = new Date();
    const currentYear = date.getFullYear();
    currentYearElement.textContent = `${currentYear} ©`;
  }

  // Call the functions to update the time and year initially
  updateCurrentTime();
  updateCurrentYear();

  // Update the time every second
  setInterval(updateCurrentTime, 1000);
}
UpdateClock();

window.addEventListener("mousemove", (e) => {
  document.querySelector(
    ".minicircle"
  ).style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});



document.querySelectorAll(".elem").forEach(function (elem) {
  var rotate = 0;
  var diffrot = 0;

  elem.addEventListener("mouseleave", function (dets) {
    gsap.to(elem.querySelector("img"), {
      opacity: 0,
      ease: Power3,
      duration: 0.5,
    });
  });

  elem.addEventListener("mousemove", function (dets) {
    var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    gsap.to(elem.querySelector("img"), {
      opacity: 1,
      ease: Power1,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      scrub:3,
    });
  });
});



