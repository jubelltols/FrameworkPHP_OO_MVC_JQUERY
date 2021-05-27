function cambiarIdioma(lang) {
   
    lang = lang || localStorage.getItem('app-lang') || 'es';
    localStorage.setItem('app-lang', lang);
   
    var elmnts = document.querySelectorAll('[data-tr]');

    $.ajax({
      url: 'http://localhost/FrameworkPHP_OO_MVC_JQUERY/view/lang/' + lang + '.json',
      type: "POST",
      dataType: "json",

      success: function(data){
        for(var i = 0; i < elmnts.length; i++ ){
            /* console.log(lang);
            console.log(elmnts);
            console.log(data); */
            elmnts[i].innerHTML = data.hasOwnProperty(lang)
            ? data[lang][elmnts[i].dataset.tr] 
            : elmnts[i].dataset.tr;
        }
      }
    })
  }
  
  $(document).ready(function(){
    cambiarIdioma();
      $("#btn-es").on("click", function(){
        cambiarIdioma("es")
      });
      $("#btn-en").on("click", function(){
        cambiarIdioma("en")
      });
      $("#btn-va").on("click", function(){
        cambiarIdioma("va")
      });
   });