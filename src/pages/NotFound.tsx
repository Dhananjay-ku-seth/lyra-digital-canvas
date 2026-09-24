import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const NotFound = () => {
  useSeo({
    title: "Page not found — Dhananjay Kumar Seth",
    description: "The page you are looking for does not exist.",
  });

  return (
    <main id="main" className="grid min-h-screen place-items-center px-6 text-center" style={{ background: "var(--bg)" }}>
      <div>
        <p className="grad text-8xl font-extrabold">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mx-auto mt-3 max-w-md" style={{ color: "var(--muted)" }}>
          That page does not exist or has moved. Everything on this site is now on one page.
        </p>
        <Link to="/" className="btn btn-primary mt-8">
          <ArrowLeft size={16} /> Back to the portfolio
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
