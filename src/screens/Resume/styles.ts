import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons"
import { TouchableOpacity } from "react-native";

interface ImageEmptyProps {
    source: string;
  }

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};
    width: 100%;
    height: ${RFValue(50)}px;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 19px;

`

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`
export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
    height: ${RFValue(280)}px;
    padding: 16px;
    justify-content: center;
`
export const MonthSelect = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  padding: 0 24px;
`;

export const MonthSelectButton = styled(TouchableOpacity)`

`;

export const MonthSelectIcon = styled(Ionicons)`
  font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
`;


export const ImageContainer = styled.View`
  padding: 150px 0;
  align-items: center;
  justify-content: center;
`;

export const ImageEmpty = styled.Image`
  width: ${RFValue(150)}px;
  height: ${RFValue(150)}px;
`;

export const TextEmpty = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  padding: 16px 0;
`;

export const Loading = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  
`;
