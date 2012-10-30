// Using the ANIMATIONSHELPER sample library written by David Rousset from Microsoft France - http://blogs.msdn.com/davrous

function LoadJSAnimationsFallback() {
    // number of times you'd like the animations to be run
    var NUM_ITERATIONS = 100;

    var spinElements = document.getElementsByClassName("spinner");
    for (var i = 0; i < spinElements.length; i++) {
      var keyframes = [];
      keyframes.push(new ANIMATIONSHELPER.rotationkeyframe(16, -90));
      keyframes.push(new ANIMATIONSHELPER.rotationkeyframe(33, -120));
      keyframes.push(new ANIMATIONSHELPER.rotationkeyframe(50, 180));
      keyframes.push(new ANIMATIONSHELPER.rotationkeyframe(66, 120));
      keyframes.push(new ANIMATIONSHELPER.rotationkeyframe(83, 90));
  
      var animation = new ANIMATIONSHELPER.animation(spinElements[i], "rotate-spinner", 7000, NUM_ITERATIONS, keyframes);
      ANIMATIONSHELPER.launchAnimation(animation, ANIMATIONSHELPER.easingFunctions.linear);
    }
return;
};