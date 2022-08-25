import { Container, Title } from "./styles";
import React from "react";
import { TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
    title: string;
    isActive: boolean
}

export function TransactionTypeChartButton({title, isActive, ...rest} : Props) {

    return (
        <Container {...rest} isActive={isActive} >
            <Title>{title}</Title>
        </Container>
    )
}