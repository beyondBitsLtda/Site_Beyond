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

document.addEventListener("DOMContentLoaded", () => {
  const whatsappLinks = document.querySelectorAll(".whatsapp-link");
  const phone = decodeBase64(contactConfig?.whatsapp?.phone || "");

  whatsappLinks.forEach((link) => {
    const key = link.dataset.whatsappKey;
    const message = link.dataset.message || "";

    if (!phone || !key) return;

    const url = new URL(`https://wa.me/${phone}`);

    if (message) {
      url.searchParams.set("text", message);
    }

    link.href = url.toString();
    link.rel = link.rel || "noopener noreferrer";
    link.target = link.target || "_blank";
  });
});
