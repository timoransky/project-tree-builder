import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full py-8 text-center text-sm text-gray-500 dark:text-gray-400">
      <p>
        Crafted with ❤️‍🔥 by{" "}
        <Link
          href="https://janci.dev"
          target="_blank"
          className="font-medium text-teal-600 hover:text-teal-500 dark:text-teal-400 dark:hover:text-teal-300 transition-colors"
        >
          janci.dev
        </Link>
      </p>
    </div>
  );
}
