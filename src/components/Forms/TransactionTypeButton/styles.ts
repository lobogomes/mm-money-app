import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";
import { css } from "styled-components";

interface IconProps{
    type: 'up' | 'down'
}

interface ContainerProps{
    isActive: boolean,
    type: 'up' | 'down',
    title: string
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;

    border-width: ${({isActive }) => isActive ? 0 : 1 }px;
    border-style: solid;
    border-radius: 5px;
    border-color: ${({theme}) => theme.colors.text};;

    padding: 16px;
    justify-content: center;
    background-color: ${({theme}) => theme.colors.shape};

    ${({isActive , type}) => isActive && type === 'down' && css`
        background-color: ${({theme}) => theme.colors.attention_light};
    ` }

    ${({isActive , type}) => isActive && type === 'up' && css`
        background-color: ${({theme}) => theme.colors.sucess_opacy};
    ` }
`

export const Icon = styled(Ionicons)<IconProps>`
    font-size: ${RFValue(24)}px;
    margin-right: 12px;

    color: ${({theme, type}) => type === 'up'
    ? theme.colors.sucess : theme.colors.attention };

`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(15)}px;
`