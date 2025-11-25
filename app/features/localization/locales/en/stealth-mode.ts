export default {
  contactUs: {
    description: "Get in touch with the Ara OS team.",
    fields: {
      email: {
        label: "Email",
        placeholder: "you@company.com",
      },
      message: {
        label: "Message",
        placeholder: "Tell us about your recruiting challenges...",
      },
      name: {
        label: "Name",
        placeholder: "Your name",
      },
      phone: {
        description: "We'll only call if you prefer a phone conversation.",
        label: "Phone",
        optional: "(optional)",
        placeholder: "+1 (555) 000-0000",
      },
    },
    pageTitle: "Contact Us | Ara OS",
    submitButton: "Send Message",
    submitting: "Sending...",
    success: {
      description: "We've received your message and will respond shortly.",
      title: "Thanks for reaching out! We'll be in touch soon.",
    },
    title: "Contact Us",
    validation: {
      emailInvalid: "Please enter a valid email address",
      emailRequired: "Email is required",
      messageRequired: "Message is required",
      messageTooLong: "Message is too long",
      nameRequired: "Name is required",
      nameTooLong: "Name is too long",
    },
  },
  header: {
    contactUs: "Contact Us",
    follow: "Follow",
  },
  hero: {
    contactUs: "Contact Us",
    description:
      "Built by recruiters with 10+ years of expertise. AI that actually helps with recruiting.",
    follow: "Follow",
    stealthMode: "Stealth Mode",
    title: "The First Agentic Recruiting OS",
  },
  tagline: "Built by recruiters, for recruiters",
};
