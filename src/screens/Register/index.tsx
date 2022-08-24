import React, { useState, useEffect } from "react";
import { Button } from "../../components/Forms/Button";
import { Container, Fields, Form, Header, Title, TransactionTypeContainer } from "./styles";
import { TransactionTypeButton } from "../../components/Forms/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Forms/CategorySelectButton";
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from "react-native";
import { CategorySelect } from "../CategorySelect";
import { InputForm } from "../../components/Forms/InputForm";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native"


interface FormData {
    [name: string]: any;
}

const schema = Yup.object().shape({
    name: Yup.string().required('Descrição é obrigatório'),
    value: Yup.number()
        .typeError('Informe um valor numérico')
        .positive('O valor não pode ser negativo')
        .required('O valor é obrigatório')
})

export function Register() {
    const dataKey = "@mmmoney:transactions"

    const [transactionType, setTransactionType] = useState('')

    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })

    const [categoryModalOpen, setCategoryModalOpen] = useState(false)

    const navigation = useNavigation()

    const { control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleTransactionType(type: 'positive' | 'negative') {
        setTransactionType(type);
    }

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false)
    }

    async function handleRegister(form: FormData) {

        if (!transactionType)
            return Alert.alert('Selecione o tipo de transação')

        if (category.key === 'category')
            return Alert.alert('Selecione a categoria')

        const newTransaction = {
            id: Math.random().toString().replace('.', ''),
            name: form.name,
            value: form.value,
            type: transactionType,
            category: category.key,
            date: new Date()
        }

        try {
            const data = await AsyncStorage.getItem(dataKey)

            const currentData = data ? JSON.parse(data) : []

            const dataFormated = [
                newTransaction,
                ...currentData,
            ]

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormated));

            reset()
            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
            })

            navigation.navigate('Início')

        } catch (error) {

            console.log(error)
            Alert.alert("Não foi possível salvar")
        }
    }


    /*async function removeAll() {
        await AsyncStorage.removeItem(dataKey)
    }*/

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>

                <Header>
                    <Title>Cadastro</Title>
                </Header>

                <Form>

                    <Fields>

                        <InputForm
                            control={control}
                            name="name"
                            placeholder="Descrição"
                            autoCapitalize="sentences"
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />

                        <InputForm
                            control={control}
                            name="value"
                            placeholder="Valor"
                            keyboardType="numeric"
                            error={errors.value && errors.value.message}
                        />

                        <TransactionTypeContainer>

                            <TransactionTypeButton
                                type="up"
                                title="Entrada"
                                onPress={() => handleTransactionType('positive')}
                                isActive={transactionType === 'positive'}
                            />

                            <TransactionTypeButton
                                type="down"
                                title="Saída"
                                onPress={() => handleTransactionType('negative')}
                                isActive={transactionType === 'negative'}
                            />

                        </TransactionTypeContainer>

                        <CategorySelectButton
                            title={category.name}
                            onPress={handleOpenSelectCategory}
                        />

                    </Fields>

                    <Button
                        title="Enviar"
                        onPress={handleSubmit(handleRegister)} />

                </Form>

                <Modal visible={categoryModalOpen}>

                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCloseSelectCategory}
                    />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    )
}