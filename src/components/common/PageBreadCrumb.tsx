import React from "react";
import { Link, useLocation } from "react-router";

interface BreadcrumbProps {
  pageTitle?: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({ pageTitle }) => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean); // remove empty strings

  // Accumulate paths for links like "/users/edit"
  const breadcrumbs = paths.map((segment, index) => {
    const url = "/" + paths.slice(0, index + 1).join("/");
    return {
      name: decodeURIComponent(
        segment.charAt(0).toUpperCase() + segment.slice(1)
      ),
      path: url,
    };
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
        {pageTitle || breadcrumbs.at(-1)?.name || "Dashboard"}
      </h2>
      <nav>
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              to="/#"
            >
              Home
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.path} className="flex items-center gap-1.5 text-sm">
              {index !== breadcrumbs.length - 1 ? (
                <Link
                  to={crumb.path}
                  className="text-gray-500 dark:text-gray-400"
                >
                  {crumb.name}
                  <svg
                    className="inline stroke-current ml-1"
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              ) : (
                <span className="text-gray-800 dark:text-white/90">
                  {crumb.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
