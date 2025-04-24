// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//when the body is ready!
$(function () {
    //People page
    $("#testAcc").accordion();
    $("#pepAcc").accordion(
        { collapsible: true, activate: false, heightStyle: "content" }
    );
    $('#pepTab').tabs();
    $('#allPeople').fadeIn(500);
})
//about