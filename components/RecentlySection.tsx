import { useFetch } from "hooks/useFetch";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    MangaDetail: { manga: RecentlyMangaType };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Pagination = ({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (page: number) => void }) => {
    return (
        <View className="flex-row justify-center items-center gap-x-4 py-4">
            <TouchableOpacity
                onPress={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-500' : 'bg-blue-500'}`}
            >
                <Text className="text-white font-bold">Previous</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                onPress={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-500' : 'bg-blue-500'}`}
            >
                <Text className="text-white font-bold">Next</Text>
            </TouchableOpacity>
        </View>
    );
};

export const RecentlySection = () => {
    const url = process.env.EXPO_PUBLIC_API_URL!
    const [currentPage, setCurrentPage] = useState(1);
    const navigation = useNavigation<NavigationProp>();
    const totalPages = 32;

    const { data, loading, error, refetch } = useFetch<RecentlyMangaType[]>(`${url}/api/v1/recently?page=${currentPage}`);

    if (error) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <View className="bg-red-500/10 p-6 rounded-lg items-center">
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
        )
    }

    return (
        <View className="flex-1">
            <View className="flex-1 gap-y-4">
                {
                    loading ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <View
                                key={index}
                                className="w-full h-fit rounded-md relative bg-gray-200 animate-pulse flex-row items-start"
                            >
                                <View className="w-24 h-24 bg-gray-300 rounded-md ml-4" />
                                <View className="flex-1 ml-4">
                                    <View className="w-3/4 h-6 bg-gray-300 rounded-md mb-2" />
                                    <View className="w-1/2 h-4 bg-gray-300 rounded-md" />
                                </View>
                            </View>
                        ))
                    ) : (
                        data?.map((item: RecentlyMangaType, index: number) => (
                            <TouchableOpacity
                                key={index}
                                className="w-full h-fit rounded-md px-4 relative gap-x-4 flex-row items-start"
                                onPress={() => navigation.navigate('MangaDetail', { manga: item })}
                            >
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    className="w-24 h-24 rounded-lg"
                                />
                                <View className="flex-1">
                                    <Text className="text-lg font-bold text-white line-clamp-1">{item.title}</Text>
                                    <View className="flex-row gap-x-2">
                                        <Text style={{ backgroundColor: item.type === "Manga" ? "#366ad3" : item.type === "Manhua" ? "#009688" : "#a12e24" }}
                                            className="text-white text-xs rounded-md p-1 self-start">
                                            {item.type.toUpperCase()}
                                        </Text>
                                        <Text className="text-white text-xs rounded-md bg-gray-500 p-1 self-start">
                                            {item.recentEp.title}
                                        </Text>
                                    </View>
                                    <Text className="text-gray-500 text-xs pt-2">
                                        {item.recentEp.time + " ที่ผ่านมา"}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    )
                }
            </View>
            <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
        </View>
    );
}
