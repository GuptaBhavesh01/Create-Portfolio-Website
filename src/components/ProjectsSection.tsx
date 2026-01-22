import { ExternalLink, Github } from 'lucide-react';
import { Car3DScene } from './Car3DScene';

const projects = [
  
  {
    title: 'CG Yatri',
    description: 'Book buses, autos, taxis, and cabs easily. Track live locations, explore routes, and travel smarter with CG Yatri.',
    technologies: ['React', 'Javascript', 'NodeJS', 'MongoDB'],
    image: 'Mobility Tech CG Yatri',
    live: 'https://cgyatri.in/',
  },
  {
    title: 'Discover Chhattisgarh: Ek Virtual Safar',
    description: 'Virtual tour of Chhattisgarh, India, showcasing its rich culture, heritage, and natural beauty through immersive 3D experiences.',
    technologies: ['Next.js', 'WebGL', 'WebVR', 'WebXR'],
    image: 'Virtual Tour of Chhattisgarh',
    live: 'https://discover-chhattisgarh.vercel.app/',
  },
  {
    title: 'IJPAF',
    description: 'The International Journal of Pharmacy and Allied Fields (IJPAF) is a peer reviewed, open access journal dedicated to the advancement of knowledge in pharmaceutical sciences and related disciplines.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'NodeJs', 'MongoDB'],
    image: 'Reasearch Paper Publishing Platform',
    live: 'https://ijpaf.com/',
  },
  {
    title: 'Scholint Publishers',
    description: 'Scholint Publishers is an independent, open-access publishing organization devoted to advancing academic scholarship and promoting the global dissemination of knowledge.',
    technologies: ['Next.js', 'MongoDB', 'TailwindCSS', 'API'],
    image: 'Publishers Platform',
    live: 'https://scholintpublishers.com/',
  },
];

export function ProjectsSection() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        {/* 3D Car Showcase */}
        <div className="mb-16 h-[400px]">
          <Car3DScene />
          <p className="text-center text-sm text-muted-foreground mt-4">
            3D Interactive Car Model - Technologies showcase
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <div
      className="group bg-muted/20 rounded-lg border border-border overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <div className="relative h-48 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
      </div>

      <div className="p-6 space-y-4">
        <h3 className="text-2xl text-blue-400 group-hover:text-blue-300 transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm border border-blue-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          
          <a
            href={project.live}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm"
          >
            <ExternalLink size={16} />
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
}
