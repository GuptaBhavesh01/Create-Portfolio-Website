import { Car3DScene } from './Car3DScene';

const skills = [
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'], level: 80 },
  { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB'], level: 90 },
  { category: '3D Graphics', items: ['Three.js', 'WebGL', 'Blender'], level: 70 },
  { category: 'Tools', items: ['Git', 'Figma', 'VS Code'], level: 90 },
];

export function SkillsSection() {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Skills & Expertise
        </h2>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Car Scene */}
          <div className="h-[500px] order-2 lg:order-1">
            <Car3DScene />
            <p className="text-center text-sm text-muted-foreground mt-4">
              Interactive 3D scene - Drag to rotate, scroll to zoom
            </p>
          </div>

          {/* Skills List */}
          <div className="space-y-8 order-1 lg:order-2">
            {skills.map((skill, index) => (
              <div
                key={skill.category}
                className="space-y-4 p-6 bg-muted/20 rounded-lg border border-border hover:border-blue-500/50 transition-colors"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <h3 className="text-2xl text-blue-400">{skill.category}</h3>
                
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-1000"
                      style={{
                        width: `${skill.level}%`,
                        animation: `slideIn 1s ease-out ${index * 0.1}s both`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            width: 0;
          }
        }
      `}</style>
    </div>
  );
}
