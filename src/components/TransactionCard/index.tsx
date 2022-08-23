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

interface Category{
    name: string;
    icon: string;
}

interface Props{
    title: string;
    value: string;
    category: Category,
    date: string;
}

export function TransactionCard({ title, value, category, date }: Props){
    return (
        <Container>
            <Title>{title}</Title>
            <Value>{value}</Value>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>{category.name}</CategoryName>
                </Category>
                <Date>{date}</Date>
            </Footer>
        </Container>
    )
}