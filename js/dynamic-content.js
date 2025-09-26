async function loadContent() {
  try {
    const [texts, images] = await Promise.all([
      fetch("content/texts.json").then((res) => res.json()),
      fetch("content/images.json").then((res) => res.json()),
    ]);

    // logo, brand, Navbar
    const logoImg = document.getElementById("logo-img");
    const brand = document.getElementById("brand");
    const navUL = document.getElementById("navbar-ul");

    if (logoImg) logoImg.src = images.logo;
    if (brand) brand.textContent = texts.brand;

    if (navUL && texts.navbar) {
      navUL.innerHTML = texts.navbar
        .map(
          (item, i) =>
            `<li class="nav-item"><a class="nav-link" style="color:#fefefe" href="#${
              ["services", "portfolio", "testimonials", "quote"][i]
            }">${item}</a></li>`
        )
        .join("");
    }

    // Hero Section
    const heroBadges = document.getElementById("hero-badges");
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");
    const heroImg = document.getElementById("hero-img");
    const btnQuote1 = document.getElementById("btn-quote1");
    const btnQuote = document.getElementById("btn-quote");
    const btnQuote3 = document.getElementById("btn-quote3");
    const btnPortfolio = document.getElementById("btn-portfolio");
    const kpiBox = document.getElementById("kpi-box");

    if (heroBadges && texts.hero?.badges) {
      heroBadges.innerHTML = texts.hero.badges
        .map((b) => `<span class="badge badge-custom">${b}</span>`)
        .join(" ");
    }

    if (heroTitle && texts.hero?.title)
      heroTitle.textContent = texts.hero.title;
    if (heroSubtitle && texts.hero?.subtitle)
      heroSubtitle.textContent = texts.hero.subtitle;
    if (heroImg && images.hero) heroImg.src = images.hero;
    if (btnQuote1 && texts.hero?.btn_quote)
      btnQuote1.textContent = texts.hero.btn_quote;
    if (btnQuote && texts.hero?.btn_quote)
      btnQuote.textContent = texts.hero.btn_quote;
    if (btnQuote3 && texts.hero?.btn_quote)
      btnQuote3.textContent = texts.hero.btn_quote;
    if (btnPortfolio && texts.hero?.btn_portfolio)
      btnPortfolio.textContent = texts.hero.btn_portfolio;

    // KPIs
    if (kpiBox && texts.hero?.kpis) {
      kpiBox.innerHTML = texts.hero.kpis
        .map(
          (kpi) => `
          <div class="col-6 col-md-3">
            <div class="kpi">
              <i class="${kpi.icon} fs-4" style="color:#d1a546;"></i>
              <h3>${kpi.val}</h3>
              <p class="small ">${kpi.txt}</p>
            </div>
          </div>`
        )
        .join("");
    }

    // About Section
    const aboutTitle = document.getElementById("about-title");
    const aboutDesc = document.getElementById("about-desc");
    const aboutImg = document.getElementById("about-img");
    const aboutList = document.getElementById("about-list");

    if (aboutTitle && texts.about?.title)
      aboutTitle.textContent = texts.about.title;
    if (aboutDesc && texts.about?.desc)
      aboutDesc.textContent = texts.about.desc;
    if (aboutImg && images.about) aboutImg.src = images.about;
    if (aboutList && texts.about?.points) {
      aboutList.innerHTML = texts.about.points
        .map(
          (item) => `
          <li class="mb-3">
            <strong>${item.title}</strong><br>
            <span>${item.desc}</span>
          </li>
        `
        )
        .join("");
    }

    // Why Us Section
    const whyUsContainer = document.getElementById("why-us-container");
    if (whyUsContainer && texts.whyUs) {
      whyUsContainer.innerHTML = `
      <div class="card shadow border-0">
        <div class="card-body">
          <h3 class="fw-bold">${texts.whyUs.title}</h3>
          <ul>
            ${texts.whyUs.points.map((point) => `<li>${point}</li>`).join("")}
          </ul>
          <img
            src="${images.whyUs}"
            alt="${texts.whyUs.imageAlt}"
            class="img-fluid rounded-3 mt-3"
            loading="lazy" />
        </div>
      </div>
  `;
    }
    // Services Section
    const servicesTitle = document.getElementById("services-title");
    const servicesList = document.getElementById("services-list");

    if (servicesTitle && texts.servicesTitle)
      servicesTitle.textContent = texts.servicesTitle;
    if (servicesList && texts.services) {
      servicesList.innerHTML = texts.services
        .map(
          (item) => `
          <div class="col-md-4">
            <div class="card shadow border-0 h-100">
              <div class="card-body">
                <h5 class="card-title fw-bold mb-2">${item.title}</h5>
                <p class="card-text small ">${item.desc}</p>
              </div>
            </div>
          </div>`
        )
        .join("");
    }

    // Portfolio Section
    const portfolioTitle = document.getElementById("portfolio-title");
    const portfolioList = document.getElementById("portfolio-list");

    if (portfolioTitle && texts.portfolioTitle)
      portfolioTitle.textContent = texts.portfolioTitle;
    if (portfolioList && images.portfolio) {
      portfolioList.innerHTML = images.portfolio
        .map(
          (item, i) => `
          <div class="col-md-4">
            <div class="card shadow border-0">
              <div class="ba" style="height: 250px;" data-slider-id="${i}">
                <img src="${item.before}" alt="قبل" class="img-fluid w-100 h-100" style="object-fit: cover;" loading="lazy" />
                <img class="after img-fluid w-100 h-100" src="${item.after}" alt="بعد" style="object-fit: cover;" loading="lazy" />
                <div class="handle"></div>
                <input type="range" min="0" max="100" value="50" aria-label="مقارنة قبل بعد" />
              </div>
              <div class="card-body">
                <p class="small  mt-2">${item.desc}</p>
              </div>
            </div>
          </div>`
        )
        .join("");
    }

    // ====== Before/After Slider Handler ======
    function initializeBeforeAfterSliders() {
      const sliders = document.querySelectorAll(".ba");
      console.log(`Found ${sliders.length} sliders to initialize`);

      sliders.forEach((slider, index) => {
        // تجنب تفعيل السلايدر مرتين
        if (slider.hasAttribute("data-ba-initialized")) {
          console.log(`Slider ${index} already initialized`);
          return;
        }

        slider.setAttribute("data-ba-initialized", "true");

        // إضافة ID فريد لكل سلايدر
        if (!slider.id) {
          slider.id = `ba-slider-${index}`;
        }

        const beforeImg = slider.querySelector("img:not(.after)");
        const afterImg = slider.querySelector("img.after");
        const handle = slider.querySelector(".handle");
        const rangeInput = slider.querySelector('input[type="range"]');

        if (!beforeImg || !afterImg || !handle || !rangeInput) {
          console.warn(`Slider ${index} missing required elements:`, {
            beforeImg: !!beforeImg,
            afterImg: !!afterImg,
            handle: !!handle,
            rangeInput: !!rangeInput,
          });
          return;
        }

        console.log(`Initializing slider ${index}`);

        // تحديث موضع السلايدر
        function updateSliderPosition(value) {
          const percentage = Math.max(0, Math.min(100, parseFloat(value)));
          afterImg.style.clipPath = `inset(0 0 0 ${percentage}%)`;
          handle.style.left = `${percentage}%`;
        }

        // القيمة الابتدائية
        updateSliderPosition(50);
        rangeInput.value = 50;

        // الاستماع لتغيير شريط التمرير
        rangeInput.addEventListener("input", (e) => {
          updateSliderPosition(e.target.value);
        });

        // السحب بالماوس واللمس
        let isDragging = false;
        let startX = 0;
        let startY = 0;

        function startDrag(e) {
          // التحقق من أن البداية من handle أو rangeInput فقط
          if (!handle.contains(e.target) && !rangeInput.contains(e.target)) {
            return;
          }

          isDragging = true;
          slider.classList.add("dragging");
          document.body.style.userSelect = "none";

          //      // تسجيل نقطة البداية للمس
          if (e.type.includes("touch")) {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
          }

          e.preventDefault();
        }

        function drag(e) {
          if (!isDragging) return;

          const rect = slider.getBoundingClientRect();
          let clientX;

          if (e.type.includes("touch")) {
            clientX = e.touches[0]?.clientX || e.changedTouches[0]?.clientX;

            // حساب المسافة المتحركة
            const deltaX = Math.abs(clientX - startX);
            const deltaY = Math.abs(e.touches[0].clientY - startY);

            // إذا كانت الحركة الرأسية أكبر من الأفقية، اسمح بالتمرير
            if (deltaY > deltaX * 1.5) {
              stopDrag();
              return;
            }

            // منع التمرير فقط إذا كانت الحركة أفقية
            e.preventDefault();
          } else {
            clientX = e.clientX;
          }

          const relativeX = clientX - rect.left;
          const percentage = Math.max(
            0,
            Math.min(100, (relativeX / rect.width) * 100)
          );

          rangeInput.value = percentage;
          updateSliderPosition(percentage);
        }

        function stopDrag() {
          if (!isDragging) return;
          isDragging = false;
          slider.classList.remove("dragging");
          document.body.style.userSelect = "";
        }

        // أحداث الماوس - فقط على handle و rangeInput
        handle.addEventListener("mousedown", startDrag);
        rangeInput.addEventListener("mousedown", startDrag);

        // أحداث اللمس - فقط على handle و rangeInput
        handle.addEventListener("touchstart", startDrag, { passive: false });
        rangeInput.addEventListener("touchstart", startDrag, {
          passive: false,
        });

        // أحداث المستند للحركة والإيقاف
        const mouseMoveHandler = (e) => {
          if (isDragging) {
            drag(e);
          }
        };

        const touchMoveHandler = (e) => {
          if (isDragging) {
            drag(e);
          }
        };

        const stopHandler = () => {
          stopDrag();
        };

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("touchmove", touchMoveHandler, {
          passive: false,
        });
        document.addEventListener("mouseup", stopHandler);
        document.addEventListener("touchend", stopHandler);
        document.addEventListener("touchcancel", stopHandler);

        // تخزين المؤشرات للتنظيف لاحقاً
        slider._eventCleanup = () => {
          document.removeEventListener("mousemove", mouseMoveHandler);
          document.removeEventListener("touchmove", touchMoveHandler);
          document.removeEventListener("mouseup", stopHandler);
          document.removeEventListener("touchend", stopHandler);
          document.removeEventListener("touchcancel", stopHandler);
        };

        // منع السحب للصور
        [beforeImg, afterImg].forEach((img) => {
          img.addEventListener("dragstart", (e) => e.preventDefault());
        });

        console.log(`Slider ${index} initialized successfully`);
      });
    }

    // إضافة الأنماط المطلوبة للسلايدر
    function addSliderStyles() {
      if (document.getElementById("ba-slider-styles")) return;

      const style = document.createElement("style");
      style.id = "ba-slider-styles";
      style.textContent = `
        .ba {
          position: relative;
          overflow: hidden;
          cursor: col-resize;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          touch-action: pan-y;
          width: 100%;
          max-width: 100%;
          height: auto;
        }

        .ba.dragging {
          cursor: grabbing;
        }

        .ba img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          pointer-events: none;
        }

        .ba img.after {
          position: absolute;
          top: 0;
          left: 0;
          clip-path: inset(0 0 0 50%);
          will-change: clip-path;
        }

        .ba .handle {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 4px;
          cursor: col-resize;
          z-index: 2;
          will-change: left;
          background: rgba(255,255,255,0.2);
        }

        .ba .handle::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0,0,0,0.5);
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }

        .ba .handle::after {
          content: '▶◀';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 14px;
          font-weight: bold;
          letter-spacing: 3px;
          pointer-events: none;
          text-shadow: 0 2px 8px rgba(0,0,0,0.3);
          color: #e7bf3bff;
        }

        .ba input[type="range"] {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: col-resize;
          z-index: 11;
        }

        .ba:hover .handle {
          width: 5px;
        }

        .ba:hover .handle::before {
          width: 45px;
          height: 45px;
        }

        @media (max-width: 600px) {
          .ba .handle::before {
            width: 30px;
            height: 30px;
          }
          .ba .handle::after {
            font-size: 12px;
          }
        }

        @media (min-width: 601px) and (max-width: 1024px) {
          .ba .handle::before {
            width: 35px;
            height: 35px;
          }
          .ba .handle::after {
            font-size: 13px;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Testimonials
    const testimonialsTitle = document.getElementById("testimonials-title");
    const testimonialsList = document.getElementById("testimonials-list");

    if (testimonialsTitle && texts.testimonialsTitle) {
      testimonialsTitle.textContent = texts.testimonialsTitle;
    }

    if (testimonialsList && texts.testimonials) {
      testimonialsList.innerHTML = texts.testimonials
        .map(
          (item) => `
          <div class="col-md-4">
            <div class="card shadow border-0 h-100">
              <div class="card-body d-flex align-items-center gap-3">
                <div class="rounded-circle bg-primary" style="width: 44px; height: 44px; padding:0.6rem 0.8rem;">
                  <i class="bi bi-person"></i>
                </div>
                <div>
                  <p class="mb-1">${item.txt}</p>
                  <small class="small">${item.person}</small>
                </div>
              </div>
            </div>
          </div>`
        )
        .join("");
    }

    // Offer Strip
    const offerTitle = document.getElementById("offer-title");
    const offerPoints = document.getElementById("offer-points");
    const offerNote = document.getElementById("offer-note");

    if (offerTitle && texts.offerTitle) {
      offerTitle.textContent = texts.offerTitle;
    }

    if (offerPoints && texts.offerPoints) {
      offerPoints.innerHTML = "";
      texts.offerPoints.forEach((point) => {
        const li = document.createElement("li");
        li.textContent = "• " + point;
        li.classList.add("mb-2");
        offerPoints.appendChild(li);
      });
    }

    if (offerNote && texts.offerNote) {
      offerNote.textContent = texts.offerNote;
    }

    // Footer
    const footerBrand = document.getElementById("footer-brand");
    const footerDesc = document.getElementById("footer-desc");
    const footerAddress = document.getElementById("footer-address");
    const footerTiming = document.getElementById("footer-timing");
    const footerRights = document.getElementById("footer-rights");
    const footerContactTitle = document.getElementById("footer-contact-title");
    const socialLinks = document.getElementById("social-links");
    const footerEmailContainer = document.getElementById(
      "footer-email-container"
    );
    const footerEmail = document.getElementById("footer-email");

    if (footerBrand && texts.brand) footerBrand.textContent = texts.brand;
    if (footerDesc && texts.footer?.desc)
      footerDesc.textContent = texts.footer.desc;
    if (footerAddress && texts.footer?.address)
      footerAddress.textContent = texts.footer.address;
    if (footerTiming && texts.footer?.time)
      footerTiming.textContent = texts.footer.time;
    if (footerRights && texts.footer?.rights) {
      footerRights.textContent = `© ${new Date().getFullYear()} ${
        texts.footer.rights
      }`;
    }
    if (footerContactTitle && texts.footer?.contactTitle) {
      footerContactTitle.textContent = texts.footer.contactTitle;
    }

    // إضافة الإيميل إذا كان موجوداً
    if (footerEmailContainer && footerEmail && texts.footer?.email) {
      footerEmailContainer.style.display = "block";
      footerEmail.href = `mailto:${texts.footer.email}`;
      footerEmail.textContent = texts.footer.email;
    }

    // إضافة روابط السوشيال ميديا
    if (socialLinks && texts.footer?.socialMedia) {
      socialLinks.innerHTML = texts.footer.socialMedia
        .map(
          (social) => `
          <a href="${social.url}" 
             target="_blank" 
             class="text-decoration-none social-icon"
             style="color: #d1a546; font-size: 1.5rem; transition: all 0.3s ease;"
             title="${social.name}"
             onmouseover="this.style.transform='scale(1.2)'; this.style.color='#b8942f';"
             onmouseout="this.style.transform='scale(1)'; this.style.color='#d1a546';">
            <i class="${social.icon}"></i>
          </a>
        `
        )
        .join("");
    }

    // إعداد المتغيرات الرئيسية
    const whatsappNumber = texts.whatsappNumber || "";
    const brand1 = texts.brand || "";
    const domain = texts.domain || "";

    // ====== WhatsApp Helpers ======
    const buildWhatsAppLink = (text) => {
      console.log("buildWhatsAppLink mesageeeeeeeeee", text);
      // const phone = whatsappNumber.replace(/[^\d+]/g, "");
      const phone = whatsappNumber.replace(/\D/g, "");

      const msg = encodeURIComponent(text);
      console.log(`https://wa.me/${phone}?text=${msg}`);
      return `https://wa.me/${phone}?text=${msg}`;
    };

    // Apply WhatsApp links
    function initWhatsAppCTAs() {
      const preset = "السلام عليكم، أود طلب عرض سعر لمشروعي.";

      // جميع أزرار عرض السعر
      const quoteButtons = [
        document.getElementById("btn-quote"),
        document.getElementById("btn-quote1"),
        document.getElementById("btn-quote3"),
        document.getElementById("cta-whatsapp-2"),
        document.getElementById("wh-fab"),
      ];

      // تطبيق رابط الواتساب على جميع الأزرار
      quoteButtons.forEach((btn) => {
        if (btn) {
          const whatsappLink = buildWhatsAppLink(preset);

          // إذا كان رابط (a tag)
          if (btn.tagName.toLowerCase() === "a") {
            btn.href = whatsappLink;
          }
          // إذا كان زر (button tag)
          else if (btn.tagName.toLowerCase() === "button") {
            btn.addEventListener("click", (e) => {
              e.preventDefault();
              window.open(whatsappLink, "_blank");
            });
          }
        }
      });

      // رابط الواتساب في الفوتر
      const footerWhatsapp = document.getElementById("footer-whatsapp");
      if (footerWhatsapp) {
        footerWhatsapp.href = buildWhatsAppLink("أرغب بالتواصل عبر الواتساب");
      }

      console.log("WhatsApp CTAs initialized:", {
        whatsappNumber,
        buttonsFound: quoteButtons.filter((btn) => btn).length,
        sampleLink: buildWhatsAppLink(preset),
      });
    }

    // ====== Quote Form ======
    function initForm() {
      const form = document.getElementById("quoteForm");
      if (!form) return;

      const status = document.getElementById("formStatus");
      const preview = document.getElementById("preview");
      const fileInput = form.querySelector("input[type=file]");

      // معاينة الصور
      if (fileInput && preview) {
        fileInput.addEventListener("change", () => {
          preview.innerHTML = "";
          [...fileInput.files].slice(0, 6).forEach((file) => {
            const url = URL.createObjectURL(file);
            const img = document.createElement("img");
            img.src = url;
            img.className = "rounded-3";
            img.alt = file.name;
            img.style.cssText =
              "max-width: 64px; max-height: 64px; object-fit: cover; margin: 2px;";
            img.loading = "lazy";
            preview.appendChild(img);
          });
        });
      }

      // إرسال النموذج
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!form.checkValidity()) {
          form.classList.add("was-validated");
          if (status) {
            status.textContent = "يرجى تعبئة جميع الحقول المطلوبة بشكل صحيح.";
            status.className = "small text-danger mt-2";
          }
          return;
        }

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let preferredTime = "غير محدد";
        if (data.preferred) {
          const date = new Date(data.preferred);
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          preferredTime = `${day}/${month}/${year} - ${hours}:${minutes}`;
        }

        const msg = `
*طلب عرض سعر جديد* 📋

*بيانات العميل:*
▪️ الاسم: ${data.name || "غير محدد"}
▪️ رقم الجوال: ${data.phone || "غير محدد"}

*تفاصيل المشروع:*
▪️ نوع المشروع: ${data.type || "غير محدد"}
▪️ المدينة: ${data.city || "غير محدد"}
▪️ المساحة: ${data.area || "غير محدد"} م²

*معلومات إضافية:*
▪️ الموعد المفضل للاتصال: ${preferredTime}
▪️ التفاصيل: ${data.details || "لا توجد تفاصيل إضافية"}
${
  fileInput && fileInput.files.length > 0
    ? `▪️ عدد الصور المرفقة: ${fileInput.files.length} صورة`
    : ""
}

*المصدر:* ${domain}
        `.trim();

        const link = buildWhatsAppLink(msg);
        window.open(link, "_blank");

        if (status) {
          status.textContent =
            "✅ تم فتح الواتساب برسالة طلبك. سنعاود التواصل معك في أقرب وقت.";
          status.className = "small text-success mt-2";
        }

        form.reset();
        form.classList.remove("was-validated");
        if (preview) preview.innerHTML = "";

        setTimeout(() => {
          if (status) status.textContent = "";
        }, 5000);
      });
    }

    // ====== Appointment Modal ======
    function initAppointment() {
      const modal = document.getElementById("appointmentModal");
      const apptForm = document.getElementById("apptForm");
      const bookBtn = document.getElementById("bookBtn");

      if (bookBtn && modal) {
        bookBtn.addEventListener("click", function (e) {
          e.preventDefault();
          if (typeof bootstrap !== "undefined") {
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
          }
        });
      }

      if (!apptForm) return;

      apptForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(apptForm);
        const data = Object.fromEntries(formData.entries());

        let appointmentTime = "غير محدد";
        if (data.datetime) {
          const date = new Date(data.datetime);
          const days = [
            "الأحد",
            "الإثنين",
            "الثلاثاء",
            "الأربعاء",
            "الخميس",
            "الجمعة",
            "السبت",
          ];
          const months = [
            "يناير",
            "فبراير",
            "مارس",
            "أبريل",
            "مايو",
            "يونيو",
            "يوليو",
            "أغسطس",
            "سبتمبر",
            "أكتوبر",
            "نوفمبر",
            "ديسمبر",
          ];

          const dayName = days[date.getDay()];
          const day = date.getDate();
          const monthName = months[date.getMonth()];
          const year = date.getFullYear();
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");

          appointmentTime = `${dayName} ${day} ${monthName} ${year} - الساعة ${hours}:${minutes}`;
        }

        const msg = `
*حجز موعد اتصال* 📞

*بيانات العميل:*
▪️ الاسم: ${data.name || "غير محدد"}
▪️ رقم الجوال: ${data.phone || "غير محدد"}

*تفاصيل الموعد:*
▪️ التاريخ والوقت المطلوب: ${appointmentTime}
▪️ نوع المشروع: ${data.type || "غير محدد"}

*المصدر:* ${domain}

يرجى تأكيد الموعد أو اقتراح موعد آخر مناسب.
        `.trim();

        window.open(buildWhatsAppLink(msg), "_blank");

        apptForm.reset();

        if (typeof bootstrap !== "undefined" && modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          if (modalInstance) {
            modalInstance.hide();
          }
        }

        alert(
          "✅ تم إرسال طلب حجز الموعد عبر الواتساب. سنتواصل معك قريباً لتأكيد الموعد."
        );
      });
    }

    // ====== Phone number formatting ======
    function initPhoneValidation() {
      const phoneInputs = document.querySelectorAll('input[type="tel"]');
      phoneInputs.forEach((input) => {
        input.addEventListener("input", function (e) {
          let value = e.target.value.replace(/[^\d+]/g, "");

          // if (value.startsWith("0")) {
          //   if (value.length > 10) {
          //     value = value.slice(0, 10);
          //   }
          // } else if (value.startsWith("+966")) {
          //   if (value.length > 13) {
          //     value = value.slice(0, 13);
          //   }
          // }

          e.target.value = value;
        });
      });
    }

    // ====== Smooth scrolling ======
    function initSmoothScrolling() {
      // أزرار التمرير لقسم عرض السعر
      const quoteBtns = document.querySelectorAll(
        'a[href="#quote"], button[data-target="#quote"]'
      );
      quoteBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const quoteSection = document.getElementById("quote");
          if (quoteSection) {
            quoteSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // أزرار التمرير للبورتفوليو
      const portfolioBtns = document.querySelectorAll(
        'a[href="#portfolio"], button[data-target="#portfolio"]'
      );
      portfolioBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          const portfolioSection = document.getElementById("portfolio");
          if (portfolioSection) {
            portfolioSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });
    }

    // ====== تحسين تجربة المستخدم ======
    function addUIEnhancements() {
      document.querySelectorAll('button[type="submit"]').forEach((btn) => {
        if (!btn.hasAttribute("data-original-text")) {
          btn.setAttribute("data-original-text", btn.innerHTML);
        }
      });

      const style = document.createElement("style");
      style.textContent = `
        .btn {
          transition: all 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .was-validated .form-control:invalid {
          border-color: #dc3545;
        }
        .was-validated .form-control:valid {
          border-color: #198754;
        }
      `;
      document.head.appendChild(style);
    }

    // ====== Main initialization ======
    function initializeAllComponents() {
      console.log("Initializing all components...");

      // Initialize phone in footer
      const footerPhone = document.getElementById("footer-phone");
      if (footerPhone && whatsappNumber) {
        footerPhone.textContent = whatsappNumber.replace("+", "+ ");
        footerPhone.href = `tel:${whatsappNumber}`;
      }

      // Initialize all features
      initWhatsAppCTAs();
      initForm();
      initAppointment();
      initPhoneValidation();
      initSmoothScrolling();
      addUIEnhancements();

      // Add slider styles
      addSliderStyles();
    }

    // تشغيل التهيئة فوراً
    initializeAllComponents();

    // Initialize sliders after portfolio is loaded
    if (portfolioList && images.portfolio) {
      setTimeout(() => {
        console.log("Attempting to initialize sliders...");
        initializeBeforeAfterSliders();
      }, 100);
    }

    // Also try again after images load
    window.addEventListener("load", () => {
      setTimeout(() => {
        initializeBeforeAfterSliders();
      }, 500);
    });
  } catch (error) {
    console.error("Error loading content:", error);
  }
}

// تشغيل التحميل
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadContent);
} else {
  loadContent();
}
