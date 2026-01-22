import { Mail, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });

    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-background/50 to-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl md:text-6xl mb-12 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl text-blue-400">Let's Work Together</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm always interested in hearing about new projects and opportunities. 
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border hover:border-blue-500/50 transition-colors">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="text-foreground">gbhavesh681@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border hover:border-blue-500/50 transition-colors">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <MapPin className="text-blue-400" size={24} />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="text-foreground">Raipur, Chhattisgarh</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl text-foreground">Follow Me</h4>
              <div className="flex gap-4">
                <a
                  href="https://github.com/GuptaBhavesh01"
                  className="p-3 bg-muted/20 rounded-lg border border-border hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bhavesh-gupta-45265328a"
                  className="p-3 bg-muted/20 rounded-lg border border-border hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-muted/20 p-8 rounded-lg border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-muted-foreground">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="bg-background border-border focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-muted-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                  className="bg-background border-border focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-muted-foreground">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows={6}
                  className="bg-background border-border focus:border-blue-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send size={18} />
                    Send Message
                  </span>
                )}
              </Button>

              {submitted && (
                <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-border text-center text-muted-foreground">
          <p>© 2026 Bhavesh Gupta. Built with Next.js & Three.js</p>
        </div>
      </div>
    </div>
  );
}
