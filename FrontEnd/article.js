"use strict";

/* ==========================================
   VOID DISTRICT — ARTICLE PAGE
========================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ======================================
     ARTICLE DATABASE
  ====================================== */

  const articles = {
    "streetwear-attitude": {
      title: "Why Streetwear Is More Than Just Clothing",
      category: "STREETWEAR CULTURE",
      date: "OCTOBER 2026",
      description:
        "Streetwear is more than a fashion category. It is a language of identity, creativity, community, and self-expression.",
      image: "./images/blog-streetwear-culture.webp",
      caption: "Streetwear is a culture built around individuality.",
      sections: [
        {
          heading: "The Meaning Behind Streetwear",
          paragraphs: [
            "Streetwear has never been only about what people wear. It represents how individuals communicate their identity through everyday clothing. A simple oversized T-shirt, a pair of sneakers, or a carefully chosen graphic can become a statement about personality and belonging.",
            "Unlike fashion movements built entirely around luxury or seasonal trends, streetwear developed through communities. Skateboarding, hip-hop, basketball, graffiti, and youth culture all helped shape its visual language.",
            "That connection to real communities is what makes streetwear different. The clothes matter, but the ideas behind them matter just as much.",
          ],
        },
        {
          heading: "From the Streets to Global Fashion",
          paragraphs: [
            "Streetwear gained influence because people connected with its authenticity. Styles that began in local creative communities eventually reached designers, international brands, and fashion runways.",
            "As streetwear became more visible, its influence expanded beyond clothing. Music videos, social media, art, and digital communities helped spread new ideas across borders.",
            "Yet its central appeal remains familiar: people want clothing that feels personal rather than dictated by someone else.",
          ],
        },
        {
          heading: "Identity Over Trends",
          paragraphs: [
            "A strong streetwear outfit does not need to follow every new trend. Personal style often comes from understanding what feels comfortable, meaningful, and visually balanced.",
            "Some people prefer understated neutral outfits. Others choose expressive graphics, experimental proportions, or bold accessories. Both approaches can belong within streetwear.",
            "The important part is intention. Instead of asking what everyone else is wearing, ask what your outfit communicates about you.",
          ],
          quote:
            "The strongest style statement is not looking like everyone else.",
        },
        {
          heading: "Community Creates Culture",
          paragraphs: [
            "Streetwear continues to evolve through the people who wear it. Local artists, independent labels, photographers, musicians, and everyday creators contribute to its direction.",
            "Social platforms allow these communities to exchange ideas quickly, but meaningful culture still grows through genuine participation and creative expression.",
            "Supporting emerging designers and developing your own perspective can be just as important as purchasing a recognizable product.",
          ],
        },
        {
          heading: "The VOID District Perspective",
          paragraphs: [
            "VOID District is inspired by the idea that clothing should support individuality. We believe personal style becomes powerful when it reflects confidence rather than conformity.",
            "Our approach focuses on bold simplicity, versatile pieces, and a distinct visual identity. We want our clothing to feel like part of the wearer's story.",
            "Streetwear is not simply what you put on. It is how you choose to show up.",
          ],
        },
      ],
    },

    "oversized-tshirts": {
      title: "How to Style Oversized T-Shirts Like a Pro",
      category: "STYLE GUIDES",
      date: "OCTOBER 2026",
      description:
        "Discover how to balance proportions, layer pieces, and build confident outfits around the oversized T-shirt.",
      image: "./images/blog-oversized-tshirt.webp",
      caption: "Oversized silhouettes bring comfort and character together.",
      sections: [
        {
          heading: "Why Oversized Fits Work",
          paragraphs: [
            "Oversized T-shirts have become a streetwear essential because they combine comfort with a relaxed silhouette. They offer room for movement while creating a distinctive shape.",
            "However, oversized styling is not simply about wearing the largest available size. The shoulder line, sleeve length, fabric weight, and overall proportions all affect how the outfit looks.",
            "The goal is to make the fit appear intentional rather than accidental.",
          ],
        },
        {
          heading: "Balance Your Proportions",
          paragraphs: [
            "One of the easiest ways to style an oversized T-shirt is to consider the width and length of the rest of your outfit.",
            "Straight-leg jeans create a balanced everyday look. Wide-leg trousers produce a more relaxed streetwear silhouette. Tapered cargo pants can add structure without losing comfort.",
            "Try different combinations in front of a mirror. A balanced outfit is not necessarily symmetrical; it simply needs visual harmony.",
          ],
        },
        {
          heading: "Choose the Right Colors",
          paragraphs: [
            "Neutral colors make oversized T-shirts especially versatile. Black, white, charcoal, cream, and earthy shades can be combined with many different pieces.",
            "For a minimalist look, experiment with tonal outfits. A black oversized T-shirt paired with dark trousers and clean sneakers creates a strong silhouette without relying on bright colors.",
            "For something more expressive, use a graphic T-shirt as the focal point and keep the remaining pieces relatively simple.",
          ],
        },
        {
          heading: "Master Layering",
          paragraphs: [
            "Layering can make an oversized T-shirt useful across different seasons. An open overshirt adds structure, while a lightweight jacket creates contrast between relaxed and fitted elements.",
            "In cooler weather, try combining your T-shirt with a hoodie or jacket that complements its length. Avoid adding too many bulky layers at once.",
            "The best layers add depth without making the outfit uncomfortable.",
          ],
          quote:
            "Good streetwear is about proportion, confidence, and attention to detail.",
        },
        {
          heading: "Finish with Footwear and Accessories",
          paragraphs: [
            "Sneakers can change the entire mood of an oversized outfit. Minimal sneakers create a clean finish, while chunkier silhouettes emphasize the streetwear influence.",
            "Caps, crossbody bags, watches, and subtle jewelry can add personality. Choose accessories that support the outfit instead of competing with it.",
            "Start with one oversized T-shirt and build several combinations around it. This is an easy way to develop a personal uniform.",
          ],
        },
      ],
    },

    "void-identity": {
      title: "Inside VOID District: The Identity Behind the Brand",
      category: "VOID UPDATES",
      date: "OCTOBER 2026",
      description:
        "Explore the creative direction, philosophy, and independent spirit shaping the identity of VOID District.",
      image: "./images/blog-void-identity.webp",
      caption: "VOID District is built around individuality and expression.",
      sections: [
        {
          heading: "What VOID District Represents",
          paragraphs: [
            "VOID District is a streetwear brand concept built around individuality, confidence, and the freedom to express personal style.",
            "The name reflects the idea of creating your own space rather than fitting into someone else's expectations. It represents a district without fixed boundaries, where different perspectives and creative identities can coexist.",
            "Our ambition is to build clothing and experiences that connect with people who value originality.",
          ],
        },
        {
          heading: "The Power of Minimal Design",
          paragraphs: [
            "Minimal design does not have to feel ordinary. Strong typography, thoughtful proportions, contrasting colors, and deliberate details can create a memorable identity.",
            "VOID District draws inspiration from modern streetwear, urban environments, and editorial fashion. We favor designs that feel confident without requiring unnecessary decoration.",
            "The aim is to make every visual element serve a purpose.",
          ],
        },
        {
          heading: "Clothing as Self-Expression",
          paragraphs: [
            "People use clothing to communicate before they say a word. A carefully selected outfit can reflect mood, personality, creativity, and confidence.",
            "We believe streetwear should give people room to experiment with these expressions. There is no single correct way to develop personal style.",
            "Our brand direction encourages people to discover combinations that feel authentic to them.",
          ],
          quote:
            "Built for the bold. Designed for those who refuse to blend in.",
        },
        {
          heading: "Building a Digital-First Experience",
          paragraphs: [
            "The VOID District website is being developed to provide a clear and engaging shopping experience. Product discovery, visual storytelling, and accessible navigation are central to that goal.",
            "The Journal adds another dimension by sharing styling advice, cultural perspectives, and brand-related stories.",
            "Our goal is to create more than a collection of product pages. We want a digital space where fashion and ideas connect.",
          ],
        },
        {
          heading: "Where the Identity Goes Next",
          paragraphs: [
            "Brand identity develops through consistency, experimentation, and feedback. As VOID District evolves, our visual language and product direction can grow alongside the community.",
            "We intend to keep the core principles recognizable: individuality, bold simplicity, and a strong connection to streetwear culture.",
            "This is the beginning of the VOID District story.",
          ],
        },
      ],
    },

    "capsule-wardrobe": {
      title: "Building a Streetwear Capsule Wardrobe",
      category: "STYLE GUIDES",
      date: "OCTOBER 2026",
      description:
        "Build more outfits with fewer pieces by choosing versatile essentials that reflect your personal streetwear style.",
      image: "./images/blog-capsule-wardrobe.webp",
      caption: "Versatile essentials make everyday styling easier.",
      sections: [
        {
          heading: "What Is a Capsule Wardrobe?",
          paragraphs: [
            "A capsule wardrobe is a carefully selected collection of clothing that can be combined into many different outfits.",
            "Instead of buying pieces that only work for one occasion, the focus is on versatility, fit, quality, and personal preference.",
            "For streetwear, a capsule wardrobe can include relaxed silhouettes, comfortable fabrics, neutral colors, and a few expressive statement pieces.",
          ],
        },
        {
          heading: "Start with Essential T-Shirts",
          paragraphs: [
            "Begin with a small selection of T-shirts that fit your preferred silhouette. A black T-shirt, a white T-shirt, and one graphic design can create several different looks.",
            "Consider fabric weight and how the shirt sits around the shoulders. These details influence how well it works with jackets and trousers.",
            "Choose pieces you genuinely enjoy wearing rather than buying essentials simply because they appear on a checklist.",
          ],
        },
        {
          heading: "Choose Versatile Bottoms",
          paragraphs: [
            "Straight-leg jeans, relaxed trousers, and cargo pants can form a practical foundation for streetwear outfits.",
            "A dark pair of jeans works with nearly everything. Neutral cargo pants add utility-inspired details, while tailored relaxed trousers offer a cleaner direction.",
            "You do not need every silhouette. Two or three well-chosen options may be enough to create variety.",
          ],
        },
        {
          heading: "Add Layers and Footwear",
          paragraphs: [
            "A hoodie, an overshirt, and a versatile jacket can significantly increase the number of combinations available.",
            "For footwear, consider one clean everyday sneaker and another pair with a different shape or color. This can provide flexibility without collecting more shoes than you need.",
            "Think about your climate and daily routine before deciding which pieces deserve space in your wardrobe.",
          ],
        },
        {
          heading: "Keep Your Personal Identity",
          paragraphs: [
            "A capsule wardrobe should not erase individuality. Graphic details, accessories, unusual textures, or a favorite color can make a small collection feel personal.",
            "The objective is not to own as little as possible. It is to own pieces that work together and make getting dressed easier.",
            "Build gradually, observe what you actually wear, and refine your collection over time.",
          ],
          quote:
            "A smaller wardrobe can create more possibilities when every piece has a purpose.",
        },
      ],
    },

    "sneaker-culture": {
      title: "The Role of Sneakers in Streetwear Culture",
      category: "STREETWEAR CULTURE",
      date: "OCTOBER 2026",
      description:
        "From basketball courts to creative communities, discover why sneakers remain central to streetwear.",
      image: "./images/blog-sneaker-culture.webp",
      caption: "Sneakers connect sport, fashion, and personal identity.",
      sections: [
        {
          heading: "More Than Everyday Footwear",
          paragraphs: [
            "Sneakers have become an important part of contemporary fashion because they combine functionality, design, and cultural meaning.",
            "Their influence reaches beyond sports. Sneakers appear in music, art, photography, and street-style communities around the world.",
            "For many people, a pair of sneakers is not just a practical purchase. It can represent a memory, an interest, or a personal style preference.",
          ],
        },
        {
          heading: "The Connection to Basketball and Music",
          paragraphs: [
            "Basketball helped establish sneakers as recognizable cultural objects. Athletes influenced what fans wore both on and off the court.",
            "Hip-hop and other music communities also played an important role. Artists incorporated sneakers into distinctive looks, helping different models become associated with particular eras and styles.",
            "These connections helped turn athletic footwear into an essential part of streetwear.",
          ],
        },
        {
          heading: "How Sneakers Shape an Outfit",
          paragraphs: [
            "Footwear can influence the overall balance of an outfit. A slim, understated sneaker can create a different impression from a bold, chunky silhouette.",
            "Wide-leg trousers often work well with sneakers that have enough visual presence to balance the fabric. Straight-leg jeans can be styled with many different sneaker shapes.",
            "Color matters too. Neutral footwear offers versatility, while brighter designs can become the focal point of a simple outfit.",
          ],
        },
        {
          heading: "Personal Style Over Hype",
          paragraphs: [
            "Sneaker releases and collaborations can generate significant attention, but popularity does not automatically make a shoe right for everyone.",
            "Comfort, durability, affordability, and compatibility with your wardrobe are often more useful considerations than online hype.",
            "A well-worn pair that suits your style can be more meaningful than a highly sought-after release.",
          ],
          quote:
            "The best sneakers are the ones that feel like part of your identity.",
        },
        {
          heading: "The Future of Sneaker Culture",
          paragraphs: [
            "Sneaker culture continues to evolve as designers explore new materials, silhouettes, and ways of connecting with communities.",
            "Independent creators and smaller labels contribute fresh perspectives alongside established footwear companies.",
            "As tastes change, the relationship between sneakers and streetwear remains strong because both celebrate creativity and personal expression.",
          ],
        },
      ],
    },

    "void-future": {
      title: "What's Next for VOID District?",
      category: "VOID UPDATES",
      date: "OCTOBER 2026",
      description:
        "A look at the direction we're exploring for VOID District, from future collections to a stronger digital community.",
      image: "./images/blog-void-future.webp",
      caption: "Exploring the future direction of VOID District.",
      sections: [
        {
          heading: "A Brand in Development",
          paragraphs: [
            "VOID District is being developed with a clear creative direction: modern streetwear, confident design, and an experience that puts individuality first.",
            "Building a brand requires more than creating a recognizable logo. It involves understanding the people the brand serves, developing useful products, and communicating consistently.",
            "Our current focus is establishing that foundation.",
          ],
        },
        {
          heading: "Exploring Future Collections",
          paragraphs: [
            "We are interested in versatile wardrobe essentials that can support different personal styles. Oversized T-shirts, relaxed fits, graphic details, and carefully selected colors are part of the direction we want to explore.",
            "Any future collection will need to balance visual appeal with practical considerations such as fit, comfort, materials, and affordability.",
            "Specific launches and release dates will be shared only when confirmed.",
          ],
        },
        {
          heading: "Improving the Shopping Experience",
          paragraphs: [
            "A good online store should make product discovery simple. Clear photography, useful descriptions, intuitive navigation, and transparent shopping information are important parts of that experience.",
            "As the VOID District website develops, we are focusing on these fundamentals alongside features such as wishlists, shopping bags, and editorial content.",
            "Our goal is a digital experience that feels cohesive from the first visit to the final checkout.",
          ],
        },
        {
          heading: "Growing Through Community",
          paragraphs: [
            "Streetwear is shaped by people, not just products. We want VOID District to develop through creative conversations, styling inspiration, and meaningful feedback.",
            "The Journal is one way to start that conversation. It creates space for discussions about fashion, culture, and the ideas that influence how people dress.",
            "As the project evolves, community feedback can help us decide what to improve and explore next.",
          ],
          quote:
            "The next chapter is about building something worth belonging to.",
        },
        {
          heading: "Stay Connected",
          paragraphs: [
            "We are excited about the possibilities ahead, but we believe it is important to distinguish future ideas from confirmed announcements.",
            "New developments will be communicated through official VOID District channels as they become available.",
            "Until then, keep exploring your style, questioning conventions, and making your own statement.",
          ],
        },
      ],
    },
  };

  /* ======================================
     DOM ELEMENTS
  ====================================== */

  const articlePage = document.getElementById("articlePage");
  const articleLoading = document.getElementById("articleLoading");
  const articleError = document.getElementById("articleError");

  const titleElement = document.getElementById("articleTitle");
  const categoryElement = document.getElementById("articleCategory");
  const dateElement = document.getElementById("articleDate");
  const readTimeElement = document.getElementById("articleReadTime");
  const descriptionElement = document.getElementById("articleDescription");
  const imageElement = document.getElementById("articleImage");
  const captionElement = document.getElementById("articleImageCaption");
  const breadcrumbTitle = document.getElementById("articleBreadcrumbTitle");

  const articleBody = document.getElementById("articleBody");
  const tableOfContents = document.getElementById("articleTableOfContents");

  const relatedSection = document.getElementById("relatedArticlesSection");

  const relatedGrid = document.getElementById("relatedArticlesGrid");

  /* ======================================
     HELPER FUNCTIONS
  ====================================== */

  function createElement(tag, text, className) {
    const element = document.createElement(tag);

    if (text !== undefined && text !== null) {
      element.textContent = text;
    }

    if (className) {
      element.className = className;
    }

    return element;
  }

  function getArticleURL(slug) {
    return `./article.html?slug=${encodeURIComponent(slug)}`;
  }

  function estimateReadingTime(article) {
    const text = [
      article.title,
      article.description,
      ...article.sections.flatMap((section) => [
        section.heading,
        ...section.paragraphs,
        section.quote || "",
      ]),
    ].join(" ");

    const words = text.trim().split(/\s+/).length;

    return `${Math.max(1, Math.ceil(words / 200))} MIN READ`;
  }

  function showArticleError() {
    if (articleLoading) articleLoading.hidden = true;
    if (articlePage) articlePage.hidden = true;
    if (relatedSection) relatedSection.hidden = true;
    if (articleError) articleError.hidden = false;

    document.title = "Story Not Found | VOID District";
  }

  /* ======================================
     RENDER ARTICLE CONTENT
  ====================================== */

  function renderArticleBody(article) {
    articleBody.replaceChildren();
    tableOfContents.replaceChildren();

    const intro = createElement("p", article.description, "article-intro");

    articleBody.appendChild(intro);

    article.sections.forEach((section, index) => {
      const headingId = `section-${index + 1}`;

      const heading = createElement("h2", section.heading);
      heading.id = headingId;

      articleBody.appendChild(heading);

      const tocLink = createElement("a", section.heading);
      tocLink.href = `#${headingId}`;

      tableOfContents.appendChild(tocLink);

      section.paragraphs.forEach((paragraph) => {
        articleBody.appendChild(createElement("p", paragraph));
      });

      if (section.quote) {
        const quote = createElement("blockquote", section.quote);

        articleBody.appendChild(quote);
      }
    });
  }

  /* ======================================
     RELATED ARTICLES
  ====================================== */

  function renderRelatedArticles(currentSlug) {
    if (!relatedSection || !relatedGrid) return;

    relatedGrid.replaceChildren();

    const currentArticle = articles[currentSlug];

    const candidates = Object.entries(articles)
      .filter(([slug]) => slug !== currentSlug)
      .sort((first, second) => {
        const firstMatch =
          first[1].category === currentArticle.category ? 1 : 0;

        const secondMatch =
          second[1].category === currentArticle.category ? 1 : 0;

        return secondMatch - firstMatch;
      })
      .slice(0, 3);

    candidates.forEach(([slug, article]) => {
      const card = createElement("article", null, "article-related-card");

      const imageLink = createElement("a", null, "article-related-card-image");

      imageLink.href = getArticleURL(slug);

      const image = document.createElement("img");
      image.src = article.image;
      image.alt = article.title;
      image.loading = "lazy";

      imageLink.appendChild(image);

      const content = createElement(
        "div",
        null,
        "article-related-card-content",
      );

      const category = createElement(
        "span",
        article.category,
        "article-related-card-category",
      );

      const heading = createElement("h3", article.title);

      const readLink = createElement("a", "READ ARTICLE ↗");

      readLink.href = getArticleURL(slug);

      content.append(category, heading, readLink);
      card.append(imageLink, content);
      relatedGrid.appendChild(card);
    });

    relatedSection.hidden = candidates.length === 0;
  }

  /* ======================================
     ARTICLE INITIALIZATION
  ====================================== */

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const selectedArticle = slug ? articles[slug] : null;

  if (!selectedArticle || !articlePage || !articleBody || !tableOfContents) {
    showArticleError();
  } else {
    titleElement.textContent = selectedArticle.title;
    categoryElement.textContent = selectedArticle.category;
    dateElement.textContent = selectedArticle.date;
    readTimeElement.textContent = estimateReadingTime(selectedArticle);

    descriptionElement.textContent = selectedArticle.description;

    imageElement.src = selectedArticle.image;
    imageElement.alt = selectedArticle.title;

    captionElement.textContent = selectedArticle.caption;

    breadcrumbTitle.textContent = selectedArticle.title;

    document.title = `${selectedArticle.title} | VOID District`;

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.content = selectedArticle.description;
    }

    renderArticleBody(selectedArticle);
    renderRelatedArticles(slug);

    articleLoading.hidden = true;
    articleError.hidden = true;
    articlePage.hidden = false;
  }

  /* ======================================
     TABLE OF CONTENTS ACTIVE STATE
  ====================================== */

  const tocLinks = Array.from(
    document.querySelectorAll("#articleTableOfContents a"),
  );

  if (tocLinks.length > 0) {
    const sections = tocLinks
      .map((link) => {
        const id = link.getAttribute("href").slice(1);
        return document.getElementById(id);
      })
      .filter(Boolean);

    let clickedSectionId = null;
    let clickScrollTimer = null;

    function setActiveSection(activeId) {
      tocLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${activeId}`;

        link.classList.toggle("is-active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveSection() {
      if (clickedSectionId) return;

      let activeId = sections[0]?.id;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 180) {
          activeId = section.id;
        }
      });

      // Handle the last section near the bottom of the page.
      const lastSection = sections[sections.length - 1];

      if (
        lastSection &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 5
      ) {
        activeId = lastSection.id;
      }

      setActiveSection(activeId);
    }

    tocLinks.forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();

        const id = link.getAttribute("href").slice(1);
        const target = document.getElementById(id);

        if (!target) return;

        clickedSectionId = id;
        setActiveSection(id);

        clearTimeout(clickScrollTimer);

        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        history.replaceState(null, "", `#${id}`);

        clickScrollTimer = setTimeout(() => {
          clickedSectionId = null;
          updateActiveSection();
        }, 1200);
      });
    });

    window.addEventListener("scroll", updateActiveSection, { passive: true });

    updateActiveSection();
  }

  /* ======================================
     SHARE ARTICLE
  ====================================== */

  const copyLinkButton = document.getElementById("articleCopyLink");

  const shareXLink = document.getElementById("articleShareX");

  const shareStatus = document.getElementById("articleShareStatus");

  if (selectedArticle) {
    const articleURL = window.location.href;

    if (shareXLink) {
      shareXLink.href =
        "https://twitter.com/intent/tweet?" +
        new URLSearchParams({
          text: selectedArticle.title,
          url: articleURL,
        }).toString();
    }

    if (copyLinkButton) {
      copyLinkButton.addEventListener("click", async () => {
        try {
          if (!navigator.clipboard?.writeText) {
            throw new Error("Clipboard API unavailable");
          }

          await navigator.clipboard.writeText(articleURL);

          if (shareStatus) {
            shareStatus.textContent = "Article link copied successfully.";
          }
        } catch (error) {
          if (shareStatus) {
            shareStatus.textContent =
              "Unable to copy automatically. Copy the URL from your browser.";
          }
        }
      });
    }
  }

  /* ======================================
     MOBILE NAVIGATION
  ====================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  function closeMobileMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("is-open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu",
      );
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        closeMobileMenu();
      }
    });
  }

  /* ======================================
     NAVBAR PRODUCT SEARCH
  ====================================== */

  const searchContainer = document.getElementById("navSearchContainer");

  const searchToggle = document.getElementById("navSearchToggle");

  const searchForm = document.getElementById("navSearchForm");

  const searchInput = document.getElementById("navSearchInput");

  function closeSearch() {
    if (!searchContainer || !searchToggle) return;

    searchContainer.classList.remove("is-open");
    searchToggle.setAttribute("aria-expanded", "false");
    searchToggle.setAttribute("aria-label", "Open product search");

    if (searchInput) {
      searchInput.tabIndex = -1;
    }
  }

  if (searchContainer && searchToggle && searchInput) {
    searchToggle.addEventListener("click", () => {
      const isOpen = searchContainer.classList.toggle("is-open");

      searchToggle.setAttribute("aria-expanded", String(isOpen));

      searchToggle.setAttribute(
        "aria-label",
        isOpen ? "Close product search" : "Open product search",
      );

      searchInput.tabIndex = isOpen ? 0 : -1;

      if (isOpen) {
        searchInput.focus();
      }
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      const query = searchInput.value.trim();

      if (!query) {
        event.preventDefault();
        searchInput.focus();
        return;
      }

      searchInput.value = query;
    });
  }

  document.addEventListener("click", (event) => {
    if (searchContainer && !searchContainer.contains(event.target)) {
      closeSearch();
    }

    if (
      menuToggle &&
      navLinks &&
      !menuToggle.contains(event.target) &&
      !navLinks.contains(event.target)
    ) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSearch();
      closeMobileMenu();
    }
  });

  /* ======================================
     SHOPPING BAG
  ====================================== */

  const bagButton = document.getElementById("bagButton");
  const bagCount = document.getElementById("bagCount");

  function updateBagCount() {
    if (typeof getCartCount !== "function") return;

    const count = getCartCount();

    if (bagCount) {
      bagCount.textContent = String(count);
    }

    if (bagButton) {
      bagButton.setAttribute(
        "aria-label",
        `Shopping bag, ${count} ${count === 1 ? "item" : "items"}`,
      );
    }
  }

  updateBagCount();

  if (bagButton) {
    bagButton.addEventListener("click", () => {
      if (typeof window.openCartDrawer === "function") {
        window.openCartDrawer();
      } else {
        window.location.href = "./cart.html";
      }
    });
  }

  window.addEventListener("storage", (event) => {
    if (
      event.key === "voidDistrictCart" ||
      event.key === "voidDistrictCartCount"
    ) {
      updateBagCount();
    }
  });

  /* ======================================
     WISHLIST COUNT
  ====================================== */

  if (typeof updateWishlistCount === "function") {
    updateWishlistCount();
  }

  /* ======================================
     FOOTER YEAR
  ====================================== */

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
