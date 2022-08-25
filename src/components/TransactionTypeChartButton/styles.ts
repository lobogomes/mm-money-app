import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import {RFValue } from "react-native-responsive-fontsize"

interface TypeButtonProps{
    isActive: boolean,
}


export const Container = styled(TouchableOpacity)<TypeButtonProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;
    
    border-bottom-width: ${({isActive }) => isActive ? 1 : 0 }px;
    border-bottom-style: solid;
    border-color: ${({theme}) => theme.colors.text};

    padding: 5px 10px;
    justify-content: center;
    background-color: transparent;

`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`