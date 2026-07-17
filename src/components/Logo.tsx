import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  /** Pixel size of the mark. */
  size?: number;
  withWordmark?: boolean;
  className?: string;
  href?: string;
}

export function Logo({ size = 32, withWordmark = true, className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="MirageFi home"
      className={cn("group inline-flex items-center gap-2.5 text-mf-ink", className)}
    >
      <Image
        src="/images/logo-mark.png"
        alt=""
        width={size}
        height={size}
        priority
        className="shrink-0 object-contain transition-transform duration-500 group-hover:-translate-y-0.5"
      />
      {withWordmark && (
        <span className="font-heading text-[22px] leading-none tracking-[-0.01em]">MirageFi</span>
      )}
    </Link>
  );
}
