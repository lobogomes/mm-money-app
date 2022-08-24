import styled, { css } from "styled-components/native";
import { Ionicons } from "@expo/vector-icons"
import { RFValue } from "react-native-responsive-fontsize";


interface TypeProps {
    type: 'up' | 'down' | 'balance'
    isNegative: boolean
}

export const Container = styled.View<TypeProps>`
    background-color: ${({ theme, type, isNegative }) => {
            if(type === 'balance'){
                if(isNegative) return theme.colors.attention
                else return theme.colors.sucess_light
            }else return theme.colors.shape
        }
    };
    width:  ${RFValue(300)}px;
    padding: 19px 23px;
    padding-bottom: ${RFValue(42)}px;
    margin-right: 16px;
    border-radius: 10px;
    
    
`
export const Header = styled.View`
    flex-direction: row;
    justify-content: space-between;
`
export const Title = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(15)};
    color: ${({ theme, type }) =>
        type === 'balance' ? theme.colors.shape : theme.colors.primary};
    margin-top: 15px;
`
export const Icon = styled(Ionicons) <TypeProps>`
    font-size: ${RFValue(35)}px;

    ${(props) => props.type === 'up' && css`
        color: ${({ theme }) => theme.colors.sucess}
    `};

    ${(props) => props.type === 'down' && css`
        color: ${({ theme }) => theme.colors.attention}
    `};

    ${(props) => props.type === 'balance' && css`
        color: ${({ theme }) => theme.colors.shape}
    `};

`
export const Footer = styled.View`

`
export const Value = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.medium};
    font-size: ${RFValue(32)};
    color: ${({ theme, type }) =>
        type === 'balance' ? theme.colors.shape : theme.colors.primary};
    margin-top: 38px;
`
export const LastTransaction = styled.Text<TypeProps>`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(12)};
    color: ${({ theme, type }) =>
        type === 'balance' ? theme.colors.shape : theme.colors.text};
`


