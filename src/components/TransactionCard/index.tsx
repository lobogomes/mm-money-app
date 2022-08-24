import React from "react";

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

interface Category {
    name: string;
    icon: string;
}

export interface TransactionCardProps {

    type: 'positive' | 'negative',
    title: string;
    value: string;
    category: Category,
    date: string;

}

interface Props {
    data: TransactionCardProps
}

export function TransactionCard({ data }: Props) {
    return (
        <Container>
            <Title>{data.title}</Title>
            <Value type={data.type}>
                {data.type === 'negative' && '- '}
                {data.value}
            </Value>
            <Footer>
                <Category>
                    <Icon name={data.category.icon} />
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )
}