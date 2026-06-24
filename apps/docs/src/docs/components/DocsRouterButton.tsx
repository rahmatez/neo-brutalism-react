import type { CSSProperties, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, type ButtonSize, type ButtonTone } from 'neobrutalism-ui-react';

type DocsRouterButtonTone = ButtonTone | 'background';

interface DocsRouterButtonProps {
  to: string;
  children: ReactNode;
  tone?: DocsRouterButtonTone;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function DocsRouterButton({
  to,
  children,
  tone,
  size = 'lg',
  fullWidth,
  className,
}: DocsRouterButtonProps) {
  const navigate = useNavigate();
  const isBackground = tone === 'background';
  const buttonTone = isBackground ? undefined : tone;
  const style: CSSProperties | undefined = isBackground
    ? { ['--nb-button-bg' as string]: '#fff' }
    : undefined;

  return (
    <Button
      type="button"
      size={size}
      tone={buttonTone}
      fullWidth={fullWidth}
      className={className}
      style={style}
      onClick={() => navigate(to)}
    >
      {children}
    </Button>
  );
}
