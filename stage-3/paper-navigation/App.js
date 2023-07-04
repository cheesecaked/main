import "react-native-gesture-handler"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import { DataContext } from './context/provider';
import DataProvider from './context/provider';
import RenderHTML from 'react-native-render-html';
import { ScrollView, Settings, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import { Card } from './components/card';
import { Comments } from './components/comments';
import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  RedirectToSignIn,
} from "@clerk/clerk-react";

export default function App() {
  return (

    <NavigationContainer>
      <ClerkProvider publishableKey="pk_test_c3F1YXJlLWhhd2stMjEuY2xlcmsuYWNjb3VudHMuZGV2JA">
        <SignedIn>
        <DataProvider>
          <DrawerNavigator />
        </DataProvider>
        </SignedIn>
        <SignedOut>
          <Text>signed out</Text>
        </SignedOut>
      </ClerkProvider>
    </NavigationContainer>

  );
}
const Tabs = createBottomTabNavigator()

function TabNavigator() {
  return <Tabs.Navigator>
    <Tabs.Screen name="Home" component={HomeScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>
}
const Drawer = createDrawerNavigator()

function DrawerNavigator() {
  return <Drawer.Navigator screenOptions={{ headerShown: false }}>
    <Drawer.Screen name="Stack" component={StackNavigator} />
    <Drawer.Screen name="Settings" component={SettingsScreen} />
  </Drawer.Navigator>
}
const Stack = createNativeStackNavigator()

function StackNavigator() {
  return <Stack.Navigator>
    <Stack.Screen name='Tabs' component={TabNavigator} options={{ headerShown: false }} />

    <Stack.Screen name='Home' component={HomeScreen} />
    <Stack.Screen name='Details' component={DetailsScreen} />
    <Stack.Screen name='Comments' component={CommentsScreen} />
  </Stack.Navigator>
}

function SettingsScreen() {
  return <View>
    <Text>
      Settings Screen
    </Text>
  </View>
}

function ProfileScreen() {
  return <View>
    <Text>Profile screen</Text>
  </View>
}

function HomeScreen({ navigation }) {

  const { articles, setArticles } = useContext(DataContext)

  console.log(articles)
  return (
    <View style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <ScrollView style={{ flexDirection: 'column', gap: 10 }}>
        {
          articles.map((articles, index) => {
            return <Card navigation={navigation} key={index} articles={articles} />
          })
        }
      </ScrollView>
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
    <ScrollView style={{ flex: 1 }}>
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
    </ScrollView>
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
    <ScrollView style={{ flex: 1, backgroundColor: "rgb(242, 242, 242)" }}>
      {comments?.map(({ id_code, user, body_html, children }) => {

        return <Comments key={id_code}
          user={user}
          body_html={body_html}
          children={children} />
      })}
    </ScrollView>
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
