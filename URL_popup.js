/* === Alert object ========================================================================= */
var Alert = {}; // tooltip object
// stuff to do on page load
Alert.Init = function () {
    Alert.on = false; // icon container is not visible
    Alert.Create();
    window.addEventListener("DOMContentLoaded", Alert.Attach, false);
    window.addEventListener("DOMSubtreeModified", Alert.Attach, false);
};
// attach event listeners to links
Alert.Attach = function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseover", URL.Append, false);
        links[i].addEventListener("mousemove", Alert.Move, false);
        links[i].addEventListener("mouseout", Alert.Remove, false);
    }
};
// create icon container
Alert.Create = function () {
    Alert.toolTip = document.createElement("div");
    Alert.toolTip.id = "link_alert_tooltip";
    Alert.toolTip.style.position = "absolute";
    Alert.toolTip.style.zIndex = 10000000; // make sure the tooltip is above everything else
    Alert.toolTip.style.lineHeight = "100%";
    Alert.toolTip.style.padding = "10px";
    Alert.toolTip.style.boxSizing = "border-box";
    Alert.toolTip.style.margin = "15px 15px 15px 0";
    Alert.toolTip.style.background = "rgba(255, 255, 255, 0.85)";
};
// set icon container position relative to the mouse cursor
Alert.Move = function (e) {
    if (Alert.on == true) {
        Alert.toolTip.style.left = e.pageX + "px";
        Alert.toolTip.style.top = e.pageY + "px";
    }
};
// remove icon container from the DOM
Alert.Remove = function () {
    if (Alert.on == true) {
        document.body.removeChild(Alert.toolTip);
        Alert.on = false;
        URL.Remove();
    }
};
// append icon container to the DOM
Alert.Append = function (e) {
    if (Alert.on == true) // remove previous container if it is stuck
    {
        document.body.removeChild(document.getElementById("link_alert_tooltip"));
    }
    Alert.on = true;
    Alert.Move(e); // set icon container position
    document.body.appendChild(Alert.toolTip);
};
var URL = {};
URL.Append = function (e) {
    var hrefStr = this.getAttribute('href');
    var href = document.createElement("span");
    href.innerHTML = hrefStr;
    this.removeAttribute("title");
    Alert.toolTip.appendChild(href);
    Alert.Append(e);
};
URL.Remove = function () {
    for (var i = Alert.toolTip.childNodes.length - 1; i >= 0; i--) {
        Alert.toolTip.removeChild(Alert.toolTip.childNodes[i]);
    }
};

Alert.Init();