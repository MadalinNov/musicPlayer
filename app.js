// Global Variables
var currentTrack = 0;
var maxTrack = 2;
var playBtn = document.querySelector(".play__btn");
var pauseBtn = document.querySelector(".pause__btn");
var nextBtn = document.querySelector(".next__btn");
var prevBtn = document.querySelector(".prev__btn");
var track = document.querySelectorAll('audio');
var visualizer = document.querySelector('.visualizer');
var trackName = document.querySelector(".song__title");
var innerProgressBar = document.querySelector('.full_bar');
var outerProgressBar = document.querySelector('.progress__bar');
var progres = 0;
var interval;
var audioTotalDuration = document.querySelector('.audioTotalDuration');
var audioPastTime = document.querySelector('.audioPastTime');
var pastTimepast;
// EVENTS
var player = (function() {
  function setEventListeners() {
    // Play Button
    playBtn.addEventListener("click", function() {
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
      audioPlay();
      visualizer.play();

      titleDisplay();
      window.clearInterval(interval);
      interval = window.setInterval(fullBarIncrease, 1000);

      trackTimer();
      window.clearInterval(pastTimepast);
      pastTimepast=window.setInterval(timer, 1000);
    });
    // Pause Button
    pauseBtn.addEventListener("click", function() {
      playBtn.style.display = "block";
      pauseBtn.style.display = "none";
      audioPause();
      visualizer.pause();

      window.clearInterval(interval);
      window.clearInterval(pastTimepast);
    });
    // Next Button
    nextBtn.addEventListener("click", function() {
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
      audioNext();
      visualizer.play();
      titleDisplay();

      window.clearInterval(interval);
      interval = window.setInterval(fullBarIncrease, 1000);

      resetProgressBar();

      trackTimer();
      resetTimer();
      window.clearInterval(pastTimepast);
      pastTimepast=window.setInterval(timer, 1000);
    });
    // Previous Button
    prevBtn.addEventListener("click", function() {
      audioPrev();
      playBtn.style.display = "none";
      pauseBtn.style.display = "block";
      visualizer.play();
      titleDisplay();

      window.clearInterval(interval);
      interval = window.setInterval(fullBarIncrease, 1000);
      resetProgressBar();

      trackTimer();
      resetTimer();
      window.clearInterval(pastTimepast);
      pastTimepast=window.setInterval(timer, 1000);
    });
    // Audio Seeker Slider
    // outerProgressBar.addEventListener('mousedown', function(event){
    //     var clickedPosition = event.clientX-event.target.offsetLeft;
    //     var seeker = trackArray()[currentTrack].currentTime=(clickedPosition/event.target.offsetWidth)*trackArray()[currentTrack].duration;
    //     window.clearInterval(interval);
    //     innerProgressBar.style.width=seeker+'px';
    // },false);
  }
  // // Player Functions

  // Audio tag to JS Array
  var trackArray = function() {
    var array = [];
    for (var i = 0; i < track.length; i++) {
      array[i] = track[i];
    }
    return array;
  };
  var maxTrack = trackArray().length - 1;
  //Song Title Display
  function titleDisplay() {
    var titleTextContent = trackArray()[currentTrack].textContent;
    trackName.textContent = titleTextContent;
  }

  // Progress Bar
  function timeBar() {
    setInterval(fullBarIncrease, 1000);
  }
  //
  function fullBarIncrease() {
    var duration = trackArray()[currentTrack].duration;
    if (progres < duration) {
      progres++;
      outerProgressBar.style.width = duration + 'px';
      innerProgressBar.style.width = progres + "px";
    } else if (progres > duration) {
      progres = 1;
    }
  }
  // Reset Progress Bar
  function resetProgressBar() {
    if (progres > 1) {
      progres = 1;
    } //////Resets the progress bar to 0, changes its width to track.duration
  }
  //Audio Lenght timer
  function trackTimer() {
    var maxTime = (trackArray()[currentTrack].duration / 60).toFixed(2);
    audioTotalDuration.innerHTML = '0' + maxTime;
  }


    ///Progress Timer
   var seconds=0;
   var minutes=0;
   var maxTime = (trackArray()[currentTrack].duration / 60).toFixed(2);
   var timer = function() {
     if(seconds<60===true){
       seconds+=0.01;
       audioPastTime.innerHTML='0'+seconds.toFixed(2);
     }else{
       seconds=0;
       seconds+=0.01;
       minutes++;
       audioPastTime.innerHTML=minutes+':'+seconds;
     }
   };

    //Reset Progress Timer
    function resetTimer(){
      seconds=0;
      audioPastTime.innerHTML='00'+':'+'00';
    }
    function progressBarUpdate(){
      innerProgressBar.addEventListener('mousedown', function(){
        innerProgressBar.style.width=parseInt(trackArray()[currentTrack].currentTime%60);
      });
    }

  // AUTO NEXT
  var autoNext = function() {
    trackArray()[currentTrack].onended = function() {
      progres = 1;
      window.clearInterval(fullBarIncrease);
      window.clearInterval(pastTimepast);
      audioNext();
    };
    titleDisplay();
    resetTimer();
  };
  // Play
  var audioPlay = function() {
    for (var i = 0; i < trackArray().length; i++) {
      trackArray()[currentTrack].play();
    }
    autoNext();
  };
  // Pause
  var audioPause = function() {
    for (var i = 0; i < trackArray().length; i++) {
      trackArray()[currentTrack].pause();
    }
  };
  //NEXT
  var audioNext = function() {
    trackArray()[currentTrack].pause();
    trackArray()[currentTrack].currentTrackReset = function() {
      trackArray()[currentTrack].currentTime = 0;
      visualizer.currentTime = Math.floor(Math.random() * 350);
    };
    if (currentTrack === maxTrack) {
      trackArray()[currentTrack].currentTrackReset();
      currentTrack = 0;
      trackArray()[currentTrack].play();
      interval=window.setInterval(timer, 1000);
    } else {
      trackArray()[currentTrack].currentTrackReset();
      currentTrack++;
      trackArray()[currentTrack].play();
    }
    autoNext();
  };
  //PREVIOUS
  var audioPrev = function() {
    trackArray()[currentTrack].pause();
    trackArray()[currentTrack].currentTrackReset = function() {
      trackArray()[currentTrack].currentTime = 0;
      visualizer.currentTime = Math.floor(Math.random() * 350);
    };
    if (currentTrack === 0) {
      trackArray()[currentTrack].currentTrackReset();
      currentTrack = maxTrack;
      trackArray()[currentTrack].play();
    } else {
      trackArray()[currentTrack].currentTrackReset();
      currentTrack--;
      trackArray()[currentTrack].play();
    }
    autoNext();
  };
  setEventListeners();
})();


