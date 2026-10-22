import React from "react";
import Category from './Category';
import Section from '../../global/Section';

function Categories({ data }: { data: string[] }): React.JSX.Element {
    return (
        <Section background='fade'>
            <ul className="flex flex-wrap justify-center gap-8">
                {data.map(item => (
                    <Category name={item} key={item} />
                ))}
            </ul>
        </Section>
    );
}

export default Categories;
