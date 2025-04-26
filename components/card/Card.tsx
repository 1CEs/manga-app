import { View, Text, ViewProps, Image } from "react-native";

type CardProps = ViewProps & {
    title: string;
    description: string;
    image: string;
}

export const Card = ({ title, description, image, ...props }: CardProps) => {
    return (
        <View {...props}>
            <Text>{title}</Text>
            <Text>{description}</Text>
            <Image source={{ uri: image }} />
        </View>
    );
};
