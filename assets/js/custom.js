showNewsletterModal = function() {
    var inst = $('[data-remodal-id=modal]').remodal();
    inst.open();
}

subscribe = function() {
    var email = $("#newsletterEmailTF").val();

    if (isNullOrEmpty(email)) {
        showNewsletterEmpty();
    } else {
        var oSubscription = new Object();
        oSubscription.Id = 0;
        oSubscription.Email = email;
        // Llamar a la API
        var request = $.ajax({
            url: "http://" + config.host + ":" + config.port + "/Suscripcion/Insert",
            type: "POST",
            data: JSON.stringify(oSubscription),
            success: function(data) {
                showNewsletterSuccess();
            },
            error: function(data) {
                showNewsletterError();
            }
        });

        request.success = function() {
            alert("ok");
        };

        request.error = function() {
            alert("error");
        }
    }

}

// Función que comprueba si un string está vacío o es nulo
isNullOrEmpty = function(item) {
    return item == "" || item == null || typeof item === 'undefined';
}

showNewsletterSuccess = function() {
    hideAllAlerts();
    $("#subscribe_success").removeClass("hidden");
}

showNewsletterEmpty = function() {
    hideAllAlerts();
    $("#subscribe_empty").removeClass("hidden");
}

showNewsletterError = function(){
  hideAllAlerts();
  $("#subscribe_error").removeClass("hidden");
}

hideAllAlerts = function() {
    $("#subscribe_success").addClass("hidden");
    $("#subscribe_empty").addClass("hidden");
    $("#subscribe_error").addClass("hidden");
}

$(function() {
    $("#subscribeBT").on("click", subscribe);
});
