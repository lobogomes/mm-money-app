import { Container } from "./styles";
import React from "react";
import { TextInputProps } from "react-native";

type Props = TextInputProps;

export function Input({...rest} : Props) {

    return (
        <Container {...rest}></Container>
    )
}