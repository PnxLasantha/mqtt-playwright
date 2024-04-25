import { expect, test } from "@playwright/test";
import mqtt from "mqtt";

test("mqtt", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  // Connect to MQTT broker
  const client = mqtt.connect("mqtt://localhost");

  // Subscribe to a topic
  client.subscribe("test/topic", () => {
    console.log("Subscribed to test/topic");
  });
  const messageToPublish = "Hello, MQTT!";
  // Handle incoming messages
  client.on("message", (topic, message) => {
    console.log(`Received message on topic ${topic}: ${message.toString()}`);
    expect(message.toString()).toContain(messageToPublish);
  });

  // Publish a message

  client.publish("test/topic", messageToPublish);

  // Close MQTT client
  client.end();

  await browser.close();
});
