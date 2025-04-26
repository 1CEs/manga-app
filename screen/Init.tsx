import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { db } from "../db/db";

export const Init = () => {
    const [providerUrl, setProviderUrl] = useState("");
    const [authToken, setAuthToken] = useState("");

    useEffect(() => {
        // Load saved data when component mounts
        const loadSavedData = async () => {
            const savedUrl = await db.getProviderUrl();
            const savedToken = await db.getAuthToken();
            if (savedUrl) setProviderUrl(savedUrl);
            if (savedToken) setAuthToken(savedToken);
        };
        loadSavedData();
    }, []);

    const handleStart = async () => {
        try {
            // Save the provider URL and auth token
            await db.saveProviderUrl(providerUrl);
            await db.saveAuthToken(authToken);
            // TODO: Add navigation or other logic after saving
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-background">
            <View className="w-4/5 gap-y-4 flex-col items-center justify-center">
                <Text className="text-foreground text-4xl font-bold">Manga Reader</Text>
                <Image source={require('assets/img/manhwa.png')} className="w-full h-48" />
                <TextInput
                    className="text-foreground text-md w-full rounded-lg border border-gray-300 p-2 placeholder:text-center"
                    placeholder="Manga Provider URL"
                    placeholderTextColor="gray"
                    value={providerUrl}
                    onChangeText={setProviderUrl}
                />
                <TextInput
                    className="text-foreground text-md w-full rounded-lg border border-gray-300 p-2 placeholder:text-center"
                    placeholder="Authorization Token"
                    placeholderTextColor="gray"
                    value={authToken}
                    onChangeText={setAuthToken}
                    secureTextEntry
                />
                <View className="rounded-lg overflow-hidden">
                    <LinearGradient
                        colors={['#00bdff', '#00f7ff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        className="w-full"
                    >
                        <TouchableOpacity 
                            className="text-foreground text-md py-3 px-6 font-bold"
                            onPress={handleStart}
                        >
                            <Text className="text-center font-bold text-white">Start</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    );
};
