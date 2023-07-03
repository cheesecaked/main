import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
import { DataContext } from './context/provider';
import DataProvider from './context/provider';
import { Card } from './components/card';
import RenderHTML from 'react-native-render-html';
import { Comments } from './components/comments';
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Details' component={DetailsScreen} />
          <Stack.Screen name='Comments' component={CommentsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

function HomeScreen({ navigation }) {

  const { articles, setArticles } = useContext(DataContext)

  console.log(articles)
  return (
    <View style={{ height: "fit-content", backgroundColor: "rgb(242, 242, 242)" }}>
      <View style={{ flexDirection: 'column', gap: 10 }}>
        {
          articles.map((articles, index) => {
            return <Card navigation={navigation} key={index} articles={articles} />
          })
        }
      </View>
    </View>
  )
}
function DetailsScreen({ route, navigation }) {
  const [article, setArticle] = useState()
  const { width } = useWindowDimensions();
  const { id } = route.params
  useEffect(() => {
    if (id) {
      fetch(`https://dev.to/api/articles/${id}`)
        .then((res) => res.json())
        .then((data) => { setArticle(data), console.log(data) })

    }
  }, [])

  if (!article) {
    return (<Text>Loading</Text>)
  }
  return (
    <View style={{ flex: 1 }}>
      <Text>{article.title}</Text>
      <RenderHTML contentWidth={width - 20} source={{ html: article.body_html }} />
      <View style={{ flexDirection: 'row' }}>
        {article.comments_count === 0 ?
          (<View></View>) :

          (<Chip icon='information' onPress={() => navigation.navigate('Comments', {
            id: article.id
          })}>
            Comments
          </Chip>)
        }

      </View>
    </View>
  )
}
function CommentsScreen({ route }) {
  const [comments, setComments] = useState()
  const { id } = route.params
  useEffect(() => {
    fetch(`https://dev.to/api/comments?a_id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data),
          console.log(data)
      })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "rgb(242, 242, 242)" }}>
      {comments?.map(({ id_code, user, body_html, children }) => {

        return <Comments key={id_code}
          user={user}
          body_html={body_html}
          children={children} />
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
