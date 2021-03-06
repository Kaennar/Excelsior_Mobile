var dynamicPageIndex = 0;
var $$ = Dom7;
var myApp = new Framework7();
var debugItem;
var signupslider;
var currentDate=new Date();
var mainView = myApp.addView('.view-main', {
            // Because we use fixed-through navbar we can enable dynamic navbar
            dynamicNavbar: true
            
        });
var excelsior = {
    // Initialize your app
    init:function(){
        // Export selectors engine
        // Callbacks to run specific code for specific pages, for example for About page:
        myApp.onPageInit('about', function (page) {
            // run createContentPage func after link was clicked
            $$('.create-page').on('click', function () {
                excelsior.createContentPage();
                excelsior.loadCoachesListView();
            });
        });
        excelsior.registerHandlebarHelpers();
        excelsior.loadCoachesListView();
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
        //This is what the json returned from the remote server should look like (IE have the same characteristic names)
        var coach= { "array":[
            {"firstname":"Alex","id":"0","lastname":"Jackson","Bio":"Sorority girl at Texas A&M Delta Gamma.","ExperienceLevel":"Expert","TimeDrop":"120","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"She's alright. Wasnt good with kids.","content":"Couldn't teach the kids to streamline","assoc_user":"Melony Devogler","postDate":"11/12/2012","rating":"4.5/10"},
                {"title":"We loved how excited she was about everything all the time!","content":"Exuberant little puppy","assoc_user":"Cassidy Kleinmeyer","postDate":"12/17/2014","rating":"9.6/10"}
                ]},
            {"firstname":"Seth","id":"1" ,"lastname":"Timmons","Bio":"Swimmer at Oakland University","ExperienceLevel":"Master","TimeDrop":"200","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"Couldn't tell if stick or Seth.","content":"Unsure if he would survive a windstorm.","assoc_user":"Hannah Stroud","postDate":"11/12/2012","rating":"6.6/10"}
            ]},
            {"firstname":"Hunter","id":"2","lastname":"Artman","Bio":"Swimmer at Texas A&M University","ExperienceLevel":"Master","TimeDrop":"340","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"Likes too much distance.","content":"Encouraged massive amounts of cardio.","assoc_user":"Melony Devogler","postDate":"11/12/2012","rating":"4.5/10"}
            ]}
            ]};
        //Here we load the template from its file inside templates and add the data in. 
        //ToDo: Implement this inside of the ajax call that will pull down because the ajax call will take longer than the
        // html rendering
        $.get("templates/coach-list-template.hbs",
            function(data){
                coachListTemplate=Template7.compile(data);
                var html=coachListTemplate(coach);
                mainView.router.loadContent(html);
            },
            "html");
        //We should have some sort of historyArray to be able to traverse forwards and backwards through the pages
        //Think like a pop on pop off kind of stack storing return function and name with an id of some sort

        //Pull down data from the server to load as the coaches 
        //Send the current location and any preferences the user may have
    },
    loadSignUp:function(){

        //Load signup screen
        console.log("Load Sign Up Called");
        myApp.popup('.popup-signup');
        signupslider=myApp.slider('.slider-container',{
            spaceBetween:100,
            pagination:'.slider-pagination',
            paginationHide:false,
            nextButton:'.slider-next-button',
            prevButton:'.slider-prev-button',
            onSlideChangeStart:function(slider){
                console.log("On Slide Change Start Called");
                debugItem=slider;
            }
        });
    },
    loadCoachProfileView:function(id,storeProfile){
        //Look to make sure that we are able to load the coaches profile
        if (typeof(id) === "undefined"){ alert("This is not a coach"); return; }
        //if we are supposed to store this profile (as in if we need to save this to come back to)
        //Perform an ajax call to get the coaches data using the id we provided for us this will just be loading from a json file
        var newid=parseInt(id);
        switch (newid){
            case 0:
            coachdata={"firstname":"Alex","lastname":"Jackson","id":"0","Bio":"Engineering major at Texas A&M Univeristy.","ExperienceLevel":"Expert","TimeDrop":"120","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"Shes alright. Wasnt good with kids.","content":"Couldnt teach the kids to streamline","assoc_user":"Melony Devogler","postDate":"11/12/2012","rating":"4.5/10"},
                {"title":"We loved how excited she was about everything all the time!","content":"Exuberant little puppy","assoc_user":"Cassidy Kleinmeyer","postDate":"12/17/2014","rating":"9.6/10"}
                ]};
            break;
            case 1:
            coachdata={"firstname":"Seth", "lastname":"Timmons","id":"1","Bio":"Swimmer at Oakland University","ExperienceLevel":"Master","TimeDrop":"200","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"Couldnt tell if stick or Seth.","content":"Unsure if he would survive a windstorm.","assoc_user":"Hannah Stroud","postDate":"11/12/2012","rating":"6.6/10"}
           ]};
            break;
            case 2:
            coachdata={"firstname":"Hunter","lastname":"Artman","id":"2","Bio":"Swimmer at Texas A&M University","ExperienceLevel":"Master","TimeDrop":"340","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
               {"title":"Likes too much distance.","content":"Encouraged massive amounts of cardio.","assoc_user":"Melony Devogler","postDate":"11/12/2012","rating":"4.5/10"}
                ]};
            break;
        }        
        //Load the template and turn the json into the html
        var coachProfileTemplate;
        $.get("templates/coach-profile.hbs",
            function(data){
                coachProfileTemplate=Template7.compile(data);
                var handlebarshtml=coachProfileTemplate(coachdata);
                mainView.router.loadContent(handlebarshtml);
            },
            "html");
    },
    loadUserProfileView:function(){
        console.log("Load Profile View Called");
        //Load user data from a local file (we will keep things like the user picture, username and preferences on board)
        var userProfileTemplate;
        $.get("templates/user-profile-list.hbs",
            function(data){
                userProfileTemplate=Template7.compile(data);
                console.log("HTML: "+html);
            },
            "html");
        //Send the users password and the entered username to the server for auithentication
        //Then call down the data to populate the profile view
    },
    loadCalendarAppointments:function(){

        //We will need to do a call to the server to get the right appointments for this calendar. 
        /*
            For us we don't give a shit so we'll just make the schema and directly
            inser it into the code here. 
            What we dont know is how we want to store this to increase the speed of the app.
            Also how do we have this insert events into the calendar.
        */
        var json= {"appointments":[
            {"title":"Alex Jackson-stroke session","date":""}


            ]};
        $.get("templates/appointments-calendar.hbs",function(data){
            var calendarTemplate=Template7.compile(data);
            var handlebarshtml=calendarTemplate();
            mainView.router.loadContent(handlebarshtml);
            excelsior.loadCalendarData();
        },"html");
    },
    registerHandlebarHelpers:function(){
        console.log("Handlebrs Register Called");
        Template7.registerHelper('compare', function(lvalue, rvalue, options) {

            if (arguments.length < 3)
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

            operator = options.hash.operator || "==";
            var operators = {
                '==':       function(l,r) { return l == r; },
                '===':      function(l,r) { return l === r; },
                '!=':       function(l,r) { return l != r; },
                '<':        function(l,r) { return l < r; },
                '>':        function(l,r) { return l > r; },
                '<=':       function(l,r) { return l <= r; },
                '>=':       function(l,r) { return l >= r; },
                'typeof':   function(l,r) { return typeof l == r; }
            }

            if (!operators[operator])
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

            var result = operators[operator](lvalue,rvalue);

            if( result ) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        });
    },
    favouriteCoach:function(id){
        var favouritesList=localStorage.getItem("favourite_coach_list");
        var arr=favouritesList.split(" ");
        var alreadyExists=false;
        console.log(favouritesList);
        for (var el in arr){
            if (id.toString() == el){
                alreadyExists=true;
            }
        }
        if(!alreadyExists){
            if(typeof(id)=="number"){
                if (favouritesList!= "null"){
                    favouritesList=favouritesList+" "+id.toString();
                }else {
                    favouritesList=id;
                }
            myApp.alert("Coach added to favourites!");
            }else {
                console.log("Type: "+ typeof(id)+ " is unnaacceptable. Must be string.");
            }
        }else{
            myApp.alert("Coach already in favourites!");
            return;
        }
        localStorage.setItem("favourite_coach_list",favouritesList);
        console.log(favouritesList);
    }, 
    loadNavbarElementsForView:function(viewname){

        switch (viewname){

            case "coachListView":
            $("#rightButton").html("");
            $("#leftButton").html("");
            break;

            case "profileView":
            $("#rightButton").html("");
            $("#leftButton").html("");
            break;
            
            case "coachProfileView":
            $("#rightButton").html('<a onClick="" class="button">Favorite</a>');
            $("#leftButton").html('<a href="#" class="button icon-only open-panel">Back to browsing</i></a></div>');
            break;

           default:
            $("#rightButton").html("");
            $("#leftButton").html("");
            console.log("Unrecognized view");
            break;

        }
    },
    loadMoreTab:function(user_id){
        
        var moreTabJson={
            "user_id":"",//CHANGE THIS TO GET THE SIGN IN PAGE TO SHOW UP
            "favCoach":[{"firstname":"Alex","lastname":"Jackson","id":"0","Bio":"Engineering major at Texas A&M Univeristy.","ExperienceLevel":"Expert","TimeDrop":"120","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"Shes alright. Wasnt good with kids.","content":"Couldnt teach the kids to streamline","assoc_user":"Melony Devogler","postDate":"11/12/2012","rating":"4.5/10"},
                {"title":"We loved how excited she was about everything all the time!","content":"Exuberant little puppy","assoc_user":"Cassidy Kleinmeyer","postDate":"12/17/2014","rating":"9.6/10"}
                ]}],
            "recViewedCoach":[{"firstname":"Seth", "lastname":"Timmons","id":"1","Bio":"Swimmer at Oakland University","ExperienceLevel":"Master","TimeDrop":"200","video_url":"js/data/Breeja_Larson_BioVideo.mp4","Reviews":[
                {"title":"Couldnt tell if stick or Seth.","content":"Unsure if he would survive a windstorm.","assoc_user":"Hannah Stroud","postDate":"11/12/2012","rating":"6.6/10"}]
                }]
        };

        var moreListTemplate;
        $.get("templates/more-list.hbs",
            function(data){
                moreListTemplate=Template7.compile(data);
                var handlebarshtml=moreListTemplate(moreTabJson);
                mainView.router.loadContent(handlebarshtml);
            },
        "html");

        //test the output of the json converter
        //**** The XML call will only work if it is inside of a <document></document> thing ****
        //Load Favorited coaches from the user_settings.xml
        //Load Recent Coaches from the user_settings.xml
        //Need to get the user id from user_settings.xml
    },
    loadAthleteProfiles:function(user_id){
        console.log("Load Athlete Profiles Called");
        //Complete the Ajax call to the server for the athlete profiles sending the userid

        /*
        $.ajax({

        });*/
        var json={
            "athleteprofile":[
                {"profile_pic":"js/data/QuinnCarrozza.jpg","firstname":"Jacob", "lastname":"Atkinson","age":"12","skilllevel":"Beginner","description":"He's kind of a royal deusche.",
                "recentcoach":[
                    {"firstname":"Seth","lastname":"Timmons","id":"1","sessiondate":"November 2, 2014"},
                    {"firstname":"Hunter","lastname":"Artman","id":"2","sessiondate":"November 9, 2014"}
                    ]},
                {"profile_pic":"js/data/QuinnCarrozza.jpg","firstname":"Billy", "lastname":"Atkinson","age":"13","skilllevel":"Summer League","description":"He's kind of a royal deusche.",
                "recentcoach":[
                    {"firstname":"Seth","lastname":"Timmons","id":"1","sessiondate":"November 2, 2014"},
                    {"firstname":"Hunter","lastname":"Artman","id":"2","sessiondate":"November 9, 2014"}
                    ]}]
        };
        var athleteProfileTemplate;
        $.get("templates/athlete-profile.hbs",
            function(data){
                athleteProfileTemplate=Template7.compile(data);
                var handlebarshtml=athleteProfileTemplate(json);
                mainView.router.loadContent(handlebarshtml);
            },
        "html");
        //Take care of data management here
    },
    loadAccountSettings:function(user_id){
        console.log("Load Account Settings Called")
        var json={
            "username":"Excelsior and Friends",
            "user_id":""
        };
        var accountSettingsTemplate;
        debugItem=$.get("templates/account-settings.hbs",
            function(data){
                console.log("Account Settings HTML came back");
                accountSettingsTemplate=Template7.compile(data);
                var handlebarshtml=accountSettingsTemplate(json);
                mainView.router.loadContent(handlebarshtml);
            },
            "html");
        //Take care of data management here
    },
    loadContactExcelsior:function(user_id){
        //Load options for email or phone.
        myApp.popup('.popup-contact-excelsior');
    },
    loadContactPageType:function(contact_type){
        console.log("Load Contact Page " + contact_type + " Called");
        console.log(typeof(contact_type));
        myApp.closeModal('.popup-contact-excelsior');
        switch(contact_type){
            case "email":
                var html;
                var json;
                $.get("templates/contact-excelsior-email.hbs", function(data){
                    html=Template7.compile(data);
                    var handlebars=html(json);
                    mainView.router.loadContent(handlebars);
                },"html");
            break;
            case "phone":
                myApp.alert("512-944-7224");
            break;
        }
    },
    loadCalendarData:function(){
        var monthLabel;
        var numberofdays;
        switch (currentDate.getMonth()){
            case 0:
            numberofdays=31;
            monthLabel="January";
            break;

            case 1:
            numberofdays=28;
            monthLabel="Febuary";
            break;

            case 2:
            numberofdays=31;
            monthLabel="March";
            break;

            case 3:
            numberofdays=30;
            monthLabel="April";
            break;

            case 4: 
            numberofdays=31;
            monthLabel="May";
            break;

            case 5:
            numberofdays=30;
            monthLabel="June";
            break;

            case 6:
            numberofdays=31;
            monthLabel="July";
            break;

            case 7:
            numberofdays=31;
            monthLabel="August";
            break;

            case 8:
            numberofdays=30;
            monthLabel="September";
            break;

            case 9:
            numberofdays=31;
            monthLabel="October";
            break;

            case 10:
            numberofdays=30;
            monthLabel="November";
            break;

            case 11:
            numberofdays=31;
            monthLabel="December";
            break;
        }
        currentDate.setDate(1);
        var j=1;
        for (i=currentDate.getDay();i<numberofdays;i++){
            var html="<p>"+j+"</p>";
            j++;
            $("#"+(i)).html(html);

        }
        var monthHTML= "<h1>"+monthLabel+"</h1>";
        $("#monthLabel").html(monthHTML);
        $("#yearLabel").html(currentDate.getFullYear());
        
    },
    loadPreviousMonth:function(){
        var monthnumber=currentDate.getMonth();
        if (monthnumber != 0){
            currentDate.setMonth(monthnumber-1);
        }else {
            currentDate.setMonth(11);
            var year=currentDate.getFullYear()-1;
            currentDate.setYear(year);
            $("#yearLabel").html(year);
        }
        excelsior.clearCalendar();
        excelsior.loadCalendarData();
    },
    loadNextMonth:function(){
        var monthnumber=currentDate.getMonth();
        if (monthnumber != 11){
            currentDate.setMonth(monthnumber+1);
        }else {
            currentDate.setMonth(0);
            var year=currentDate.getFullYear()+1;
            currentDate.setYear(year);
            $("#yearLabel").html(year);
        }
        excelsior.clearCalendar();
        excelsior.loadCalendarData();
    },
    clearCalendar:function(){
        var i;
        for (i=0;i<35;++i){
            $("#"+i).html("");
        }
    }
}
