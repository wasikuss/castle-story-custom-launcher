export type Clickable = {
  kind: "link" | "button";
  title: string;
};

export type Link = Clickable & {
  kind: "link";
  url: string;
};

export type OnClick = React.MouseEventHandler<HTMLDivElement>
export type Button = Clickable & {
  kind: "button";
  onClick: OnClick;
};

export type Clickables = Link | Button;

const link = (title: string, url: string): Link => ({ kind: "link", title, url });
const button = (title: string, onClick: OnClick): Button => ({ kind: "button", title, onClick });

export const titleBarButtons: Clickables[] = [
  link("Twitter", "https://twitter.com/SauropodStudio"),
  link("Facebook", "https://www.facebook.com/SauropodStudio/"),
  link("Twitch", "https://www.twitch.tv/sauropodstudio"),
  link("Youtube", "https://www.youtube.com/user/sauropodstudio"),
  link("Discord", "https://discord.com/invite/hPFXpSK"),
];

export const highlightedBarButtons: Clickables[] = [
  link("NexusMods", "https://www.nexusmods.com/castlestory/"),
  link("Forum", "https://forums.castlestory.net/"),
  link("Chat", "https://discord.com/invite/hPFXpSK"),
  link("Wiki", "https://wiki.castlestory.net/index.php/Main_Page"),
  link("Support", "https://sauropodstudio.zendesk.com/hc/en-ca"),
  button("Credits", () => void 0),
];
