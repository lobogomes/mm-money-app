import React from "react";
import { categories } from "../../utils/categories";

import {
    Container,
    Title,
    Value,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date
} from "./styles";


export interface TransactionCardProps {

    type: 'positive' | 'negative',
    name: string;
    value: string;
    category: string,
    date: string;

}

interface Props {
    data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
    
    const [ category ] = categories.filter(
        item => item.key == data.category
    )

    return (
        <Container>
            <Title>{data.name}</Title>
            <Value type={data.type}>
                {data.type === 'negative' && '- '}
                {data.value}
            </Value>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}