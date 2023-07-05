import React, { useContext } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { DataContext } from "../context/provider";
export default function SignInScreen() {
    const { signIn, setActive, isLoaded } = useSignIn();
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const { setInOutSwitch, inOutSwitch } = useContext(DataContext)

    const onSignInPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignIn = await signIn.create({
                identifier: emailAddress,
                password,
            });
            // This is an important step,
            // This indicates the user is signed in
            await setActive({ session: completeSignIn.createdSessionId });
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <View style={{
            display: "flex",
            height: "100%",

            justifyContent: "center",
            alignItems: "center",
        }}>
            <View>
                <TextInput
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Email..."
                    onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
            </View>

            <View>
                <TextInput
                    value={password}
                    placeholder="Password..."
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity onPress={onSignInPress}>
                <Text>Sign in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setInOutSwitch(!inOutSwitch)}>
                <Text>Dont Have an Account?</Text>
            </TouchableOpacity>
        </View>
    );
}