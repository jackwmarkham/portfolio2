// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
//= require bootstrap-sprockets
//= require jquery.turbolinks

    $(document).ready(function () {
        var d = new Date();
        var n = d.getHours();
        if (n > 5 && n < 7)
            document.body.className = "dawn";
        else if (n >= 8 && n <= 10)
            document.body.className = "morning";
        else if (n >= 11 && n <= 14)
            document.body.className = "midday";
        else if (n >= 15 && n <= 17)
            document.body.className = "afternoon";
        else if (n >= 18 && n <= 19)
            document.body.className = "evening";
        else if (n == 20)
            document.body.className = "sunset";
        else if (n >= 21 && n <= 24)
            document.body.className = "night";
        else if (n >= 0 && n <= 5)
            document.body.className = "midnight";
        else
            document.body.className = "midday";
        }
    );
