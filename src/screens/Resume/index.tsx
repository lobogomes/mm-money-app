import AsyncStorage from "@react-native-async-storage/async-storage";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { RFValue } from "react-native-responsive-fontsize";
import { VictoryPie } from "victory-native"
import { HistoryCard } from "../../components/HistoryCard";
import { categories } from "../../utils/categories";
import {
    ChartContainer,
    Container,
    Content,
    Header,
    ImageContainer,
    ImageEmpty,
    Loading,
    Month,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    TextEmpty,
    Title,
    TransactionsTypes,
} from "./styles";
import { addMonths, subMonths, format } from 'date-fns';
import ptBR from "date-fns/locale/pt-BR";
import { ActivityIndicator, Alert } from "react-native";
import { TransactionTypeChartButton } from "../../components/TransactionTypeChartButton";

//import emptyListImage from '../../assets/error-pig.svg';

interface TransactionData {
    type: 'positive' | 'negative'
    name: string
    value: string
    category: string
    date: string,
    percent: string
}
interface CategoryData {
    key: string
    name: string
    total: number
    totalFormatted: string
    color: string
    percent: string
}

export function Resume() {

    const [isLoading, setIsLoading] = useState(false);
    const [transactionType, setTransactionType] = useState('positive');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev') {
        if (action === 'next') {
            const today = new Date();

            (today.getMonth() === selectedDate.getMonth() &&
                today.getFullYear() === selectedDate.getFullYear()) ?
                Alert.alert('Meses futuros indisponíveis') :
                setSelectedDate(addMonths(selectedDate, 1));
        } else {
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    function handleTransactionsTypeSelect(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    async function loadData() {
        setIsLoading(true)
        const dataKey = "@mmmoney:transactions"
        const response = await AsyncStorage.getItem(dataKey)
        const responseFormated = response ? JSON.parse(response) : []


        const spendings = responseFormated
            .filter((spend: TransactionData) => spend.type === transactionType &&
                new Date(spend.date).getMonth() === selectedDate.getMonth() &&
                new Date(spend.date).getFullYear() === selectedDate.getFullYear()
            )

        const spendingsTotal = spendings
            .reduce((acumullator: number, spend: TransactionData) => {
                return acumullator + Number(spend.value);
            }, 0);

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            spendings.forEach((spend: TransactionData) => {
                if (spend.category === category.key) {
                    categorySum += Number(spend.value);
                }
            });

            if (categorySum > 0) {
                const total = categorySum
                    .toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    });

                const numPercent = categorySum / spendingsTotal * 100;
                const percent = `${numPercent < 1 ? numPercent.toFixed(2) : numPercent.toFixed(0)}%`;

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    color: category.color,
                    total: categorySum,
                    totalFormatted: total.replace('R$', 'R$ '),
                    percent
                });

            }
        })

        setTotalByCategories(totalByCategory)
        setIsLoading(false)
    }

    useFocusEffect(useCallback(() => { loadData() },
        [selectedDate, transactionType]))

    return (
        <Container>

            <Header>
                <Title>Resumo por Categoria</Title>
            </Header>

            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingBottom: useBottomTabBarHeight(),

                }}>

                <MonthSelect>
                    <MonthSelectButton onPress={() => handleDateChange('prev')}>
                        <MonthSelectIcon name='ios-chevron-back-outline' />
                    </MonthSelectButton>

                    <Month>{format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}</Month>

                    <MonthSelectButton onPress={() => handleDateChange('next')}>
                        <MonthSelectIcon name='ios-chevron-forward-outline' />
                    </MonthSelectButton>
                </MonthSelect>


                {totalByCategories.length > 0 ?
                    <>

                        <ChartContainer>

                            <VictoryPie
                                data={totalByCategories}
                                colorScale={totalByCategories.map(category => category.color)}
                                style={{
                                    labels: {
                                        fontSize: RFValue(14),
                                        fill: '#fff'
                                    },

                                }}
                                height={320}
                                labelRadius={70}
                                x="percent"
                                y="total"
                            />

                        </ChartContainer>

                        <TransactionsTypes>

                            <TransactionTypeChartButton
                                title="Entrada"
                                isActive={transactionType === 'positive'}
                                onPress={() => handleTransactionsTypeSelect('positive')}
                            />
                            <TransactionTypeChartButton
                                title="Saída"
                                isActive={transactionType === 'negative'}
                                onPress={() => handleTransactionsTypeSelect('negative')}
                            />
                        </TransactionsTypes>



                        {
                            totalByCategories.map(item => (
                                <HistoryCard
                                    key={item.key}
                                    title={item.name}
                                    value={item.totalFormatted}
                                    color={item.color}
                                    percent={item.percent}
                                />
                            ))
                        }


                    </> :

                    <ImageContainer>
                        <ImageEmpty source={ require('../../assets/error-pig.png') } />
                        <TextEmpty>{transactionType === 'negative' ? 'Nenhuma transação cadastrada' : 'Nenhuma transação cadastrada'}</TextEmpty>

                    </ImageContainer>
                }
            </Content>

        </Container >
    )
}