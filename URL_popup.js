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
        links[i].addEventListener("mouseover", Alert.Append, false);
        links[i].addEventListener("mouseout", Alert.Remove, false);
    }
};
// create icon container
Alert.Create = function () {
    Alert.toolTip = document.createElement("div");
    Alert.toolTip.id = "link_alert_tooltip";
    Alert.toolTip.style.position = "fixed";
    Alert.toolTip.style.zIndex = 10000000; // make sure the tooltip is above everything else
    Alert.toolTip.style.lineHeight = "100%";
    Alert.toolTip.style.padding = "10px 0 5px 10px";
    Alert.toolTip.style.boxSizing = "border-box";
    Alert.toolTip.style.margin = "0";
    Alert.toolTip.style.background = "rgba(255, 255, 255, 0.85)";
    Alert.toolTip.style.bottom = "0";
    Alert.toolTip.style.left = "0";
    Alert.toolTip.style.textAlign = "left";
    Alert.text = document.createElement("span");
    Alert.toolTip.appendChild(Alert.text);
    document.body.appendChild(Alert.toolTip);
};

// remove icon container from the DOM
Alert.Remove = function () {
    if (Alert.on == true) {
        Alert.toolTip.style.display = "none";
        Alert.on = false;
    }
};
// append icon container to the DOM
Alert.Append = function (e) {
    if (Alert.on == false) // remove previous container if it is stuck
    {
        Alert.text.innerHTML = this.getAttribute('href');
        Alert.toolTip.style.display = "block";
        Alert.on = true;
    }

};

Alert.Init();