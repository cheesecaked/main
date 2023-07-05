import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { DataContext } from "../context/provider";
export default function SignUpScreen() {
    const { isLoaded, signUp, setActive } = useSignUp();
    const { setInOutSwitch, inOutSwitch } = React.useContext(DataContext)
    const [emailAddress, setEmailAddress] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [pendingVerification, setPendingVerification] = React.useState(false);
    const [code, setCode] = React.useState("");

    // start the sign up process.
    const onSignUpPress = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress,
                password,
            });

            // send the email.
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            // change the UI to our pending section.
            setPendingVerification(true);
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    // This verifies the user using email code that is delivered.
    const onPressVerify = async () => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            await setActive({ session: completeSignUp.createdSessionId });
        } catch (err) {
            console.error(JSON.stringify(err, null, 2));
        }
    };

    return (
        <View>
            {!pendingVerification && (
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
                            onChangeText={(email) => setEmailAddress(email)}
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

                    <TouchableOpacity onPress={onSignUpPress}>
                        <Text>Sign up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInOutSwitch(!inOutSwitch)}>
                        <Text>Already Have an Account?</Text>
                    </TouchableOpacity>
                </View>
            )}
            {pendingVerification && (
                <View style={{
                    display: "flex",
                    height: "100%",

                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <View>
                        <TextInput
                            value={code}
                            placeholder="Code..."
                            onChangeText={(code) => setCode(code)}
                        />
                    </View>
                    <TouchableOpacity onPress={onPressVerify}>
                        <Text>Verify Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setInOutSwitch(!inOutSwitch)}>
                        <Text>Already Have an Account?</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}