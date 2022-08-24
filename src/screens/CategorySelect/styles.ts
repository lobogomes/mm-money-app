import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { GestureHandlerRootView } from "react-native-gesture-handler";


interface CategoryProps{
    isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
    width: 100%;
    background-color:  ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;
`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
    font-size:  ${RFValue(18)}px;
`

export const Category = styled.TouchableOpacity<CategoryProps>`
    width: 100%;
    padding: ${RFValue(15)}px;
    background-color:  ${({theme, isActive}) => isActive ? theme.colors.shape : theme.colors.background };
    
    flex-direction: row;
`

export const Icon = styled(Ionicons)`
    font-size:  ${RFValue(20)}px;
    margin-right: 16px;
`

export const Name = styled.Text`

    font-family: ${({theme}) => theme.fonts.regular};
    font-size:  ${RFValue(14)}px;
`
export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color:  ${({theme}) => theme.colors.shape};
`


export const Footer = styled.View`
    padding: 24px;
    width: 100%;

`