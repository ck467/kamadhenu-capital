/* ============================================================
   KAMADHENU CAPITAL : RENDERER
   Pours content/content.js into the index.html skeleton.
   You normally never need to touch this file. Edit content.js.
   ============================================================ */
(function () {
  var C = window.CONTENT;
  if (!C) { return; }

  function byId(id) { return document.getElementById(id); }
  function fill(id, html) { var e = byId(id); if (e && html != null) e.innerHTML = html; }

  var brandHTML = C.brand.name + "<b>" + C.brand.dot + "</b>" + C.brand.suffix;
  Array.prototype.forEach.call(document.querySelectorAll("[data-brand]"), function (e) {
    e.innerHTML = brandHTML;
  });

  // nav
  fill("nav", C.nav.map(function (n) {
    return '<a href="' + n.href + '">' + n.label + "</a>";
  }).join(""));

  // hero
  fill("hero-eyebrow", C.hero.eyebrow);
  fill("hero-headline", C.hero.headline);
  fill("hero-lead", C.hero.lead);
  fill("pills", C.hero.pills.map(function (p) {
    return '<span class="pill"><b>' + p.strong + "</b> " + p.text + "</span>";
  }).join(""));
  fill("creed-text", C.creed);

  // arms
  fill("arms-title", C.arms.title);
  fill("arms-sub", C.arms.sub);
  fill("arms", C.arms.items.map(function (a) {
    return '<div class="arm"><p class="rn">' + a.rn + "</p><h3>" + a.title +
      '</h3><p class="meta">' + a.meta + "</p><p>" + a.body +
      '</p><div class="holds">' + a.holds + "</div></div>";
  }).join(""));

  // thesis
  fill("thesis-title", C.thesis.title);
  fill("thesis-sub", C.thesis.sub);
  fill("tiles", C.thesis.tiles.map(function (t) {
    return '<div class="tile"><div class="ix">' + t.ix + "</div><h3>" + t.title +
      "</h3><p>" + t.body + "</p></div>";
  }).join(""));

  // portfolio
  fill("portfolio-title", C.portfolio.title);
  fill("portfolio-sub", C.portfolio.sub);
  fill("portfolio-groups", C.portfolio.groups.map(function (g) {
    var html = '<p class="pgroup">' + g.name + "</p>";
    if (g.items) {
      html += g.items.map(function (it) {
        var name = it.url
          ? '<a href="' + it.url + '" target="_blank" rel="noopener">' + it.name + "</a>"
          : it.name;
        return '<div class="co"><span class="l"><h3>' + name + '</h3><span class="tag">' +
          it.tag + '</span></span><span class="r">' + it.desc + "</span></div>";
      }).join("");
    }
    if (g.note) { html += '<p class="priv">' + g.note + "</p>"; }
    return html;
  }).join(""));

  // team
  fill("team-title", C.team.title);
  fill("team-sub", C.team.sub);
  fill("people", C.team.people.map(function (p) {
    return '<div class="person"><h3>' + p.name + '</h3><p class="role">' + p.role +
      '</p><p class="bio">' + (p.bio || "") + "</p></div>";
  }).join(""));

  // contact
  fill("contact-eyebrow", C.contact.eyebrow);
  fill("contact-title", C.contact.title);
  fill("contact-sub", C.contact.sub);
  var cta = byId("contact-cta");
  if (cta) { cta.textContent = C.contact.email; cta.href = "mailto:" + C.contact.email; }

  // footer
  fill("footer-tagline", C.footer.tagline);
  var fmail = byId("footer-email");
  if (fmail) { fmail.textContent = C.contact.email; fmail.href = "mailto:" + C.contact.email; }
})();
