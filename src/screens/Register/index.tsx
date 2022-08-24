import React, { useState } from "react";
import { Input } from "../../components/Forms/Input";
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

    const [transactionType, setTransactionType] = useState('')
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    })
    const [categoryModalOpen, setCategoryModalOpen] = useState(false)
    const { control, 
        handleSubmit , 
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleTransactionType(type: 'up' | 'down') {
        setTransactionType(type);
    }

    function handleOpenSelectCategory() {
        setCategoryModalOpen(true)
    }

    function handleCloseSelectCategory() {
        setCategoryModalOpen(false)
    }

    function handleRegister(form: FormData) {

        if(!transactionType)
            return Alert.alert('Selecione o tipo de transação')

        if(category.key === 'category')
            return Alert.alert('Selecione a categoria')
        
        const data = {
            name: form.name,
            value: form.value,
            transactionType,
            category: category.key
        }
        console.log(data)
    }


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
                                onPress={() => handleTransactionType('up')}
                                isActive={transactionType === 'up'}
                            />

                            <TransactionTypeButton
                                type="down"
                                title="Saída"
                                onPress={() => handleTransactionType('down')}
                                isActive={transactionType === 'down'}
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