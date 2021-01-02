function logEvent(string) {
    var log = document.getElementById('status-message');
    log.innerHTML = string;
 }

 window.SpeechRecognition = window.SpeechRecognition        ||
                            window.webkitSpeechRecognition  ||
                            null;
                            var accuracy_Percentage = document.getElementById('accuracy-percentage');
 if (!SpeechRecognition) {
    alert("Api Not Supported");
 } else {
    var recognizer = new SpeechRecognition();
    /*var transcription = document.getElementById('transcription');*/
    
    var recognition_icon = document.getElementById('recogition-status-icon');
    recognition_icon.src="assets/img/rec_icon.png";
    // Start recognising
    recognizer.addEventListener('result', function(event) {
       //transcription.innerHTML = '';
      var text;
      text = "";
       for (var i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
             /*transcription.innerHTML = event.results[i][0].transcript +
                ' (Exactitud: ' + Math.round(event.results[i][0].confidence * 100) + '%)';*/
                  quill.root.innerHTML = event.results[i][0].transcript;   
                  accuracy_Percentage.innerHTML = '(' + Math.round(event.results[i][0].confidence * 100) + '% Accuracy)';
                  recognizer.stop();

                  if (Math.round(event.results[i][0].confidence * 100) >= 90){
                        accuracy_Percentage.style.color = "#3DD073";
                  }else if (Math.round(event.results[i][0].confidence * 100) >= 80 && Math.round(event.results[i][0].confidence * 100) < 90){
                     accuracy_Percentage.style.color = "#E69600";
                  }else if (Math.round(event.results[i][0].confidence * 100) < 80){
                     accuracy_Percentage.style.color = "#D03D3D";
                  };
                  
                  recognition_icon.src="assets/img/rec_icon.png";

          } else {
             text += event.results[i][0].transcript;
            /*transcription.innerHTML += event.results[i][0].transcript;*/
            quill.setText(text, "api");
          }
       }
    });

    // Listen for errors
    recognizer.addEventListener('error', function(event) {
       logEvent('Error de reconocimiento: ' + event.message);
    });

    recognizer.addEventListener('end', function() {
       logEvent('Reconocimiento Finalizado');
       recognition_icon.src="assets/img/rec_icon.png";
    });

    document.getElementById('recognize-button').addEventListener('click', function() {
       //transcription.innerHTML = '';

       // Set if we need interim results
       var isInterimResults = document.querySelector('input[name="recognition-type"][value="interim"]').checked;

       recognizer.lang = document.getElementById('language').value;
       recognizer.continuous = !isInterimResults;
       recognizer.interimResults = isInterimResults;

       try {
          recognizer.start();
          accuracy_Percentage.innerHTML = '';
          recognition_icon.src="assets/img/rec_anim.gif";
          logEvent('Reconocimiento Iniciado');
       } catch(ex) {
         recognition_icon.src="assets/img/rec_icon.png";
          logEvent('Ha ocurrido un error: ' + ex.message);
       }
    });

 }

 document.getElementById('new-recognition').addEventListener('click', function() {
   quill.setText("", "api");
 });

 document.getElementById('save-recognition').addEventListener('click', function() {
   var jEditor = document.querySelector('#editor .ql-editor'); //$('#editor').find('.ql-editor');
   var html = jEditor.innerHTML;
   var finalHtml = '<html><head><meta charset="UTF-8"></head><body>';
   finalHtml += html;
   finalHtml += '</body></html>';
   var converted = htmlDocx.asBlob(finalHtml);
   var date = new Date();
   var docName = 'Recognition_Generated_File_' + (date.getMonth() + 1) + "_" + date.getDay() + "_" + date.getFullYear() + '.docx';
   saveAs(converted, docName);
   });

 var d = new Date();
document.getElementById("todays-date").innerHTML = d.toDateString();


function animateCSS(element, animationName, callback) {
   const node = document.querySelector(element)
   node.classList.add('animated', animationName)

   function handleAnimationEnd() {
       node.classList.remove('animated', animationName)
       node.removeEventListener('animationend', handleAnimationEnd)

       if (typeof callback === 'function') callback()
   }

   node.addEventListener('animationend', handleAnimationEnd)
}

   document.getElementById('logo-img').addEventListener('click', function() {
      document.querySelector('#about-modal').classList.remove('modal-hidden');
      animateCSS('#about-modal', 'fadeIn');
      animateCSS('#about-window', 'zoomIn');
   });

   document.getElementById('about-ok-button').addEventListener('click', function() {
      
      animateCSS('#about-window', 'zoomOut');
      animateCSS('#about-modal', 'fadeOut', function() {
         // Do something after animation
         document.querySelector('#about-modal').classList.add('modal-hidden');
       })
      
   });

   if (document.addEventListener) {
      document.addEventListener('contextmenu', function(e) {
          //alert("You've tried to open context menu"); //here you draw your own menu
          e.preventDefault();
      }, false);
  } else {
      document.attachEvent('oncontextmenu', function() {
          //alert("You've tried to open context menu");
          window.event.returnValue = false;
      });
  }