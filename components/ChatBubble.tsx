import { StyleSheet, Text, View } from "react-native";

type Props = {
  from: "user" | "agent";
  text: string;
};

export default function ChatBubble({ from, text }: Props) {
  const isUser = from === "user";

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.alignRight : styles.alignLeft,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isUser ? styles.userBubble : styles.agentBubble,
        ]}
      >
        <Text style={[styles.text, isUser && styles.userText]}>
          {text}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 6,
    paddingHorizontal: 12,
  },
  alignRight: {
    alignItems: "flex-end",
  },
  alignLeft: {
    alignItems: "flex-start",
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: "#007AFF",
    borderTopRightRadius: 4,
  },
  agentBubble: {
    backgroundColor: "#E5E5EA",
    borderTopLeftRadius: 4,
  },
  text: {
    fontSize: 15,
    color: "#000",
  },
  userText: {
    color: "#fff",
  },
});
