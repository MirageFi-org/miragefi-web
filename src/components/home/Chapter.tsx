/** A chapter of the page: the numeral and title sit in a sticky column on the left, the matter on the right. */
export function Chapter({
  id,
  no,
  title,
  kicker,
  children,
}: {
  id: string;
  no: string;
  title: React.ReactNode;
  kicker?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="chapter scroll-mt-16">
      <div className="chapter-label">
        <span className="numeral block text-[72px] text-mf-dune md:text-[88px]">{no}</span>
        <h2 className="mt-5 max-w-[11ch] font-heading text-[34px] leading-[1.04] text-mf-ink md:text-[38px]">{title}</h2>
        {kicker && <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-mf-muted">{kicker}</p>}
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}
