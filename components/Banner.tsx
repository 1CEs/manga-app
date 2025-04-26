import { View, ViewProps, ImageSourcePropType, Image, TouchableOpacity } from "react-native";

type BannerProps = ViewProps & {
    ImageSource: ImageSourcePropType;
    onPress?: () => void;
}

export const Banner = ({ ImageSource, onPress, ...props }: BannerProps) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            activeOpacity={0.9}
            className="mr-4"
        >
            <View {...props} className="w-96 h-52 rounded-xl overflow-hidden shadow-md bg-white">
                <Image 
                    source={ImageSource} 
                    className="w-full h-full" 
                    resizeMode="cover"
                />
            </View>
        </TouchableOpacity>
    );
};
