// cookies.js
// You can use this code for your projects!
// Derived from the Bill Dortch code at http://www.hidaho.com/cookies/cookie.txt

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1) {
        endstr = document.cookie.length;
    }
    return decodeURIComponent(document.cookie.substring(offset, endstr));
}

function GetCookie(name) {
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;
    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg) {
            return getCookieVal(j);
        }
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function DeleteCookie(name, path, domain) {
    if (GetCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

/////////
// use:
//		SetCookie('name', 'value', 3000);
//		SetCookie('name', 'value', 1000,false,false,false,true);
//		If set the secure (last arg) to true, you MUST be on an https connection!
/////////
function SetCookie(name, value, maxAge, path, domain, sameSite, secure) {
    document.cookie = name + "=" + encodeURIComponent(value) +
        ((maxAge) ? ";max-age=" + maxAge : "") +
        ((path) ? ";path=" + path : "") +
        ((domain) ? ";domain=" + domain : "") +
        ((sameSite) ? ";samesite=" + sameSite : ";samesite=strict") +
        ((secure) ? ";secure;" : ";");
}

// save selections 
function saveSelections(selections) {
    if (navigator.cookieEnabled) {
        SetCookie('selections', JSON.stringify(selections), 86400); 
    } else {
        localStorage.setItem('selections', JSON.stringify(selections));
    }
}

//save user info
function saveUserInfo(userInfo) {
    if (navigator.cookieEnabled) {
        // Save to cookies
        SetCookie('userInfo', JSON.stringify(userInfo), 86400);
    } else {
        // Fallback to localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
}

// load saved selections
function loadSelections() {
    if (navigator.cookieEnabled) {
        const selections = GetCookie('selections');
        return selections ? JSON.parse(selections) : null;
    } else {
        return localStorage.getItem('selections') ? JSON.parse(localStorage.getItem('selections')) : null;
    }
}

// load saved user info
function loadUserInfo() {
    if (navigator.cookieEnabled) {
        const userInfo = GetCookie('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    } else {
        return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    }
}