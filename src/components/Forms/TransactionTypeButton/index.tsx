import { Container, Title, Icon } from "./styles";
import React from "react";
import { TouchableOpacityProps } from "react-native";

const icons = {
    up: "ios-arrow-up-circle-outline",
    down: "ios-arrow-down-circle-outline",
}

interface Props extends TouchableOpacityProps {
    title: string;
    type: 'up' | 'down',
    isActive: boolean
}

export function TransactionTypeButton({title, type, isActive, ...rest} : Props) {

    return (
        <Container {...rest} isActive={isActive} type={type} >
            <Icon name={icons[type]} type={type}/>
            <Title>{title}</Title>
        </Container>
    )
}