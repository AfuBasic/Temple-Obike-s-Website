import logoSrc from '@assets/IMG-20260727-WA0003_1785149135010.jpg';

export function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="text-center md:text-left order-3 md:order-1">
            <p className="font-serif text-xl text-foreground mb-1 tracking-wide">Temple Obike</p>
            <p className="text-xs text-muted-foreground font-light">© {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="order-1 md:order-2">
            <img
              src={logoSrc}
              alt="Temple Obike logo"
              className="w-28 select-none"
              draggable={false}
            />
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 order-2 md:order-3">
            <div className="flex items-center gap-6">
              {['Instagram', 'YouTube', 'X'].map((social) => (
                <a
                  key={social}
                  href="#"
                  data-testid={`link-social-${social.toLowerCase()}`}
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors font-light tracking-wide"
                >
                  {social}
                </a>
              ))}
            </div>
            <a
              href="https://templescounsel.com"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-therapy-services"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-0.5"
            >
              For therapy & relationship coaching services &rarr;
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
}
