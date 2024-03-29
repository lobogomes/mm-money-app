import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { Ionicons } from '@expo/vector-icons'
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { FlatList, FlatListProps } from "react-native";
import { DataListProps } from ".";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Container = styled.View`
    flex: 1;

    background-color: ${( {theme} ) => theme.colors.background};
`

export const Header = styled.View`
    width: 100%;
    height: ${getStatusBarHeight() + RFValue(150)}px;
    background-color: ${ ({theme}) => theme.colors.primary};
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
`

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${RFValue(10)}px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;

`

export const User = styled.View`
    margin-left: 17px;

`
export const UserGreeting = styled.Text`
    color: ${ ({theme}) => theme.colors.shape};
    font-family: ${ ({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`
export const UserName = styled.Text`
    color: ${ ({theme}) => theme.colors.shape};
    font-family: ${ ({theme}) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;

`
export const LogoutButton = styled(TouchableOpacity)``;

export const Icon = styled(Ionicons)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(24)}px;
`

export const Cards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: {paddingHorizontal: 24}
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(15)}px;

`
export const Transactions = styled.View`
    flex: 1%;
    padding: 0 24px;
    margin-top: ${RFPercentage(20)}px;
`

export const Title = styled.Text`
    font-family: ${ ({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    margin-bottom: 16px;
`
export const TransactionList = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
    ).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
        },
})``

export const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`