import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Dashboard } from "../screens/Dashboard";
import { Register } from "../screens/Register";
import { useTheme } from "styled-components";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons"
import { Resume } from "../screens/Resume";
const { Navigator, Screen } = createBottomTabNavigator()

export function AppRoutes() {
    const theme = useTheme()
    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarLabelPosition: 'beside-icon',
                
                tabBarStyle: {
                    height: 50,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen
                name="Início"
                component={Dashboard}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Ionicons
                            name="ios-list"
                            size={20}
                            color={color} 
                        />
                    )
                }}
            />
            <Screen
                name="Cadastro"
                component={Register}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Ionicons
                            name="ios-logo-usd"
                            size={20}
                            color={color} 
                        />
                    )
                }}
            />
            <Screen
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <Ionicons
                            name="ios-pie-chart"
                            size={20}
                            color={color} 
                        />
                    )
                }}
            />
        </Navigator>
    )
}