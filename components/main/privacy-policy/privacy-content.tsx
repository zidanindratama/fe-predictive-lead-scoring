"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Introduction",
    content: (
      <p>
        SmartBank ("we," "our," or "us") is committed to protecting your
        privacy. This Privacy Policy explains how your personal information is
        collected, used, and disclosed by SmartBank. This Privacy Policy applies
        to our website, and its associated subdomains (collectively, our
        "Service") alongside our application, SmartBank. By accessing or using
        our Service, you signify that you have read, understood, and agree to
        our collection, storage, use, and disclosure of your personal
        information as described in this Privacy Policy and our Terms of
        Service.
      </p>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <div className="space-y-4">
        <p>
          We collect information to provide better services to all our users.
          The types of information we collect include:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            <strong className="text-foreground">Personal Information:</strong>{" "}
            Name, email address, phone number, and banking credentials provided
            during registration.
          </li>
          <li>
            <strong className="text-foreground">Financial Data:</strong>{" "}
            Transaction history, account balances, and loan records uploaded for
            analysis.
          </li>
          <li>
            <strong className="text-foreground">Usage Data:</strong> Information
            on how you interact with our dashboard, including features used and
            time spent.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "3. How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Provide, operate, and maintain our website and API services.</li>
          <li>Improve, personalize, and expand our predictive models.</li>
          <li>Understand and analyze how you use our platform.</li>
          <li>
            Develop new products, services, features, and functionality based on
            aggregated data.
          </li>
          <li>
            Send you emails, including system updates and security alerts.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Data Security",
    content: (
      <p>
        We use administrative, technical, and physical security measures to help
        protect your personal information. While we have taken reasonable steps
        to secure the personal information you provide to us, please be aware
        that despite our efforts, no security measures are perfect or
        impenetrable, and no method of data transmission can be guaranteed
        against any interception or other type of misuse.
      </p>
    ),
  },
  {
    title: "5. Third-Party Disclosure",
    content: (
      <p>
        We do not sell, trade, or otherwise transfer to outside parties your
        Personally Identifiable Information unless we provide users with advance
        notice. This does not include website hosting partners and other parties
        who assist us in operating our website, conducting our business, or
        serving our users, so long as those parties agree to keep this
        information confidential.
      </p>
    ),
  },
  {
    title: "6. Contact Us",
    content: (
      <p>
        If you have any questions about this Privacy Policy, You can contact us
        via email at{" "}
        <span className="text-primary font-medium">privacy@smartbank.ai</span>{" "}
        or by visiting the contact page on our website.
      </p>
    ),
  },
];

export const PrivacyContent = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-3xl">
        <div className="space-y-16">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors duration-300">
                {section.title}
              </h2>
              <div className="text-lg text-muted-foreground leading-relaxed">
                {section.content}
              </div>
              <div className="h-px w-full bg-border mt-12 opacity-50" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
