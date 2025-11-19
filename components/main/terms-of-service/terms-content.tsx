"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: (
      <p>
        By accessing and using the website and services provided by SmartBank
        ("Company", "we", "our", or "us"), you agree to be bound by these Terms
        of Service ("Terms"). If you do not agree to these Terms, you are
        strictly prohibited from using our Services and must discontinue use
        immediately.
      </p>
    ),
  },
  {
    title: "2. Intellectual Property Rights",
    content: (
      <p>
        Unless otherwise indicated, the Service is our proprietary property and
        all source code, databases, functionality, software, website designs,
        audio, video, text, photographs, and graphics on the Service
        (collectively, the "Content") and the trademarks, service marks, and
        logos contained therein (the "Marks") are owned or controlled by us or
        licensed to us, and are protected by copyright and trademark laws.
      </p>
    ),
  },
  {
    title: "3. User Representations",
    content: (
      <div className="space-y-4">
        <p>By using the Service, you represent and warrant that:</p>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>
            All registration information you submit will be true, accurate,
            current, and complete.
          </li>
          <li>
            You have the legal capacity and you agree to comply with these
            Terms.
          </li>
          <li>You are not a minor in the jurisdiction in which you reside.</li>
          <li>
            You will not access the Service through automated or non-human
            means, whether through a bot, script, or otherwise.
          </li>
          <li>
            You will not use the Service for any illegal or unauthorized
            purpose.
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "4. Prohibited Activities",
    content: (
      <p>
        You may not access or use the Service for any purpose other than that
        for which we make the Service available. The Service may not be used in
        connection with any commercial endeavors except those that are
        specifically endorsed or approved by us. Systematically retrieving data
        or other content from the Service to create or compile, directly or
        indirectly, a collection, compilation, database, or directory without
        written permission from us is prohibited.
      </p>
    ),
  },
  {
    title: "5. Limitation of Liability",
    content: (
      <p>
        In no event will we or our directors, employees, or agents be liable to
        you or any third party for any direct, indirect, consequential,
        exemplary, incidental, special, or punitive damages, including lost
        profit, lost revenue, loss of data, or other damages arising from your
        use of the service, even if we have been advised of the possibility of
        such damages.
      </p>
    ),
  },
  {
    title: "6. Governing Law",
    content: (
      <p>
        These Terms shall be governed by and defined following the laws of
        Indonesia. SmartBank and yourself irrevocably consent that the courts of
        Indonesia shall have exclusive jurisdiction to resolve any dispute which
        may arise in connection with these terms.
      </p>
    ),
  },
  {
    title: "7. Contact Us",
    content: (
      <p>
        To resolve a complaint regarding the Service or to receive further
        information regarding use of the Service, please contact us at{" "}
        <span className="text-primary font-medium">legal@smartbank.ai</span>.
      </p>
    ),
  },
];

export const TermsContent = () => {
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
