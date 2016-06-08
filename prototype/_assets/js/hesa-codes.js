$.widget( "custom.catcomplete", $.ui.autocomplete, {
    _create: function() {
      this._super();
      this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
    },
    _renderMenu: function( ul, items ) {
      var that = this,
        currentCategory = "";
      $.each( items, function( index, item ) {
        var li;
        if ( item.category != currentCategory ) {
          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
          currentCategory = item.category;
        }
        li = that._renderItemData( ul, item );
        if ( item.category ) {
          li.attr( "aria-label", item.category + " : " + item.label );
        }
      });
    }
  });

$(function() {
  var subjects =
    [
      {category: "Medicine & Dentistry", subcode: "A1", label: "Pre-clinical medicine"},
      {category: "Medicine & Dentistry", subcode: "A2", label: "Pre-clinical dentistry"},
      {category: "Medicine & Dentistry", subcode: "A3", label: "Clinical medicine"},
      {category: "Medicine & Dentistry", subcode: "A4", label: "Clinical dentistry"},
      {category: "Medicine & Dentistry", subcode: "AZ", label: "Balanced combination"},

      {category: "Subjects Allied to Medicine", subcode: "B1", label: "Anatomy & Physiology"},
      {category: "Subjects Allied to Medicine", subcode: "B2", label: "Pharmacology"},
      {category: "Subjects Allied to Medicine", subcode: "B3", label: "Pharmacy"},
      {category: "Subjects Allied to Medicine", subcode: "B4", label: "Nutrition"},
      {category: "Subjects Allied to Medicine", subcode: "B5", label: "Ophthalmics"},
      {category: "Subjects Allied to Medicine", subcode: "B6", label: "Audiology"},
      {category: "Subjects Allied to Medicine", subcode: "B7", label: "Nursing"},
      {category: "Subjects Allied to Medicine", subcode: "B8", label: "Medical technology"},
      {category: "Subjects Allied to Medicine", subcode: "B9", label: "Other medical subjects"},
      {category: "Subjects Allied to Medicine", subcode: "BZ", label: "Balanced combination"},

      {category: "Biological Sciences", subcode: "C1", label: "Biology"},
      {category: "Biological Sciences", subcode: "C2", label: "Botany"},
      {category: "Biological Sciences", subcode: "C3", label: "Zoology"},
      {category: "Biological Sciences", subcode: "C4", label: "Genetics"},
      {category: "Biological Sciences", subcode: "C5", label: "Microbiology"},
      {category: "Biological Sciences", subcode: "C6", label: "Molecular biology & biophysics"},
      {category: "Biological Sciences", subcode: "C7", label: "Biochemistry"},
      {category: "Biological Sciences", subcode: "C8", label: "Psychology (not solely as social science)"},
      {category: "Biological Sciences", subcode: "C9", label: "Other biological sciences"},
      {category: "Biological Sciences", subcode: "CZ", label: "Balanced combination"},

      {category: "Veterinary Sciences", subcode: "D1", label: "Veterinary sciences"},

      {category: "Agriculture & Related Subjects", subcode: "D2", label: "Agriculture"},
      {category: "Agriculture & Related Subjects", subcode: "D3", label: "Forestry"},
      {category: "Agriculture & Related Subjects", subcode: "D4", label: "Food science"},
      {category: "Agriculture & Related Subjects", subcode: "D8", label: "Agricultural sciences"},
      {category: "Agriculture & Related Subjects", subcode: "D9", label: "Other agricultural subjects"},
      {category: "Agriculture & Related Subjects", subcode: "DZ", label: "Balanced combination"},

      {category: "Physical Science", subcode: "F1", label: "Chemistry"},
      {category: "Physical Science", subcode: "F2", label: "Materials science"},
      {category: "Physical Science", subcode: "F3", label: "Physics"},
      {category: "Physical Science", subcode: "F4", label: "Archaeology as a physical science"},
      {category: "Physical Science", subcode: "F5", label: "Astronomy"},
      {category: "Physical Science", subcode: "F6", label: "Geology"},
      {category: "Physical Science", subcode: "F7", label: "Oceanography"},
      {category: "Physical Science", subcode: "F8", label: "Geography studies as a science"},
      {category: "Physical Science", subcode: "F9", label: "Environmental science & other physical sciences"},
      {category: "Physical Science", subcode: "FZ", label: "Balanced combination"},

      {category: "Mathematical Science", subcode: "G1", label: "Mathematics"},
      {category: "Mathematical Science", subcode: "G4", label: "Statistics"},
      {category: "Mathematical Science", subcode: "G9", label: "Other mathematical sciences"},
      {category: "Mathematical Science", subcode: "GZ", label: "Balanced combination"},

      {category: "Computer Science", subcode: "G5", label: "Computing science"},

      {category: "Engineering & Technology", subcode: "H1", label: "General engineering"},
      {category: "Engineering & Technology", subcode: "H2", label: "Civil engineering"},
      {category: "Engineering & Technology", subcode: "H3", label: "Mechanical engineering"},
      {category: "Engineering & Technology", subcode: "H4", label: "Aeronautical engineering"},
      {category: "Engineering & Technology", subcode: "H5", label: "Electrical engineering"},
      {category: "Engineering & Technology", subcode: "H6", label: "Electronic engineering"},
      {category: "Engineering & Technology", subcode: "H7", label: "Production engineering"},
      {category: "Engineering & Technology", subcode: "H8", label: "Chemical engineering"},
      {category: "Engineering & Technology", subcode: "H9", label: "Other engineering"},
      {category: "Engineering & Technology", subcode: "HZ", label: "Balanced combinations"},
      {category: "Engineering & Technology", subcode: "J1", label: "Minerals technology"},
      {category: "Engineering & Technology", subcode: "J2", label: "Metallurgy"},
      {category: "Engineering & Technology", subcode: "J3", label: "Ceramics & glasses"},
      {category: "Engineering & Technology", subcode: "J4", label: "Polymers & textiles"},
      {category: "Engineering & Technology", subcode: "J5", label: "Other materials technology"},
      {category: "Engineering & Technology", subcode: "J6", label: "Maritime technology"},
      {category: "Engineering & Technology", subcode: "J8", label: "Biotechnology"},
      {category: "Engineering & Technology", subcode: "J9", label: "Other technologies"},

      {category: "Architecture, Building & Planning", subcode: "K1", label: "Architecture"},
      {category: "Architecture, Building & Planning", subcode: "K2", label: "Building"},
      {category: "Architecture, Building & Planning", subcode: "K3", label: "Environmental technologies"},
      {category: "Architecture, Building & Planning", subcode: "K4", label: "Town & country planning"},
      {category: "Architecture, Building & Planning", subcode: "K9", label: "Other architectural studies"},
      {category: "Architecture, Building & Planning", subcode: "KZ", label: "Balanced combination"},

      {category: "Social, Economic & Political Studies", subcode: "L1", label: "Economics"},
      {category: "Social, Economic & Political Studies", subcode: "L3", label: "Sociology"},
      {category: "Social, Economic & Political Studies", subcode: "L4", label: "Social policy & administration"},
      {category: "Social, Economic & Political Studies", subcode: "L5", label: "Social work"},
      {category: "Social, Economic & Political Studies", subcode: "L6", label: "Anthropology"},
      {category: "Social, Economic & Political Studies", subcode: "L7", label: "Psychology (without significant element of biological science)"},
      {category: "Social, Economic & Political Studies", subcode: "L8", label: "Geography (unless solely as a physical science)"},
      {category: "Social, Economic & Political Studies", subcode: "LZ", label: "Balanced combination"},
      {category: "Social, Economic & Political Studies", subcode: "M1", label: "Politics"},
      {category: "Social, Economic & Political Studies", subcode: "M9", label: "Other social studies"},

      {category: "Law", subcode: "M3", label: "Law"},

      {category: "Business & Administrative Studies", subcode: "N1", label: "Business & management studies"},
      {category: "Business & Administrative Studies", subcode: "N2", label: "Operational research"},
      {category: "Business & Administrative Studies", subcode: "N3", label: "Financial management"},
      {category: "Business & Administrative Studies", subcode: "N4", label: "Accountancy"},
      {category: "Business & Administrative Studies", subcode: "N5", label: "Marketing & market research"},
      {category: "Business & Administrative Studies", subcode: "N6", label: "Industrial relations"},
      {category: "Business & Administrative Studies", subcode: "N7", label: "Catering & institutional management"},
      {category: "Business & Administrative Studies", subcode: "N8", label: "Land & property management"},
      {category: "Business & Administrative Studies", subcode: "N9", label: "Transport, other business & administrative studies"},
      {category: "Business & Administrative Studies", subcode: "NZ", label: "Balanced combination"},

      {category: "Librarianship & Information Science", subcode: "P1", label: "Librarianship"},
      {category: "Librarianship & Information Science", subcode: "P2", label: "Information science"},
      {category: "Librarianship & Information Science", subcode: "P3", label: "Communication studies"},
      {category: "Librarianship & Information Science", subcode: "P4", label: "Media studies"},
      {category: "Librarianship & Information Science", subcode: "P5", label: "Publishing"},
      {category: "Librarianship & Information Science", subcode: "P6", label: "Journalism"},
      {category: "Librarianship & Information Science", subcode: "PZ", label: "Balanced combination"},

      {category: "Languages", subcode: "Q1", label: "Linguistics"},
      {category: "Languages", subcode: "Q2", label: "Comparative literature"},
      {category: "Languages", subcode: "Q3", label: "English"},
      {category: "Languages", subcode: "Q4", label: "American studies"},
      {category: "Languages", subcode: "Q5", label: "Celtic languages, literature & culture"},
      {category: "Languages", subcode: "Q6", label: "Latin language & literature"},
      {category: "Languages", subcode: "Q7", label: "Ancient Greek language & literature"},
      {category: "Languages", subcode: "Q8", label: "Classics"},
      {category: "Languages", subcode: "Q9", label: "Other ancient languages & related studies"},
      {category: "Languages", subcode: "QZ", label: "Balanced combination"},
      {category: "Languages", subcode: "R1", label: "French language, literature & culture"},
      {category: "Languages", subcode: "R2", label: "German language, literature & culture"},
      {category: "Languages", subcode: "R3", label: "Italian language, literature & culture"},
      {category: "Languages", subcode: "R4", label: "Spanish language, literature & culture"},
      {category: "Languages", subcode: "R5", label: "Portuguese language, literature & culture"},
      {category: "Languages", subcode: "R6", label: "Latin American languages, literature & culture"},
      {category: "Languages", subcode: "R7", label: "Scandinavian languages, literature & culture"},
      {category: "Languages", subcode: "R8", label: "Russian languages, literature & culture"},
      {category: "Languages", subcode: "T1", label: "Slavonic & East European languages, literature & culture"},
      {category: "Languages", subcode: "T2", label: "Other European languages, literature & culture"},
      {category: "Languages", subcode: "T3", label: "Chinese languages, literature & culture"},
      {category: "Languages", subcode: "T4", label: "Japanese languages, literature & culture"},
      {category: "Languages", subcode: "T5", label: "Other Asian languages, literature & culture"},
      {category: "Languages", subcode: "T6", label: "Modern Middle Eastern languages, literature & culture"},
      {category: "Languages", subcode: "T7", label: "African languages, literature & culture"},
      {category: "Languages", subcode: "T8", label: "Other language studies"},
      {category: "Languages", subcode: "T9", label: "Other or unspecified modern languages"},

      {category: "Humanities", subcode: "V1", label: "History"},
      {category: "Humanities", subcode: "V3", label: "Economic & social history"},
      {category: "Humanities", subcode: "V4", label: "History of art"},
      {category: "Humanities", subcode: "V5", label: "History & philosophy of science"},
      {category: "Humanities", subcode: "V6", label: "Archaeology"},
      {category: "Humanities", subcode: "V7", label: "Philosophy"},
      {category: "Humanities", subcode: "V8", label: "Theology & religious studies"},
      {category: "Humanities", subcode: "V9", label: "Other humanities"},
      {category: "Humanities", subcode: "VZ", label: "Balanced combination"},

      {category: "Creative Arts & Design", subcode: "W1", label: "Fine art"},
      {category: "Creative Arts & Design", subcode: "W2", label: "Design studies"},
      {category: "Creative Arts & Design", subcode: "W3", label: "Music"},
      {category: "Creative Arts & Design", subcode: "W4", label: "Drama"},
      {category: "Creative Arts & Design", subcode: "W5", label: "Cinematics"},
      {category: "Creative Arts & Design", subcode: "W6", label: "Crafts"},
      {category: "Creative Arts & Design", subcode: "W8", label: "Beauty & hairdressing"},
      {category: "Creative Arts & Design", subcode: "W9", label: "Art & design other"},
      {category: "Creative Arts & Design", subcode: "WZ", label: "Balanced combinations"},

      {category: "Education", subcode: "X1", label: "Teacher training"},
      {category: "Education", subcode: "X2", label: "Physical education"},
      {category: "Education", subcode: "X3", label: "Academic studies in education"},
      {category: "Education", subcode: "X4", label: "Techniques in teaching children"},
      {category: "Education", subcode: "X5", label: "Techniques in teaching adults"},
      {category: "Education", subcode: "X6", label: "Education for those with special needs"},
      {category: "Education", subcode: "X7", label: "Technology in education"},
      {category: "Education", subcode: "X8", label: "Management & organisation of education"},
      {category: "Education", subcode: "X9", label: "Other topics in education"},
      {category: "Education", subcode: "XZ", label: "Balanced combination"},

      {category: "Combined", subcode: "Y1", label: "Combined or general science"},
      {category: "Combined", subcode: "Y2", label: "Combined or general social science"},
      {category: "Combined", subcode: "Y3", label: "Combined or general arts"},
      {category: "Combined", subcode: "Y4", label: "Other combined or general courses/modular courses"},
      {category: "Combined", subcode: "Y5", label: "Combined general & leisure courses not elsewhere specified"},
      {category: "Combined", subcode: "Y6", label: "Research methods"},
      {category: "Combined", subcode: "YZ", label: "Balanced combinations across different subject areas"}
    ];

    $( "#subjectCode" ).catcomplete({
      delay: 0,
      source: subjects
    });

});

