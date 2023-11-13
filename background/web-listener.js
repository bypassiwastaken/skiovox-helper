function checkWebstoreUrl({ url }) {
  return new Promise((resolve, reject) => {
    if (url.match(/^https:\/\/chrome.google.com\/webstore/)) resolve(true);
    resolve(false);
  });
}
async function initiateWebRequestListener(data) {
  let isWebstoreURL = await checkWebstoreUrl(data);
  if (!isWebstoreURL) return { cancel: false };
  return { redirectUrl: "https://chromewebstore.google.com" };
}

chrome.webRequest.onBeforeRequest.addListener(initiateWebRequestListener, { urls: ["<all_urls>"] }, ["blocking"]);
