var dynamicPageIndex = 0;
var $$ = Dom7;
var myApp = new Framework7();
var excelsior = {
    // Initialize your app
    init:function(){
        // Export selectors engine
        var mainView = myApp.addView('.view-main', {
            // Because we use fixed-through navbar we can enable dynamic navbar
            dynamicNavbar: true
        });
        // Callbacks to run specific code for specific pages, for example for About page:
        myApp.onPageInit('about', function (page) {
            // run createContentPage func after link was clicked
            $$('.create-page').on('click', function () {
                excelsior.createContentPage();
            });
        });
    },
    // Generate dynamic page
    createContentPage: function() {
        mainView.router.loadContent(
            '<!-- Top Navbar-->' +
            '<div class="navbar">' +
            '  <div class="navbar-inner">' +
            '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
            '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
            '  </div>' +
            '</div>' +
            '<div class="pages">' +
            '  <!-- Page, data-page contains page name-->' +
            '  <div data-page="dynamic-pages" class="page">' +
            '    <!-- Scrollable page content-->' +
            '    <div class="page-content">' +
            '      <div class="content-block">' +
            '        <div class="content-block-inner">' +
            '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
            '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
            '        </div>' +
            '      </div>' +
            '    </div>' +
            '  </div>' +
            '</div>'
        );
        return;
    },
    loadAppointmentsView:function(){
        console.log("Load Appointment View Called");

    },
    loadCoachesListView:function(){
        console.log("Load Coaches List View Called");

    },
    loadProfileView:function(){
        console.log("Load Profile View Called");

    }
}