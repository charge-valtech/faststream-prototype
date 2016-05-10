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
        $disTarget = $this.parent().attr('data-distarget'),
        $theTargetControl = $('#' + $disTarget);

    $('input:not(:checked)').parent().removeClass('selected');
    $('input:checked').parent().addClass('selected');

    if($target == undefined) {
      $this.closest('.form-group').next('.toggle-content').hide().attr('aria-hidden', true);
      $this.closest('.form-group').find('[aria-expanded]').attr('aria-expanded', false);
    } else {
      $('#' + $target).show();

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
        confirmPass = $('.confirm-password');

    passInput.after('<p class="form-hint text strength-indicator hide-nojs">Password validation: <span id="pass_meter"></span></p>');
    confirmPass.after('<p class="form-hint">Password matching: <span id="pass_match"></span></p>')

    passInput.keyup(function () {
      var passVal = $(this).val(),
          passMeter = $("#pass_meter"),
          matchVal = confirmPass.val();

      passMeter.removeClass();

      if(passVal.length < minChars) {
        passMeter.addClass('strength-weak').text('Must be at least ' + minChars + ' characters');
      } else {
        if(!passVal.match(upperCase) && !passVal.match(lowerCase) && !passVal.match(numbers)) {
          passMeter.addClass('strength-weak').text('Requires upper and lowercase letters and at least one number');
        }
        if(passVal.match(upperCase) && !passVal.match(lowerCase) && !passVal.match(numbers)) {
          passMeter.addClass('strength-weak').text('Requires lowercase letters and at least one number');
        }
        if(!passVal.match(upperCase) && passVal.match(lowerCase) && !passVal.match(numbers)) {
          passMeter.addClass('strength-weak').text('Requires uppercase letters and at least one number');
        }
        if(!passVal.match(upperCase) && !passVal.match(lowerCase) && passVal.match(numbers)) {
          passMeter.addClass('strength-weak').text('Requires upper and lowercase letters');
        }
        if(!passVal.match(upperCase) && passVal.match(lowerCase) && passVal.match(numbers)) {
          passMeter.addClass('strength-weak').text('Requires uppercase letters');
        }
        if(passVal.match(upperCase) && passVal.match(lowerCase) && !passVal.match(numbers)) {
          passMeter.addClass('strength-weak').text('Requires at least one number');
        }
        if(passVal.match(upperCase) && passVal.match(lowerCase) && passVal.match(numbers)) {
          passMeter.addClass('strength-strong').text('Your password is valid');
        }
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

    confirmPass.keyup(function() {
      var passVal = passInput.val(),
          matchVal = $(this).val();

      if(matchVal.length == passVal.length) {
        if(matchVal === passVal) {
          $('#pass_match').removeClass('strength-weak').addClass('strength-strong').text("Your passwords match");
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

});;$(function() {
  if($('#choosePrefLocFramHeading').length ) {
    var $selectedRegion = '',
        $selectedRegionName = '',
        $firstSchemeVal = $('#schemePref1').attr('data-scheme'),
        $secondSchemeVal = $('#schemePref2').attr('data-scheme');

    if(!$('.map-legend-container').hasClass('disabled') && !$('#regionSelect option[selected]').length) {
      // Animate map after 2 seconds
      setTimeout(function() {
        $('.svg-map-container').addClass('hvr-back-pulse');
        $('.map-legend').show();
        $('#hoveredRegionName').text('Choose a region to filter the locations');
      }, 1000);

      // Stop animation and remove hint
      setTimeout(function() {
        $('.svg-map-container').removeClass('hvr-back-pulse');
        $('.map-legend').fadeOut('slow');
        $('#chooseRegionContainer').fadeIn('slow');
      }, 3000);
    }

    // On hover highlight the region on the map and show region name
    $('.region-container').not($selectedRegion).hover(function() {
      var $this = $(this),
          $regionName = $this.attr('id');

      $('.map-legend').show().removeClass('disabled');
      $('#hoveredRegionName').text($regionName);

      $('.svg-map-container').removeClass('hvr-back-pulse');
      $('#chooseRegionContainer').show();

    }, function() {
      if($selectedRegionName != '') {
        $('#hoveredRegionName').text($selectedRegionName);
      }
    });

    // Remove the legend if no region selected
    $('.svg-map').on('mouseleave', function() {
      if($selectedRegionName == '') {
        $('.map-legend').fadeOut();
      } else {
        $('.map-legend').addClass('disabled');
      }
    });

    // Clicking region will fire the region selection panel
    $('.region-container').on('click', function(e) {
      var $this = $(this),
          regionName = $this.attr('id');
          regionObject = availableLocationsAndSchemes[regionName];

      var locationsInRegion = $.map(regionObject, function(value, key) {
            return key;
          });

      $selectedRegion = $this;

      // IE8 Link behaviour
      e.preventDefault();

      $('#regionSelect').html('<option value="null">-- Choose a location in ' + regionName + ' --</option>')
                        .append('<optgroup id="regionOptGroup" class="' + regionName + '" data-optregion="' + regionName + '" label="' + regionName + '"/>');

      $.each(locationsInRegion, function(i) {
        locationName = locationsInRegion[i];

        $('#regionOptGroup').append('<option value="' + regionName + ';' + locationName +'">' + locationName + '</option>');

      });

      $('#regionOptGroup').find('[value="'+ disabledLocation +'"]').attr('disabled', 'disabled');

      $('#selectLocationBlurb, #selectSecondLocationBlurb, #locationSelectedText, #locationSelectedContainer, #choiceSave')
        .addClass('toggle-content').attr('aria-hidden', true);

      $("#schemePref1 option, #schemePref2 option").attr('selected', false);

      $('#chosenRegionBlurb')
        .removeClass('toggle-content')
        .attr('aria-hidden', false)
        .find('b').text(regionName);

      $('#listOfLocationsContainer').removeClass('toggle-content');

      $this.attr('class', 'region-container selected-region');

      $('#hoveredRegionName').text(regionName);
      $selectedRegionName = regionName;

      $('.region-container')
        .not($selectedRegion)
        .attr('class', 'region-container');

      if($(window).width() <= 650) {
        scrollToTop();
      }

      setTimeout(function() {
        $('#regionSelect').focus();
      }, 200);

      $('#chooseRegionText').hide();
      $('#clearMap').show();

    });

    $('#viewListOfLocations').on('click', function(e) {
      $('#listOfLocationsContainer').removeClass('toggle-content');

      e.preventDefault();

    });

    function scrollToTop() {
      $('html, body').animate({
        scrollTop: $("#containingGridPreference").offset().top - 20
      }, 1000);
    }

    function hideBlurb() {
      $('#locationSelectedContainer').removeClass('toggle-content').attr('aria-hidden', false);

      $('.map-control').hide();

      $('#chosenRegionBlurb, #selectLocationBlurb').addClass('toggle-content').attr('aria-hidden', true);
      $('#locationSelectedText, #choiceSave').removeClass('toggle-content').attr('aria-hidden', false);

    }

    if($('#regionSelect option[selected]').length) {
      $('#listOfLocationsContainer, #choiceSave').removeClass('toggle-content').attr('aria-hidden', false);
      hideBlurb();
    }

    // Choosing a location affects schemes
    $("#regionSelect").on('change', function() {
      if($(this).val() != "null"){
        var selectedLocation = $(this).val(),
            selectedRegion = $(this).find('option:selected').parent().attr('data-optregion'),
            schemesInLocation = availableLocationsAndSchemes[selectedRegion][selectedLocation.split(";")[1]],
            schemeOptionsAvailable = '<option value="" class="placeholder-option">Choose a scheme</option>'

        //if first option is no longer available reset both scheme options
        if($.inArray($firstSchemeVal, schemesInLocation) == -1){
          $firstSchemeVal = "";
          $secondSchemeVal = "";
        }



        //disable second selection when there is only 1 scheme
        var disabledSecond = false;
        if(schemesInLocation.length == 1){
          disabledSecond = true
        }
        $('#schemePref2').prop('disabled', disabledSecond);

        hideBlurb();

        $.each(schemesInLocation, function(i) {
          var schemeName = schemesInLocation[i];

          schemeOptionsAvailable += '<option value="' + schemeName + '">' + schemeName + '</option>';
        });

        $('#schemePref1').html(schemeOptionsAvailable);
        $('#schemePref1 option[value= "'+ $firstSchemeVal +'"]').attr('selected', true);
        $('#schemePref1 option[value= "'+ $secondSchemeVal +'"]').attr('disabled', true);

        $('#schemePref2').html(schemeOptionsAvailable + '<option value="">No second preference</option>');
        if($secondSchemeVal !== "") {
          $('#schemePref2 option[value= "'+ $secondSchemeVal +'"]').attr('selected', true);
        }
        if($firstSchemeVal !== "") {
          $('#schemePref2 option[value= "'+ $firstSchemeVal +'"]').attr('disabled', true);
        }
      } else {
        $('#selectLocationBlurb, #selectSecondLocationBlurb, #locationSelectedText, #locationSelectedContainer, #choiceSave')
          .addClass('toggle-content').attr('aria-hidden', true);

        $('#chosenRegionBlurb')
          .removeClass('toggle-content')
          .attr('aria-hidden', false)
          .find('b').text(regionName);
      }


    });

    if($('#schemePref1 option[selected]').length) {
      var $selectedPref1 = $('#schemePref1').val(),
          $selectedPref2 = $('#schemePref2').val();

      $('#schemePref1').find('option[value="' + $selectedPref2 + '"]').attr('disabled', true);
      $('#schemePref2').find('option[value="' + $selectedPref1 + '"]').attr('disabled', true);

    }

    if($("#regionSelect").val() != "null"){
      $("#regionSelect").trigger('change');
    }

    // Scheme preference 1
    $('#schemePref1').on('change', function() {
      var $thisVal = $(this).val();

      $firstSchemeVal = $thisVal;

      $('#schemePref2').find('option[value="' + $thisVal + '"]').attr('disabled', true);
      $('#schemePref2').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);


      if($('#schemePref2').val() !== '' || $('#schemePref2').attr('disabled') == 'disabled') {
        $('#choiceSave').removeClass('toggle-content');
      }
    });

    // Scheme preference 2
    $('#schemePref2').on('change', function() {
      var $thisVal = $(this).val();

      $secondSchemeVal = $thisVal;

      $('#schemePref1').find('option[value="' + $thisVal + '"]').attr('disabled', true);
      $('#schemePref1').find('option').not('option[value="' + $thisVal + '"]').attr('disabled', false);


      if($('#schemePref1').val() !== '') {
        $('#choiceSave').removeClass('toggle-content');
      }
    });


    $('#clearMap').on('click', function() {
      window.location.reload();
    });

  }

  //used on the 3rd questionnaire page
  $('.initiallyHidden').hide();

  var contentHide = $('.showsContent');

  contentHide.each(function(index) {
    if($(this).parent().hasClass("selected")) {
      $('.hidingContent').show();
    }
  });

  var occupationHide = $('.showsOccupations');

  occupationHide.each(function(index) {
    if($(this).parent().hasClass("selected")) {
      $('.hidingOccupations').show();
    }
  });

  $('.hidesContent').on('change', function(){
      $('.hidingContent').hide();
      $('.hidingContent').find(":checkbox").attr('checked', false);
      $('.hidingContent').find('select').val("");
      $('.hidingContent').find('select').attr('disabled', false);
  });

  $('.showsContent').on('change', function(){
      $('.hidingContent').show()
  });

  $('.hidesOccupations').on('change', function(){
    $('.hidingOccupations').hide();
    $('.hidingOccupations').find(":checkbox").attr('checked', false);
    $('.hidingOccupations').find('select').val("");
    $('.hidingOccupations').find('select').attr('disabled', false);
  });

  $('.showsOccupations').on('change', function(){
    $('.hidingOccupations').show()
  });
});;$(function() {

  //-- Faking details behaviour

  $('.no-details').on('click keypress', 'summary', function(e) {
    var $this = $(this);
    if (e.which === 13 || e.type === 'click') {
      $this.parent().toggleClass('open');
    }
  });

});;$(function() {
  var universities = [
    "The University of Aberdeen",
    "Abertay University",
    "Aberystwyth University",
    "The College of Agriculture, Food and Rural Enterprise",
    "American InterContinental University - London",
    "Anglia Ruskin University",
    "Askham Bryan College",
    "Aston University, Birmingham",
    "Bangor University",
    "Barking and Dagenham College",
    "Barony College",
    "Basingstoke College of Technology",
    "University of Bath",
    "Bath Spa University",
    "Bell College",
    "The University of Birmingham",
    "University College Birmingham",
    "Bishop Burton College",
    "Bishop Grosseteste University",
    "Blackburn College",
    "Blackpool and The Fylde College",
    "University of Bolton",
    "Bournemouth University",
    "The Arts Institute at Bournemouth",
    "The University of Bradford",
    "Bradford College",
    "Bridgwater College",
    "University of Brighton",
    "Brighton and Sussex Medical School",
    "Bristol, City of Bristol College",
    "University of Bristol",
    "Bristol Filton College",
    "University of the West of England, Bristol (UWE)",
    "British College of Osteopathic Medicine",
    "University of London Institute in Paris (University of London)",
    "Brunel University London",
    "British School of Osteopathy",
    "Brockenhurst College",
    "Broxtowe College, Nottingham",
    "The University of Buckingham",
    "Buckinghamshire New University",
    "University of Cambridge",
    "Canterbury Christ Church University",
    "Capel Manor College",
    "Cardiff University",
    "Cardiff Metropolitan University",
    "Coleg Sir Gar / Carmarthenshire College",
    "Birmingham City University (formerly University of Central England in Birmingham)",
    "University of Central Lancashire (UCLan)",
    "The Royal Central School of Speech and Drama, University of London",
    "University of Chester",
    "Chesterfield College",
    "Chichester College",
    "University of Chichester",
    "City University London",
    "City College, Birmingham",
    "City and Islington College",
    "The Manchester College (Formerly City College Manchester)",
    "City of Sunderland College",
    "Cleveland College of Art and Design",
    "Cliff College",
    "Colchester Institute",
    "Cornwall College",
    "Courtauld Institute of Art (University of London)",
    "Coventry University",
    "Craven College",
    "University Centre, Croydon (Croydon College)",
    "Cumbria Institute of the Arts",
    "Dartington College of Arts (now known as University College Falmouth inc Dartington College of Arts)",
    "Dearne Valley College",
    "De Montfort University",
    "University of Derby",
    "Kirklees College (Formerly Dewsbury College)",
    "Doncaster College",
    "Duchy College",
    "Dudley College of Technology",
    "University of Dundee",
    "Durham University",
    "Ealing, Hammersmith and West London College",
    "University of East Anglia (UEA)",
    "University of East London (UEL)",
    "East Surrey College (incorporating Reigate School of Art, Design and Media)",
    "Edge Hill University",
    "The University of Edinburgh",
    "Edinburgh College of Art",
    "The University of Essex",
    "European Business School, London",
    "European School of Osteopathy",
    "Exeter College",
    "University of Exeter",
    "Falmouth University",
    "University Centre Farnborough",
    "University of South Wales (formerly University of Glamorgan)",
    "Glamorgan Centre for Art and Design Technology",
    "University of Glasgow",
    "Glasgow Caledonian University",
    "The Glasgow School of Art",
    "Gloucestershire College",
    "The University of Gloucestershire",
    "Goldsmiths, University of London",
    "Great Yarmouth College",
    "University of Greenwich",
    "Greenwich School of Management (GSM London)",
    "University Centre Grimsby",
    "Guildford College",
    "Halton College",
    "Harper Adams University",
    "Havering College of Further and Higher Education",
    "Hereford College of Arts",
    "Heriot-Watt University, Edinburgh",
    "University of Hertfordshire",
    "Hertford Regional College",
    "Highbury College",
    "Heythrop College (University of London)",
    "University of the Highlands and Islands",
    "Holborn College",
    "Hopwood Hall College",
    "The University of Huddersfield",
    "The University of Hull",
    "Hull College",
    "Hull York Medical School",
    "Imperial College London",
    "Keele University",
    "The University of Kent",
    "Kent Institute of Art and Design",
    "King's College London (University of London)",
    "Kingston University",
    "The University of Wales, Lampeter",
    "Lancaster University",
    "Leeds City College",
    "University of Leeds",
    "Leeds Trinity University",
    "Leeds Beckett University (formerly Leeds Metropolitan University)",
    "Leeds College of Art",
    "Leeds College of Music (UCAS)",
    "University of Leicester",
    "Leicester College",
    "University of Lincoln",
    "The University of Liverpool",
    "The City of Liverpool College",
    "Liverpool Hope University",
    "The Liverpool Institute for Performing Arts",
    "Liverpool John Moores University (LJMU)",
    "Coleg Llandrillo",
    "London Metropolitan University",
    "London School of Commerce",
    "London School of Economics and Political Science (University of London)",
    "London South Bank University",
    "Loughborough College",
    "Loughborough University",
    "Lowestoft College",
    "University of Luton",
    "The Manchester College",
    "The University of Manchester",
    "The Manchester Metropolitan University",
    "UCP Marjon - University College Plymouth St Mark & St John (formerly Marjon)",
    "Matthew Boulton College of Further and Higher Education",
    "Medway School of Pharmacy",
    "Coleg Menai",
    "Middlesex University",
    "Mountview Academy of Theatre Arts",
    "Myerscough College",
    "Napier University, Edinburgh",
    "NPTC Group",
    "Newcastle University",
    "Newcastle College",
    "New College Durham",
    "New College Nottingham",
    "Newman University, Birmingham",
    "University of South Wales (formerly University of Wales, Newport)",
    "University of Northampton",
    "Norwich University Of The Arts",
    "Northbrook College Sussex",
    "NESCOT, Surrey",
    "Glyndwr University (Formerly The North East Wales Institute of Higher Education)",
    "North East Worcestershire College",
    "North Lindsey College",
    "Northumbria University",
    "North Warwickshire and Hinckley College",
    "Norwich City College of Further and Higher Education (an Associate College of UEA)",
    "The University of Nottingham",
    "Nottingham Trent University",
    "Activate Learning (Oxford, Reading, Banbury & Bicester)",
    "Oxford University",
    "Oxford Brookes University",
    "University of Paisley",
    "Pembrokeshire College",
    "Peninsula College of Medicine & Dentistry",
    "The People's College Nottingham",
    "Peterborough Regional College",
    "Plymouth University",
    "Plymouth College of Art",
    "University of Portsmouth",
    "Queen Margaret University, Edinburgh",
    "Queen Mary University of London",
    "Queen's University Belfast",
    "Ravensbourne",
    "University of Reading",
    "Regent's University London (incorporating E77 European Business School)",
    "Richmond, The American International University in London",
    "Robert Gordon University",
    "University of Roehampton",
    "Rose Bruford College",
    "Rotherham College of Arts and Technology",
    "Royal Agricultural University, Cirencester",
    "Royal Academy of Dance",
    "Royal Holloway, University of London",
    "Royal Veterinary College (University of London)",
    "Royal Welsh College of Music and Drama (Coleg Brenhinol Cerdd a Drama Cymru)",
    "Ruskin College Oxford",
    "SRUC - Scotland's Rural College",
    "The University of Salford",
    "SAE Institute",
    "Wiltshire College Salisbury (formerly Salisbury College)",
    "SOAS, University of London",
    "The School of Pharmacy (University of London)",
    "The University of Sheffield",
    "Sheffield Hallam University",
    "Sheffield College",
    "Shrewsbury College of Arts and Technology",
    "St Martin's College, Lancaster; Ambleside; Carlisle; London (accredited college of Lancaster Univ)",
    "Solihull College",
    "University of Southampton",
    "Somerset College",
    "South Birmingham College",
    "Southampton Solent University",
    "South Devon College",
    "Sparsholt College Hampshire",
    "Southport College",
    "University of St Andrews",
    "South Downs College",
    "South Essex College, University Centre Southend and Thurrock",
    "South Nottingham College (Central College, Nottingham)",
    "St George's, University of London",
    "University Centre St Helens",
    "St Mary's University, Twickenham, London",
    "Stamford College",
    "Staffordshire University",
    "Staffordshire University Regional Federation",
    "Stratford upon Avon College",
    "The University of Stirling",
    "Stockport College",
    "The University of Strathclyde",
    "Stranmillis University College: A College of Queen's University Belfast",
    "Suffolk College",
    "University of Sunderland",
    "University of Surrey",
    "The Surrey Institute of Art and Design, University College",
    "University of Sussex",
    "Sutton Coldfield College",
    "Swansea University",
    "Gower College Swansea (formerly Swansea College)",
    "University of Wales Trinity Saint David (UWTSD Swansea)",
    "Swindon College",
    "Teesside University",
    "University of West London (formerly Thames Valley University)",
    "University of Wales Trinity Saint David (UWTSD Carmarthen / Lampeter / London)",
    "Tyne Metropolitan College",
    "Ulster University",
    "University of the Arts London",
    "UCL (University College London)",
    "Wakefield College",
    "Walsall College",
    "The University of Warwick",
    "Warwickshire College Group",
    "Welsh College of Horticulture",
    "College of West Anglia",
    "West Cheshire College",
    "West Herts College, Watford Associate College of University of Hertfordshire",
    "University of Westminster",
    "Westminster Kingsway College",
    "West Suffolk College, A Partner College of ARU",
    "West Thames College",
    "Wigan and Leigh College",
    "Wimbledon School of Art",
    "Wirral Metropolitan College",
    "Wiltshire College",
    "University of Wolverhampton",
    "University of Winchester",
    "University of Worcester",
    "Worcester College of Technology",
    "Writtle College",
    "The University of York",
    "York College",
    "York St John University",
    "Yorkshire Coast College of Further and Higher Education"
  ];

  $( "#universityAttended" ).autocomplete({
    source: universities,
    open: function (e, ui) {
      var acData = $(this).data('ui-autocomplete');
      acData
      .menu
      .element
      .find('li')
      .each(function () {
          var me = $(this);
          var keywords = acData.term.split(' ').join('|');
          me.html(me.text().replace(new RegExp("(" + keywords + ")", "gi"), '<b>$1</b>'));
       });
    }
  });
});