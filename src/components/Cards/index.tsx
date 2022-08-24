import React from "react";
import {
    Container,
    Footer,
    Header,
    Icon,
    LastTransaction,
    Title,
    Value
} from "./styles";

interface Props {
    title: string;
    value: string;
    lastTransaction: string;
    type: 'up' | 'down' | 'balance'
    isNegative: boolean
}

const icon = {
    up: "ios-arrow-up-circle-outline",
    down: "ios-arrow-down-circle-outline",
    balance: "ios-analytics-outline"
}

export function Card({ type, title, value, lastTransaction, isNegative }: Props) {

    return (
        <Container type={type} isNegative={isNegative} >
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Footer>
                <Value type={type}>{value}</Value>
                <LastTransaction type={type}>{lastTransaction}</LastTransaction>
            </Footer>
        </Container>
    )
}