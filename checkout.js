// The Buy buttons on /pricing/ (Simon's rulings, 2026-10-24: Buy buttons on Pricing open
// Paddle's checkout over the page; Paddle.com is the Merchant of Record). Before the checkout
// opens, one small form asks the name to show as "Licensed to" (and, for Company, how many
// Macs); the name rides along as Paddle custom data. When the purchase is paid, Paddle tells
// Decibel One sign-in (DOI), which signs the license file and emails it.
//
// SANDBOX runs only on a local copy of the site. LIVE holds the live account's ids (made
// 2026-10-25) but stays shut until LIVE_OPEN is true, so the published page shows no
// buttons. A client-side token is public by design; the price ids are Paddle's
// (scripts/paddle-catalog.py made them).
(function () {
  "use strict";

  var SANDBOX = {
    env: "sandbox",
    token: "test_af54da87c8e9963b1381288af96",
    prices: {
      "sigentest": { pro: "pri_01m5rar4c6egrdrw3d35x2xbdq", company: "pri_01m5rar4gf99meww1fjkae36eg" },
      "sichronize": { pro: "pri_01m5rar4wk0fmc15s6eaq0qxq4", company: "pri_01m5rar50khnnxwz7snsfztheg" },
      "sictr": { pro: "pri_01m5rar5cfpfk79tsm5p6eajpm", company: "pri_01m5rar5fwtj91jqvn4efr0wez" },
      "simonitor": { pro: "pri_01m5rar5v751cyw0t3pj4x9xjk", company: "pri_01m5rar5yczknmb1vdf5kzq7xj" },
      "sicam-control": { pro: "pri_01m5rar6a3afftymemrng2z5g9", company: "pri_01m5rar6dxw6wmawhfzqgfsggm" },
      "sirps": { pro: "pri_01m5rar6s26gcc4jfnta62ns4k", company: "pri_01m5rar6ww99cbe6qknjjx85mm" },
      "siview": { pro: "pri_01m5rar78n52pexs8en0kk6psm", company: "pri_01m5rar7c2asb41sbh4smrncsj" },
      "sivlan": { pro: "pri_01m5rar7pqd2wbtrqaprwpk186", company: "pri_01m5rar7tybpe2qrsv8tqsxhe2" }
    }
  };
  var LIVE = {
    env: "live",
    token: "live_e1a4a63663cef91d226cfa1db3e",
    prices: {
      "sigentest": { pro: "pri_01m5srtbjm3cmq74vt39mgh0pw", company: "pri_01m5srtbnw62t8vz61hq2ft7xp" },
      "sichronize": { pro: "pri_01m5srtc29gj2gqvjaty92hg9r", company: "pri_01m5srtc5qm6kgyqngktgeva69" },
      "sictr": { pro: "pri_01m5srtcgnst3dhye7tg8bt77v", company: "pri_01m5srtckypz483a2qtwfgk8eg" },
      "simonitor": { pro: "pri_01m5srtcz7rb848swxd2f878vb", company: "pri_01m5srtd2hn7akqjabcwhjecze" },
      "sicam-control": { pro: "pri_01m5srtddh4rsex8p7yzaz48gx", company: "pri_01m5srtdgv50hbq3g71zv41dp4" },
      "sirps": { pro: "pri_01m5srtdvw2xgxbemyzxnww6b6", company: "pri_01m5srtdz7bgvy9mmf65zer1zt" },
      "siview": { pro: "pri_01m5srteawdk97hpprs2amvxd9", company: "pri_01m5srteepradkhrf2x0txj7cz" },
      "sivlan": { pro: "pri_01m5srtetxqmym9tkfzzg1xqkg", company: "pri_01m5srteyd3bq5rq15tfzs81c9" }
    }
  };
  // Off until DOI signs live licenses with the production key and Paddle has verified the
  // account and approved decibelone.com; flip it in the same push that is meant to open checkout.
  var LIVE_OPEN = false;

  var local = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  var config = local ? SANDBOX : (LIVE_OPEN ? LIVE : null);
  if (!config) { return; }

  var dialog = document.getElementById("buy-dialog");
  var form = document.getElementById("buy-form");
  var nameInput = document.getElementById("buy-name");
  var macsRow = document.getElementById("buy-macs-row");
  var macsInput = document.getElementById("buy-macs");
  var pending = null;

  var script = document.createElement("script");
  script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
  script.onload = function () {
    if (config.env === "sandbox") { window.Paddle.Environment.set("sandbox"); }
    window.Paddle.Initialize({
      token: config.token,
      eventCallback: function (event) {
        if (event && event.name === "checkout.completed") {
          var email = event.data && event.data.customer && event.data.customer.email;
          var done = document.getElementById("buy-done");
          done.querySelector("strong").textContent = email || "your email address";
          done.hidden = false;
        }
      }
    });
    document.querySelectorAll("[data-buy]").forEach(function (el) { el.hidden = false; });
    if (config.env === "sandbox") { document.getElementById("buy-sandbox").hidden = false; }
  };
  document.head.appendChild(script);

  document.addEventListener("click", function (e) {
    var button = e.target.closest && e.target.closest("button.buy");
    if (!button) { return; }
    var app = button.getAttribute("data-app"), tier = button.getAttribute("data-tier");
    var priceId = config.prices[app] && config.prices[app][tier];
    if (!priceId) { return; }
    pending = { priceId: priceId, tier: tier };
    document.getElementById("buy-title").textContent =
      button.getAttribute("data-name") + (tier === "company" ? " for your company" : " Pro");
    document.getElementById("buy-name-label").textContent =
      tier === "company" ? "Company name to show as “Licensed to”" : "Your name to show as “Licensed to”";
    macsRow.hidden = tier !== "company";
    nameInput.dataset.start = nameInput.value;
    macsInput.dataset.start = macsInput.value;
    dialog.showModal();
    nameInput.focus();
  });

  // Escape in a field puts the field back first; Escape again closes the form (the house
  // rule). What was typed stays for next time.
  [nameInput, macsInput].forEach(function (input) {
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && input.value !== input.dataset.start) {
        e.preventDefault();
        input.value = input.dataset.start;
      }
    });
  });

  document.getElementById("buy-cancel").addEventListener("click", function () { dialog.close(); });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameInput.value.replace(/\s+/g, " ").trim();
    var macs = Math.max(1, Math.min(999, parseInt(macsInput.value, 10) || 1));
    dialog.close();
    window.Paddle.Checkout.open({
      items: [{ priceId: pending.priceId, quantity: pending.tier === "company" ? macs : 1 }],
      customData: name ? { licensee: name } : {},
      settings: {
        displayMode: "overlay",
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
        allowLogout: true
      }
    });
  });
})();
