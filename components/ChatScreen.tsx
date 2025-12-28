import { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { sendChatMessage } from "../services/chatApi";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";

type Message = {
  from: "user" | "agent";
  text: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { from: "agent", text: "Hello! How can I assist you today?" },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setLoading(true);

    try {
      const response = await sendChatMessage(userText);

      const agentText = formatResponse(response);

      setMessages((prev) => [
        ...prev,
        { from: "agent", text: agentText },
      ]);
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong.";

      setMessages((prev) => [
        ...prev,
        { from: "agent", text: msg },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.chat}
          contentContainerStyle={{ paddingVertical: 10 }}
        >
          {messages.map((m, i) => (
            <ChatBubble key={i} from={m.from} text={m.text} />
          ))}

          {loading && <ChatBubble from="agent" text="Typing..." />}
        </ScrollView>

        <MessageInput value={input} onChange={setInput} onSend={send} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}


function formatResponse(response: any): string {
  if (!response) return "No response from server.";

  if (response.message && typeof response.message === "string") {
    if (response.data) {
      return response.message + "\n\n" + formatData(response.data);
    }
    return response.message;
  }

  if (response.data) {
    return formatData(response.data);
  }

  return JSON.stringify(response, null, 2);
}
function formatData(data: any): string {
  // 🔹 DETAILED endpoint ARRAY döner
  if (Array.isArray(data)) {
    return data
      .map((bill: any) => formatSingleBill(bill, true))
      .join("\n\n");
  }

  // 🔹 Normal bill veya pay response
  return formatSingleBill(data, false);
}

function formatSingleBill(bill: any, detailed: boolean): string {
  if (!bill) return "No bill data.";

  const status = bill.paid_status ?? bill.status ?? "unknown";

  // 🔹 remaining yoksa mantıklı hesapla
  const remaining =
    bill.remaining_amount !== undefined
      ? bill.remaining_amount
      : status === "paid"
      ? 0
      : bill.bill_total;

  let text =
    `📅 Month: ${bill.month}\n` +
    `💰 Total: ${bill.bill_total} TL\n` +
    `⏳ Remaining: ${remaining} TL\n` +
    `📌 Status: ${status}`;

  // 🔹 Detailed ise bill_details yaz
  if (detailed && bill.bill_details) {
    text += `\n\n🧾 Details:\n`;
    for (const [key, value] of Object.entries(bill.bill_details)) {
      text += `• ${key}: ${value} TL\n`;
    }
  }

  return text;
}



const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },
  chat: {
    flex: 1,
  },
});
