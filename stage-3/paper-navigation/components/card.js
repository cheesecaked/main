import { Text, View, } from "react-native"
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper"
export const Post = ({ articles, navigation }) => {
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />

    return (
        <Card>
            <Card.Title title={articles.user.name} left={LeftContent} />
            <Card.Content>
                <Title onPress={() => {
                    return (navigation.navigate('Details', {
                        id: articles.id
                    }))
                }}>{articles.title}</Title>
            </Card.Content>
            <Card.Cover source={{ uri: articles.cover_image}} />

        </Card>)
}