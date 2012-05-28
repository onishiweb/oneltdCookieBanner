# One Ltd Cookie Banner plugin

This plugin can be used to display a message on your website helping to explain your cookie policy. It works with implied consent from the user and sets a cookie to not display the message again.

Uses jQuery.cookie.js plugin (included): https://github.com/carhartl/jquery-cookie

## Options

```javascipt
bgColor: #333
textColor: #fff
location: top
cookiePage: /cookies
longMessage: false
```

## Usage

Simply include the script in your webpage and call the following line:

```javascript
$.oneltdCookieBanner();
```

## Cookie page

There is also an example of content for your privacy/cookies page, you can use the [Cookie Cat plugin for Wordpress](http://wordpress.org/extend/plugins/cookie-cat/) to display a table of the cookies being used on your site.