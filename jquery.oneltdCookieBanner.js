/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
;(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);

/**
 * jQuery.oneltdCookieBanner.js version 0.1
 *
 * Copyright (c) 2012 Adam Onishi - http://onishiweb.co.uk/
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
(function ($) {
    var defaults = {
            bgColor: "#333",
            textColor: "#fff",
            location: "top",
            cookiePage: "/cookies",
            longMessage: false
        };

    $.oneltdCookieBanner = function (options) {
        var settings = $.extend({}, defaults, options),
            longMessage = '<p>We use cookies to ensure that we give you the best experience on our website. If you continue without changing your settings, we\'ll assume that you are happy to receive all cookies from our website. However, if you would like to, you can change your cookie settings at any time.'+
                '<br /><a href="'+settings.cookiePage+'">View our privacy policy &raquo;</a></p>',
            shortMessage = '<p>We use cookies to ensure that we give you the best experience on our website. For more information <a href="'+settings.cookiePage+'">view our privacy policy.</a></p>',


            init = function () {

                $.cookie('oneltd-cookie-controller', 'implied consent for cookies has been given', { expires: 365*2 });

                var message = shortMessage;
                if( settings.longMessage ) { message = longMessage; }

                $("body").prepend('<div id="cookieBanner"><div class="cookieMessage"><h2>How we use cookies</h2>'+
                message+'<a href="#continue">Continue</a></div><div>');


                var $banner = $("#cookieBanner"),
                    $message = $(".cookieMessage"),
                    $contButton = $message.find("a[href=#continue]"),
                    bannerStyle = {
                        "background-color": settings.bgColor,
                        "width": "100%",
                        "padding": "10px 0"
                    },
                    messageStyle = {
                        "color": settings.textColor,
                        "font-size": "12px",
                        "width": "940px",
                        "margin": "0 auto",
                        "overflow": "hidden"
                    },
                    messagePStyle = {
                        "float": "left",
                        "width": "800px",
                        "margin": "0"
                    },
                    continueStyle = {
                        "float": "right",
                        "margin": "0 10px 0 0",
                        "color": settings.textColor
                    };  

                if( settings.location === "bottom" ) {
                    bannerStyle.position = "fixed";
                    bannerStyle.bottom = 0;
                }

                $banner.css(bannerStyle);
                $message.css(messageStyle).find("h2").css({"font-size":"16px"});
                $message.find("p").css(messagePStyle).find("a").css({"color":settings.textColor}).hover( function () { $(this).css({"border-bottom":"1px solid "+settings.textColor}); }, function () { $(this).css({"border":"none"}); });
                $contButton.css(continueStyle).hover( function () { $(this).css({"text-decoration": "underline"}); }, function () { $(this).css({"text-decoration":"none"}); });

                $contButton.on("click", function (e) {
                    e.preventDefault();
                    $banner.slideUp();
                });
            };

        if( !$.cookie('oneltd-cookie-controller') )
        {
            init();
        }        
    };
}(jQuery));