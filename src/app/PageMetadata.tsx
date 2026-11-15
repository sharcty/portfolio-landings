import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getPageMetadata } from './pageRoutes';

function setMetaContent(
  attribute: 'name' | 'property',
  key: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.append(element);
  }
  element.content = content;
}

export default function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const metadata = getPageMetadata(pathname);
    document.title = metadata.title;
    setMetaContent('name', 'description', metadata.description);
    setMetaContent('property', 'og:title', metadata.title);
    setMetaContent('property', 'og:description', metadata.description);
  }, [pathname]);

  return null;
}
