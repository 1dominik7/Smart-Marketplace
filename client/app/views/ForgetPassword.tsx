import colors from "@utils/colors";
import FormInput from "@ui/FormInput";
import WelcomeHeader from "app/ui/WelcomeHeader";
import { FC, useState } from "react";
import { StyleSheet, View } from "react-native";
import AppButton from "@ui/AppButton";
import FormDivider from "@ui/FormDivider";
import FormNavigator from "@ui/FormNavigator";
import CustomKeyAvoidingView from "@ui/CustomKeyAvoidingView";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AuthStackParamList } from "app/navigator/AuthNavigator";
import { emailRegex } from "@utils/validator";
import { showMessage } from "react-native-flash-message";
import client from "app/api/client";
import { runAxiosAsync } from "app/api/runAxiosAsync";

interface Props {}

const ForgetPassword: FC<Props> = (props) => {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async () => {
    if (!emailRegex.test(email)) {
      return showMessage({ message: "Invalid email id!", type: "danger" });
    }
    setBusy(true);
    const res = await runAxiosAsync<{ message: string }>(
      client.post("/auth/forget-pass", { email })
    );
    setBusy(false);
    if (res) {
      showMessage({ message: res.message, type: "success" });
    }
  };

  return (
    <CustomKeyAvoidingView>
      <View style={styles.innerContainer}>
        <WelcomeHeader />
        <View style={styles.formContainer}>
          <FormInput
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <AppButton active={!busy} title={busy ? "Please Wait..." : "Request Link"} onPress={handleSubmit} />
          <FormDivider />
          <FormNavigator
            onLeftPress={() => navigate("SignUp")}
            onRightPress={() => navigate("SignIn")}
            leftTitle="Sign Up"
            rightTitle="Sign In"
          />
        </View>
      </View>
    </CustomKeyAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    padding: 15,
    flex: 1,
  },
  input: {
    width: "100%",
    padding: 8,
    borderRadius: 5,
    marginBottom: 15,
    color: colors.primary,
    borderWidth: 1,
  },
  formContainer: {
    marginTop: 30,
  },
});

export default ForgetPassword;
