import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs"
import { NavigationContainer} from "react-navigation";

import { SignedOutScreen } from "./component/signedout-screen"
import * as dotenv from "dotenv";
import Chat from "./component/chat";
import { Layout } from "./layout";
dotenv.config
const App = () => {
  return (
  <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
    <SignedIn>
      <Layout/>
    </SignedIn>
    <SignedOut>
      <SignedOutScreen/>
    </SignedOut>
  </ClerkProvider>)
}

export default App
