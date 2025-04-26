import { useFetch } from "hooks/useFetch";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";
import Divider from "./Divider";

export const CommentSection = ({ href }: { href: string }) => {
    const url = process.env.EXPO_PUBLIC_API_URL!
    const { data, loading, error, refetch } = useFetch<CommentType>(`${url}/api/v1/comment?href=${href}`);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center py-4">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center py-4">
                <Text className="text-red-500">Error loading comments</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 mb-4">
            <Text className="text-xl font-bold text-foreground mb-4">Comments</Text>
            <Divider style={{ marginBottom: 8 }} />
            <ScrollView>
                {data?.comments.map((comment, index) => (
                    <View key={index} className="mb-2">
                        <View className="flex-row gap-x-3">
                            <Image
                                source={{ uri: comment.avatar }}
                                className="w-10 h-10 rounded-full"
                            />
                            <View className="flex-1 justify-center">
                                <View className="flex-col gap-y-1">
                                    <Text className="font-bold text-foreground">{comment.authorName}</Text>
                                    <Text className="text-gray-500 text-xs">{comment.date}</Text>
                                </View>
                                <Text className="text-foreground ">{comment.comment}</Text>
                            </View>
                        </View>
                        {index < data.comments.length - 1 && <Divider style={{ marginTop: 16 }} />}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}