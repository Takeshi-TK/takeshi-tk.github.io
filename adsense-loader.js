(function loadAdsense() {
  const config = window.strideWordsAdsense;
  if (!config || !config.enableAutoAds || !config.publisherId) {
    return;
  }

  const existingScript = document.querySelector(
    'script[data-stridewords-adsense="true"], script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]'
  );

  if (existingScript) {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${config.publisherId}`;
  script.crossOrigin = "anonymous";
  script.dataset.stridewordsAdsense = "true";
  document.head.appendChild(script);
})();
