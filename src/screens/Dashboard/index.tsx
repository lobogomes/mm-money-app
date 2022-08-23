import React from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { Card } from "../../components/Cards";
import { TransactionCard } from "../../components/TransactionCard";
import {
    Cards,
    Container,
    Header,
    Icon,
    Photo,
    Title,
    Transactions,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
} from "./styles";


export function Dashboard() {
    return (
        <Container>
            <Header>

                <UserWrapper>
                    <UserInfo>
                        <Photo
                            source={{ uri: 'https://avatars.githubusercontent.com/u/111708856?v=4' }} />
                        <User>
                            <UserGreeting>Olá,</UserGreeting>
                            <UserName>Amanda</UserName>
                        </User>
                    </UserInfo>
                    <Icon name='ios-power-outline' />
                </UserWrapper>

            </Header>
            <Cards>
                <Card title="Entradas"
                    value="R$ 17.400,00"
                    type="up"
                    lastTransaction="Última entrada dia 13 de agosto" />

                <Card title="Saídas"
                    value="R$ 8.500,00"
                    type="down"
                    lastTransaction="Última saída dia 14 de agosto" />

                <Card title="Balanço"
                    value="R$ 8.900,00"
                    type="balance"
                    lastTransaction="01 à 13 de agosto" />
            </Cards>
            <Transactions>
                <Title>Transações</Title>
                <TransactionCard 
                title="Lucro Bet"
                value="R$ 4.100,00"
                category={{name: 'Lucro', icon:"ios-logo-bitcoin"}}
                date="13/08/2022"
                />
            </Transactions>
        </Container>
    )
}