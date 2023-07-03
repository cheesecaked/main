import { Text, View } from "react-native"

export const Card = ({ articles, navigation }) => {
    return <View>
        <Text style={{fontSize: 30}} onPress={() => {
            return (navigation.navigate('Details', {
                id: articles.id
            }))
        }} >{articles.title}</Text>
    </View>
}