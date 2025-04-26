import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFetch } from "hooks/useFetch";
import { CommentSection } from "components/CommentSection";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    ReadChapter: { chapterHref: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const MangaDetail = () => {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp>();
    const { manga } = route.params as { manga: RecentlyMangaType };
    const url = process.env.EXPO_PUBLIC_API_URL!
    const { data, loading, error, refetch } = useFetch<MangaDetailType>(`${url}/api/v1/detail?href=${manga.href}`);

    if (loading) {
        return (
            <SafeAreaView className="flex-1 pt-10 bg-background">
                <ScrollView className="flex-1" nestedScrollEnabled>
                    <View className="flex-1 px-4">
                        {/* Header Section Skeleton */}
                        <View className="flex-row gap-x-4 mb-6">
                            <View className="w-32 h-48 rounded-lg bg-gray-200 animate-pulse" />
                            <View className="flex-1 gap-y-2">
                                <View className="w-3/4 h-6 bg-gray-200 rounded-md animate-pulse" />
                                <View className="w-1/4 h-4 bg-gray-200 rounded-md animate-pulse" />
                                <View className="w-1/2 h-4 bg-gray-200 rounded-md animate-pulse" />
                                <View className="w-1/3 h-4 bg-gray-200 rounded-md animate-pulse" />
                                <View className="flex-row gap-x-2 mt-2">
                                    <View className="w-20 h-8 bg-gray-200 rounded-md animate-pulse" />
                                    <View className="w-20 h-8 bg-gray-200 rounded-md animate-pulse" />
                                </View>
                            </View>
                        </View>

                        {/* Description Section Skeleton */}
                        <View className="mb-6">
                            <View className="w-1/4 h-6 bg-gray-200 rounded-md mb-2 animate-pulse" />
                            <View className="w-full h-4 bg-gray-200 rounded-md mb-1 animate-pulse" />
                            <View className="w-5/6 h-4 bg-gray-200 rounded-md mb-1 animate-pulse" />
                            <View className="w-4/6 h-4 bg-gray-200 rounded-md animate-pulse" />
                        </View>

                        {/* Details Table Skeleton */}
                        <View className="mb-6">
                            <View className="w-1/4 h-6 bg-gray-200 rounded-md mb-2 animate-pulse" />
                            <View className="bg-gray-800 rounded-lg p-4">
                                {[1, 2, 3, 4].map((_, index) => (
                                    <View key={index} className="flex-row mb-3 last:mb-0">
                                        <View className="w-1/3">
                                            <View className="w-3/4 h-4 bg-gray-200 rounded-md animate-pulse" />
                                        </View>
                                        <View className="flex-1">
                                            <View className="w-1/2 h-4 bg-gray-200 rounded-md animate-pulse" />
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Genres Section Skeleton */}
                        <View className="mb-6">
                            <View className="w-1/4 h-6 bg-gray-200 rounded-md mb-2 animate-pulse" />
                            <View className="flex-row flex-wrap gap-2">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <View key={index} className="w-20 h-6 bg-gray-200 rounded-md animate-pulse" />
                                ))}
                            </View>
                        </View>

                        {/* Chapters Section Skeleton */}
                        <View className="mb-6">
                            <View className="w-1/4 h-6 bg-gray-200 rounded-md mb-2 animate-pulse" />
                            <View className="flex-col gap-y-2">
                                {[1, 2, 3, 4, 5].map((_, index) => (
                                    <View key={index} className="bg-gray-800 rounded-lg p-3">
                                        <View className="w-3/4 h-4 bg-gray-200 rounded-md mb-1 animate-pulse" />
                                        <View className="w-1/4 h-3 bg-gray-200 rounded-md animate-pulse" />
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView className="flex-1 pt-10 bg-background">
                <View className="flex-1 px-4 items-center justify-center">
                    <View className="bg-red-500/10 p-6 rounded-lg items-center w-full max-w-md">
                        <Text className="text-red-500 text-lg font-bold mb-2">Error Loading Content</Text>
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
        <SafeAreaView className="flex-1 pt-10 bg-background">
            <ScrollView className="flex-1" nestedScrollEnabled>
                <View className="flex-1 px-4">
                    {/* Header Section */}
                    <View className="flex-row gap-x-4 mb-6">
                        <Image
                            source={{ uri: manga.thumbnail }}
                            className="w-32 h-48 rounded-lg"
                        />
                        <View className="flex-1 gap-y-2">
                            <Text className="text-foreground text-xl font-bold">{manga.title}</Text>
                            <Text style={{ backgroundColor: manga.type === "Manga" ? "#366ad3" : manga.type === "Manhua" ? "#009688" : "#a12e24" }}
                                className="text-white text-xs rounded-md p-1 self-start">
                                {manga.type.toUpperCase()}
                            </Text>
                            <View className="flex-row items-center gap-x-2">
                                <Text className="text-foreground text-sm">⭐ {data?.rating || "N/A"}</Text>
                            </View>
                            <Text className="text-foreground text-sm">👥 {data?.followCount || "N/A"}</Text>
                            <View className="flex-row gap-x-2">
                                <TouchableOpacity 
                                    className="bg-primary px-4 py-2 rounded-md"
                                    onPress={() => {
                                        const firstChapter = data?.chapters[data.chapters.length - 1];
                                        if (firstChapter) {
                                            navigation.navigate('ReadChapter', { chapterHref: firstChapter.href });
                                        }
                                    }}
                                >
                                    <Text className="text-white font-bold">Read First</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    className="bg-yellow-500 px-4 py-2 rounded-md"
                                    onPress={() => {
                                        const latestChapter = data?.chapters[0];
                                        if (latestChapter) {
                                            navigation.navigate('ReadChapter', { chapterHref: latestChapter.href });
                                        }
                                    }}
                                >
                                    <Text className="text-white font-bold">Read Latest</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* Description Section */}
                    <View className="mb-6">
                        <Text className="text-foreground text-lg font-bold mb-2">Description</Text>
                        <Text className="text-foreground text-sm">{data?.description}</Text>
                    </View>

                    {/* Details Table */}
                    <View className="mb-6">
                        <Text className="text-foreground text-lg font-bold mb-2">Details</Text>
                        <View className="bg-gray-800 rounded-lg p-4">
                            {data?.detailTable.map(([key, value], index) => (
                                <View key={index} className="flex-row mb-3 last:mb-0">
                                    <View className="w-1/3">
                                        <Text className="text-gray-400 text-sm font-medium">{key}:</Text>
                                    </View>
                                    <View className="flex-1">
                                        <Text className="text-foreground text-sm">{value}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Genres Section */}
                    <View className="mb-6">
                        <Text className="text-foreground text-lg font-bold mb-2">Genres</Text>
                        <View className="flex-row flex-wrap gap-2">
                            {data?.genres.map((genre, index) => (
                                <Text
                                    key={index}
                                    className="text-foreground text-sm bg-gray-800 rounded-md px-3 py-1"
                                >
                                    {genre}
                                </Text>
                            ))}
                        </View>
                    </View>

                    {/* Chapters Section */}
                    <View className="mb-6">
                        <Text className="text-foreground text-lg font-bold mb-2">Chapters</Text>
                        <ScrollView className="h-96" nestedScrollEnabled>
                            <View className="flex-col gap-y-2">
                                {data?.chapters.map((chapter, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        className="bg-gray-800 rounded-lg p-3"
                                        onPress={() => navigation.navigate('ReadChapter', { chapterHref: chapter.href })}
                                    >
                                        <Text className="text-foreground text-sm">{chapter.title}</Text>
                                        <Text className="text-gray-400 text-xs">{chapter.date}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View className="flex-1 px-4">
                    <CommentSection href={manga.href} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
} 