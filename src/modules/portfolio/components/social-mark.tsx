import Image from "next/image";
import { cn } from "@/lib/utils";

type SocialMarkProps = {
  kind: "github" | "linkedin";
  className?: string;
};

/** Brand mark beside a social link. The link text carries the name. */
export function SocialMark({ kind, className }: SocialMarkProps) {
  const frame = cn("size-4 shrink-0", className);

  if (kind === "linkedin") {
    return (
      <Image
        src="/images/brandings/linkedin-mark.png"
        alt=""
        width={16}
        height={16}
        className={frame}
      />
    );
  }

  return (
    <>
      <Image
        src="/images/brandings/github-mark-black.svg"
        alt=""
        width={16}
        height={16}
        unoptimized
        className={cn(frame, "dark:hidden")}
      />
      <Image
        src="/images/brandings/github-mark-white.svg"
        alt=""
        width={16}
        height={16}
        unoptimized
        className={cn(frame, "hidden dark:block")}
      />
    </>
  );
}
