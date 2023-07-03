import { Text, View, useWindowDimensions } from "react-native";
import RenderHTML from "react-native-render-html"

export const Comments = ({ user, body_html, children }) => {
    const { width } = useWindowDimensions();

    return <View>
        <Text><RenderHTML contentWidth={width} source={{ html: body_html }} /></Text>
        {children.length === 0 ? (
            <Text>no other replies</Text>
        ) : (
            children.map(({ id_code, user, body_html, children }) => (
                <View style={{
                    marginLeft: 20
                }}>
                    <Comments
                        key={id_code}
                        user={user}
                        body_html={body_html}
                        children={children}
                    />
                </View>
            ))
        )}
    </View>
}