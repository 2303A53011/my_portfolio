import { ElementType, ReactNode, PointerEvent, ComponentPropsWithoutRef } from 'react';

type Props<T extends ElementType> = { as?: T; children?: ReactNode; className?: string } & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export default function Glass<T extends ElementType = 'div'>({ as, children, className = '', ...rest }: Props<T>) {
  const Tag = (as || 'div') as ElementType;
  const move = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag onPointerMove={move} className={`glass ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
