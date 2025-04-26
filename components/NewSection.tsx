import { useFetch } from "hooks/useFetch";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";

export const NewSection = () => {
    const url = process.env.EXPO_PUBLIC_API_URL!

    const { data, loading, error, refetch } = useFetch<NewMangaType[]>(`${url}/api/v1/new`);

    if (error) {
        return (
            <Text>Error: {error.message}</Text>
        )
    }

    return (
        <ScrollView showsHorizontalScrollIndicator={false} horizontal className="flex-1 gap-x-4 px-4">
            {
                loading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                        <View
                            key={index}
                            className="w-32 h-44 mr-6 rounded-md relative bg-gray-200 animate-pulse"
                        >
                            <Text
                                style={{
                                    zIndex: 1,
                                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: { width: 2, height: 2 },
                                    textShadowRadius: 3
                                }}
                                className="text-white text-[8rem] font-bold absolute left-0 -translate-x-5"
                            >
                                {index + 1}
                            </Text>
                            <View className="w-16 h-6 bg-gray-300 rounded-md absolute top-1 right-1" />
                            <View className="w-16 h-6 bg-gray-300 rounded-md absolute bottom-1 right-1" />
                        </View>
                    ))
                ) : (
                    data?.map((item: NewMangaType, index: number) => (
                        <TouchableOpacity
                            style={{
                                zIndex: index
                            }}
                            key={index}
                            className="w-32 h-44 mr-6 flex-row items-center justify-center rounded-md relative"
                        >
                            <Text
                                style={{
                                    zIndex: 1,
                                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                                    textShadowOffset: { width: 2, height: 2 },
                                    textShadowRadius: 3
                                }}
                                className="text-white text-[8rem] font-bold absolute left-0 -translate-x-5"
                            >
                                {index + 1}
                            </Text>
                            <Text style={{ backgroundColor: item.type === "Manga" ? "#366ad3" : "#a12e24" }} className="text-white text-xs rounded-md absolute top-1 right-1 p-1 z-10">{item.type.toUpperCase()}</Text>
                            <Text style={{ backgroundColor: "#ebcf04" }} className="text-white text-xs font-bold rounded-md absolute bottom-1 right-1 p-1 z-10">{item.colored.toUpperCase()}</Text>
                            <Image source={{ uri: item.thumbnail }} className="w-full h-full rounded-lg" />
                        </TouchableOpacity>
                    ))
                )
            }
        </ScrollView>
    );
}
