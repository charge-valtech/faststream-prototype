 /*  Copyright (c) 2015 The WebRTC project authors. All Rights Reserved.
  *
  *  Use of this source code is governed by a BSD-style license
  *  that can be found in the LICENSE file in the root of the source
  *  tree.
  */

  // This code is adapted from
  // https://rawgit.com/Miguelao/demos/master/mediarecorder.html

  'use strict';

  /* globals MediaRecorder */

  var mediaSource = new MediaSource();
  mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
  var mediaRecorder;
  var recordedBlobs;
  var sourceBuffer;

  var gumVideo = document.querySelector('video#gum');

  var recordingTime = document.getElementById("timeToRecord");
  var counter = document.getElementById("videoTime");
  var thinkingText = document.getElementById("thinkingText");
  var saveButton = document.getElementById("saveButton");
  var startRecordingBtn = document.getElementById("startRecordingBtn");
  var stopRecordingBtn = document.getElementById("stopRecordingBtn");

  // var playButton = document.querySelector('button#play');
  // var downloadButton = document.querySelector('button#download');
  // playButton.onclick = playBackVideo;
  // downloadButton.onclick = download;

  // window.isSecureContext could be used for Chrome
  var isSecureOrigin = location.protocol === 'https:' ||
  location.host === 'localhost:7100';
  if (!isSecureOrigin) {
    alert('getUserMedia() must be run from a secure origin: HTTPS or localhost.' +
      '\n\nChanging protocol to HTTPS');
    location.protocol = 'HTTPS';
  }

  // Use old-style gUM to avoid requirement to enable the
  // Enable experimental Web Platform features flag in Chrome 49

  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

  var constraints = {
    audio: true,
    video: {width: 1280, height: 720}
  };

  navigator.mediaDevices.getUserMedia(
    constraints
  ).then(
    successCallback,
    errorCallback
  );

  function successCallback(stream) {
    console.log('getUserMedia() got stream: ', stream);
    window.stream = stream;
    if (window.URL) {
      gumVideo.src = window.URL.createObjectURL(stream);
    } else {
      gumVideo.src = stream;
    }
  }

  function errorCallback(error) {
    console.log('navigator.getUserMedia error: ', error);
  }

  // navigator.mediaDevices.getUserMedia(constraints)
  // .then(function(stream) {
  //   console.log('getUserMedia() got stream: ', stream);
  //   window.stream = stream; // make available to browser console
  //   if (window.URL) {
  //     gumVideo.src = window.URL.createObjectURL(stream);
  //   } else {
  //     gumVideo.src = stream;
  //   }
  // }).catch(function(error) {
  //   console.log('navigator.getUserMedia error: ', error);
  // });

  function handleSourceOpen(event) {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
  }

  function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
  }

  function handleStop(event) {
    console.log('Recorder stopped: ', event);
  }

  stopRecordingBtn.onclick = function(e) {
    stopRecording();
    stopRecordingBtn.blur();
    stopRecordingBtn.className += 'toggle-content';
    e.preventDefault();
  }

  // The nested try blocks will be simplified when Chrome 47 moves to Stable
  function startRecording() {
    var options = {mimeType: 'video/webm'};
    recordedBlobs = [];
    try {
      mediaRecorder = new MediaRecorder(window.stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        options = {mimeType: 'video/webm,codecs=vp9'};
        mediaRecorder = new MediaRecorder(window.stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = 'video/vp8'; // Chrome 47
          mediaRecorder = new MediaRecorder(window.stream, options);
        } catch (e2) {
          alert('MediaRecorder is not supported by this browser.\n\n' +
              'Try Firefox 29 or later, or Chrome 47 or later, with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          return;
        }
      }
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    thinkingText.textContent = 'The time to record your answer has started.';
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(10); // collect 10ms of data
    console.log('MediaRecorder started', mediaRecorder);
    minuteCountdown(2);
  }

  startCountdown();

  function startCountdown() {
    var thinkingCounter = 30;
    var id = setInterval(function() {
      thinkingCounter--;
      if(thinkingCounter < 0) {
        startRecording();
        clearInterval(id);
      } else {
          $('#timeCountdown').text(thinkingCounter.toString());
      }
    }, 1000);

    startRecordingBtn.onclick = function(e) {
      thinkingCounter = 0;
      startRecordingBtn.className += 'toggle-content';
      startRecordingBtn.blur();
      stopRecordingBtn.className = '';
      e.preventDefault();
    }
  }

  function minuteCountdown(minutes) {
    var seconds = 60;
    var mins = minutes;

    recordingText.textContent = 'Recording your answer';
    recordingTime.className += ' recording-video';

    function tick() {
      var current_minutes = mins-1;
      seconds--;
      counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
      if( seconds > 0 ) {
          setTimeout(tick, 1000);
        } else {
          if(current_minutes == 0) {
            stopRecording();
          }
          if(mins > 1){
            setTimeout(function () { minuteCountdown(mins - 1); }, 1000);
          }
        }
      }
    tick();
  }

  function stopRecording() {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
    thinkingText.textContent = 'Your recording has finished, you can now proceed to the next question.';
    recordingTime.textContent = 'Your recording has finished';
    // playButton.disabled = false;

    var superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    gumVideo.src = window.URL.createObjectURL(superBuffer);

    gumVideo.removeAttribute('autoplay');
    gumVideo.removeAttribute('muted');
    gumVideo.className += ' disabled';

  }

  function playBackVideo() {
    recordingTime.textContent = 'Playing back your answer';
    gumVideo.play();
    playButton.disabled = true;
  }
