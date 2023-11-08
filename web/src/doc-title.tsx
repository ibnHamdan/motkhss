import { useEffect } from 'react';
import { isDev } from './util';
import { callEndpoint } from './fetch';
import { ENDPOINT_CONFIGS, TrackRequest } from '@motkhss/shared';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    document.title = 'Motkhss |  المتخصص | ' + title;
    if (!isDev) {
      callEndpoint<TrackRequest, unknown>(ENDPOINT_CONFIGS.track, {
        eventName: title,
      });
    }
  }, [title]);
};
