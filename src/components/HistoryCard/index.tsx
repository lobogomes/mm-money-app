import React from "react";
import { Container, Title, Value } from "./styles";

interface Props {
    title: string,
    value: string,
    color: string,
    percent: string
}
export function HistoryCard({title, value, color} : Props) {
    return (
        <Container color={color}>
            <Title>{title}</Title>
            <Value>{value}</Value>
        </Container>
    )
}