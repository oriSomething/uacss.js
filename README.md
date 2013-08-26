##[User Agent to CSS](https://github.com/oriSomething/uacss.js)
Sniffing user agent on the client side for design purpose. Best using Modernizr for feature detection, but because of some design and UX reasons, user agent detection is needed.

[Click me for example](http://www.orisomething.com/e/uacss.js/)


##What it does
1. Adds CSS classes to the root element of browser's name and OS's name. Also adds class if mobile user agent was detected
2. Adds userAgentInfo object to the global object, with helpful properties


##How to use?
1. Add to the `<head>` element the script tag:
```html
<script src="uacss.js"></script>
```

2. If the browser supports JavaScript you should get addition classes to the `<html>` tag as:
```html
<html class="ua-os-osx ua-browser-chrome ua-not-os-windows">
```

3. Also you will have a global object `userAgentInfo`. This object contains the next things:
```
    userAgentInfo = {
        os          : // String of detected OS
        browser     : // String of detected browser
        mobile      : // Boolean if the device detected as mobile

        not_os      : // Array of Strings of OSes which weren't detected
        not_browser : // Array of Strings of browsers which weren't detected

        language    : // If found Navigator.language propertie, it gives the two letters of the language
        region      : // Adds region for the language if there is (case example: 'en-US')
    }
```


##FAQ
**Q: Why should I use user agent sniffing when feature detection makes better code?**
**A:** You shouldn't use user agent sniffing instead feature detection! However, sometimes you want to create more "native look and feel" or "bring more targeted design" which can make better user exprience.
By the way, there is a change that i'll add device sniffing in the future, but only for core devices. Not sure how much it's needed.

**Q: Did you google about [.css{user:agent};](http://cssuseragent.org/)?**
**A:** Sadly too late :) . He has a greate solution, but different than mine.

**Q:** So what are the differences?
**A:**
1. In his solution there is no language sniffing
2. In his solution there are no `not-classes`
3. I haven't checked this, but I also have `undefined` CSS class when there is no match
4. My solution takes about half gzip size compareing to his
5. My solution is limited comparing to his
6. His solution gives much more operation systems and browsers that I, personaly, don't think are needed. What are the chances you really have to sniff if the user uses Konqueror, for a specefic styling purpose? And if you do, you probably only design to this task
7. His solution gives the version of the OS and browser. I haven't decided yet if I want to give in the future such a detailing. As far as I'm aware at least in the browser area, only IE versions can be relevant, so conditionals as in used by [H5BP](http://html5boilerplate.com/) might suite the task much better. Also, I'm not sure you can be too specific when you design. It is become unpractical and if you do, you might have a budget to use a better user agent sniffing way, for example, on server side, so users won't have a ton of unneeded downloaded CSS and JS.

**Q: Is it future proof?**
**A:** Depends on a segnificate user agent change as with IE11. But this project ment to be easy to maintain, so only updating the library file is needed.
Another issue, is that I might remove unused browsers and operation systems. I don't think in 2013 someone need to detect Netscape Navigatore, although some analytics from 2013 has proved it's still alive! :)

**Q: What is the license?**
**A:** For the code, MIT.


##Author
Ori Livni aka @oriSomething
[http://orisomething.com/](http://orisomething.com/)
