"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const team = [
  {
    name: "Alexander Brian Susanto",
    role: "React & Backend With AI",
    university: "BINUS University",
    image: "/team/brian.JPG",
    linkedin: "https://www.linkedin.com/in/alexander-brian-susanto-11419b260/",
    github: "https://github.com/BriranSus",
  },
  {
    name: "Nur Bintang Hidayat",
    role: "Machine Learning",
    university: "Gunadarma University",
    image: "/team/bintang.jpg",
    linkedin: "https://www.linkedin.com/in/nur-bintang-hidayat/",
    github: "https://github.com/nbintang",
  },
  {
    name: "Muhamad Zidan Indratama",
    role: "React & Backend With AI",
    university: "Gunadarma University",
    image: "/team/zidan.png",
    linkedin: "https://www.linkedin.com/in/zidan-indratama/",
    github: "https://github.com/zidanindratama",
  },
  {
    name: "Muhamad Rafli Kamal",
    role: "Machine Learning",
    university: "Politeknik Enjinering Indorama",
    image: "/team/rafli.jpg",
    linkedin: "https://www.linkedin.com/in/muhamad-rafli-kamal/",
    github: "https://github.com/RafliKamal",
  },
  {
    name: "Ilham Maulana",
    role: "React & Backend With AI",
    university: "Gunadarma University",
    image: "/team/ilham.jpeg",
    linkedin: "https://www.linkedin.com/in/ilhmlnaa/",
    github: "https://github.com/ilhmlnaa",
  },
];

export const TeamShowcase = () => {
  return (
    <section className="py-32 bg-background overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="mb-20 max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            The Minds Behind <br /> the{" "}
            <span className="text-primary">Models</span>
          </motion.h2>
          <p className="text-lg text-muted-foreground">
            We are a diverse team of developers and machine learning engineers
            united by a single mission.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(30%-1rem)]"
            >
              <div className="aspect-3/4 overflow-hidden rounded-2xl bg-secondary relative mb-6 shadow-lg">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <div className="flex gap-3 mb-4">
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/20"
                      >
                        <Linkedin className="w-4 h-4" />
                      </Link>
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-black transition-colors border border-white/20"
                      >
                        <Github className="w-4 h-4" />
                      </Link>
                    </div>

                    <div className="flex items-center gap-2 text-white/80 text-xs font-medium border-t border-white/20 pt-4">
                      <GraduationCap className="w-4 h-4 text-primary" />
                      <span className="uppercase tracking-wide">
                        {member.university}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left pl-2">
                <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
