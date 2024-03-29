import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import * as AuthSession from 'expo-auth-session'
import * as AppleAuthentication from 'expo-apple-authentication'
import AsyncStorage from "@react-native-async-storage/async-storage";
const { CLIENT_ID } = process.env


interface AuthProviderProps {
    children: ReactNode;
}

interface User {
    id: string;
    name: string;
    email: string;
    photo?: string;
}

interface AuthContextData {
    user: User;
    signInWithGoogle(): Promise<void>;
    signInWithApple(): Promise<void>;
    signOut(): Promise<void>
}

interface AuthorizationResponse {
    params: {
        access_token: string
    };
    type: string;
}


const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<User>({} as User)

    const userStorageKey = '@mmmoney:user'

    async function signInWithGoogle() {
        /*try {
            const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
            const RESPONSE_TYPE = 'token'
            const SCOPE = encodeURI('profile email')

            const authUrl = `https://accounts.google.com/o/oauth2/v2/authauth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`

            const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse

            if (type === 'sucess') {
                const response = await fetch(`https://googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`)
                const userInfo = await response.json()

                setUser({
                    id: userInfo.id,
                    email: userInfo.email,
                    name: userInfo.given_name,
                    photo: userInfo.picture
                })
                console.log(response)

            }

        } catch (error) {

            throw new Error()

        }*/
        setUser({
            id: '1',
            name: 'Amanda',
            email: 'amanda@email',
            
        })
    }

    async function signInWithApple() {
        try {
            const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL
                ]
            })

            if (credential) {
                const userLogged = {
                    id: String(credential.user),
                    email: credential.email!,
                    name: credential.fullName!.givenName!,
                }

                setUser(userLogged);
                await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
            }
        } catch (error) {
            throw new Error();
        }
    }

    async function signOut() {
        setUser( {} as User)
        await AsyncStorage.removeItem(userStorageKey)
    }

    useEffect(() => {}, [
        /*async function loadUserStorageData() {
            const userStorage = await AsyncStorage.getItem(userStorageKey)
            if(userStorage){
                const userLogged = JSON.parse(userStorage) as User;
                setUser(userLogged)
            }
        }*/AsyncStorage.removeItem(userStorageKey)
    ])
    return (
        <AuthContext.Provider value={{
            user,
            signInWithGoogle,
            signInWithApple,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth }