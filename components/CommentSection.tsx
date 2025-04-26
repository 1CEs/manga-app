import { useFetch } from "hooks/useFetch";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";

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
            <Text className="text-xl font-bold text-foreground mb-6">Comments ({data?.comments.length})</Text>
            <ScrollView>
                <View className="flex-1 gap-y-3">
                    {data?.comments.length === 0 ? (    
                        <Text className="text-foreground text-center">No comments yet</Text>
                    ) : (
                        data?.comments.map((comment, index) => (
                            <View key={index} className="bg-gray-800 rounded-xl p-4">
                                <View className="flex-row gap-x-3">
                                    <Image
                                        source={{ uri: comment.avatar }}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <View className="flex-1">
                                        <View className="flex-row items-center gap-x-2 mb-1">
                                            <Text className="font-bold text-foreground">{comment.authorName}</Text>
                                            <Text className="text-gray-400 text-xs">{comment.date}</Text>
                                        </View>
                                        <Text className="text-foreground leading-5">{comment.comment}</Text>
                                    </View>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            </ScrollView>
        </View>
    );
};