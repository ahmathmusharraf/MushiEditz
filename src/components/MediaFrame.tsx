import {useState} from 'react';
import {Image as ImageIcon} from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  aspectClassName?: string;
  fallbackTitle?: string;
  priority?: boolean;
}

export function MediaFrame({
  src,
  alt,
  className = '',
  imgClassName = '',
  aspectClassName = 'aspect-[4/3]',
  fallbackTitle = 'Mushi Digital Growth Studio',
  priority = false,
}: MediaFrameProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#141418] ${aspectClassName} ${className}`}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          onError={() => setHasError(true)}
          className={`h-full w-full object-cover ${imgClassName}`}
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#141418] via-[#1C1926] to-[#0B0B0E] p-6 text-center"
          role="img"
          aria-label={alt}
        >
          <ImageIcon className="h-7 w-7 text-[#B69AFF]" aria-hidden="true" />
          <span className="font-display text-sm font-semibold tracking-tight text-[#F7F6F2]">
            {fallbackTitle}
          </span>
        </div>
      )}
    </div>
  );
}
