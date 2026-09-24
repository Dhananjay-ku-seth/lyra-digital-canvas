import { profile } from '@/data/site';

const SiteFooter = () => (
  <footer className="footer">
    <div className="wrap footer-inner">
      <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
      <p>
        <a className="hover:text-white" href={profile.socials.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <span aria-hidden="true"> · </span>
        <a className="hover:text-white" href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <span aria-hidden="true"> · </span>
        <a className="hover:text-white" href={`mailto:${profile.email}`}>Email</a>
      </p>
    </div>
  </footer>
);

export default SiteFooter;