//SIDEBAR COLLAPSER
var sidebarCollapse = (function(){
  var navLinks = document.querySelectorAll('.sidebar__button');
  var sideBar =  document.querySelector('.sidebar');
  var navBar = document.querySelector('.navbar');
  function collapseNavEventListener(){
    //Toggle Nav
    document.getElementById('menu').addEventListener('click', function(){
      openNav();
      sideBar.classList.remove('fade-out');
      sideBar.classList.add('fade-in');
      navBar.classList.remove('fade-in');
      navBar.classList.add('fade-out');
    });
    document.getElementById('menu-sidebar').addEventListener('click', function(){
      closeNav();
      sideBar.classList.remove('fade-in');
      sideBar.classList.add('fade-out');
      navBar.classList.remove('fade-out');
      navBar.classList.add('fade-in');
    });
  }
  //Text animation
  var introText = document.querySelector('#logo');
  function fadeUpText(){

  }
  function openNav(){
  var closeButton=document.getElementById('menu-sidebar');
  var sideBar =  document.querySelector('.sidebar');
  var navbar = document.querySelector('.navbar');
    closeButton.style.display='block';
    navbar.style.display='none';
    sideBar.style.display='block';
    sideBar.style.left='80%';
  }
  function closeNav(){
    var sideBar =  document.querySelector('.sidebar');
    var navbar = document.querySelector('.navbar');
    var closeButton=document.getElementById('menu-sidebar');
      closeButton.style.display='block';
      navbar.style.display='block';
      sideBar.style.display='none';
      sideBar.style.left='100%';
  }
  collapseNavEventListener();
})();
