// https://github.com/rinsuki/oss-twitter-embed
// SPDX-License-Identifier: MIT

;(() => {
    var iframes = new Map()
    var widgetCount = 0
    window.addEventListener("message", (e) => {
        if (e.origin !== "https://platform.twitter.com") return
        const data = e.data["twttr.embed"]
        if (data == null) return
        if (data.method !== "twttr.private.resize") return
        const iframe = iframes.get(data.id)
        iframe.style.height = `${data.params[0].height}px`
        iframe.setAttribute("scrolling", "no")
        console.log(data)
    })
    for (const link of document.querySelectorAll(".oss-twitter-embed")) {
        const url = link.href
        const tweetIDMatch = /\/status(?:es)?\/([0-9]+)/.exec(url)
        if (tweetIDMatch == null) continue
        const tweetID = tweetIDMatch[1]
        const widgetId = `twitter-widget-oss${++widgetCount}`
        const iframeURL = `https://platform.twitter.com/embed/index.html?dnt=true&embedId=${widgetId}&id=${tweetID}`
        const iframe = document.createElement("iframe")
        iframe.src = iframeURL
        iframe.style.display = "block"
        iframe.style.width = "100%"
        iframe.style.maxWidth = "550px"
        iframe.setAttribute("allowtransparency", "1")
        iframe.setAttribute("allowfullscreen", "1")
        iframe.setAttribute("frameborder", "0")
        iframes.set(widgetId, iframe)
        link.parentElement.replaceChild(iframe, link)
    }
})()
