shareControl = function () {

    var Config = {
        Link: "a.js-share-item",
        Width: 500,
        Height: 500
    };

    var slink = document.querySelectorAll(Config.Link);

    for (var a = 0; a < slink.length; a++) {
        slink[a].onclick = PopupHandler;
    }

    function PopupHandler(e) {

        e = (e ? e : window.event);
        var t = (e.target ? e.target : e.srcElement);
        var px = Math.floor(((screen.availWidth || 1024) - Config.Width) / 2);
        var py = Math.floor(((screen.availHeight || 700) - Config.Height) / 2);

        var popup = window.open(t.href, "social", "width=" + Config.Width + ",height=" + Config.Height + ",left=" + px + ",top=" + py + ",location=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1");
        if (popup) {
            popup.focus();
            if (e.preventDefault) e.preventDefault();
            e.returnValue = false;
        }
        return !!popup;
    }

};

