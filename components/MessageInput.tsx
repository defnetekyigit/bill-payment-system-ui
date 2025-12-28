import React from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type MessageInputProps = {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
};

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Ask something..."
        placeholderTextColor="#666"
      />
      <TouchableOpacity style={styles.button} onPress={onSend}>
        <Text style={styles.buttonText}>➤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: Platform.OS === "android" ? 24 : 12, // 🔥 NAVBAR FIX
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 15,
  },
  button: {
    backgroundColor: "#007AFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
