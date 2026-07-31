export const supportSections = [
  {
    id: 'help-center',
    label: 'Help Center',
    icon: 'HelpCircle',
    title: 'Help Center',
    intro:
      "Welcome to our Help Center. We're here to assist you with any questions regarding donations, volunteer opportunities, campaigns, or our humanitarian services.",
    faqs: [
      {
        question: 'How can I make a donation?',
        answer:
          'You can donate securely through our website using available payment methods, including debit/credit cards, bank transfers, or approved online payment gateways.',
      },
      {
        question: 'Will I receive a donation receipt?',
        answer:
          'Yes. A confirmation email and donation receipt will be sent after your transaction is successfully completed.',
      },
      {
        question: 'How can I volunteer?',
        answer:
          'Visit our Volunteer section or contact us through our Contact page to learn about current volunteer opportunities.',
      },
      {
        question: 'How do I contact support?',
        answer:
          'Our support team is available during business hours via email, phone, or the contact form. We aim to respond within 24–48 business hours.',
      },
    ],
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    icon: 'FileText',
    title: 'Terms & Conditions',
    intro: 'By accessing or using this website, you agree to comply with these Terms & Conditions.',
    subsections: [
      { title: 'Use of Website', body: 'Use this website only for lawful purposes.' },
      { title: 'Donations', body: 'All donations are voluntary and support our humanitarian activities.' },
      {
        title: 'Intellectual Property',
        body: 'All website content is the property of the organization unless otherwise stated.',
      },
      { title: 'Third-Party Links', body: 'We are not responsible for external websites linked from this site.' },
      {
        title: 'Limitation of Liability',
        body: 'We strive for accuracy but do not guarantee the completeness of website information.',
      },
      { title: 'Changes', body: 'We may update these Terms & Conditions at any time without prior notice.' },
    ],
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    icon: 'ShieldCheck',
    title: 'Privacy Policy',
    intro: 'We value your privacy and are committed to protecting your personal information.',
    subsections: [
      {
        title: 'Information We Collect',
        items: [
          'Name',
          'Email Address',
          'Phone Number',
          'Mailing Address',
          'Donation Information',
          'Payment Information (processed securely)',
        ],
      },
      {
        title: 'How We Use Information',
        items: [
          'Process donations',
          'Issue receipts',
          'Respond to inquiries',
          'Improve services',
          'Share updates (with consent)',
        ],
      },
      { title: 'Data Security', body: 'Appropriate security measures are implemented to protect your information.' },
      { title: 'Sharing Information', body: 'We do not sell or rent personal information.' },
      { title: 'Cookies', body: 'Cookies may be used to improve website functionality.' },
      {
        title: 'Your Rights',
        body: 'You may request access, correction, or deletion of your personal information.',
      },
    ],
  },
  {
    id: 'donation-policy',
    label: 'Donation Policy',
    icon: 'HeartHandshake',
    title: 'Donation Policy',
    intro:
      'All donations support charitable projects, emergency relief, healthcare, education, food distribution, and community welfare.',
    subsections: [
      { title: 'Secure Transactions', body: 'Online donations are processed through secure payment gateways.' },
      { title: 'Donation Receipts', body: 'Electronic receipts are issued after successful donations.' },
      {
        title: 'Refund Policy',
        body: 'Donations are generally non-refundable. Refund requests may be considered for duplicate payments, incorrect amounts, or technical errors if submitted within 7 business days.',
      },
      {
        title: 'Restricted Donations',
        body: 'Where possible, restricted donations will be used for the intended project. If unavailable, funds may be redirected to a similar humanitarian cause.',
      },
    ],
  },
  {
    id: 'disclaimer',
    label: 'Disclaimer',
    icon: 'AlertTriangle',
    title: 'Disclaimer',
    paragraphs: [
      'The information on this website is provided for general informational purposes only.',
      'We do not guarantee the completeness or accuracy of all content.',
      'We are not responsible for temporary downtime, technical issues, third-party content, or losses resulting from use of this website.',
      'All donations are voluntary.',
      'We reserve the right to modify website content without prior notice.',
    ],
  },
]
