import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Card } from "../../components/Cards";
import { TransactionCard, TransactionCardProps } from "../../components/TransactionCard";
import {
    Cards,
    Container,
    Header,
    Icon,
    Loading,
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
import { ActivityIndicator } from "react-native";

export interface DataListProps extends TransactionCardProps {
    id: string
}

interface CardsData {
    earnings: { value: string, lastTransaction: string }
    spendings: { value: string, lastTransaction: string }
    balance: { value: string, lastTransaction: string, isNegative: boolean }
}

export function Dashboard() {

    const [data, setData] = useState<DataListProps[]>([])
    const [cardsData, setCardsData] = useState<CardsData>({} as CardsData)
    const [isLoading, setIsLoading] = useState(true)


    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
    ) {
        const todayDateYear = (new Date()).getFullYear();

        const dataArray = collection
            .filter(transaction => transaction.type === type)
            .map(transaction => new Date(transaction.date).getTime());

        const lastTransaction = new Date(
            Math.max.apply(Math, dataArray));

        const lastTransactionYear = lastTransaction.getFullYear();

        return dataArray.length === 0 ? '' : `${type === 'positive' ? 'Última entrada dia ' : 'Última saída dia '} ${lastTransaction.getDate()} de ${todayDateYear === lastTransactionYear ? lastTransaction.toLocaleString('pt-BR', { month: 'long' }) : lastTransaction.toLocaleString('pt-BR', { month: 'short' }) + ' de ' + lastTransactionYear}`;
    }

    function getTotalIntervalTransactionDate(
        collection: DataListProps[],
    ) {
        const dateArray = collection.map(transaction => new Date(transaction.date).getTime());

        const lastTransaction = new Date(Math.max.apply(Math, dateArray));

        const lastTransactionFormmated = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
        }).format(lastTransaction);

        const firstTransaction = new Date(Math.min.apply(Math, dateArray));

        const firstTransactionFormmated = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: 'short',
        }).format(firstTransaction);

        const firstTransactionYear = firstTransaction.getFullYear();
        const lastTransactionYear = lastTransaction.getFullYear();

        return firstTransactionYear === lastTransactionYear
            ? `${firstTransactionFormmated} ~ ${lastTransactionFormmated}`
            : `${firstTransactionFormmated}. ${firstTransactionYear} ~ ${lastTransactionFormmated}. ${lastTransactionYear}`;
    }

    function convertToReal(value: number) {
        const string = value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });

        return string.replace('R$', 'R$ ');
    }


    async function loadData() {

        const dataKey = '@mmmoney:transactions'
        const response = await AsyncStorage.getItem(dataKey)
        const data = response ? JSON.parse(response) : []

        let earnings = 0;
        let spendings = 0;

        const dataFormated: DataListProps[] = data.map((item: DataListProps) => {

            if (item.type === 'positive') {
                earnings += Number(item.value);
            } else {
                spendings += Number(item.value)
            }

            const value = convertToReal(Number(item.value));

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit', month: '2-digit', year: '2-digit'
            }).format(new Date(item.date))

            return {
                id: item.id,
                name: item.name,
                value,
                type: item.type,
                category: item.category,
                date
            }
        })

        setData(dataFormated)

        const lengthArray = data.length;

        const lastTransactionEarnigs = lengthArray===0 ? '' : getLastTransactionDate(data, 'positive');
        const lastTransactionSpendings = lengthArray===0 ? '' : getLastTransactionDate(data, 'negative');
        const balanceInterval = lengthArray===0 ? '' : getTotalIntervalTransactionDate(data);
    
        const balance = earnings - spendings;
        console.log("balance: " + balance)

        setCardsData({
            earnings: {
                value: convertToReal(earnings),
                lastTransaction: lastTransactionEarnigs
            },
            spendings:{ 
                value: convertToReal(spendings),
                lastTransaction: lastTransactionSpendings
            },
            balance: {
                value: convertToReal(balance),
                lastTransaction: balanceInterval,
                isNegative: balance < 0 ? true : false
            },
        })

        console.log(dataFormated)
        setIsLoading(false)
    }

    useEffect(() => { loadData() }, [])

    useFocusEffect(useCallback(() => { loadData() }, []))

    return (
        <Container>
            {
                isLoading ?
                    <Loading><ActivityIndicator color="#000" /></Loading> :
                    <>
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
                                value={cardsData?.earnings?.value}
                                type="up"
                                isNegative={false}
                                lastTransaction={cardsData?.earnings?.lastTransaction} />

                            <Card title="Saídas"
                                value={cardsData?.spendings?.value}
                                type="down"
                                isNegative={false}
                                lastTransaction={cardsData?.spendings?.lastTransaction} />

                            <Card title="Balanço"
                                value={cardsData?.balance?.value}
                                type="balance"
                                isNegative={cardsData?.balance?.isNegative}
                                lastTransaction={cardsData?.balance?.lastTransaction} />
                        </Cards>
                        <Transactions>
                            <Title>Transações</Title>
                            <TransactionList
                                data={data}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}

                            />
                        </Transactions>
                    </>
            }
        </Container>
    )
}