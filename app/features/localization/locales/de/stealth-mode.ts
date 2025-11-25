export default {
  contactUs: {
    description: "Nimm Kontakt mit dem Ara OS Team auf.",
    fields: {
      email: {
        label: "E-Mail",
        placeholder: "du@unternehmen.com",
      },
      message: {
        label: "Nachricht",
        placeholder: "Erzähl uns von deinen Recruiting-Herausforderungen...",
      },
      name: {
        label: "Name",
        placeholder: "Dein Name",
      },
      phone: {
        description:
          "Wir rufen nur an, wenn du ein Telefongespräch bevorzugst.",
        label: "Telefon",
        optional: "(optional)",
        placeholder: "+49 (0) 123 456789",
      },
    },
    pageTitle: "Kontakt | Ara OS",
    submitButton: "Nachricht senden",
    submitting: "Wird gesendet...",
    success: {
      description:
        "Wir haben deine Nachricht erhalten und werden uns in Kürze melden.",
      title: "Danke für deine Nachricht! Wir melden uns bald.",
    },
    title: "Kontakt",
    validation: {
      emailInvalid: "Bitte gib eine gültige E-Mail-Adresse ein",
      emailRequired: "E-Mail ist erforderlich",
      messageRequired: "Nachricht ist erforderlich",
      messageTooLong: "Nachricht ist zu lang",
      nameRequired: "Name ist erforderlich",
      nameTooLong: "Name ist zu lang",
    },
  },
  header: {
    contactUs: "Kontakt",
    follow: "Folgen",
  },
  hero: {
    contactUs: "Kontakt",
    description:
      "Von Recruitern mit 10+ Jahren Erfahrung entwickelt. KI, die wirklich beim Recruiting hilft.",
    follow: "Folgen",
    stealthMode: "Stealth-Modus",
    title: "Das erste agentische Recruiting-OS",
  },
  tagline: "Von Recruitern, für Recruiter",
} satisfies typeof import("../en/stealth-mode").default;
