import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const navigation = [
  {
    name: "Profile",
    href: "/",
    isCurrent: (pathname: string) => pathname === "/",
  },
  {
    name: "Actions",
    href: "/actions",
    isCurrent: (pathname: string) => pathname.includes("actions"),
  },
  {
    name: "Friends",
    href: "/friends",
    isCurrent: (pathname: string) => pathname.includes("friends"),
  },
];
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function AppWrapper({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const router = useRouter();

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="hidden md:block">
                      <div className="ml-6 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.isCurrent(router.pathname)
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={
                              item.isCurrent(router.pathname)
                                ? "page"
                                : undefined
                            }
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}
