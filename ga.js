/*
  Google Analytics 4（asazora.com）
  下の ID に測定ID（G- で始まる）を入れると動く。プレースホルダのままなら何もしない。
  計測するもの：ページの表示と、LP の2つのボタン（a[data-ga]）のクリック。
  プライバシーポリシー「12. このサイトのアクセス解析について」とセット。
*/
(function () {
  var ID = "__GA_MEASUREMENT_ID__";
  if (!/^G-[A-Z0-9]+$/.test(ID)) return;

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", ID);

  var s = document.createElement("script");
  s.async = true;
  s.src = "https://www.googletagmanager.com/gtag/js?id=" + ID;
  document.head.appendChild(s);

  // ボタンのクリック。data-ga の値がどのボタンかを表す（join-test / paid-notify）
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a[data-ga]") : null;
    if (!a) return;
    gtag("event", "select_content", {
      content_type: "cta",
      content_id: a.getAttribute("data-ga")
    });
  });
})();
