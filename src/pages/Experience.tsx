import React from 'react'
import { motion } from 'framer-motion'
import InViewReveal from '../shared/InViewReveal'

const skillData: Record<string, { color: string; logo: string }> = {
  "React": { 
    color: "#61DAFB", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" 
  },
  "Java Spring Boot": { 
    color: "#6DB33F", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" 
  },
  "Python": { 
    color: "#FFD43B", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" 
  },
  "Docker": { 
    color: "#2496ED", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" 
  },
  "Kubernetes": { 
    color: "#326CE5", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" 
  },
  "Jenkins": { 
    color: "#D24939", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" 
  },
  "MongoDB": { 
    color: "#47A248", 
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" 
  },
  "default": { 
    color: "#6366f1", 
    logo: "" 
  }
};

export default function Experience() {
  const jobs = [
    {
      role: 'Software Developer',
      company: 'IBM India Software Labs',
      location: 'Kochi, Kerala, India',
      period: 'Jan 2024 – Present',
      description: [
        "Led full-stack development for IBM's MDM/Match360 Quality Dashboard using React/Redux, Java Spring Boot, Python, and MongoDB—improving load times by 25%.",
        'Architected and containerized microservices with Docker/Kubernetes and implemented CI pipelines (Jenkins/Travis) for unique PR deployments, reducing release time by 40%.',
        'Built automated deployment tooling for Linux VMs and a PR bot, significantly increasing developer productivity.',
        'Developed service health-monitoring and self-healing mechanisms using API-key driven automation to ensure high availability.',
        'Introduced code reviews and Agile practices (cut bugs 15%) and automated data-processing workflows with Python scripts, saving 10+ hours/week.'
      ],
      skills: ['React', 'Java Spring Boot', 'Python', 'Docker', 'Kubernetes', 'Jenkins', 'MongoDB']
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
  }

  const getSkill = (skillName: string) => skillData[skillName] || skillData["default"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className='max-w-4xl mx-auto'
    >
      <InViewReveal direction="up">
        <h1 className='text-3xl font-bold mb-12 flex items-center gap-3'>
          <span className='text-indigo-600'>💼</span> Experience
        </h1>
      </InViewReveal>

      <div className='relative ml-3 md:ml-6 space-y-16'>
        {/* Animated timeline line */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-300 dark:to-indigo-800 origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {jobs.map((job, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className='relative pl-8 md:pl-12 group'
          >
            {/* Timeline Dot — Pulsing */}
            <motion.span 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
              className='absolute -left-[11px] top-1 h-6 w-6 rounded-full border-4 border-white dark:border-[#0B1120] bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-900/30 group-hover:scale-125 transition-transform duration-300' 
            >
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-full bg-indigo-500 animate-ping opacity-20" />
            </motion.span>
            
            {/* Header Content */}
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6'>
              <div>
                <h3 className='text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300'>
                  {job.role}
                </h3>
                <div className='text-lg font-semibold text-slate-600 dark:text-slate-300'>
                  {job.company}
                </div>
              </div>
              <div className='flex flex-col items-start sm:items-end mt-2 sm:mt-0 gap-1'>
                <span className='text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-1.5 rounded-full shadow-sm'>
                  {job.period}
                </span>
                <span className='text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1'>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {job.location}
                </span>
              </div>
            </div>

            {/* Bullet Points — Cleaned up will-change */}
            <ul className='space-y-3 mb-8'>
              {job.description.map((point, i) => (
                <motion.li 
                  key={i} 
                  className='relative flex items-start rounded-xl p-3 -ml-3 cursor-default border border-transparent'
                  whileHover={{ 
                    scale: 1.01, 
                    backgroundColor: "rgba(99, 102, 241, 0.04)", 
                    borderColor: "rgba(99, 102, 241, 0.1)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <svg 
                    className="w-5 h-5 text-indigo-500 mr-3 mt-1 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-600 dark:text-slate-300 leading-relaxed text-[15px]">
                    {point}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* Skills Section */}
            <div className='flex flex-wrap gap-3'>
              {job.skills.map(skillName => {
                const { color, logo } = getSkill(skillName);
                return (
                  <motion.span 
                    key={skillName} 
                    className='flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold border rounded-lg cursor-default bg-white dark:bg-slate-800/80 dark:border-slate-700 shadow-sm'
                    style={{ color: color, borderColor: `${color}30` }} 
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 15px ${color}40`, 
                      borderColor: color,
                      backgroundColor: `${color}08`
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    {logo && (
                      <img src={logo} alt="" className="w-4 h-4 object-contain" loading="lazy" />
                    )}
                    {skillName}
                  </motion.span>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
