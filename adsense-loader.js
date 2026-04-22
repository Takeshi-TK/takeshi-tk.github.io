(function loadAdsense() {
  const config = window.strideWordsAdsense;
  if (!config || !config.enableAutoAds || !config.publisherId) {
    return;
  }

  if (document.querySelector('script[data-stridewords-adsense="true"]')) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.publisherId}`;
  script.crossOrigin = "anonymous";
  script.dataset.stridewordsAdsense = "true";
  document.head.appendChild(script);
})();
