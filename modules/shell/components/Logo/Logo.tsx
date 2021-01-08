import { useRouter } from "next/router";
import Link from "next/link";

export const Logo = () => {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className="hedi-logo-text">
      <Link href={`/${locale}`}>
        <a className="hedi-unstyled-link">♥ Hedi</a>
      </Link>
    </div>
  );
};
