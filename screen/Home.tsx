import { Banner } from "components/Banner";
import Divider from "components/Divider";
import { NewSection } from "components/NewSection";
import { RecentlySection } from "components/RecentlySection";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

export const Home = () => {
    const banners = [
        require('../assets/img/banner1.jpg'),
        require('../assets/img/banner2.jpg'),
        require('../assets/img/banner3.jpg'),
        require('../assets/img/banner4.png'),
        require('../assets/img/banner5.jpg'),
    ]
    return (
        <SafeAreaView className="flex-1 pt-10 bg-background">
            <ScrollView className="flex-1">
                <View className="flex-1 flex-col gap-y-2">
                    <View>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 16 }}
                        >
                            {banners.map((banner, index) => (
                                <Banner key={index} ImageSource={banner} />
                            ))}
                        </ScrollView>
                    </View>
                    <Text className="text-foreground text-md font-bold px-4">New Manga</Text>
                    <NewSection />
                    <Text className="text-foreground text-md font-bold px-4">Recently Manga</Text>
                    <RecentlySection />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};