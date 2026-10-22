import React from "react";
import Dish from './Dish';
import Showcase from '../../global/Showcase';
import info from '../../../data/briefs';
import type { Dish as DishType } from '../../../types';

function DishesBrief({ data }: { data: DishType[] }): React.JSX.Element {
    return (
        <Showcase
            info={info[1]}
            items={data}
            side='left'
            renderItem={(dish, main, className) => <Dish {...dish} main={main} className={className} />}
        />
    );
}

export default DishesBrief;
