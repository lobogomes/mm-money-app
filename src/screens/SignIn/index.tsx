import React, { useContext } from "react";
import { Container, Footer, FooterWrapper, Header, SignInTitle, TitleWrapper } from "./styles";
import AppleLogo from '../../assets/apple-icon.svg';
import GoogleLogo from '../../assets/google-icon.svg';
import MMLogo from '../../assets/pig-logo.svg';
import { RFValue } from "react-native-responsive-fontsize";
import { Title } from "./styles";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";
import { Alert } from "react-native";

export function SignIn(){
    
    const { user, signInWithGoogle, signInWithApple } = useAuth()

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle()

        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar com a conta Google')
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple()

        } catch (error) {
            console.log(error)
            Alert.alert('Não foi possível conectar com a conta Apple')
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <MMLogo
                        width={RFValue(170)}
                        height={RFValue(170)} />
                    <Title>Controle suas {'\n'} finanças de forma {'\n'} muito simples</Title>
                </TitleWrapper>
                <SignInTitle>
                    Faça seu login {'\n'} com uma das contas abaixo
                </SignInTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SignInSocialButton 
                    title="Entrar com Google" 
                    svg={GoogleLogo} 
                    onPress={handleSignInWithGoogle}
                    />
                    <SignInSocialButton 
                    title="Entrar com Apple" 
                    svg={AppleLogo} 
                    onPress={handleSignInWithApple}
                    />
                </FooterWrapper>
                </Footer>
        </Container>
    )
}