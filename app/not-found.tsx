import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { BubbleCard } from "@/components/BubbleCard";
import { primaryButtonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="max-w-md space-y-5">
        <BubbleCard className="space-y-4 p-5">
          <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            We couldn&apos;t find that page
          </h1>
          <p className="text-sm">
            The page you&apos;re looking for may have moved or doesn&apos;t exist. You can search
            for a city or state below, or head back to the homepage.
          </p>
          </div>
          <div className="text-left">
            <SearchBar />
          </div>
        </BubbleCard>
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <Link href="/" className={primaryButtonClass}>
            Go to homepage
          </Link>
          <Link href={"/states/" as any} className={primaryButtonClass}>
            Explore states
          </Link>
          <Link href={"/cities/" as any} className={primaryButtonClass}>
            Explore cities
          </Link>
        </div>
      </div>
    </div>
  );
}

