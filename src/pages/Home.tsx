import { useContent } from "../hooks/useContent";
import { CaseStudyCard } from "../components/CaseStudyCard";
import type { PortfolioCard, PortfolioData } from "../types/content";

export function Home() {
  const { data: portfolio } = useContent<PortfolioData>("portfolio.json");
  const { data: cards } = useContent<PortfolioCard[]>("portfolio-cards.json");

  if (!portfolio || !cards) return null;

  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
        {portfolio.title}
      </h1>
      <p className="text-[var(--color-text-secondary)] mb-6">
        {portfolio.subtitle}
      </p>
      <div className="grid grid-cols-1 min-[860px]:grid-cols-2 gap-6 justify-items-center min-[860px]:justify-items-start">
        {cards.map((card) => (
          <CaseStudyCard key={card.slug} study={card} />
        ))}
      </div>
    </div>
  );
}
