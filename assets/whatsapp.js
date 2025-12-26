const contactConfig = {
  whatsapp: {
    phone: "NTUzMTkwODUyNzM0", // base64 for 553190852734
  },
};

function decodeBase64(value) {
  try {
    return atob(value);
  } catch (error) {
    return "";
  }
}

function hydrateWhatsAppLinks() {
  const whatsappLinks = document.querySelectorAll(".whatsapp-link");
  const phone = decodeBase64(contactConfig?.whatsapp?.phone || "");

  if (!phone) return;

  whatsappLinks.forEach((link) => {
    const key = link.dataset.whatsappKey;
    const message = link.dataset.message || "";

    if (!key) return;

    const url = new URL(`https://wa.me/${phone}`);

    if (message) {
      url.searchParams.set("text", message);
    }

    link.href = url.toString();
    link.rel = link.rel || "noopener noreferrer";
    link.target = link.target || "_blank";
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", hydrateWhatsAppLinks);
} else {
  hydrateWhatsAppLinks();
}
