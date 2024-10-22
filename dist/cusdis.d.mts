import { ReactElement } from 'react';

declare function Comments({ appId, host, lang }: {
    appId: string;
    host?: string;
    lang: string;
}): ReactElement | null;

export { Comments as default };
