"use client";

import Script from "next/script";

/**
 * Global ad scripts and specific ad containers like Social Bar.
 */
export const AdContainer = () => {
  return (
    <>
      {/* Native Direct Script */}
      <Script 
        src="https://cardinaltangible.com/95/53/c0/9553c08df2e5abdaa2ab873ea09c1693.js" 
        strategy="lazyOnload"
      />
      
      {/* Another Global Script */}
      <Script 
        src="https://cardinaltangible.com/37/56/57/375657a8080f09b77bf07c63cc96309b.js" 
        strategy="lazyOnload"
      />

      {/* Social Bar / Popunder */}
      <Script 
        src="https://cardinaltangible.com/dceab04883fa3e101e1c3becfcf94741/invoke.js" 
        strategy="lazyOnload"
        data-cfasync="false"
        async
      />
      <div id="container-dceab04883fa3e101e1c3becfcf94741" />
    </>
  );
};
