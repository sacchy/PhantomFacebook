var page = require('webpage').create();
var fs   = require('fs');

// call page.onCallback
page.onInitialized = function() 
{
    page.evaluate(function() 
    {
        document.addEventListener('DOMContentLoaded', function() 
        {
           window.callPhantom('DOMContentLoaded');
        }, false);
    });
};

var funcs = function(funcs)
{
    this.funcs = funcs;
    this.init();
};

funcs.prototype = {

    // ページが読み込まれたら next() を呼ぶ
    init: function() 
    {
        var self = this;
        page.onCallback = function(data)
        {
            if (data === 'DOMContentLoaded') self.next();
            else console.log("例外");
        }
    },
    next: function() 
    {
        var func = this.funcs.shift();

        if (func !== undefined) 
        {
            func();
        } 
        else 
        {
            page.onCallback = function()
            {

            };
        }
    }
};

new funcs([
        // facebook
        function() 
        {
            page.open('https://facebook.com');
        },
        // login
        function() 
        {
            window.setTimeout
            (
                function() 
                {
                    console.log("---> Login...");
                    page.evaluate
                    (
                        function()
                        {
                            document.getElementById('email').value = 'Your FB E-mail';
                            document.getElementById('pass').value   = 'Your FB Password';
                            document.querySelector('form').submit();
                        }
                    );
                }
            ,1000);
        },
        // home
        function() 
        {
            window.setTimeout
            (
                 function()
                 {
                    console.log("---> Success!");
                    page.render("1_Home.png");
                    page.evaluate
                    (
                        function()
                        {
                            var link = document.querySelector(".fbxWelcomeBoxName");
                            location.href=link.href;
                        }
                    );
                }
            ,1000);
        },
        // profile
        function() 
        {
            window.setTimeout
            (
                function() 
                {
                    console.log("---> Profile");
                    page.render("2_Profile.png");
                    page.evaluate
                    (
                        function()
                        {
                            var div = document.querySelector("#fbTimelineHeadline");
                            var as = div.querySelector("a[data-medley-id=pagelet_timeline_medley_friends]");
                            location.href=as.href;
                        }
                    );
                }
            ,1000);
        },
        // friend
        function() 
        {
            window.setTimeout
            (
                function()
                {
                    console.log('---> MyFriend');
                    page.render("3_MyFriend.png");
                    console.log('---> END');
                    phantom.exit();
                }                
            ,1000);
        }
    ]
).next();
