// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//when the body is ready!

// People Page
$(function () {
    $('#pepTab').tabs();
    $('#pepAcc').accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
    $('#allPeople').fadeIn(500);
});

// Employment Page
$(function() {
        $("#empTabs").tabs();
        $("#allEmployment").fadeIn(500);

        // Show how many data on table 
        $('#coopTable, #professionalTable').DataTable({
            paging: true,
            pageLength: 10,
            responsive: true,
        });
        //Sticky Nav
        $('#coopTable, #professionalTable').stickyTableHeaders();

});

// Degrees Page
$(function() {
    $("#degreesContent").fadeIn(500);
    $("#undergradAcc, #gradAcc").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
});

// Minors Page
$(function() {
    $("#minorsContent").fadeIn(500);
    $("#minorsAccordion").accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
    });
});

// Courses Page
$(function() {
    $("#coursesContent").fadeIn(500);

});

// Course Details Page
$(function() {
    if ($("#courseDetailsContent").length) {
        $("#courseDetailsContent").fadeIn(500);
        
        // Show previous course requirement
        $('.prereq-pill').on('click', function() {
            var courseId = $(this).text().trim();
            if (/[A-Za-z]+-\d+/.test(courseId)) {
                window.location.href = '/Home/CourseDetails?id=' + encodeURIComponent(courseId);
            }
        });
    }
});
