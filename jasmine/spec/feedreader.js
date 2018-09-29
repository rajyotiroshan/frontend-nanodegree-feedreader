/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('objects have url defined and is not empty' , function(){
            //iterates over allFeeds array
            for(let feed of allFeeds) {
                expect(feed.url).not.toBeUndefined();
                //trim is used for checking against only whitespaces case
                expect(feed.url.trim().length).not.toBe(0);
            }
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('object have name defined and is not empty' , function() {
            //iterates over allFeeds array.
            for(let feed of allFeeds) {
                expect(feed.name).not.toBeUndefined();
                expect(feed.name.trim().length).not.toBe(0);//trim is used for checking against only whitespaces
            }
         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe(' The menu ', function() {
        let body;
        beforeEach( function() {
            body = document.querySelector("body");
        });

         /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() { 
            expect(body.hasAttribute("class")).toBe(true);
        //body must have menu-hidden as a class memeber by default.
            expect(body.classList.contains("menu-hidden")).toBe(true);
        });
        
        /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
          it(' changes visibility when the menu icon is clicked. ', function() { 
            $('.menu-icon-link').click();
            expect(body.classList.contains("menu-hidden")).toBe(false);
            $('.menu-icon-link').click();
            expect(body.classList.contains("menu-hidden")).toBe(true);
          });
    });   
    
    /* TODO: Write a new test suite named "Initial Entries" */
    describe(' Initial Entries ', function() {
        //let originalTimeout;

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
         //make sure that loadfeed() is completed before 'it'.
         beforeEach(function(done){
            loadFeed(0,done);
         });

         it('there is at least a single .entry element within the .feed container. ' , function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe(' New Feed Selection ' , function(){
        let originalTimeout;
        let feedLength = allFeeds.length;
        console.log('feedLength = ' + feedLength);
        let cURL,pURL,
            cHeaderTitle,pHeadertitle,
            cFeedID,pFeedID,
            cHTML,pHTML;
        pFeedID = Math.floor(Math.random() * feedLength);
        console.log('pFeedID = '+ pFeedID);
        while(pFeedID === (cFeedID = Math.floor(Math.random() * feedLength)));
        console.log('cFeedID = ' + cFeedID);
        originalTimeout =jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        
        //make sure that loadfeed() executed completely before any spec(it block) execution.
        beforeEach(function(done) {
            //originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
            //console.log('originalTimeout = ' + originalTimeout);
            loadFeed(pFeedID,function(){
                pHeadertitle = $('h1.header-title')[0].textContent;
                console.log('pHeadertitle = ' + pHeadertitle);
                loadFeed(cFeedID,function(){
                    cHeaderTitle = $('h1.header-title')[0].textContent;
                    console.log('cHeadertitle = ' + cHeaderTitle);
                    done();
                });
            });
        }); 
        
        //test for new feed loaded from new url.
        it(' everytime loaded new url.\n  ' ,function(done) {
            console.log('inside it');
            console.log('pHeaderTitle = ' + pHeadertitle + "\n" + 'cHeaderTitle = ' + cHeaderTitle);
            //
            expect(pHeadertitle !== cHeaderTitle).toBe(true);
            //
            done();
            
        });
        //
        afterEach(function(){
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        });
    });
}());
