import React from "react";
import Event from './Event';
import Showcase from '../../global/Showcase';
import info from '../../../data/briefs';
import type { Event as EventType } from '../../../types';

function EventList({ data }: { data: EventType[] }): React.JSX.Element {
    return (
        <Showcase
            info={info[0]}
            items={data}
            side='right'
            renderItem={(event, main, className) => <Event {...event} main={main} className={className} />}
        />
    );
}

export default EventList;
