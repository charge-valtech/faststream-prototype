/* 
 * Copyright 2016 HM Revenue & Customs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/ 


// --------------- Not to be used in production -------------- //

$(function() {

  function gup( name )
  {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
      return null;
    else
      return results[1];
  }

  var storedFirstName = $.jStorage.get('firstName'),
      storedLastName = $.jStorage.get('lastName'),
      storedEmail = $.jStorage.get('emailAddress'),
      storedPrefName = $.jStorage.get('preferredName'),
      storedDobDay = ("00" + new Number($.jStorage.get('dobDay'))).substr(-2,2),
      storedDobMonth = ("00" + new Number($.jStorage.get('dobMonth'))).substr(-2,2),
      storedDobYear = $.jStorage.get('dobYear'),
      storedAddress01 = $.jStorage.get('address01'),
      storedAddress02 = $.jStorage.get('address02'),
      storedAddress03 = $.jStorage.get('address03'),
      storedAddress03b = $.jStorage.get('address03b'),
      storedAddress04 = $.jStorage.get('address04'),
      storedMobNumber = $.jStorage.get('mob-number'),
      storedLandNumber = $.jStorage.get('land-number'),
      storedAlevel = $.jStorage.get('aLevels'),
      storedFirstLoc = $.jStorage.get('first-storageLocation'),
      storedFirstFrame1 = $.jStorage.get('first-storageFirstScheme'),
      storedFirstFrame2 = $.jStorage.get('first-storageSecondScheme'),
      storedSecondLoc = $.jStorage.get('second-storageLocation'),
      storedSecondFrame1 = $.jStorage.get('second-storageFirstScheme'),
      storedSecondFrame2 = $.jStorage.get('second-storageSecondScheme'),
      storedAltLocation = $.jStorage.get('considerAltLocation'),
      storedAltScheme = $.jStorage.get('considerAltScheme'),
      longMonths = {'01':'January', '02':'February', '03':'March', '04':'April', '05':'May', '06':'June', '07':'July', '08':'August', '09':'September', '10':'October', '11':'November', '12':'December'},
      shortMonths = {'01':'Jan', '02':'Feb', '03':'Mar', '04':'Apr', '05':'May', '06':'June', '07':'July', '08':'Aug', '09':'Sept', '10':'Oct', '11':'Nov', '12':'Dec'};

  $('#createAccountBtn').on('click', function() {
    $.jStorage.set('firstName', $('#first-name').val());
    $.jStorage.set('lastName', $('#last-name').val());
    $.jStorage.set('emailAddress', $('#email-input').val());
  });

  if($('#personalDetailsHeading').length && storedFirstName != undefined) {
    $('#first-name').val(storedFirstName);
    $('#last-name').val(storedLastName);
    $('#preferredName').val(storedFirstName);
  }

  $('#detailsContinue').on('click', function() {
    $.jStorage.set('preferredName', $('#preferredName').val());

    $.jStorage.set('dobDay', $('#dob-day').val());
    $.jStorage.set('dobMonth', $('#dob-month').val());
    $.jStorage.set('dobYear', $('#dob-year').val());

    $.jStorage.set('address01', $('#address1').val());
    $.jStorage.set('address02', $('#address2').val());
    $.jStorage.set('address03', $('#address3').val());
    $.jStorage.set('address03b', $('#address3b').val());
    $.jStorage.set('address04', $('#address4').val());

    $.jStorage.set('mob-number', $('#phone-input').val());
    $.jStorage.set('land-number', $('#phone-input2').val());


    if($('#alevel-yes').is(':checked')) {
      $.jStorage.set('aLevels', true);
    } else {
      $.jStorage.set('aLevels', false);
    }
  });

  //------------- Set personal details

  if($('#dob-day').length && gup('continue') == 'true') {
    $('#dob-day').val(storedDobDay);
    $('#dob-month').val(storedDobMonth);
    $('#dob-year').val(storedDobYear);

    $('#address1').val(storedAddress01);
    $('#address2').val(storedAddress02);
    $('#address3').val(storedAddress03);
    $('#address3b').val(storedAddress03b);
    $('#address4').val(storedAddress04);

    $('#phone-input').val(storedMobNumber);
    $('#phone-input2').val(storedLandNumber);


    if(storedAlevel == false ) {
      $('#alevel-no').attr('checked', true).parent().addClass('selected');
    } else {
      $('#alevel-yes').attr('checked', true).parent().addClass('selected');
    }

    $('#detailsContinue').attr('href', $('#detailsContinue').attr('href') + '?continue=true');
  }

  if($('#checkApplicationHeading').length && storedFirstName != undefined) {
    $('#fullName').text(storedFirstName + ' ' + storedLastName);

    $('#preferredName').text(storedPrefName);

    $('#dateOfBirth').text(storedDobDay + ' ' + longMonths[storedDobMonth] + ' ' + storedDobYear);

    $('#address1').text(storedAddress01);
    $('#address2').text(storedAddress02);
    $('#address3').text(storedAddress03);
    $('#address3b').text(storedAddress03b);
    $('#address4').text(storedAddress04);

    $('#phone-input').text(storedMobNumber);
    $('#phone-input2').text(storedLandNumber);

    if(storedAlevel == false ) {
      $('#minGCSEs').removeClass('hidden');
      $('#minAlevels').addClass('hidden');
    } else {
      $('#minGCSEs').addClass('hidden');
      $('#minAlevels').removeClass('hidden');
    }

    $('#firstPreference').text(storedFirstLoc + ' (' + storedFirstFrame1 + ', ' + storedFirstFrame2 + ')');

    if(storedSecondLoc != null) {
      $('#secondPreference').text(storedSecondLoc + ' (' + storedSecondFrame1 + ', ' + storedSecondFrame2 + ')');
    } else {
      $('#noSecondPreference').removeClass('hidden');
      $('#secondPreference').addClass('hidden');
    }

    $('#considerAltLocation').text(storedAltLocation);

    $('#considerAltScheme').text(storedAltScheme);

  }


  $('.first-choice-btn').on('click', function() {
    var locationSelected = $('#regionSelect').html(),
        firstScheme = $('#schemePref1').val(),
        secondScheme = $('#schemePref2').val();

    $.jStorage.set('first-storageLocation', locationSelected);
    $.jStorage.set('first-storageFirstScheme', firstScheme);
    $.jStorage.set('first-storageSecondScheme', secondScheme);

  });

  $('.second-choice-btn').on('click', function() {
    var locationSelected = $('#regionSelect').val(),
        firstScheme = $('#schemePref1').val(),
        secondScheme = $('#schemePref2').val();

    $.jStorage.set('second-storageLocation', locationSelected);
    $.jStorage.set('second-storageFirstScheme', firstScheme);
    $.jStorage.set('second-storageSecondScheme', secondScheme);

  });

  $('#locFramContinue').on('click', function() {

    $.jStorage.set('considerAltLocation', $('[name="altregion"]:checked').parent().text());
    $.jStorage.set('considerAltScheme', $('[name="altscheme"]:checked').parent().text());

  });

  if($('#firstChosenLocation').length) {
    var locationSelected = $.jStorage.get('first-storageLocation'),
        firstScheme = $.jStorage.get('first-storageFirstScheme'),
        secondScheme = $.jStorage.get('first-storageSecondScheme');

    $('option[value="' + locationSelected +'"]').attr('disabled', true);
    $('#regionSelect').trigger("chosen:updated");

    $('#firstChosenLocation').text(locationSelected);
    $('#firstChosenSchemes').text(firstScheme + ', ' + secondScheme);
  }

  if($('#firstChosenLocation').length && storedSecondLoc !== null) {

    $('#secondChoiceInfo').removeClass('toggle-content');

    $('#secondChosenLocation').text(storedSecondLoc);
    $('#secondChosenSchemes').text(storedSecondFrame1 + ', ' + storedSecondFrame2);
  }

  $('#noSecondPreference').on('click', function() {

    $.jStorage.deleteKey('second-storageLocation');
    $.jStorage.deleteKey('second-storageFirstScheme');
    $.jStorage.deleteKey('second-storageSecondScheme');

  });

  if($('#SuccessMessageText').length && storedEmail) {
    $('#emailAddress').text(storedEmail);
  }

  if($('#nameOnHome').length && storedFirstName) {
    $('#nameOnHome').text(storedFirstName + ' ' + storedLastName);
  }

  if($('#nameOnHome').length) {
    var thePage = gup('Page'),
        prevItems = $('#' + thePage).prevAll(),
        theHref = $('#' + thePage).attr('data-href'),
        doneSdip = $.jStorage.get('doneSdip');

    prevItems.each(function(index) {
      var prevHref = $(this).attr('data-href');
      $(this).find('.the-icon').toggleClass('fa-minus fa-check');
      $(this).contents().eq(1).wrap('<a href="' + prevHref + '" />');
    });

    $('#' + thePage).contents().eq(1).wrap('<a href="' + theHref + '" />');
    // $('#startAppBtn').removeClass('button').text('Continue your application').attr('href', theHref);

    if(doneSdip === true) {
      $('#hideIfSdip').addClass('toggle-content');
      $('#showIfSdip').removeClass('toggle-content');
    } else {
      $('#showIfSdip').addClass('toggle-content');
      $('#hideIfSdip').removeClass('toggle-content');
    }
  }

  //-- Find address mock behaviour

  $('#findAddressBtn').on('click', function(e) {
    e.preventDefault();

    $('#addressSelectContainer').show();

  });

  $('#addressSelect').on('change', function() {
    var $thisVal = $(this).val();

    $('#addressManualInput').removeClass('disabled');

    if($thisVal !== 'void') {
      $('#address1').val($thisVal);
      $('#address2').val('Town');
      $('#address4').val($('#post-code').val());
    }
  });

  $('#addressManualLink').on('click', function(e) {
    e.preventDefault();

    $('#addressManualInput').removeClass('disabled');
    $('#address1').focus();
  });

  $('#outside-uk').on('change', function() {

    if($(this).is(':checked')) {
      $('#addressManualInput').removeClass('disabled');
      $('#address4').closest('.form-group').addClass('toggle-content');
      $('#address4').closest('.form-group').prev('.form-group').removeClass('form-group-compound');
      $('#address1').focus();
    } else {
      $('#address4').closest('.form-group').removeClass('toggle-content');
      $('#address4').closest('.form-group').prev('.form-group').addClass('form-group-compound');
    }

  });


  //-- Errors on pattern library page

  $('#errorButton').on('click', function() {
    $('.validation-summary-errors').toggle();
    $('.has-an-error').toggleClass('input-validation-error');
    $('.has-an-error').find('.has-error').text('Oh no, you need to enter something in there');
  });

  //-- Banner sign in

  $('#btnSignIn').on('click', function() {
    $.cookie('signedIn', true, {path: '/'});
  });

  $('#btnSignOut, #withdrawApplication').on('click', function() {
    $.removeCookie('signedIn', { path: '/' });
    $.jStorage.flush();
  });

  if($('#signedOut').length && gup('Status') == 'signout') {
    $('#signedOut').show();
  }

  if($('#signedOut').length && gup('Status') == 'testsready') {
    $('#btnSignIn').attr('href', 'profile-home-tests.html');
  }

  if($('#signedOut').length && gup('Status') == 'testscomplete') {
    $('#btnSignIn').attr('href', 'profile-home-tests-complete.html');
  }

  if($('#signedOut').length && gup('Status') == 'testsexpired') {
    $('#btnSignIn').attr('href', 'profile-home-tests-expired.html');
  }

  if($('#signedOut').length && gup('Status') == 'testssuccessful') {
    $('#btnSignIn').attr('href', 'profile-home-tests-successful.html');
  }

  if($('#signedOut').length && gup('Status') == 'attend') {
    $('#btnSignIn').attr('href', 'profile-home-assessment.html');
  }

  if($('#signedOut').length && gup('Status') == 'closed') {
    $('#btnSignIn').attr('href', 'profile-home-closed.html');
    $('#applicationsClosed').removeClass('toggle-content');
    $('#applicationsOpenedCreate').addClass('toggle-content');
  }

  if($('#signedOut').length && gup('Status') == 'withdrawn') {
    $('#withdrawnApplication').show();
  }

  if($('#signedOut').length && gup('Status') == 'unlocked') {
    $('#accountUnlocked').show();
  }

  if($('#signedOut').length && gup('Status') == 'cookie') {
    $('#global-cookie-message').removeClass('hidden');
  }

  if($('#sentDetails').length && gup('Status') == 'othergrad') {
    $('#sentDetails').removeClass('toggle-content');
  }

  if($('#adjustmentTime').length && gup('change') == 'adjustment') {
    $('#adjustmentTime, #adjustmentSuccess').removeClass('toggle-content');
    $('#adjustmentLink').addClass('toggle-content');
  }

  if($('#canAttendBtn').length && gup('Status') == 'attending') {
    $('#attendQuestion').hide();
    $('#assessmentSuccess').show();
  }

  if($('#passMarkSuccess').length && gup('Status') == 'success') {
    $('#passMarkSuccess').removeClass('toggle-content');
  }

  if($('#passMarkSuccess').length && gup('Status') == 'allset') {
    $('[data-hiddenpassmark]').removeClass('toggle-content');
    $('#submitPassMarks').removeClass('disabled');
  }

  if($('.locationExtractDay').length && gup('Status') == 'confirmed') {
    $('.locationExtractDay').removeClass('toggle-content');
    $('[data-daycol="1"]').find('.unconfirmed-slot').toggleClass('unconfirmed-slot booked-slot');
    $('[data-daycol="1"]').find('.slot-action').html('<span class="confirmed-text">Confirmed</span>');
  }

  if($('#testsResetSuccess').length && gup('Status') == 'reset') {
    $('#testsResetSuccess').removeClass('toggle-content');
    $('#textStarted').addClass('toggle-content');
    $('#textNotStarted').removeClass('toggle-content');
    $('#textExpire').text('1:30pm on 13 April 2016');
  }

  if($('#testsTimeSuccess').length && gup('Status') == 'extend') {
    $('#testsTimeSuccess').removeClass('toggle-content');
    $('#textExpire').text('1:30pm on 13 April 2016');
  }

  if($('#testsPassed').length && gup('Status') == 'assessment') {
    $('#testsInProgress, #placeCandidateInSlot').addClass('toggle-content');
    $('#testsPassed, #assessmentCentre, #addCandidateToSlot').removeClass('toggle-content');
  }

  if($('#addedSubmitBtn').length && gup('Status') == 'added') {
    $('#addedCandidates, #addedSubmitBtn').removeClass('toggle-content');
  }

  $('#addCandidateToSlot').on('click', function() {
    $.cookie('placingCandidate', true, {path: '/'});
  });

  if($('#testsPassed').length && gup('Status') == 'booked') {
    $('#testsInProgress, #assessmentNotBooked').addClass('toggle-content');
    $('#testsPassed, #assessmentCentre, #assessmentBooked').removeClass('toggle-content');
  }

  $('#changeBookedSlot').on('click', function () {
    $.cookie('placingCandidate', true, {path: '/'});
  });
  $('#removeBookedSlot').on('click', function(e){
    e.preventDefault();

    $('#assessmentNotBooked').removeClass('toggle-content');
    $('#assessmentBooked').addClass('toggle-content');

    $.removeCookie('placingCandidate', { path: '/' });
  });

  $('#hideIEMessage').on('click', function() {
    $.cookie('hideMessage', true, {path: '/'});
  });

  if($.cookie('hideMessage')) {
    $('html').addClass('message-hidden');
  }

  if($.cookie('signedIn')) {
    $('#bannerSignedOut').hide();
    $('#bannerSignedIn').show();
    if(storedFirstName != null) {
      $('#bannerUserName').text(storedFirstName + ' ' + storedLastName);
    }
  } else {
    $('#bannerSignedOut').show();
    $('#bannerSignedIn').hide();
  }

  $('.pw-masktoggle').on("click", function () {
    changePassType();
    toggleShowHide();

    return false;
  });

  $('#singleApplicant').on('change [radio]', function() {
    var secureYes = $('#singleApplicant [data-secure="yes"]:checked'),
        secureNo = $('#singleApplicant [data-secure="no"]:checked');

    if(secureYes.length >= 3) {
      $('#singleApplicant').addClass('passed-security');
      $('#singleApplicant').removeClass('failed-security');
    } else {
      $('#singleApplicant').removeClass('passed-security');
    }

    if(secureNo.length >= 1 && secureYes.length < 3) {
      $('#singleApplicant').addClass('failed-security');
    } else {
      $('#singleApplicant').removeClass('failed-security');
    }
  });

  $('#findApplicantBtn').on('click', function(e) {
    e.preventDefault();

    $('#multipleApplicants').show();
  });

  if(gup('show') == 'results') {
    $('#multipleApplicants').show();
  }

  $('#askSecurityQuestions').on('click', function(e) {
    e.preventDefault();

    $('#securityQuestions').removeClass('toggle-content');
  });

  $('.locationAddCandidate').on('click', function() {
    var slotHalf = Number($(this).closest('tbody').attr('data-half')) - 1,
        slotRow = $(this).closest('tr').index(),
        slotDay = Number($(this).closest('td').attr('data-daycol')) - 1,
        slotLocation = '.half-day:eq(' + slotHalf +') tr:eq(' + slotRow +') td:eq(' + slotDay + ')';

    $.jStorage.set('slotLocation', slotLocation);

    $.cookie('addingCandidate', true, {path: '/'});

  });

  if($.cookie('addingCandidate') && $('#testsPassed').length) {
    $('#testsPassed, #assessmentCentre, #placeCandidateInSlot').removeClass('toggle-content');
    $('#testsInProgress, #addCandidateToSlot').addClass('toggle-content');

    $('#addCandidateToSlot').on('click', function() {
      var fullName = $('#fullName').text();

      $.jStorage.set('candidateName', fullName);
    })
  }

  if($.cookie('addingCandidate') && $('.locationAddCandidate').length) {
    var slotLocater = $($.jStorage.get('slotLocation')),
        candidateName = $.jStorage.get('candidateName');

    slotLocater.html('<div class="booked-slot animate-booked-slot"><div class="candidate-name">'+ candidateName +'</div><a href="" class="link-unimp slot-action">Remove</a></div>');

    $.removeCookie('addingCandidate', { path: '/' });

  }

  if($('.locationRemoveCandidate').length) {
    $('.locationRemoveCandidate').on('click', function(e) {
      var candidateName = $(this).closest('td').find('.candidate-name').text();

      $(this).closest('td').html('<div class="empty-slot"><div class="candidate-name">Empty slot</div><a href="find-candidate.html" class="link-unimp toggle-content locationAddCandidate">Add candidate</a><a href="#" class="link-unimp locationPlaceCandidate">Place candidate</a></div>')

      e.preventDefault();

      $('#managingCandidatePanel').removeClass('toggle-content').find('#candidateManaging').text(candidateName);
      placingCandidate(candidateName);
    });

  }

  if($.cookie('placingCandidate') && $('#managingCandidatePanel').length) {
    $('#managingCandidatePanel').removeClass('toggle-content');
  }

  function placingCandidate(candidate) {
    var candidateName = candidate;

    $('.locationAddCandidate').addClass('toggle-content');
    $('.locationPlaceCandidate').removeClass('toggle-content');

    $('.locationPlaceCandidate').on('click', function(e) {
      e.preventDefault();

      $(this).closest('td').html('<div class="booked-slot animate-booked-slot"><div class="candidate-name">'+ candidateName +'</div><div class="slot-action"><a href="" class="link-unimp">Remove</a></div></div>');

      $('#managingCandidatePanel').addClass('toggle-content');

      $('.locationAddCandidate').removeClass('toggle-content');
      $('.locationPlaceCandidate').addClass('toggle-content');

      $.removeCookie('placingCandidate', { path: '/' });
    });

    $('#stopManagingCandidate').on('click', function(e) {
      $('#managingCandidatePanel').addClass('toggle-content');
      $('.locationAddCandidate').removeClass('toggle-content');
      $('.locationPlaceCandidate').addClass('toggle-content');

      $.removeCookie('placingCandidate', { path: '/' });

      e.preventDefault();
    });

  }

  if($('#managingCandidatePanel').is(':visible')) {
    var candidateName = 'John Smith';

    placingCandidate(candidateName);
  }

  $('[data-candidate-amend]').on('click', function() {
    var thisSection = $(this).closest('section'),
        thisCandName = thisSection.find('[data-candidate-name]').text(),
        thisCandID = thisSection.find('[data-candidate-id]').text(),
        thisCandScore01 = thisSection.find('[data-candidate-score-01]').text(),
        thisCandScore02 = thisSection.find('[data-candidate-score-02]').text(),
        thisCandScore03 = thisSection.find('[data-candidate-score-03]').text(),
        thisCandScoreOverall = thisSection.find('[data-candidate-score-overall]').text(),
        thisCandFeedback = thisSection.find('[data-candidate-feedback]').text();

    $.jStorage.set('thisCandName', thisCandName);
    $.jStorage.set('thisCandID', thisCandID);
    $.jStorage.set('thisCandScore01', thisCandScore01);
    $.jStorage.set('thisCandScore02', thisCandScore02);
    $.jStorage.set('thisCandScore03', thisCandScore03);
    $.jStorage.set('thisCandScoreOverall', thisCandScoreOverall);
    $.jStorage.set('thisCandFeedback', thisCandFeedback);

  });

  if($('#01-score-name').length && gup('Status') == 'amend') {
    $('#01-score-name').val($.jStorage.get('thisCandName'));
    $('#01-score-id').val($.jStorage.get('thisCandID'));
    $('#01-score-01').val($.jStorage.get('thisCandScore01'));
    $('#01-score-02').val($.jStorage.get('thisCandScore02'));
    $('#01-score-03').val($.jStorage.get('thisCandScore03'));
    $('#01-score-overall').val($.jStorage.get('thisCandScoreOverall'));
    $('#01-feedback').html($.jStorage.get('thisCandFeedback'));
  }

  $('#schemeSaveBtn').on('click', function() {
    var schemePreferences = [];

    $('[data-scheme-id]').each(function() {
      var preferenceText = $(this).find('[data-schemeorder]').text(),
          schemeName = $(this).find('[data-schemenameinlist]').text();

      schemePreferences.push({
        preference: preferenceText,
        name: schemeName
      });

    });

    $.jStorage.set('schemePreferences', schemePreferences);
  });

  // Video interview stuff

  if($('#questionVideo').length) {
    var video = document.querySelector('video#questionVideo');
    var playButton = $('#videoPlay');

    playButton.on('click', function(e) {
      e.preventDefault();

      video.play();


      $(this).addClass('disabled').blur();
      $('#writtenQuestion').removeClass('toggle-content');

    });


    video.addEventListener('ended', function() {

      $('#recordAnswer').removeClass('disabled');
      $('#autoRedirect').removeClass("toggle-content");

      startCountdown();
    });

    function startCountdown() {
      var counter = 10,
          nextURL = $('#recordAnswerButton').attr('href');
      setInterval(function() {
        counter--;
        if(counter < 0) {
            window.location.href = nextURL;
        } else {
            $('#timeCountdown').text(counter.toString());
        }
      }, 1000);
    }
  }

// --------------- Not to be used in production -------------- //
});