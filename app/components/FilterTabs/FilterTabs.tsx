import clsx from "clsx";
import Link from "next/link";

const activeClass = {
  active: "inline-block px-4 py-3 text-white bg-fuchsia-600 rounded-lg",
  inactive:
    "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white",
};

function FilterTabs({ category }: { category?: string }) {
  return (
    <div className="flex justify-center m-2">
      <ul className="flex flex-wrap text-base font-semibold text-center text-gray-500 dark:text-gray-400">
        <li className="me-2">
          <Link
            href="/"
            className={clsx(
              category === undefined ? activeClass.active : activeClass.inactive
            )}
            aria-current="page"
          >
            All Blogs
          </Link>
        </li>
        <li className="me-2">
          <Link
            href={`${process.env.NEXT_PUBLIC_API}/category/technology`}
            className={clsx(
              category === "technology"
                ? activeClass.active
                : activeClass.inactive
            )}
          >
            Technology
          </Link>
        </li>
        <li className="me-2">
          <a
            href={`${process.env.NEXT_PUBLIC_API}/category/productivity`}
            className={clsx(
              category === "productivity"
                ? activeClass.active
                : activeClass.inactive
            )}
          >
            Productivity
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FilterTabs;
