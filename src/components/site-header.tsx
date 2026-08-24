"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type KeyboardEvent, useRef, useState } from "react";

import { LogoutButton } from "@/components/auth/logout-button";
import { CartIcon, CloseIcon, MenuIcon } from "@/components/icons/site-icons";
import { IconButton } from "@/components/ui/icon-button";
import { Container } from "@/components/ui/layout";
import { VoiceGuideButton } from "@/components/voice-guide-button";
import { primaryNavigation } from "@/config/routes";
import { isActiveRoute } from "@/lib/navigation/is-active-route";

type SiteHeaderProps = {
  isAuthenticated?: boolean;
  cartItemCount?: number;
};

export function SiteHeader({
  isAuthenticated = false,
  cartItemCount = 0,
}: SiteHeaderProps) {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const safeCartItemCount = Math.max(0, Math.floor(cartItemCount));
  const accountHref = isAuthenticated ? "/mypage" : "/login";
  const accountLabel = isAuthenticated ? "MY PAGE" : "LOGIN";

  function openMenu() {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      setMenuOpen(true);
    }
  }

  function closeMenu() {
    dialogRef.current?.close();
  }

  function handleDialogClose() {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((element) => !element.hasAttribute("aria-hidden"));
    const firstElement = focusableElements.at(0);
    const lastElement = focusableElements.at(-1);

    if (!firstElement || !lastElement) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return (
    <header className="site-header">
      <p className="visually-hidden" aria-live="polite" role="status">
        {isAuthenticated ? "로그인 상태" : "비로그인 상태"}, 장바구니 상품
        {safeCartItemCount}개
      </p>

      <Container className="header-utility">
        <div className="brand-group" role="group" aria-label="CANE MATE 브랜드">
          <span className="brand-logo brand-carrier">
            <Image
              className="brand-carrier-logo"
              src="/carrier-logo.svg"
              alt="Carrier"
              width={80}
              height={32}
              priority
            />
          </span>
          <span className="brand-separator" aria-hidden="true" />
          <Link
            className="brand-logo brand-cane-mate"
            href="/"
            aria-label="CANE MATE 홈"
          >
            CANE MATE
          </Link>
          <VoiceGuideButton key={pathname} />
        </div>

        <div className="header-actions">
          <Link className="header-account-link" href={accountHref}>
            {accountLabel}
          </Link>
          {isAuthenticated ? <LogoutButton compact /> : null}
          <Link
            className="header-cart-link"
            href="/cart"
            aria-label={`장바구니, 상품 ${safeCartItemCount}개`}
          >
            <CartIcon />
            {safeCartItemCount > 0 ? (
              <span className="cart-count" aria-hidden="true">
                {safeCartItemCount > 99 ? "99+" : safeCartItemCount}
              </span>
            ) : null}
          </Link>
          <IconButton
            ref={menuButtonRef}
            className="header-menu-button"
            label="전체 메뉴 열기"
            aria-controls="site-menu-dialog"
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </Container>

      <nav className="primary-navigation" aria-label="주요 메뉴">
        <Container>
          <ul className="primary-navigation-list">
            {primaryNavigation.map((item) => {
              const isCurrent = isActiveRoute(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    className="primary-navigation-link"
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>

      <dialog
        className="menu-dialog"
        id="site-menu-dialog"
        ref={dialogRef}
        aria-labelledby="menu-dialog-title"
        onClose={handleDialogClose}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="menu-dialog-header">
          <div>
            <p className="menu-dialog-eyebrow">CANE MATE</p>
            <h2 id="menu-dialog-title">전체 메뉴</h2>
          </div>
          <IconButton label="전체 메뉴 닫기" onClick={closeMenu}>
            <CloseIcon />
          </IconButton>
        </div>

        <nav aria-label="전체 메뉴">
          <ul className="menu-dialog-list">
            {primaryNavigation.map((item) => {
              const isCurrent = isActiveRoute(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={closeMenu}
                  >
                    <span>{item.label}</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="menu-dialog-utility">
          <Link href={accountHref} onClick={closeMenu}>
            {accountLabel}
          </Link>
          {isAuthenticated ? <LogoutButton /> : null}
          <Link href="/cart" onClick={closeMenu}>
            장바구니 ({safeCartItemCount})
          </Link>
        </div>
      </dialog>
    </header>
  );
}
