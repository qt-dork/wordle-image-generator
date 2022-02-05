import React from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { saveAs } from 'file-saver';

type ShareData = {
  /** A title that describes your content */
  title?: string;
  /** A text describing what you're sharing, or the content itself. */
  text?: string;
  /** A URL to the content you're sharing */
  url?: string;
  /** An array of files 
		  Note that sharing files isn't yet supported by browsers like Firefox for Android */
  files?: File[];
};
/** Hook that lets you trigger the Web Share API.
 * If the Web Share API is not supported, it copies the content to clipboard.
 *
 * @see https://web.dev/web-share/
 *
 * @example
 * const { share, hasShared } = useShare({ url: 'https://my.app' });
 * <button onClick={share} disabled={hasShared}>
 *   {hasShared ? 'Shared' : 'Share!'}
 * </button>
 */
export default function useShare(shareData: ShareData) {
  const [hasShared, setShared] = React.useState(false);
  const clipboard = useClipboard({ copiedTimeout: 1000 });

  React.useEffect(() => {
    if (hasShared) {
      const timeoutId = setTimeout(() => setShared(false), 1000);
      return () => clearTimeout(timeoutId);
    }
    return;
  }, [hasShared]);

  /**
   * Triggers the Share functionality of your device if available.
   * Falls back to copying the content to the clipboard if not supported
   * Falls back to downloading the file if not supported.
   */
  const share = () => {
    const fallbackCopyText =
      shareData.url || shareData.text || shareData.title || '';
    const fallbackSaveFile = shareData.files;
    if (navigator.share) {
      if (
        navigator.canShare &&
        navigator.canShare({ files: shareData.files }) &&
        shareData.files !== undefined
      ) {
        navigator
          .share(shareData)
          .then(() => setShared(true))
          .catch(() => {
            if (fallbackSaveFile !== undefined) {
              saveAs(fallbackSaveFile[0]);
            }
            clipboard.copy(fallbackCopyText);
            setShared(clipboard.copied);
          });
      } else {
        navigator
          .share(shareData)
          .then(() => setShared(true))
          .catch(() => {
            clipboard.copy(fallbackCopyText);
            setShared(clipboard.copied);
          });
      }
    } else {
      if (fallbackSaveFile !== undefined) {
        saveAs(fallbackSaveFile[0]);
      }
      clipboard.copy(fallbackCopyText);
      setShared(clipboard.copied);
    }
  };

  return { share, hasShared };
}
