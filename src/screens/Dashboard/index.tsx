import React from "react";
import { Card } from "../../components/Cards";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
    Cards,
    Container,
    Header,
    Icon,
    Photo,
    Title,
    TransactionList,
    Transactions,
    User,
    UserGreeting,
    UserInfo,
    UserName,
    UserWrapper,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
    id: string
}

export function Dashboard() {

    const data: DataListProps[] = [
        {
            id: '1',
            type: 'positive',
            title: "Lucro Bet",
            value: "R$ 4.100,00",
            category: {
                name: 'Lucro',
                icon: "ios-logo-bitcoin",
            },
            date: "13/08/2022"
        },
        {
            id: '2',
            type: 'negative',
            title: "Depósito Bet",
            value: "R$ 2.000,00",
            category: {
                name: 'Contas',
                icon: "ios-receipt-outline",
            },
            date: "13/08/2022"
        },
        {
            id: '3',
            type: 'negative',
            title: "Pizzaria",
            value: "R$ 150,00",
            category: {
                name: 'Alimentação',
                icon: "ios-pizza-outline",
            },
            date: "13/08/2022"
        },
        {
            id: '4',
            type: 'positive',
            title: "Investimento Amanda",
            value: "R$ 5.000,00",
            category: {
                name: 'Investimento',
                icon: "ios-bar-chart-outline",
            },
            date: "13/08/2022"
        }
    ]

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
                <TransactionList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                    
                />
            </Transactions>
        </Container>
    )
}