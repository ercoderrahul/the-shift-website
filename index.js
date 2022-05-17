// function myFunction(){
  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#hero"),
    smooth: true,
  });
  
  // }
  // myFunction();
  
   // gsap + locomotive ek sath chalane ke liye 
    
  gsap.registerPlugin(ScrollTrigger);
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy("#hero", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    },
  
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  
    pinType: document.querySelector("#hero").style.transform
      ? "transform"
      : "fixed",
  });
  
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
// this coad is for run gsap + locomotive END------

// this coad is for time-----
function showTime() {
  var date = new Date();
  var h = date.getHours(); // 0 - 23
  var m = date.getMinutes(); // 0 - 59
  var s = date.getSeconds(); // 0 - 59
  var session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session;
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}
showTime();
// this coad is for time END-----
// this coad is for texilate js---
var texta = document.querySelectorAll(".texta");
texta.forEach(function (elem) {
  gsap.to(elem, {
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: elem,
      scroller: "#hero",
      start: "top 100%",
      // markers: true,
    },
    opacity: 1,
    onStart: function () {
      $(elem).textillate({ in: { effect: "bounceIn" } });
    },
  });
});

// this coad is for texilate js END---
gsap.to("#text2 .txt h1",{
  x: "-100%",
  repeat:-1, 
  ease: Linear.easeInOut,
  duration: 5,
});

// coad for textilate js---
var texta = document.querySelectorAll(".tljs");
texta.forEach(function (elem) {
  gsap.to(elem, {
    ease: Expo.easeInOut,
    scrollTrigger: {
      trigger: elem,
      scroller: "#hero",
      start: "top 100%",
    },
    opacity: 1,
    onStart: function () {
      $(elem).textillate({ in: { effect: "rotateInUpRight" } });
    },
  });
});


gsap.to("#circle",{
  scrollTrigger: {
    trigger: "#main",
    scroller: "#hero",
    start: "bottom 30%",
    // markers: true,
    scurb:3,
    scale:0.8,
  },
  scale:1.5,
  ease: "Expo.easeInOut"
})

gsap.to("#three .two h1",{
  scrollTrigger: {
    trigger: ".two",
    scroller: "#hero",
    start: "top top",
    // markers: true,
    scurb: 5,
    
    // scale:0.8,
  },
  // scale:1.5,
  x:"20%",
  ease: "Expo.easeInOut"
})

//   image on curser for third page
var elem = document.querySelectorAll(".two");
elem.forEach (function(elm){

  elm.addEventListener("mousemove", function(dets){
    this.children[1].style.opacity =1;
    this.children[1].style.transform =`translate(${dets.clientX}px) rotate(${dets.clientX/50}deg)`;
  });
  elm.addEventListener("mouseout",function(dets){
    this.children[1].style.opacity =0;
  });
});


// red dot follow curser--------

var cursor = {
  delay: 8,
  _x: 0,
  _y: 0,
  endX: (window.innerWidth / 2),
  endY: (window.innerHeight / 2),
  cursorVisible: true,
  cursorEnlarged: false,
  $dot: document.querySelector('.cursor-dot'),
  $outline: document.querySelector('.cursor-dot-outline'),
  
  init: function() {
      // Set up element sizes
      this.dotSize = this.$dot.offsetWidth;
      this.outlineSize = this.$outline.offsetWidth;
      
      this.setupEventListeners();
      this.animateDotOutline();
  },
  
//     updateCursor: function(e) {
//         var self = this;
      
//         console.log(e)
      
//         // Show the cursor
//         self.cursorVisible = true;
//         self.toggleCursorVisibility();

//         // Position the dot
//         self.endX = e.pageX;
//         self.endY = e.pageY;
//         self.$dot.style.top = self.endY + 'px';
//         self.$dot.style.left = self.endX + 'px';
//     },
  
  setupEventListeners: function() {
      var self = this;
      
      // Anchor hovering
      document.querySelectorAll('a').forEach(function(el) {
          el.addEventListener('mouseover', function() {
              self.cursorEnlarged = true;
              self.toggleCursorSize();
          });
          el.addEventListener('mouseout', function() {
              self.cursorEnlarged = false;
              self.toggleCursorSize();
          });
      });
      
      // Click events
      document.addEventListener('mousedown', function() {
          self.cursorEnlarged = true;
          self.toggleCursorSize();
      });
      document.addEventListener('mouseup', function() {
          self.cursorEnlarged = false;
          self.toggleCursorSize();
      });


      document.addEventListener('mousemove', function(e) {
          // Show the cursor
          self.cursorVisible = true;
          self.toggleCursorVisibility();

          // Position the dot
          self.endX = e.pageX;
          self.endY = e.pageY;
          self.$dot.style.top = self.endY + 'px';
          self.$dot.style.left = self.endX + 'px';
      });
      
      // Hide/show cursor
      document.addEventListener('mouseenter', function(e) {
          self.cursorVisible = true;
          self.toggleCursorVisibility();
          self.$dot.style.opacity = 1;
          self.$outline.style.opacity = 1;
      });
      
      document.addEventListener('mouseleave', function(e) {
          self.cursorVisible = true;
          self.toggleCursorVisibility();
          self.$dot.style.opacity = 0;
          self.$outline.style.opacity = 0;
      });
  },
  
  animateDotOutline: function() {
      var self = this;
      
      self._x += (self.endX - self._x) / self.delay;
      self._y += (self.endY - self._y) / self.delay;
      self.$outline.style.top = self._y + 'px';
      self.$outline.style.left = self._x + 'px';
      
      requestAnimationFrame(this.animateDotOutline.bind(self));
  },
  
  toggleCursorSize: function() {
      var self = this;
      
      if (self.cursorEnlarged) {
          self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
          self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
      } else {
          self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
          self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
      }
  },
  
  toggleCursorVisibility: function() {
      var self = this;
      
      if (self.cursorVisible) {
          self.$dot.style.opacity = 1;
          self.$outline.style.opacity = 1;
      } else {
          self.$dot.style.opacity = 0;
          self.$outline.style.opacity = 0;
      }
  }
}

cursor.init();
