import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, ActivityIndicator, Modal } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useFetch } from "hooks/useFetch";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState, useRef } from "react";
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { CommentSection } from "components/CommentSection";

type RootStackParamList = {
    ReadChapter: { chapterHref: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ImageInfo = {
    loading: boolean;
    error: boolean;
    height: number;
    cachedUri?: string;
}

export const ReadChapter = () => {
    const route = useRoute();
    const navigation = useNavigation<NavigationProp>();
    const { chapterHref } = route.params as { chapterHref: string };
    const url = process.env.EXPO_PUBLIC_API_URL!;
    const { data, loading, error, refetch } = useFetch<ChapterType>(`${url}/api/v1/chapter?href=${chapterHref}`);
    const screenWidth = Dimensions.get("window").width;
    const [showComments, setShowComments] = useState(false);
    
    // Track image info for each image
    const [imagesInfo, setImagesInfo] = useState<ImageInfo[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    
    // Setup image info when data changes
    useEffect(() => {
        if (data?.images && data.images.length > 0) {
            // Initialize with default values
            setImagesInfo(data.images.map(() => ({
                loading: true,
                error: false,
                height: screenWidth * 1.5, // Default aspect ratio as placeholder
            })));
            
            // Pre-cache images for better quality
            data.images.forEach((imageUrl, index) => {
                cacheImage(imageUrl, index);
            });
        }
    }, [data]);
    
    // Function to cache images locally
    const cacheImage = async (imageUrl: string, index: number) => {
        try {
            // Create a unique filename based on the URL
            const filename = imageUrl.split('/').pop() || `image-${index}`;
            const cacheDir = FileSystem.cacheDirectory;
            const filePath = `${cacheDir}${filename}`;
            
            // Check if the file already exists in cache
            const fileInfo = await FileSystem.getInfoAsync(filePath);
            
            if (fileInfo.exists) {
                // Use cached version
                updateImageInfo(index, { cachedUri: filePath });
            } else {
                // Download and cache the image with quality settings
                const downloadResult = await FileSystem.downloadAsync(
                    imageUrl,
                    filePath,
                    {
                        headers: {
                            'Cache-Control': 'max-age=31536000',
                            'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8'
                        }
                    }
                );
                
                if (downloadResult.status === 200) {
                    updateImageInfo(index, { cachedUri: downloadResult.uri });
                }
            }
        } catch (e) {
            console.error(`Error caching image at index ${index}:`, e);
        }
    };
    
    // Helper to update image info
    const updateImageInfo = (index: number, updates: Partial<ImageInfo>) => {
        setImagesInfo(current => {
            const newInfo = [...current];
            if (newInfo[index]) {
                newInfo[index] = { ...newInfo[index], ...updates };
            }
            return newInfo;
        });
    };
    
    // Handle image load event
    const handleImageLoad = (index: number, width: number, height: number) => {
        if (width && height) {
            const aspectRatio = height / width;
            const calculatedHeight = screenWidth * aspectRatio;
            
            updateImageInfo(index, {
                loading: false,
                height: calculatedHeight
            });
        } else {
            // For cases where dimensions can't be determined
            updateImageInfo(index, { loading: false });
        }
    };
    
    // Handle image error
    const handleImageError = (index: number) => {
        updateImageInfo(index, { 
            loading: false, 
            error: true 
        });
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 pt-10 bg-background">
                <View className="flex-1 px-4 items-center justify-center">
                    <ActivityIndicator size="large" color="#4F46E5" />
                    <Text className="mt-4 text-foreground text-center">Loading chapter...</Text>
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
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 relative">
                <ScrollView 
                    ref={scrollViewRef}
                    className="flex-grow" 
                    contentContainerStyle={{ flexGrow: 1 }}
                    removeClippedSubviews={true} // Performance optimization
                    
                >
                    {data?.images.map((imageUrl: string, index: number) => {
                        const imageInfo = imagesInfo[index] || { 
                            loading: true, 
                            error: false,
                            height: screenWidth * 1.5 
                        };
                        
                        return (
                            <View key={index} style={{ width: screenWidth, height: imageInfo.height }}>
                                {imageInfo.loading && (
                                    <View className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                                        <ActivityIndicator size="large" color="#ffffff" />
                                    </View>
                                )}
                                
                                {imageInfo.error ? (
                                    <View className="absolute inset-0 flex items-center justify-center bg-gray-900">
                                        <Text className="text-white text-center px-4">
                                            Unable to load image. Tap to retry.
                                        </Text>
                                        <TouchableOpacity 
                                            className="mt-4 bg-primary px-6 py-2 rounded-md"
                                            onPress={() => {
                                                updateImageInfo(index, { loading: true, error: false });
                                                cacheImage(imageUrl, index);
                                            }}
                                        >
                                            <Text className="text-white font-bold">Retry</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <Image
                                        source={{ 
                                            uri: imageInfo.cachedUri || imageUrl,
                                            cache: 'force-cache',
                                        }}
                                        style={{
                                            width: screenWidth,
                                            height: imageInfo.height,
                                        }}
                                        resizeMethod="resize"
                                        resizeMode="contain"
                                        progressiveRenderingEnabled={true}
                                        fadeDuration={100}
                                        onLoad={(e) => {
                                            const { width, height } = e.nativeEvent.source;
                                            handleImageLoad(index, width, height);
                                        }}
                                        onError={() => handleImageError(index)}
                                        onLoadStart={() => {
                                            if (!imageInfo.cachedUri) {
                                                updateImageInfo(index, { loading: true });
                                            }
                                        }}
                                    />
                                )}
                            </View>
                        );
                    })}
                </ScrollView>
                <View className="absolute bottom-0 left-0 right-0 p-4">
                    <View className="flex-row justify-between items-center">
                        <TouchableOpacity 
                            style={{ opacity: data?.prevChapter === "#/prev/" ? 0 : 1 }}
                            className="bg-primary/50 p-3 rounded-full"
                            onPress={() => data?.prevChapter && navigation.navigate('ReadChapter', { chapterHref: data.prevChapter })}
                            disabled={!data?.prevChapter || data.prevChapter === '#/prev/'}
                        >
                            <Ionicons name="chevron-back" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            className="bg-background/50 p-3 rounded-full"
                            onPress={() => setShowComments(true)}
                        >
                            <Ionicons name="chatbubble-outline" size={24} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{ opacity: data?.nextChapter === "#/next/" ? 0 : 1 }}
                            className="bg-primary/50 p-3 rounded-full"
                            onPress={() => data?.nextChapter && navigation.navigate('ReadChapter', { chapterHref: data.nextChapter })}
                            disabled={!data?.nextChapter || data.nextChapter === '#/next/'}
                        >
                            <Ionicons name="chevron-forward" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal
                visible={showComments}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowComments(false)}
            >
                <View className="flex-1 bg-black/90">
                    <View className="flex-1 p-4">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="text-white text-xl font-bold">{data?.title}</Text>
                            <TouchableOpacity 
                                onPress={() => setShowComments(false)}
                                className="p-2"
                            >
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <CommentSection href={chapterHref} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};