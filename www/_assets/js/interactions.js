$(function() {

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any()) {
    FastClick.attach(document.body);

    $('input[autofocus]').removeAttr('autofocus');
  }

  function isAndroid() {
    var nua = navigator.userAgent,
        isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
    if (isAndroid) {
      $('html').addClass('android-browser');
    }
  }

  isAndroid();

  $('.nav-menu__trigger').on('click', function() {
    $(this).next('.nav-menu__items').toggleClass('toggle-content');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.mob-collpanel-trigger').on('click', function() {
    $(this).next('.mob-collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.collpanel-trigger').on('click', function() {
    $(this).next('.collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.button-toggler').on('click', function() {
    var $this = $(this),
        $target = $this.attr('data-target');

    $('#' + $target).toggleClass('toggle-content');

    return false;
  });

  // Create linked input fields (For using email address as username)
  $('.linked-input-master').on('keyup blur', function() {
    var masterVal = $(this).val();
    $('.linked-input-slave').val(masterVal);
    $('.linked-input-slave').removeClass('hidden').text(masterVal);
    if($(this).val() == '') {
      $('.linked-input-slave').addClass('hidden');
    }
  });

  $(".block-label").each(function(){
    var $target = $(this).attr('data-target');

    // Add focus
    $(".block-label input").focus(function() {
      $("label[for='" + this.id + "']").addClass("add-focus");
      }).blur(function() {
      $("label").removeClass("add-focus");
    });
    // Add selected class
    $('input:checked').parent().addClass('selected');

    if($(this).hasClass('selected')) {
      $('#' + $target).show();
    }
  });

  // Add/remove selected class
  $('.block-label').on('click', 'input[type=radio], input[type=checkbox]', function() {
    var $this   = $(this),
        $target = $this.parent().attr('data-target'),
        $siblingArray = [],
        $siblingTarget = '',
        $disTarget = $this.parent().attr('data-distarget'),
        $theTargetControl = $('#' + $disTarget);

    $this.closest('.form-group').find('.block-label').not($this.parent()).each(function() {
      $siblingArray.push('#' + $(this).attr('data-target'));
      $siblingTarget = $siblingArray.join(", ");
    });

    $('input:not(:checked)').parent().removeClass('selected');
    $('input:checked').parent().addClass('selected');

    if($target == undefined) {
      $this.closest('.form-group').siblings('.toggle-content').hide().attr('aria-hidden', true);
      $this.closest('.form-group').find('[aria-expanded]').attr('aria-expanded', false);
    } else {
      $('#' + $target).show();
      $($siblingTarget).hide().attr('aria-hidden', true);

      if($this.closest('.form-group').hasClass('blocklabel-single')) {

        $this.closest('.blocklabel-single-container').find('.blocklabel-content').not('#' + $target).hide();
      }
    }

    if($disTarget && !$theTargetControl.attr('disabled')) {
      $theTargetControl.attr('disabled', true);
      if($theTargetControl.attr('type') == 'text') {
        $theTargetControl.val('');
      } else if($theTargetControl.is('select')) {
        $theTargetControl.find('> option:first-of-type').attr('selected', true);
      }
    } else if($disTarget && $theTargetControl.attr('disabled')) {
      $theTargetControl.attr('disabled', false);
    }

  });

  $('.selectWithOptionTrigger').on('change', function() {
    var optionTrigger = $(this).find('.optionTrigger'),
        optionTarget = $('#' + optionTrigger.attr('data-optiontrigger'));

    if(optionTrigger.is(':selected')) {
      optionTarget.show();
    } else {
      optionTarget.hide();
    }
  });

  $('.amend-answers').on('click', function() {
    $(this).closest('.form-group').toggleClass('expanded');
    return false;
  });

  $('.update-answers').on('click', function() {
    $(this).closest('.form-group').toggleClass('expanded');
  });

  $('.summary-trigger').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.summary-close').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.inpage-focus').on('click', function() {
    var $this      = $(this),
        $target    = $this.attr('href'),
        $targetFor = $($target).attr('for');

    $('#' + $targetFor).focus();
  });


  //--------Max character length on textareas

  $('textarea').on('keyup', function() {
    characterCount(this);
  });

  $('textarea:not(:empty)').each(function() {
    characterCount(this);
  });

  setTimeout(function() {
    $('textarea[data-value]').each(function() {
      characterCount(this);
    });
  }, 1000);

  function characterCount(that) {
    var $this         = $(that),
        $maxLength    = $this.attr('data-val-length-max'),
        $enteredText  = $this.val(),
        $lineBreaks   = ($enteredText.match(/\n/g) || []).length,
        $lengthOfText = $enteredText.length + $lineBreaks,
        $characterCount = Math.abs($maxLength - $lengthOfText),
        $charCountEl  = $this.closest('.form-group').find('.maxchar-count'),
        $charTextEl   = $this.closest('.form-group').find('.maxchar-text'),
        $thisAria     = $this.closest('.form-group').find('.aria-limit');

    if($maxLength) {
        $charCountEl.text($characterCount);
    }

    if($lengthOfText > $maxLength) {
        $charCountEl.parent().addClass('has-error');
        $charTextEl.text(' characters over the limit');
        $thisAria.text("Character limit has been reached, you must type fewer than " + $maxLength + " characters");
        if ($characterCount == 1) {
            $charTextEl.text(' character over the limit');
        } else {
            $charTextEl.text(' characters over the limit');
        }
    } else {
        $charCountEl.parent().removeClass('has-error');
        $charTextEl.text(' characters remaining');
        $thisAria.text("");
        if ($characterCount == 1) {
            $charTextEl.text(' character remaining');
        } else {
            $charTextEl.text(' characters remaining');
        }
    }
  }

  //----------Details > Summary ARIA

  $('[aria-expanded]').on('click', function() {
    var $this = $(this),
        $controls = $(this).attr('aria-controls');

    if(!$this.parent().hasClass('selected')) {
      if($this.is('[aria-expanded="false"]')) {
        $('#' + $controls).attr('aria-hidden', false);
        $this.attr('aria-expanded', true);
      } else {
        $('#' + $controls).attr('aria-hidden', true);
        $this.attr('aria-expanded', false);
      }
    }

  });

  $('[aria-hidden]').each(function() {
    var $controlID = $(this).attr('id');

    if($(this).is(':visible')) {
      $(this).attr('aria-hidden', false);
      $('[aria-controls="' + $controlID + '"]').attr('aria-expanded', true);
    }
  });

  //------- Select to inject content to text input

  $('.select-inject').on('change', function () {
      var $this = $(this),
          $selectedOption = $this.find('option:selected'),
          $thisOptionText = $selectedOption.text(),
          $theInput = $this.closest('.form-group').find('.select-injected'),
          $selectedVal = $selectedOption.val();

      $theInput.val($thisOptionText);

      $('.selfServe').each(function() {
        if($(this).prop('id') == $selectedVal) {
          $(this).show();
          $('.selfServe').not($(this)).hide();
        }
      });

      if($('#' + $selectedVal).length == 0) {
        $('.selfServe').hide();
      }

      if ($selectedVal == "noSelect") {
          $theInput.val("");
      }

      $theInput.focusout();
  });

  //------- Password meter

  if($('.new-password').length) {
    var minChars = 9,
        upperCase = new RegExp('[A-Z]'),
        lowerCase = new RegExp('[a-z]'),
        numbers = new RegExp('[0-9]'),
        passInput = $('.new-password'),
        confirmPass = $('.confirm-password'),
        requiresUppercase = $('#includesUppercase'),
        requiresLowercase = $('#includesLowercase'),
        requiresNumber = $('#includesNumber'),
        requires9Characters = $('#includes9Characters'),
        upperIcon = requiresUppercase.find('.the-icon'),
        lowerIcon = requiresLowercase.find('.the-icon'),
        numberIcon = requiresNumber.find('.the-icon'),
        char9Icon = requires9Characters.find('.the-icon');

    // passInput.after('<p class="form-hint text strength-indicator hide-nojs">Password validation: <span id="pass_meter"></span></p>');
    confirmPass.after('<div id="matchingHint" class="invisible"><p class="form-hint">Password matching: <span id="pass_match"></span></p></div>');

    confirmPass.on('blur', function() {
      $('#matchingHint').removeClass('invisible');
      if($('#pass_match').hasClass('strength-weak')) {
        $('#errorPassword').removeClass('hidden');
      }
    });

    passInput.keyup(function () {
      var passVal = $(this).val(),
          passMeter = $("#pass_meter"),
          matchVal = confirmPass.val();

      if(passVal.match(upperCase)) {
        requiresUppercase.addClass('strength-strong');
        upperIcon.removeClass('fa-minus fa-times');
        upperIcon.addClass('fa-check');
      } else {
        requiresUppercase.removeClass('strength-strong strength-weak');
        upperIcon.removeClass('fa-check');
        upperIcon.addClass('fa-minus');
      }

      if(passVal.match(lowerCase)) {
        requiresLowercase.addClass('strength-strong');
        lowerIcon.removeClass('fa-minus fa-times');
        lowerIcon.addClass('fa-check');
      } else {
        requiresLowercase.removeClass('strength-strong strength-weak');
        lowerIcon.removeClass('fa-check');
        lowerIcon.addClass('fa-minus');
      }

      if(passVal.match(numbers)) {
        requiresNumber.addClass('strength-strong');
        numberIcon.removeClass('fa-minus fa-times');
        numberIcon.addClass('fa-check');
      } else {
        requiresNumber.removeClass('strength-strong strength-weak');
        numberIcon.removeClass('fa-check');
        numberIcon.addClass('fa-minus');
      }

      if(passVal.length >= minChars) {
        requires9Characters.addClass('strength-strong');
        char9Icon.removeClass('fa-minus fa-times');
        char9Icon.addClass('fa-check');
      } else {
        requires9Characters.removeClass('strength-strong strength-weak');
        char9Icon.removeClass('fa-check');
        char9Icon.addClass('fa-minus');
      }

      if($('#passwordRequirements').find('.fa-minus').length === 0) {
        $('#errorPassword').addClass('hidden');
      }

      if(matchVal.length >= minChars) {
        if(matchVal.length == passVal.length) {
          if(matchVal === passVal) {
            $('#pass_match').removeClass('strength-weak').addClass('strength-strong').text("Your passwords match");
          } else {
            $('#pass_match').removeClass('strength-strong').addClass('strength-weak').text("Your passwords don't match");
          }
        } else {
          $('#pass_match').removeClass('strength-strong').addClass('strength-weak').text("Your passwords don't match");
        }
      }
    });

    passInput.on('blur', function() {
      $('#passwordRequirements li').each(function() {
        if(!$(this).hasClass('strength-strong')) {
          $(this).addClass('strength-weak').find('.the-icon').removeClass('fa-minus').addClass('fa-times');

        }
      });

      if($('#passwordRequirements').find('.fa-times').length === 0) {
        $('#errorPassword').addClass('hidden');
      } else {
        $('#errorPassword').removeClass('hidden');
      }
    });

    confirmPass.keyup(function() {
      var passVal = passInput.val(),
          matchVal = $(this).val();

      if(matchVal.length == passVal.length) {
        if(matchVal === passVal) {
          $('#pass_match').removeClass('strength-weak').addClass('strength-strong').text("Your passwords match");
          $('#errorPassword').addClass('hidden');
        } else {
          $('#pass_match').removeClass('strength-strong').addClass('strength-weak').text("Your passwords don't match");
        }
      } else if(matchVal.length !== 0 ) {
        $('#pass_match').removeClass('strength-strong').addClass('strength-weak').text("Your passwords don't match");
      }

    });
  }



  //------- Inline details toggle

  $('.summary-style').on('click', function() {
    $this = $(this);

    $this.toggleClass('open');

    $this.next('.detail-content').toggle();
  });

  // if($('html').hasClass('no-touch')) {
  //   $('.chosen-select').chosen({width: '100%'});
  // } else {
  //   $('.chosen-select').each(function() {
  //     $(this).find('.placeholder-option').text('Select an option')
  //   });
  // }

});