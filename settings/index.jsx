registerSettingsPage(({ settings }) => (
  <Page>
    <Section
      title={
        <Text bold align="center">
          VIrtualPass Website
        </Text>
      }
    >
      <TextInput
          settingsKey="URL"
          label="VirtualPass URL"
          defaultValue="https://virtualpass.com"
        />
    </Section>
    <Section
      title={
        <Text bold align="center">
          API key
        </Text>
      }
    >
      <TextInput
          settingsKey="key"
          label="API Key"
          defaultValue="Key"
        />
    </Section>
  </Page>
));
