import { useEffect } from 'react';
import mixpanel from 'mixpanel-browser';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = 'Motkhss |  المتخصص | ' + title;
    mixpanel.track(title);
  }, [title]);
};
