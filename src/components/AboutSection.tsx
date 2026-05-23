import { Download } from 'lucide-react';
import { Resume3D } from './Resume3D';

export function AboutSection() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              My journey in software development started over two years ago, and since then, I’ve been continuously learning, building, and exploring modern technologies across full-stack web and mobile development. I enjoy combining problem-solving, creativity, and technical expertise to develop scalable, efficient, and user-centric applications that deliver real-world impact and seamless user experiences.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I’m also deeply interested in Generative AI, AI-powered applications, and intelligent automation, and I enjoy integrating modern AI capabilities into practical software solutions.
            </p>

            <div className="space-y-4">
              <h3 className="text-2xl text-blue-400">What I Do</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Full Stack Web & App Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  3D Web Experiences with Three.js
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  UI/UX Design & Implementation
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Graphic Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  AI Automation & Integration
                </li>

              </ul>
            </div>


            <a
              href="public/BhaveshGupta_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            ><button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">

                <Download size={20} />
                Download Resume
              </button></a>
          </div>

          <div className="h-[600px]">
            <Resume3D />
          </div>
        </div>
      </div>
    </div>
  );
}
