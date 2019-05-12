// Service Worker
if('serviceWorker' in navigator){
    navigator.serviceWorker.register('./sw.js')
                           //.then(res => console.log('ServiceWorker Cargado'))
                           .catch(err => console.log('ServiceWorker no se ha podido registrar: ',err));
}

// Scroll suavizado
$(document).ready(function(){
    
    $('#menu a').click(function(e){
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        });

        return false;
    });

});