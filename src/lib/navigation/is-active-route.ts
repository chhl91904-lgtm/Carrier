const buyFlowPaths = ["/buy", "/cart", "/checkout"] as const;

export function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/buy") {
    return buyFlowPaths.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
