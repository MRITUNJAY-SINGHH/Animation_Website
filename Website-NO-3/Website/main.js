function init() {
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
init();

const ball = document.querySelector(".cursor");
const main = document.querySelector(".main");

let mouseX = 0;
let mouseY = 0;

let ballX = 0;
let ballY = 0;

let speed = 0.08;

function animate() {
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;

  ballX = ballX + distX * speed;
  ballY = ballY + distY * speed;

  ball.style.left = ballX + 20 + "px";
  ball.style.top = ballY + 20 + "px";

  requestAnimationFrame(animate);
}
animate();

document.addEventListener("mousemove", function (event) {
  mouseX = event.pageX;
  mouseY = event.pageY;
});

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top 20%",
    end: "top 0",
    scrub: 2,
    // pin:true,
  },
});
tl.to(
  ".page1 h1",
  {
    x: -100,
    filter: "blur(5px)",
  },
  "same"
),
  tl.to(
    ".page1 h2",
    {
      x: 100,
      filter: "blur(5px)",
    },
    "same"
  );
tl.to(
  ".page1 p",
  {
    filter: "blur(5px)",
  },
  "same"
);

tl.to(
  ".page1 video",
  {
    width: "85%",
    marginTop: "-20vw",
  },
  "same"
);

let tl2 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -100%",
    end: "top -110%",
    scrub: 3,
    // pin:true,
  },
});

tl2.to(".main", {
  backgroundColor: "#fff",
});

let tl3 = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1 h1",
    scroller: ".main",
    // markers:true,
    start: "top -430%",
    end: "top -460%",
    scrub: 1,
    // pin:true,
  },
});
tl3.to(".main", {
  backgroundColor: "#0f0d0d",
});

const boxes = document.querySelectorAll(".page5-box");

boxes.forEach(function(element){
element.addEventListener("mouseenter", function(){
  let att=element.getAttribute("data-image");
  ball.style.borderRadius="0"
  ball.style.height = "300px";
  ball.style.width = "350px";
  ball.style.backgroundImage = `url(${att})`;
  

})
element.addEventListener("mouseleave", function(){
  ball.style.borderRadius="50%"
  ball.style.height = "20px";
  ball.style.width = "20px";
  ball.style.backgroundImage = `none`;
})

})






