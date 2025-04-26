import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFetch } from "hooks/useFetch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    ReadChapter: { chapterHref: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const ReadChapter = () => {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp>();
    const { chapterHref } = route.params as { chapterHref: string };
    const url = process.env.EXPO_PUBLIC_API_URL!;
    const { data, loading, error, refetch } = useFetch<ChapterType>(`${url}/api/v1/chapter?href=${chapterHref}`);
    const { width } = Dimensions.get('window');

    if (loading) {
        return (
            <SafeAreaView className="flex-1 pt-10 bg-background">
                <View className="flex-1 px-4 items-center justify-center">
                    <View className="w-32 h-48 rounded-lg bg-gray-200 animate-pulse" />
                </View>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 pt-10 bg-background">
                <View className="flex-1 px-4 items-center justify-center">
                    <View className="bg-red-500/10 p-6 rounded-lg items-center w-full max-w-md">
                        <Text className="text-red-500 text-lg font-bold mb-2">Error Loading Chapter</Text>
                        <Text className="text-foreground text-center mb-4">{error.message}</Text>
                        <TouchableOpacity
                            onPress={refetch}
                            className="bg-primary px-6 py-2 rounded-md"
                        >
                            <Text className="text-white font-bold">Retry</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 py-2 bg-gray-900">
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text className="text-white">← Back</Text>
                </TouchableOpacity>
                <Text className="text-white font-bold">{data?.title}</Text>
                <View className="w-8" />
            </View>

            {/* Chapter Images */}
            <ScrollView className="flex-1">
                <View className="flex-col items-center py-4">
                    {data?.images.map((image: string, index: number) => (
                        <Image
                            key={index}
                            source={{ uri: image }}
                            style={{ width: width - 32, height: width * 1.5 }}
                            className="mb-4 rounded-lg"
                            resizeMode="contain"
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Navigation Controls */}
            <View className="flex-row justify-between items-center px-4 py-2 bg-gray-900">
                <TouchableOpacity 
                    onPress={() => data?.prevChapter && navigation.navigate('ReadChapter', { chapterHref: data.prevChapter })}
                    className={`px-4 py-2 rounded-md ${!data?.prevChapter ? 'opacity-50' : ''}`}
                    disabled={!data?.prevChapter}
                >
                    <Text className="text-white">← Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => data?.nextChapter && navigation.navigate('ReadChapter', { chapterHref: data.nextChapter })}
                    className={`px-4 py-2 rounded-md ${!data?.nextChapter ? 'opacity-50' : ''}`}
                    disabled={!data?.nextChapter}
                >
                    <Text className="text-white">Next →</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}; 