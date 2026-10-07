import React from "react";
import Loading from './Loading';
import ErrorMessage from './ErrorMessage';
import type { ResourceStatus } from '../../types';

function AsyncContent({ status, children }: {
    status: ResourceStatus
    children: React.ReactNode
}): React.JSX.Element {
    if (status.loading) {
        return <Loading />;
    }

    if (status.error) {
        return <ErrorMessage onRetry={status.handleRetry} />;
    }

    return <>{children}</>;
}

export default AsyncContent;
