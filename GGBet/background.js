chrome.webRequest.onCompleted.addListener(
    // function (details) {
    //     console.log('----------');
    //     //return { redirectUrl: "https://developer.chrome.com/" };
    // },
    // { urls: ["https://social.media.distraction.com/*"] },
    // ["blocking"]
);
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.executeScript({
        code: 'document.body.style.fontSize="100px"'
    });
});