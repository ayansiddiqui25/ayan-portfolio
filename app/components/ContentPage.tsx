import Link from "next/link";
import type { PortfolioPageData } from "../portfolio-data";

export function ContentPage({ data }: { data: PortfolioPageData }) {
  return (
    <main className={`content-shell content-shell--${data.color}`}>
      <header className="content-hero">
        <nav className="content-nav" aria-label="Page navigation">
          <Link className="back-link" href="/">
            <span aria-hidden="true">←</span> Back to the spot
          </Link>
          <span className="content-nav__score">Ayan Siddiqui FC · 1—0</span>
        </nav>
        <div className="content-hero__inner">
          <span className="content-hero__kicker">{data.kicker}</span>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
        </div>
      </header>

      <section className="content-grid" aria-label={`${data.navLabel} details`}>
        {data.cards.map((card) => (
          <article
            className={[
              "portfolio-card",
              card.wide ? "portfolio-card--wide" : "",
              card.accent ? "portfolio-card--accent" : "",
            ].join(" ")}
            key={card.title}
          >
            <div className="portfolio-card__meta">
              <span>{card.meta}</span>
              <span>{card.badge}</span>
            </div>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
            <ul className="tag-list" aria-label="Skills and themes">
              {card.tags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
          </article>
        ))}
      </section>

      <footer className="content-footer">
        <p>
          Sample content for now · Ready to make this yours?{" "}
          <a href="mailto:hello@example.com">hello@example.com</a>
        </p>
      </footer>
    </main>
  );
}
