import "react-native-gesture-handler"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { useState, useEffect, useContext } from 'react';
import { DataContext } from './context/provider';
import DataProvider from './context/provider';
import RenderHTML from 'react-native-render-html';
import { Alert, Button, SafeAreaView, ScrollView, Settings, StyleSheet, Text, TextInput, TouchableOpacity, View, ViewComponent, useWindowDimensions } from 'react-native';
import { Chip } from 'react-native-paper';
import { Post } from './components/card';
import { Comments } from './components/comments';
import React from "react";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
  useUser,
} from "@clerk/clerk-expo";
import SignUpScreen from "./components/signup-screen";
import SignInScreen from "./components/signin-screen";
import * as SecureStore from "expo-secure-store";
import { SignedOutScreen } from "./components/signedout-screen";
const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function App() {

  return (

    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey="pk_test_c3F1YXJlLWhhd2stMjEuY2xlcmsuYWNjb3VudHMuZGV2JA">

      <SignedOut>
        <DataProvider>
          <SignedOutScreen />
        </DataProvider>
      </SignedOut>
      <SignedIn>
        <NavigationContainer>
          <DataProvider>
            <DrawerNavigator />
          </DataProvider>
        </NavigationContainer>
      </SignedIn>


    </ClerkProvider>
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
    <Stack.Screen name="Edit" component={EditNameScreen} />
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

function ProfileScreen({ navigation }) {
  const { isSignedIn, user, isLoaded } = useUser();
  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded) {
      return null;
    }
    return (
      <View style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        height: "100%"
      }}>
        <Chip
          title="Sign Out"
          onPress={() => {
            Alert.alert('sign out?', null, [
              {
                text: 'No',
                style: 'cancel'
              },
              {
                text: 'Yes', onPress: () => signOut()
              }
            ])
          }}
        >Sign out</Chip>
      </View>
    );
  };
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    console.log(JSON.stringify(user, null, 4))
    return <View>
      <Text>Hello {user.fullName}!</Text>
      <View style={{
        display: "flex",
        flexDirection: 'row',
        gap: 10
      }}>
        <Chip onPress={() => navigation.navigate('Edit')}>Edit</Chip>
        <SignOut />
      </View>
    </View>;
  }

  return <Text>Not signed in</Text>;

}
function EditNameScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [editName, setEditName] = useState(false)
  const { user } = useUser();
  if (!user) return null;
  const updateUser = async () => {
    await user.update({
      firstName: firstName,
      lastName: lastName,
    });
  };
  return (
    <View style={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
      width: "50%",
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
      alignSelf: "center"
    }}>


      <View style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start"
      }}>
        <Text>firstName: </Text>
        {editName ? (<TextInput
          style={styles.input}
          value={firstName}
          onChangeText={firstName => setFirstName(firstName)}
        />) : <Text style={styles.name}>{user?.firstName}</Text>}
      </View>


      <View style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start"
      }}>
        <Text>lastName: </Text>
        {editName ? (<TextInput
          style={styles.input}
          value={lastName}
          onChangeText={lastName => setLastName(lastName)}
        />) : <Text style={styles.name}>{user?.lastName}</Text>}
      </View>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10
      }}>
        <Chip style={{
          display: editName ? "flex" : "none"
        }} onPress={() => { updateUser(), setEditName(!editName) }}>Confirm</Chip>
        <Chip onPress={() => setEditName(!editName)}>Edit</Chip>
      </View>
    </View>
  )
}
function HomeScreen({ navigation }) {

  const { articles, setArticles } = useContext(DataContext)

  console.log(articles)
  return (
    <View style={{ backgroundColor: "rgb(242, 242, 242)" }}>
      <ScrollView style={{ flexDirection: 'column', gap: 10 }}>
        {
          articles.map((articles, index) => {
            return <Post navigation={navigation} key={index} articles={articles} />
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
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    padding: 10
  },
  name: {
    argin: 12,
  }
});
