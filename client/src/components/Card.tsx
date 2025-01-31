import { Card as GenericCard } from '@mintlify/components';
import clsx from 'clsx';
import isAbsoluteUrl from 'is-absolute-url';
import Link from 'next/link';
import { ReactNode } from 'react';

import { ComponentIcon } from '@/ui/Icon';

function DynamicLink(props: any) {
  if (props.href && isAbsoluteUrl(props.href)) {
    return (
      <span className="not-prose">
        <a {...props} target="_blank" rel="noopener" />
      </span>
    );
  }
  return <Link {...props} />;
}

export function Card({
  title,
  icon,
  iconType,
  color,
  href,
  children,
}: {
  title?: string;
  icon?: ReactNode | string;
  iconType?: string;
  color?: string;
  href?: string;
  children: React.ReactNode;
}) {
  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon
        icon={icon}
        iconType={iconType as any}
        color={color}
        className="h-6 w-6 bg-primary dark:bg-primary-light"
        overrideColor
      />
    ) : (
      icon
    );

  const Card = ({ forwardHref, onClick }: { forwardHref?: string; onClick?: any }) => (
    <GenericCard
      className={clsx(
        href && 'cursor-pointer hover:border-primary dark:hover:border-primary-light'
      )}
      title={title}
      icon={Icon}
      href={forwardHref}
      onClick={onClick}
    >
      {children}
    </GenericCard>
  );

  // next/link is used for internal links to avoid extra network calls
  if (href) {
    return (
      <DynamicLink href={href} passHref={true}>
        <Card />
      </DynamicLink>
    );
  }

  return <Card forwardHref={href} />;
}
